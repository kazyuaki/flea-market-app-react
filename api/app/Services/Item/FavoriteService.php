<?php

namespace App\Services\Item;

use App\Models\Item;
use App\Models\User;

class FavoriteService
{
    /** 
     * ユーザーがお気に入り登録した商品を取得し、既にお気に入り登録されているかどうかを確認
     * @param User $user
     * @param Item $item
     */
    public function toggleFavorite(User $user, Item $item)
    {
        if ($user->favorites()->whereKey($item->id)->exists()) {
            $user->favorites()->detach($item->id);
            $is_favorited = false;
        } else {
            $user->favorites()->attach($item->id);
            $is_favorited = true;
        }

        return [
            'is_favorited' => $is_favorited,
            'favorites_count' => $item->favorites()->count(),
        ];
    }
}
