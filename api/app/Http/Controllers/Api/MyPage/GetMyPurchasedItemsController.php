<?php

namespace App\Http\Controllers\Api\MyPage;

use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class GetMyPurchasedItemsController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();

        // 購入した商品を取得
        $items = Item::whereHas('transactions', function ($query) use ($user) {
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

