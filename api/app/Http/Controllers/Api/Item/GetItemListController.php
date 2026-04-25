<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Services\Item\ItemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetItemListController extends Controller
{
    public function __construct(protected ItemService $itemService){}

    public function __invoke(Request $request)
    {
        $keyword = $request->query('keyword');

        $items = $this->itemService->getItemList(Auth::id(), $keyword);

        return response()->json([
            'message' => '商品一覧の取得に成功しました',
            'items' => $items,
        ]);
    }
}
