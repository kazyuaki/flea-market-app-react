<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UpdateItemController extends Controller
{
    /**
     * 出品者本人が商品の情報を更新するコントローラ
     */
    public function __invoke(StoreItemRequest $request, Item $item): JsonResponse
    {
        if ($item->user_id !== $request->user()->id) {
            abort(403, 'この商品は編集できません。');
        }

        $validated = $request->validated();

        $item = DB::transaction(function () use ($request, $validated, $item) {
            $data = [
                'name' => $validated['name'],
                'brand' => $validated['brand'] ?? null,
                'color' => $validated['color'] ?? null,
                'price' => $validated['price'],
                'description' => $validated['description'] ?? null,
                'condition' => $validated['condition'],
            ];

            if ($item->status === 'withdrawn') {
                $data['status'] = 'available';
            }

            $item->update($data);

            $item->categories()->sync($validated['category_ids']);

            $imageFiles = $request->file('images') ?? [];
            $paths = [];
            foreach ($imageFiles as $image) {
                $paths[] = $image->store('items', 'public');
            }

            if (!empty($paths)) {
                $item->images()->delete();
                $item->images()->createMany(array_map(fn ($path) => [
                    'url' => Storage::url($path),
                ], $paths));

                $item->update([
                    'image_url' => Storage::url($paths[0]),
                ]);
            }

            return $item
                ->load(['categories', 'images', 'comments.user', 'user:id,name,profile_image_url'])
                ->loadCount(['favorites', 'comments']);
        });

        return response()->json([
            'message' => '商品情報を更新しました。',
            'data' => $item,
        ]);
    }
}
