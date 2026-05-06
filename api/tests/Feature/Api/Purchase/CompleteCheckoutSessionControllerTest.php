<?php

namespace Api\Tests\Feature\Api\Purchase;

use App\Models\User;
use App\Services\Purchase\CheckoutService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Mockery\MockInterface;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CompleteCheckoutSessionControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function チェックアウトセッションを完了できる(): void
    {
        // ユーザーとセッションIDを用意
        $user = User::factory()->create();
        $sessionId = 'cs_test_123';

        // 認証
        Sanctum::actingAs($user);

        // CheckoutServiceのcompleteSessionメソッドが正しい引数で呼び出されることをモックで検証
        $this->mock(CheckoutService::class, function (MockInterface $mock) use ($user, $sessionId) {
            $mock->shouldReceive('completeSession')
                ->once()
                ->withArgs(fn (User $actualUser, string $actualSessionId) => $actualUser->is($user) && $actualSessionId === $sessionId)
                ->andReturnNull();
        });

        // APIリクエストを送信
        $response = $this->postJson('/api/purchase/checkout/complete', [
            'session_id' => $sessionId,
        ]);

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'message' => '購入が完了しました。',
            ]);
    }

    #[Test]
    public function セッションIDがない場合はバリデーションエラーになる(): void
    {
        // 認証
        Sanctum::actingAs(User::factory()->create());

        // APIリクエストを送信（session_idを省略）
        $response = $this->postJson('/api/purchase/checkout/complete', []);

        // レスポンスのアサーション
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['session_id']);
    }

    #[Test]
    public function 未ログインユーザーはチェックアウトセッションを完了できない(): void
    {
        // APIリクエストを送信（未認証）
        $response = $this->postJson('/api/purchase/checkout/complete', [
            'session_id' => 'cs_test_123',
        ]);

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }
}
