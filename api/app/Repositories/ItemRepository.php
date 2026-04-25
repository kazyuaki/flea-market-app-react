<?php

namespace App\Repositories;

use App\Models\Item;

class ItemRepository
{
    // 自分の商品以外を取得するクエリ
    public function getItems(?int $userId, ?string $keyword)
    {
        return Item::query()
            ->when($userId, function ($query) use ($userId) {
                $query->where('user_id', '!=', $userId);
            })
            ->when($keyword, function ($query) use ($keyword) {
                $query->where('name', 'like', "%{$keyword}%");
            })
            ->get();
    }
}
