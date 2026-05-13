<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Légumes', 'Fruits', 'Céréales', 'Produits laitiers', 'Viandes', 'Œufs', 'Miel', 'Plantes', 'Épices'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'icon' => null,
        ];
    }
}
