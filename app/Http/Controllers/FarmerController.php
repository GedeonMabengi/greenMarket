<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmerController extends Controller
{
    public function show(User $user)
    {
        if (!$user->isSeller()) {
            abort(404);
        }

        $products = $user->products()
            ->with('category')
            ->available()
            ->latest()
            ->get();

        return Inertia::render('Farmers/Show', [
            'farmer' => $user->only('id', 'name', 'avatar', 'bio', 'address', 'phone', 'latitude', 'longitude', 'created_at'),
            'products' => $products,
        ]);
    }
}
