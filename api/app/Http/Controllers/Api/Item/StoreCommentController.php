<?php

namespace App\Http\Controllers\Api\Item;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Item;
use App\Services\Item\CommentService;
use Illuminate\Http\Request;

class StoreCommentController extends Controller
{
    public function __invoke(
        StoreCommentRequest $request,
        Item $item,
        CommentService $itemCommentService
    ){     
        $comment = $itemCommentService->store(
            $request->user(),
            $item,
            $request->input('content')
        );

        $comment->load('user');

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $comment->id,
                'content' => $comment->content,
                'user' => [
                    'id'=> $comment->user->id,
                    'name' => $comment->user->name,
                    'profile_image_url' => $comment->user->profile_image_url,
                ],
                'created_at' => $comment->created_at->toDateTimeString(),
            ]
        ], 201);
    }
}
