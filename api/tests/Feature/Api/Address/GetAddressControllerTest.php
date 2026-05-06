<?php

namespace Api\Tests\Feature\Api\Address;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GetAddressControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test] 
    public function ログインユーザーの住所情報を取得できる(): void
    {
        // テストユーザーを作成して認証
        $user = User::factory()->create([
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101'
        ]);

        // 認証
        Sanctum::actingAs($user);

        // 住所情報取得のリクエストを送信
        $response = $this->getJson(('/api/purchase/address'));

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'postal_code' => '123-4567',
                'address' => '東京都渋谷区1-2-3',
                'building_name' => '渋谷ビル101'
            ]);
    }

        #[Test]

    public function 未ログイン時は401エラーを返す(): void
    {
        // 住所情報取得のリクエストを送信（未ログイン）
        $response = $this->getJson('/api/purchase/address');

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }
}
