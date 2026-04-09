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
        $item = Item::find($item_id);

        return response()->json([
            'item' => $item,
            // $user = auth()->user(),
        ]);
    }
}
