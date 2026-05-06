<?php

namespace Api\Tests\Feature\Api\Address;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UpdateAddressControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function ログインユーザーの住所情報を更新できる(): void
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'postal_code' => '111-1111',
            'address' => '変更前住所',
            'building_name' => '変更前建物',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // 住所情報を更新
        $response = $this->postJson('/api/purchase/address', [
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101',
        ]);

        $response->assertOk()
            ->assertJson([
                'message' => '配送先情報が更新されました。',
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101',
        ]);
    }

    #[Test]
    public function 建物名は未入力でも住所情報を更新できる(): void
    {
        $user = User::factory()->create([
            'building_name' => '変更前建物',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/purchase/address', [
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => null,
        ]);

        $response->assertOk();

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => null,
        ]);
    }

    #[Test]
    public function 未ログイン時は401エラーを返す(): void
    {
        $response = $this->postJson('/api/purchase/address', [
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101',
        ]);

        $response->assertUnauthorized();
    }

    #[Test]
    public function 郵便番号の形式が正しくない場合はバリデーションエラーになる(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/purchase/address', [
            'postal_code' => '1234567',
            'address' => '東京都渋谷区1-2-3',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['postal_code']);
    }

    #[Test]
    public function 住所が未入力の場合はバリデーションエラーになる(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/purchase/address', [
            'postal_code' => '123-4567',
            'address' => '',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['address']);
    }
}
