<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Services\Item\CommentService;

class DeleteCommentController extends Controller
{
    /*
    * 商品のコメントを削除するコントローラー
    */
    public function __invoke(Comment $comment, CommentService $service)
    {
        $service->delete(request()->user(), $comment);

        return response()->json([
            'success' => true,
        ]);
    }
}