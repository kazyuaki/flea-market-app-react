<?php

namespace App\Repositories;

use App\Models\Item;

class ItemRepository
{
    /*      
     * 商品一覧を取得するロジック
     */
    public function getItems(?int $userId, ?string $keyword)
    {
        return Item::query()
            ->where('status', '!=', 'withdrawn')
            ->when($userId, function ($query) use ($userId) {
                $query->where('user_id', '!=', $userId);
            })
            ->when($keyword, function ($query) use ($keyword) {
                $query->where('name', 'like', "%{$keyword}%");
            })
            ->get();
    }

    /*      
     * 商品を保存するロジック
     */
    public function createItem(array $data): Item
    {
        return Item::create($data);
    }

    /*      
    * 商品情報を編集するロジック
    */
    public function updateItem(Item $item, array $data): bool
    {
        return $item->update($data);
    }
}
