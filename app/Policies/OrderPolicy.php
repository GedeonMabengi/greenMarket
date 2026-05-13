<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function update(User $user, Order $order): bool
    {
        return $user->id === $order->seller_id || $user->id === $order->buyer_id;
    }
}
