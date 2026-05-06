<?php

namespace App\Http\Controllers\Api\MyPage;

use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class GetMyPurchasedItemsController extends Controller
{
    /*
    * 購入した商品の一覧を取得するコントローラー
    */
    public function __invoke()
    {
        $user = Auth::user();

        // 購入した商品を取得
        $items = Item::whereHas('transactions', function ($query) use ($user) {
            // トランザクションの中で、購入者(user_id)が自分であるものを絞り込む
            $query->where('user_id', $user->id);
        })
        ->with(['images','categories',])
        ->get();

        return response()->json([
            'message' => 'My purchased items',
            'data' => $items,
        ]);
    }
}
