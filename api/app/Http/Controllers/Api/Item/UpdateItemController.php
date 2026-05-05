<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use App\Services\Item\ItemService;
use Illuminate\Http\JsonResponse;


class UpdateItemController extends Controller
{
    /**
     * 出品者本人が商品の情報を更新するコントローラ
     */
    public function __invoke(
        StoreItemRequest $request,
        Item $item,
        ItemService $itemService
    ): JsonResponse{
        $item = $itemService->updateItem(
            $request->user(),
            $item,
            $request->validated(),
            $request->file('images') ?? [],
        );

        return response()->json([
            'message' => '商品情報を更新しました。',
            'data' => $item,
        ]);
    }
}
