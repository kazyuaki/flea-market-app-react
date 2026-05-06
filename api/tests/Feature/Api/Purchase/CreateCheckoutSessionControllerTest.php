<?php

namespace Api\Tests\Feature\Api\Purchase;

use App\Models\Item;
use App\Models\User;
use App\Services\Purchase\CheckoutService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Mockery\MockInterface;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CreateCheckoutSessionControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function チェックアウトセッションを作成できる(): void
    {
        // ユーザーと商品を用意
        $user = User::factory()->create();
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // CheckoutServiceのcreateSessionメソッドが正しい引数で呼び出されることをモックで検証
        $this->mock(CheckoutService::class, function (MockInterface $mock) use ($user, $item) {
            $mock->shouldReceive('createSession')
                ->once()
                ->withArgs(fn (User $actualUser, int $itemId) => $actualUser->is($user) && $itemId === $item->id)
                ->andReturn('https://checkout.stripe.test/session');
        });

        // APIリクエストを送信
        $response = $this->postJson("/api/purchase/{$item->id}/checkout");

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'checkout_url' => 'https://checkout.stripe.test/session',
            ]);
    }

    #[Test]
    public function 未ログインユーザーはチェックアウトセッションを作成できない(): void
    {
        // 商品を用意
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // APIリクエストを送信（未認証）
        $response = $this->postJson("/api/purchase/{$item->id}/checkout");

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }
}
