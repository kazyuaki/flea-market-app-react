<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;    
use App\Models\Item;
use App\Models\User;
use App\Services\Item\FavoriteService;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /*
     * 商品のお気に入り登録・解除を行うコントローラー
     */
    public function __invoke(Item $item, FavoriteService $favoriteService)
    {
        /** @var User $user */
        $user = Auth::user();
      
        $result = $favoriteService->toggleFavorite($user, $item);

        return response()->json([
            'success' => true,
            'data'=> $result,
        ]);
    }
}
