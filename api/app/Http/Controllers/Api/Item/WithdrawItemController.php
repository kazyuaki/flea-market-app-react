<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WithdrawItemController extends Controller
{
    /**
     * 出品者本人が商品を出品一覧から取り下げるコントローラ
     */
    public function __invoke(Request $request, Item $item): JsonResponse
    {
        if ($item->user_id !== $request->user()->id) {
            abort(403, 'この商品は取り下げできません。');
        }

        if ($item->status === 'sold') {
            abort(409, '売却済みの商品は取り下げできません。');
        }

        $item->update([
            'status' => 'withdrawn',
        ]);

        return response()->json([
            'message' => '出品を取り下げました。',
            'data' => $item
                ->load(['categories', 'comments.user', 'user:id,name,profile_image_url'])
                ->loadCount(['favorites', 'comments']),
        ]);
    }
}
