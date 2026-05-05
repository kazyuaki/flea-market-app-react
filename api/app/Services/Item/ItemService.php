<?php

namespace App\Services\Item;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use App\Repositories\ItemRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ItemService
{
    public function __construct(protected ItemRepository $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    /**
     * 商品一覧を取得するロジック
     */
    public function getItemList(?int $userId, ?string $keyword)
    {
        return $this->itemRepository->getItems($userId, $keyword);
    }

    /**
     * 商品を出品するロジック
     * @param array<int, UploadedFile> $imageFiles
     */
    public function storeItem(User $user, array $validated, array $imageFiles): Item
    {
        return DB::transaction(function () use ($user, $validated, $imageFiles) {

            $paths = $this->storeImages($imageFiles);

            // 商品の基本情報を登録（この時点では image_url は空でもOK）
            $item = $this->itemRepository->createItem([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'brand' => $validated['brand'] ?? null,
                'color' => $validated['color'] ?? null,
                'price' => $validated['price'],
                'description' => $validated['description'] ?? null,
                'image_url' => isset($paths[0]) ? Storage::url($paths[0]) : null,
                'condition' => $validated['condition'],
                'status' => 'available',
            ]);

            // カテゴリーの保存
            $item->categories()->sync($validated['category_ids']);

            // 画像URLの保存（最初の画像を代表画像として保存）
            if (!empty($paths)) {
                $item->images()->createMany(array_map(fn ($path) => [
                    'url' => Storage::url($path),
                ], $paths));
            }
            // 商品と関連データをロードして返す
            return $item->load(['categories', 'images']);
        });
    }

    /**
     * 画像をストレージに保存し、そのパスを返す
     * @param array<int, UploadedFile> $imageFiles
     * @return array<int, string>
     */
    private function storeImages(array $imageFiles): array
    {
        $paths = [];
        foreach ($imageFiles as $image) {
            $paths[] = $image->store('items', 'public');
        }
        return $paths;
    }

    /*
    * 商品情報を編集するロジック
    */
    public function updateItem(User $user, Item $item, array $validated, array $imageFiles): Item
    {
        if ($item->user_id !== $user->id) {
            abort(403, 'この商品は編集できません。');
        }

        return DB::transaction(function () use ($item, $validated, $imageFiles) {
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

            $this->itemRepository->updateItem($item, $data);

            $item->categories()->sync($validated['category_ids']);

            if (!empty($imageFiles)) {
                $paths = $this->storeImages($imageFiles);
                // 既存の画像を削除
                $item->images()->delete();
                // 新しい画像を保存
                $item->images()->createMany(array_map(fn ($path) => [
                    'url' => Storage::url($path),
                ], $paths));
                // 代表画像を更新
                $item->itemRepository->updateItem($item,[
                    'image_url' => Storage::url($paths[0]),
                ]);
            }

            return $item
                ->load(['categories', 'images', 'comments.user', 'user:id,name,profile_image_url'])
                ->loadCount(['favorites', 'comments']);
        });

    }
}
