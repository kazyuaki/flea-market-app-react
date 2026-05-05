<?php

namespace App\Services\Purchase;

use App\Models\Item;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class CheckoutService
{
    /**
     * StripeのCheckout Sessionを作成するロジック
     */    
    public function createSession(User $user, int $itemId): string
    {
        $item = Item::findOrFail($itemId);

        if ($item->user_id === $user->id) {
            abort(403, '自分の商品は購入できません。');
        }

        if ($item->status !== 'available') {
            abort(409, 'この商品は購入できません。');
        }
        
        Stripe::setApiKey(config('services.stripe.secret'));

        /** @var array<string, mixed> $checkoutParams */
        $checkoutParams = [
            'payment_method_types' => ['card'],
            'mode' => 'payment',
            'metadata' => [
                'item_id' => (string) $item->id,
                'user_id' => (string) $user->id,
            ],
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
            'success_url' => config('services.frontend.url') . '/purchase/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => config('services.frontend.url') . '/purchase/' . $itemId,
        ];

        $session = Session::create($checkoutParams);

        if (!$session->url) {
            abort(500, '決済URLの作成に失敗しました。');
        }

        return $session->url;
    }

    /*    
     * 決済完了後の処理ロジック
     */
     public function completeSession(User $user, string $sessionId): void
     {
        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            abort(422, '決済が完了していません。');
        }

        $itemId = (int) ($session->metadata->item_id ?? 0);
        $userId = (int) ($session->metadata->user_id ?? 0);

        if ($userId !== $user->id) {
            abort(403);
        }

        $item = Item::findOrFail($itemId);

        if ($item->user_id === $user->id) {
            abort(403, '自分の商品は購入できません。');
        }

        if ($item->status !== 'available') {
            abort(409, 'すでに購入されています。');
        }

        // トランザクションの作成と商品のステータス更新を行う
        DB::transaction(function () use ($item, $user) {
            // トランザクションの作成
            Transaction::firstOrCreate([
                'item_id' => $item->id,
                'user_id' => $user->id,
            ]);

            // 商品のステータスを「sold」に更新
            $item->update([
                'status' => 'sold',
            ]);
        });
     }
}
