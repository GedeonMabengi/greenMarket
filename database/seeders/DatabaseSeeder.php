<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@greenmarket.test',
            'role' => 'admin',
            'latitude' => 5.36,
            'longitude' => -4.01,
        ]);

        // Create sellers
        $sellers = User::factory(5)->create([
            'role' => 'seller',
            'bio' => 'Ferme familiale produisant des produits bio et frais.',
        ]);

        // Create buyers
        User::factory(10)->create([
            'role' => 'buyer',
        ]);

        // Create categories
        $categories = [
            ['name' => 'Légumes', 'slug' => 'legumes'],
            ['name' => 'Fruits', 'slug' => 'fruits'],
            ['name' => 'Céréales', 'slug' => 'cereales'],
            ['name' => 'Produits laitiers', 'slug' => 'produits-laitiers'],
            ['name' => 'Viandes', 'slug' => 'viandes'],
            ['name' => 'Œufs', 'slug' => 'oeufs'],
            ['name' => 'Miel', 'slug' => 'miel'],
            ['name' => 'Plantes', 'slug' => 'plantes'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Create products for each seller
        $productTemplates = [
            ['name' => 'Tomates bio', 'unit' => 'kg', 'category_id' => 1],
            ['name' => 'Carottes fraîches', 'unit' => 'botte', 'category_id' => 1],
            ['name' => 'Bananes plantain', 'unit' => 'botte', 'category_id' => 2],
            ['name' => 'Oranges', 'unit' => 'kg', 'category_id' => 2],
            ['name' => 'Riz local', 'unit' => 'kg', 'category_id' => 3],
            ['name' => 'Maïs', 'unit' => 'kg', 'category_id' => 3],
            ['name' => 'Lait frais', 'unit' => 'litre', 'category_id' => 4],
            ['name' => 'Fromage fermier', 'unit' => 'unité', 'category_id' => 4],
            ['name' => 'Poulet de chair', 'unit' => 'unité', 'category_id' => 5],
            ['name' => 'Œufs de ferme', 'unit' => 'douzaine', 'category_id' => 6],
            ['name' => 'Miel pur', 'unit' => 'litre', 'category_id' => 7],
            ['name' => 'Aloe vera', 'unit' => 'unité', 'category_id' => 8],
        ];

        foreach ($sellers as $seller) {
            $indexes = array_rand($productTemplates, min(4, count($productTemplates)));
            if (!is_array($indexes)) $indexes = [$indexes];

            foreach ($indexes as $index) {
                $template = $productTemplates[$index];
                Product::create([
                    'user_id' => $seller->id,
                    'category_id' => $template['category_id'],
                    'name' => $template['name'],
                    'description' => 'Produit frais de la ferme ' . $seller->name,
                    'price' => rand(500, 10000),
                    'quantity' => rand(10, 200),
                    'unit' => $template['unit'],
                    'image' => null,
                    'latitude' => $seller->latitude,
                    'longitude' => $seller->longitude,
                    'is_available' => true,
                ]);
            }
        }
    }
}
