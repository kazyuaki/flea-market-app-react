<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class WithdrawItemControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function 出品者本人は商品を取り下げできる(): void
    {
        // テストユーザー、カテゴリ、商品を作成
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'status' => 'available',
        ]);
        $item->categories()->attach($category->id);

        // 出品者として認証
        Sanctum::actingAs($user);

        // 商品取り下げのリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/withdraw");

        //
        $response->assertOk()
            ->assertJson([
                'message' => '出品を取り下げました。',
                'data' => [
                    'id' => $item->id,
                    'status' => 'withdrawn',
                ],
            ]);

        // データベースのアサーション（商品ステータスがwithdrawnに更新されていることを確認）
        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'status' => 'withdrawn',
        ]);
    }

    #[Test]
    public function 出品者以外は商品を取り下げできない(): void
    {
        // テストユーザーと商品を作成
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $owner->id,
            'status' => 'available',
        ]);

        // 出品者以外のユーザーとして認証
        Sanctum::actingAs($otherUser);

        // 商品取り下げのリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/withdraw");

        // レスポンスのアサーション（403 Forbiddenを期待）
        $response->assertForbidden();

        // データベースのアサーション（商品ステータスが変更されていないことを確認）
        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'status' => 'available',
        ]);
    }

    #[Test]
    public function 売却済み商品は取り下げできない(): void
    {
        // テストユーザーと売却済み商品を作成
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'status' => 'sold',
        ]);

        // 出品者として認証
        Sanctum::actingAs($user);

        // 商品取り下げのリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/withdraw");

        // レスポンスのアサーション（409 Conflictを期待）
        $response->assertStatus(409);

        // データベースのアサーション（商品ステータスが変更されていないことを確認）
        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'status' => 'sold',
        ]);
    }

    #[Test]
    public function 未ログインユーザーは商品を取り下げできない(): void
    {
        // 商品を作成
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // 商品取り下げのリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}/withdraw");

        // レスポンスのアサーション（401 Unauthorizedを期待）
        $response->assertUnauthorized();
    }
}
