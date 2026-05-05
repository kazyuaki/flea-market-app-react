<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class FavoriteControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function 商品をお気に入り登録できる(): void
    {
        // テストユーザーと商品を作成
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // ユーザーとして認証
        Sanctum::actingAs($user);

        // お気に入り登録のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/favorite");

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'success' => true,
                'data' => [
                    'is_favorited' => true,
                    'favorites_count' => 1,
                ],
            ]);

        // データベースにお気に入りが登録されたことをアサーション
        $this->assertDatabaseHas('favorites', [
            'item_id' => $item->id,
            'user_id' => $user->id,
        ]);
    }

    #[Test]
    public function お気に入り済みの商品は再度実行すると解除される(): void
    {
        // テストユーザーと商品を作成
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'status' => 'available',
        ]);
        $user->favorites()->attach($item->id);

        // ユーザーとして認証
        Sanctum::actingAs($user);

        // お気に入り解除のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/favorite");

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'success' => true,
                'data' => [
                    'is_favorited' => false,
                    'favorites_count' => 0,
                ],
            ]);

        // データベースからお気に入りが削除されたことをアサーション
        $this->assertDatabaseMissing('favorites', [
            'item_id' => $item->id,
            'user_id' => $user->id,
        ]);
    }

    #[Test]
    public function 未ログインユーザーはお気に入りを更新できない(): void
    {
        // 商品を作成
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // お気に入り登録のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/favorite");

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }
}
