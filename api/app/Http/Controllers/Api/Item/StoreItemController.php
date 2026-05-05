<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Services\Item\ItemService;
use Illuminate\Http\JsonResponse;


class StoreItemController extends Controller
{
    /**
     * 出品した商品の情報を保存するコントローラ
     */
    public function __invoke(StoreItemRequest $request, ItemService $itemService): JsonResponse
    {
        $item = $itemService->storeItem(
            $request->user(),
            $request->validated(),
            $request->file('images') ?? []
        );
        return response()->json([
            'message' => '商品が正常に出品されました。',
            'data' => $item,
        ], 201);
    }
}
