<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $asBuyer = Order::with(['seller', 'items.product'])
            ->where('buyer_id', $user->id)
            ->latest()
            ->get();

        $asSeller = collect([]);
        if ($user->isSeller()) {
            $asSeller = Order::with(['buyer', 'items.product'])
                ->where('seller_id', $user->id)
                ->latest()
                ->get();
        }

        return response()->json([
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
                    OrderItem::create($item);
                }

                $orders[] = $order->load('items.product', 'seller', 'buyer');
            }
        });

        return response()->json(['orders' => $orders], 201);
    }
}
