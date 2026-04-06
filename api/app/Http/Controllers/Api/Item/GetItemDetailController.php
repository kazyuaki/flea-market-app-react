<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class GetItemDetailController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $item = Item::with([
            'categories',
            'comments.user', // コメントとそのユーザー情報を一緒に取得
        ])
            ->withCount(['favorites', 'comments'])
            ->findOrFail($id);

        return response()->json([
            'message' => 'Item detail',
            'data' => $item,
        ]);
    }
}
