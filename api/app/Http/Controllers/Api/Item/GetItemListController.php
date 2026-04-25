<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetItemListController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        // 商品を取得するクエリを作成
        $items = Item::query()
            ->when($user, function($query) use ($user) {
                // 自分の商品以外の商品を取得する
                $query->where('user_id', '!=', $user->id);
            })
            ->get();

        return response()->json([
            'message' => 'Item index',
            'data' => $items,
        ]);
    }
}
