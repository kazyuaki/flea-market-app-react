<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class StoreCommentController extends Controller
{
    public function __invoke(StoreCommentRequest $request, Item $item)
    {
        // 仮実装: ユーザーIDは固定で1、ユーザー名も固定
        $comment = $item->comments()->create([
            'user_id' => 1,
            'content' => $request->description,
            
        ]);

        return response()->json([
            'id' => $comment->id,
            'content' => $comment->content,
            'user' => [
                'name' => 'テストユーザー',
            ],
            'created_at' => $comment->created_at->toDateTimeString(),
        ]);
    }
}
