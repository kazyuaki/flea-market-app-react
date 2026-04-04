<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $items = Item::query()
            ->when($user, function($query) use ($user) {
                // ログインユーザー以外のアイテムを取得
                $query->where('user_id', '!=', $user->id);
            })
            ->get();

        return response()->json([
            'message' => 'Item index',
            'data' => $items,
        ]);
    }
}
