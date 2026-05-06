<?php

namespace App\Http\Controllers\Api\Purchase;

use App\Http\Controllers\Controller;
use App\Services\Purchase\CheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class CompleteCheckoutSessionController extends Controller
{
    /*
     * チェックアウトセッションの完了を処理するコントローラー
     */
    public function __invoke(
        Request $request,
        CheckoutService $checkoutService,
        ): JsonResponse {
        $request->validate([
            'session_id' => ['required', 'string'],
        ]);

        $checkoutService->completeSession(
            $request->user(),
            $request->input('session_id')
        );

        return response()->json([
            'message' => '購入が完了しました。',
        ]);
    }
}
