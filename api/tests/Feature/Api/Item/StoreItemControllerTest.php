<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class StoreItemControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function ログインユーザーは商品を出品できる(): void
    {
        Storage::fake('public');

        // テストユーザーとカテゴリを作成
        $user = User::factory()->create();
        $category = Category::factory()->create();
        Sanctum::actingAs($user);

        // 商品出品のリクエストを送信
        $response = $this->post('/api/items', [
            'name' => 'テスト商品',
            'brand' => 'テストブランド',
            'color' => '黒',
            'price' => 5000,
            'description' => 'テスト説明',
            'category_ids' => [$category->id],
            'condition' => 2,
            'images' => [
                $this->fakePng('item.png'),
            ],
        ]);

        // レスポンスのアサーション
        $response->assertCreated()
            ->assertJson([
                'message' => '商品が正常に出品されました。',
                'data' => [
                    'name' => 'テスト商品',
                    'brand' => 'テストブランド',
                    'color' => '黒',
                    'price' => 5000,
                    'description' => 'テスト説明',
                    'condition' => 2,
                    'status' => 'available',
                ],
            ])
            ->assertJsonCount(1, 'data.categories')
            ->assertJsonCount(1, 'data.images');

        // 出力された商品IDを取得
        $itemId = $response->json('data.id');

        // データベースのアサーション
        $this->assertDatabaseHas('items', [
            'id' => $itemId,
            'user_id' => $user->id,
            'name' => 'テスト商品',
            'status' => 'available',
        ]);

        // 中間テーブルと画像のアサーション
        $this->assertDatabaseHas('category_item', [
            'item_id' => $itemId,
            'category_id' => $category->id,
        ]);

        // 画像のアサーション
        $this->assertDatabaseCount('images', 1);
    }

    #[Test]
    public function 未ログインユーザーは商品を出品できない(): void
    {
        // カテゴリを作成
        $category = Category::factory()->create();

        // 商品出品のリクエストを送信
        $response = $this->postJson('/api/items', [
            'name' => 'テスト商品',
            'price' => 5000,
            'category_ids' => [$category->id],
            'condition' => 2,
        ]);

        $response->assertUnauthorized();
    }

    #[Test]
    public function 必須項目が不足している場合はバリデーションエラーになる(): void
    {
        // ログインユーザーを作成して認証
        Sanctum::actingAs(User::factory()->create());

        // 商品出品のリクエストを送信（必須項目を空にする）
        $response = $this->postJson('/api/items', []);

        // バリデーションエラーのアサーション
        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'name',
                'price',
                'category_ids',
                'condition',
            ]);
    }

    private function fakePng(string $name): UploadedFile
    {
        // 1x1ピクセルのPNG画像を作成して返す
        return UploadedFile::fake()->createWithContent(
            $name,
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=')
        );
    }
}
