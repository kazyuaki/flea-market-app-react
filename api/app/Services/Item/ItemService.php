<?php

namespace App\Services\Item;

use App\Repositories\ItemRepository;

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
}
