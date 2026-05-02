<?php

namespace App\Http\Controllers\Api\Purchase;
use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class CreateCheckoutSessionController extends Controller
{
    public function __invoke(Request $request, $itemId)
    {
        $item = Item::findOrFail($itemId);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'mode' => 'payment',
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'jpy',
                        'product_data' => [
                            'name' => $item->name,
                        ],
                        'unit_amount' => $item->price,
                    ],
                    'quantity' => 1,
                ]
            ],
            'success_url' => config('services.frontend.url') . '/items',
            'cancel_url' => config('services.frontend.url') . '/purchase/' . $itemId,
        ]);
        return response()->json([
            'checkout_url' => $session->url,
        ]);
    }
}
