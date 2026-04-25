<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetMyListedItemsController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        // 自分の出品した商品を取得
        $items = Item::where('user_id', $user->id)
            ->with(['images', 'categories']) 
            ->get();

        return response()->json([
            'message' => 'My listed items',
            'data' => $items,
        ]);
    }
}