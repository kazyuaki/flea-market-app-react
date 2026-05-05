<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Comment;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DeleteCommentControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function コメント投稿者本人はコメントを削除できる(): void
    {
        // テストユーザー、商品、コメントを作成
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'status' => 'available',
        ]);
        $comment = Comment::factory()->create([
            'item_id' => $item->id,
            'user_id' => $user->id,
            'content' => '削除するコメント',
        ]);

        // コメント投稿者として認証
        Sanctum::actingAs($user);

        // コメント削除のリクエストを送信
        $response = $this->deleteJson("/api/comments/{$comment->id}");

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        // コメントがデータベースから削除されたことをアサーション
        $this->assertDatabaseMissing('comments', [
            'id' => $comment->id,
        ]);
    }

    #[Test]
    public function コメント投稿者以外はコメントを削除できない(): void
    {
        // コメント投稿者と別のユーザーを作成
        $commentUser = User::factory()->create();
        $otherUser = User::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $commentUser->id,
            'content' => '削除されないコメント',
        ]);

        // 別のユーザーとして認証
        Sanctum::actingAs($otherUser);

        // コメント削除のリクエストを送信
        $response = $this->deleteJson("/api/comments/{$comment->id}");

        // レスポンスのアサーション
        $response->assertForbidden();

        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
            'content' => '削除されないコメント',
        ]);
    }

    #[Test]
    public function 未ログインユーザーはコメントを削除できない(): void
    {
        // コメントを作成
        $comment = Comment::factory()->create();

        // コメント削除のリクエストを送信
        $response = $this->deleteJson("/api/comments/{$comment->id}");

        $response->assertUnauthorized();
    }

    #[Test]
    public function 存在しないコメントを削除しようとすると404を返す(): void
    {
        // ログインユーザーを作成して認証
        Sanctum::actingAs(User::factory()->create());

        // 存在しないコメントIDで削除のリクエストを送信
        $response = $this->deleteJson('/api/comments/999999');

        // 404 Not Foundのアサーション
        $response->assertNotFound();
    }
}
