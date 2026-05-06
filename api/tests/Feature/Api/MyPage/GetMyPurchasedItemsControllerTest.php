<?php

namespace Api\Tests\Feature\Api\MyPage;

use App\Models\Category;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GetMyPurchasedItemsControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function ログインユーザーの購入した商品一覧を取得できる(): void
    {
        // ログインユーザーと他のユーザー、カテゴリーを作成
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();

        // ログインユーザーが購入した商品を作成して、カテゴリーと画像を紐付け
        $purchasedItem = Item::factory()->create([
            'name' => '購入した商品',
            'status' => 'sold',
        ]);
        $purchasedItem->categories()->attach($category->id);
        $purchasedItem->images()->create([
            'url' => '/storage/items/purchased-item.jpg',
        ]);

        // 購入履歴を作成
        Transaction::create([
            'item_id' => $purchasedItem->id,
            'user_id' => $user->id,
        ]);

        // 他のユーザーが購入した商品を作成
        $otherPurchasedItem = Item::factory()->create([
            'name' => '他人が購入した商品',
            'status' => 'sold',
        ]);
        Transaction::create([
            'item_id' => $otherPurchasedItem->id,
            'user_id' => $otherUser->id,
        ]);

        // 未購入の商品を作成
        Item::factory()->create([
            'name' => '未購入の商品',
            'status' => 'available',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // APIリクエスト
        $response = $this->getJson('/api/mypage/purchases');

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'message' => 'My purchased items',
            ])
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $purchasedItem->id)
            ->assertJsonPath('data.0.name', '購入した商品')
            ->assertJsonCount(1, 'data.0.categories')
            ->assertJsonCount(1, 'data.0.images');
    }

    #[Test]
    public function 購入履歴がない場合は空配列を返す(): void
    {
        // ログインユーザーを作成
        Sanctum::actingAs(User::factory()->create());

        // 未購入の商品を作成
        Item::factory()->create([
            'name' => '未購入の商品',
            'status' => 'available',
        ]);

        // APIリクエスト
        $response = $this->getJson('/api/mypage/purchases');

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJsonCount(0, 'data');
    }

    #[Test]
    public function 未ログインユーザーは購入した商品一覧を取得できない(): void
    {
        // APIリクエスト（未認証）
        $response = $this->getJson('/api/mypage/purchases');

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }
}
