<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketplaceController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['user', 'category'])
            ->available()
            ->latest();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $userLat = $request->user()?->latitude ?? $request->lat;
        $userLng = $request->user()?->longitude ?? $request->lng;
        $radius = $request->filled('radius') ? (float) $request->radius : null;

        if ($userLat && $userLng && $radius) {
            $earthRadius = 6371;
            $query->selectRaw("*, (
                ? * acos(
                    cos(radians(?)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) *
                    sin(radians(latitude))
                )
            ) AS distance", [$earthRadius, (float)$userLat, (float)$userLng, (float)$userLat])
            ->whereRaw("(
                ? * acos(
                    cos(radians(?)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) *
                    sin(radians(latitude))
                )
            ) <= ?", [$earthRadius, (float)$userLat, (float)$userLng, (float)$userLat, $radius])
            ->orderBy('distance');
        }

        $products = $query->paginate(12)->withQueryString();

        $products->getCollection()->transform(function ($product) use ($userLat, $userLng) {
            $product->distance = $product->distanceFrom(
                $userLat ? (float) $userLat : null,
                $userLng ? (float) $userLng : null
            );
            return $product;
        });

        return Inertia::render('Marketplace/Index', [
            'products' => $products,
            'categories' => Category::all(),
            'filters' => $request->only(['search', 'category', 'radius', 'lat', 'lng']),
        ]);
    }
}
