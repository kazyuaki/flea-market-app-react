<?php

namespace Api\Tests\Feature\Api\Purchase;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GetPurchaseItemControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function 購入する商品情報とログインユーザーの配送先情報を取得できる(): void
    {
        // ユーザーと商品を用意
        $user = User::factory()->create([
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101',
            'phone_number' => '090-1234-5678',
        ]);
        $item = Item::factory()->create([
            'name' => '購入対象商品',
            'status' => 'available',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // APIリクエストを送信
        $response = $this->getJson("/api/purchase/{$item->id}");

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'item' => [
                    'id' => $item->id,
                    'name' => '購入対象商品',
                    'status' => 'available',
                ],
                'user' => [
                    'postal_code' => '123-4567',
                    'address' => '東京都渋谷区1-2-3',
                    'building_name' => '渋谷ビル101',
                    'phone_number' => '090-1234-5678',
                ],
            ]);
    }

    #[Test]
    public function 自分の商品は購入情報を取得できない(): void
    {
        // ユーザーと商品を用意
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'status' => 'available',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // APIリクエストを送信
        $response = $this->getJson("/api/purchase/{$item->id}");

        // レスポンスのアサーション
        $response->assertForbidden();
    }

    #[Test]
    public function 購入できない状態の商品は409エラーを返す(): void
    {
        // ユーザーと商品を用意
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'status' => 'sold',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // APIリクエストを送信
        $response = $this->getJson("/api/purchase/{$item->id}");

        // レスポンスのアサーション
        $response->assertStatus(409);
    }

    #[Test]
    public function 未ログインユーザーは購入情報を取得できない(): void
    {
        // 商品を用意
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // APIリクエストを送信（未認証）
        $response = $this->getJson("/api/purchase/{$item->id}");

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }

    #[Test]
    public function 存在しない商品は404を返す(): void
    {
        // ユーザーを用意
        Sanctum::actingAs(User::factory()->create());

        // APIリクエストを送信（存在しない商品ID）
        $response = $this->getJson('/api/purchase/999999');

        // レスポンスのアサーション
        $response->assertNotFound();
    }
}
