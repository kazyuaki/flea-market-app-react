<?php

namespace App\Http\Controllers\Api\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class GetPurchaseItemController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $item_id)
    {
        $item = Item::findOrFail($item_id);
        $user = $request->user();

        if ($item->user_id === $user->id) {
            abort(403, '自分の商品は購入できません。');
        }

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
