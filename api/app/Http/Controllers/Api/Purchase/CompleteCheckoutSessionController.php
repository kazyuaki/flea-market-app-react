<?php

namespace App\Http\Controllers\Api\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class CompleteCheckoutSessionController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'session_id' => ['required', 'string'],
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::retrieve($request->input('session_id'));

        if ($session->payment_status !== 'paid') {
            return response()->json([
                'message' => '決済が完了していません。',
            ], 422);
        }

        $itemId = (int) ($session->metadata->item_id ?? 0);
        $userId = (int) ($session->metadata->user_id ?? 0);

        if ($userId !== $request->user()->id) {
            abort(403);
        }

        $item = Item::findOrFail($itemId);

        Transaction::firstOrCreate([
            'item_id' => $item->id,
            'user_id' => $request->user()->id,
        ]);

        $item->update([
            'status' => 'sold',
        ]);

        return response()->json([
            'message' => '購入が完了しました。',
        ]);
    }
}
