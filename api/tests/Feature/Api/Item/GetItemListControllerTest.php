<?php

namespace Api\Tests\Feature\Api\Item;

use Tests\TestCase;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class GetItemListControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function 商品一覧を取得できる(): void
    {
        // 3件の商品を作成
        Item::factory()->count(3)->create([
            'status' => 'available',
        ]);

        $response = $this->getJson('/api/items');

        $response->assertOk()
            ->assertJson([
                'message' => '商品一覧の取得に成功しました',
            ])
            ->assertJsonCount(3, 'items');
    }

    #[Test]
    public function ログインユーザー自身の商品は一覧に表示されない(): void
    {
        // ログインユーザーを作成
        $user = User::factory()->create();

        // ログインユーザーの商品を作成
        Item::factory()->create([
            'user_id' => $user->id,
            'status' => 'available',
        ]);

        // 他のユーザーの商品を作成
        Item::factory()->count(2)->create([
            'status' => 'available',
        ]);

        $response = $this->actingAs($user)->getJson('/api/items');

        $response->assertOk()
            ->assertJsonCount(2, 'items');
    }

    #[Test]
    public function 取り消し済み商品は一覧に表示されない(): void
    {
        // 取り消し済みの商品を作成
        Item::factory()->create([
            'status' => 'withdrawn',
        ]);

        // 取り消しされていない商品を作成
        Item::factory()->count(2)->create([
            'status' => 'available',
        ]);

        $response = $this->getJson('/api/items');

        $response->assertOk()
            ->assertJsonCount(2, 'items');
    }

    #[Test]
    public function キーワード検索で商品を絞り込める(): void
    {
        // 商品を作成
        Item::factory()->create([
            'name' => '赤いシャツ',
            'status' => 'available',
        ]);

        Item::factory()->create([
            'name' => '青いシャツ',
            'status' => 'available',
        ]);

        Item::factory()->create([
            'name' => '緑のシャツ',
            'status' => 'available',
        ]);

        $response = $this->getJson('/api/items?keyword=赤い');

        $response->assertOk()
            ->assertJsonCount(1, 'items')
            ->assertJsonFragment(['name' => '赤いシャツ']);
    }
}