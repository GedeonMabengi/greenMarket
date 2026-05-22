<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
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

        return response()->json([
            'data' => $products->items(),
            'meta' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
            ],
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['user', 'category']);

        return response()->json(['data' => $product]);
    }
}
