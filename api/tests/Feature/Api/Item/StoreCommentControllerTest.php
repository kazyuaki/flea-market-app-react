<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class StoreCommentControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function ログインユーザーは商品にコメントを投稿できる(): void
    {
        // コメント投稿者となるユーザーを作成
        $user = User::factory()->create([
            'name' => 'コメント投稿者',
        ]);
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // コメント投稿者として認証
        Sanctum::actingAs($user);

        // コメント投稿のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/comments", [
            'content' => 'テストコメントです',
        ]);

        // レスポンスのアサーション
        $response->assertCreated()
            ->assertJson([
                'success' => true,
                'data' => [
                    'content' => 'テストコメントです',
                    'user' => [
                        'id' => $user->id,
                        'name' => 'コメント投稿者',
                        'profile_image_url' => $user->profile_image_url,
                    ],
                ],
            ]);

        // データベースにコメントが保存されたことをアサーション
        $this->assertDatabaseHas('comments', [
            'item_id' => $item->id,
            'user_id' => $user->id,
            'content' => 'テストコメントです',
        ]);
    }

    #[Test]
    public function 未ログインユーザーはコメントを投稿できない(): void
    {
        // 商品を作成
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // コメント投稿のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/comments", [
            'content' => 'テストコメントです',
        ]);

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }

    #[Test]
    public function コメント本文が空の場合はバリデーションエラーになる(): void
    {
        // コメント投稿者となるユーザーを作成
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // コメント投稿者として認証
        Sanctum::actingAs($user);

        // コメント投稿のリクエストを送信（contentが空）
        $response = $this->postJson("/api/items/{$item->id}/comments", [
            'content' => '',
        ]);

        // レスポンスのアサーション
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['content']);
    }
}
