<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $products = [
            ['name' => 'Tomates bio', 'unit' => 'kg'],
            ['name' => 'Bananes plantain', 'unit' => 'botte'],
            ['name' => 'Lait frais', 'unit' => 'litre'],
            ['name' => 'Œufs de ferme', 'unit' => 'douzaine'],
            ['name' => 'Miel pur', 'unit' => 'litre'],
            ['name' => 'Carottes fraîches', 'unit' => 'kg'],
            ['name' => 'Riz local', 'unit' => 'kg'],
            ['name' => 'Poulet de chair', 'unit' => 'unité'],
            ['name' => 'Ignames', 'unit' => 'kg'],
            ['name' => 'Piment rouge', 'unit' => 'kg'],
        ];

        $product = fake()->randomElement($products);

        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'name' => $product['name'],
            'description' => fake()->sentence(10),
            'price' => fake()->randomFloat(2, 500, 15000),
            'quantity' => fake()->randomFloat(2, 5, 100),
            'unit' => $product['unit'],
            'image' => null,
            'latitude' => fake()->latitude(4.0, 14.0),
            'longitude' => fake()->longitude(-17.0, -5.0),
            'is_available' => true,
        ];
    }
}
