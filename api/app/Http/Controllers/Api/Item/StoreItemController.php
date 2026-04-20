<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class StoreItemController extends Controller
{
    /**
     * 出品した商品の情報を保存するコントローラ
     */
    public function __invoke(StoreItemRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // 画像の保存とURLの取得
        $item = DB::transaction(function () use ($request, $validated,) {
            
            // 画像ファイルをストレージに保存し、パスの配列を作る
            $imageFiles = $request->file('images') ?? [];
            $paths = [];
            foreach ( $imageFiles as $image) {
                $paths[] = $image->store('items', 'public');
                }
                
            // 商品の基本情報を登録（この時点では image_url は空でもOK）
            $item = Item::create([
                'user_id' => $request->user()->id,
                'name' => $validated['name'],
                'brand' => $validated['brand'] ?? null,
                'price' => $validated['price'],
                'description' => $validated['description'] ?? null,
                'image_url' => isset($paths[0]) ? Storage::url($paths[0]) : null, // 最初の画像を代表画像として保存
                'condition' => $validated['condition'],
                'status' => 'available',
            ]);

            // カテゴリーの保存
            $item->categories()->sync($validated['category_ids']);

            // 画像URLの保存（最初の画像を代表画像として保存）
            if(!empty($paths)) {
                $item->images()->createMany(array_map(fn($path) => [
                        'url' => Storage::url($path)
                    ], $paths)
                );
            }

            // 商品と関連データをロードして返す
            return $item->load(['categories', 'images']);
        });

        return response()->json([
            'message' => '商品が正常に出品されました。',
            'data' => $item,
        ], 201);
    }

}
