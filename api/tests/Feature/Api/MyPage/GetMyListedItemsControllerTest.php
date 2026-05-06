<?php

namespace Api\Tests\Feature\Api\MyPage;

use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GetMyListedItemsControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function ログインユーザーの出品した商品一覧を取得できる(): void
    {
        // ログインユーザーとカテゴリーを作成
        $user = User::factory()->create();
        $category = Category::factory()->create();

        // ログインユーザーの出品商品を作成して、カテゴリーと画像を紐付け
        $myItem = Item::factory()->create([
            'user_id' => $user->id,
            'name' => '自分の出品商品',
            'status' => 'available',
        ]);
        $myItem->categories()->attach($category->id);
        $myItem->images()->create([
            'url' => '/storage/items/my-item.jpg',
        ]);

        // 他のユーザーの出品商品を作成
        Item::factory()->create([
            'name' => '他人の出品商品',
            'status' => 'available',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // APIリクエスト
        $response = $this->getJson('/api/mypage/listed');

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'message' => 'My listed items',
            ])
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $myItem->id)
            ->assertJsonPath('data.0.name', '自分の出品商品')
            ->assertJsonCount(1, 'data.0.categories')
            ->assertJsonCount(1, 'data.0.images');
    }

    #[Test]
    public function 取り下げ済みの商品も自分の出品一覧に含まれる(): void
    {
        // ログインユーザーを作成
        $user = User::factory()->create();
        Item::factory()->create([
            'user_id' => $user->id,
            'name' => '取り下げ済み商品',
            'status' => 'withdrawn',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // APIリクエスト
        $response = $this->getJson('/api/mypage/listed');

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', '取り下げ済み商品')
            ->assertJsonPath('data.0.status', 'withdrawn');
    }

    #[Test]
    public function 未ログインユーザーは出品した商品一覧を取得できない(): void
    {
        // APIリクエスト（未認証）
        $response = $this->getJson('/api/mypage/listed');

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }
}
