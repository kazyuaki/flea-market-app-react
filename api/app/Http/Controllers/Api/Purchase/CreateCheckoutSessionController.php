<?php

namespace App\Http\Controllers\Api\Purchase;
use App\Http\Controllers\Controller;
use App\Services\Purchase\CheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreateCheckoutSessionController extends Controller
{
    /*
     * チェックアウトセッションを作成するコントローラー
     */
    public function __invoke(
        Request $request,
        int $itemId,
        CheckoutService $checkoutService,
    ): JsonResponse {
        $validated = $request->validate([
            'payment_method' => ['required', 'string', 'in:card,konbini'],
        ]);

        $checkoutUrl = $checkoutService->createSession(
            $request->user(),
            $itemId,
            $validated['payment_method'],
        );

        return response()->json([
            'checkout_url' => $checkoutUrl,
        ]);
    }
}
