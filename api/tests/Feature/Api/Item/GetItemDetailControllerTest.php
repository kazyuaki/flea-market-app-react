<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Category;
use App\Models\Comment;
use Tests\TestCase;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class GetItemDetailControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test] 
    public function 商品詳細を取得できる():void
    {
        // テスト用のユーザーとカテゴリーを作成
        $user = User::factory()->create();
        $category = Category::factory()->create();

        // テスト用の商品を作成し、カテゴリーを紐付け
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'name' => 'テスト商品',
            'status' => 'available',
        ]);

        $item->categories()->attach($category->id);

        // 商品詳細APIを呼び出す
        $response = $this->getJson("/api/items/{$item->id}");

        // レスポンスの検証
        $response->assertOk()
            ->assertJson([
                'message' => 'Item detail',
                'data' => [
                    'id' => $item->id,
                    'name' => 'テスト商品',
                    'status' => 'available',
                    'categories' => [
                        [
                            'id' => $category->id,
                            'name' => $category->name,
                        ],
                    ],
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'profile_image_url' => $user->profile_image_url,
                    ],
                ],
            ]);
    }

     #[Test]
    public function 商品詳細にカテゴリー情報が含まれる(): void
    {
        // カテゴリーを作成
        $category = Category::factory()->create([
            'name' => 'ファッション',
        ]);

        // 商品を作成し、カテゴリーを紐付け
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        $item->categories()->attach($category->id);

        // 商品詳細APIを呼び出す
        $response = $this->getJson("/api/items/{$item->id}");

        // レスポンスの検証
        $response->assertOk()
            ->assertJsonFragment([
                'name' => 'ファッション',
            ]);
    }

    #[Test]
    public function 商品詳細にコメントとコメント投稿者情報が含まれる(): void
    {
        // コメント投稿者を作成
        $commentUser = User::factory()->create([
            'name' => 'コメントユーザー',
        ]);

        // 商品を作成
        $item = Item::factory()->create([
            'status' => 'available',
        ]);

        // コメントを作成し、商品とコメント投稿者を紐付け
        Comment::factory()->create([
            'item_id' => $item->id,
            'user_id' => $commentUser->id,
            'content' => 'テストコメント',
        ]);

        // 商品詳細APIを呼び出す
        $response = $this->getJson("/api/items/{$item->id}");

        // レスポンスの検証
        $response->assertOk()
            ->assertJsonPath('data.comments.0.content', 'テストコメント')
            ->assertJsonPath('data.comments.0.user.name', 'コメントユーザー');
    }

    #[Test]
    public function 存在しない商品IDの場合は404を返す(): void
    {
        // 存在しない商品IDで商品詳細APIを呼び出す
        $response = $this->getJson('/api/items/999999');
        // レスポンスの検証
        $response->assertNotFound();
    }
}
