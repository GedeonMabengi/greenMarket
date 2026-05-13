<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $asBuyer = Order::with(['seller', 'items.product'])
            ->where('buyer_id', $request->user()->id)
            ->latest()
            ->get();

        $asSeller = collect([]);
        if ($request->user()->isSeller()) {
            $asSeller = Order::with(['buyer', 'items.product'])
                ->where('seller_id', $request->user()->id)
                ->latest()
                ->get();
        }

        return Inertia::render('Orders/Index', [
            'ordersAsBuyer' => $asBuyer,
            'ordersAsSeller' => $asSeller,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.1',
        ]);

        $productIds = collect($validated['items'])->pluck('product_id')->toArray();
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        // Group by seller
        $itemsBySeller = collect($validated['items'])->groupBy(fn($item) => $products[$item['product_id']]->user_id);

        $orders = [];

        DB::transaction(function () use ($itemsBySeller, $products, $request, &$orders) {
            foreach ($itemsBySeller as $sellerId => $items) {
                $totalAmount = 0;
                $orderItems = [];

                foreach ($items as $item) {
                    $product = $products[$item['product_id']];
                    $quantity = (float) $item['quantity'];

                    if ($product->quantity < $quantity) {
                        throw new \Exception("Stock insuffisant pour {$product->name}");
                    }

                    $unitPrice = $product->price;
                    $totalPrice = $unitPrice * $quantity;
                    $totalAmount += $totalPrice;

                    $orderItems[] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'unit_price' => $unitPrice,
                        'total_price' => $totalPrice,
                    ];

                    $product->decrement('quantity', $quantity);
                }

                $order = Order::create([
                    'buyer_id' => $request->user()->id,
                    'seller_id' => $sellerId,
                    'total_amount' => $totalAmount,
                    'status' => 'pending',
                ]);

                foreach ($orderItems as $item) {
                    $item['order_id'] = $order->id;
                    \App\Models\OrderItem::create($item);
                }

                $orders[] = $order;
            }
        });

        return redirect()->route('orders.index')->with('success', 'Commande passée avec succès.');
    }

    public function updateStatus(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        return back()->with('success', 'Statut mis à jour.');
    }
}
