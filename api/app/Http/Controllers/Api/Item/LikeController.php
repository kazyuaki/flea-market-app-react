<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;    
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __invoke(Item $item)
    {
        Auth::user()->favorites()->detach($item->id);

        return response()->json([
            'success' => true,
            favorites_count => $item->favortes()->count(),
        ]);
    }
}