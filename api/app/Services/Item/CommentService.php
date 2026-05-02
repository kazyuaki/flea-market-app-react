<?php

namespace App\Services\Item;

use App\Models\Comment;
use App\Models\Item;
use App\Models\User;


class CommentService
{
    public function store(User $user, Item $item, string $content): Comment
    {
        return $item->comments()->create([
            "user_id" => $user->id,
            "content" => $content,
        ]);
    }

    public function delete(User $user, Comment $comment): void
    {
        if ($comment->user_id !== $user->id) {
            abort(403, '削除権限がありません');
        }

        $comment->delete();
    }

}