<?php

namespace App\Http\Controllers\Api\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetPurchaseItemController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $item_id)
    {
        $item = Item::find($item_id);
        // 認証されていない場合は最初のユーザーを取得（テスト用）
        $user = Auth::user() ?? User::first(); 

        return response()->json([
            'item' => $item,
            'user' => [
                'postal_code' => $user->postal_code,
                'address' => $user->address,
                'building_name' => $user->building_name,
                'phone_number' => $user->phone_number,
                'payment_method' => $user->payment_method,
            ]
        ]);
    }
}
