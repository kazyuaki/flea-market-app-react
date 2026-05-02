<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;    
use App\Models\Item;
use App\Services\Item\LikeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __invoke(Item $item, LikeService $likeService)
    {
        $user = Auth::user();
      
        $result = $likeService->toggleLike($user, $item);

        return response()->json([
            'success' => true,
            'data'=> $result,
        ]);
    }
}