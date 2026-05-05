<?php

namespace Api\Tests\Feature\Api\Item;

use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UpdateItemControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function 出品者本人は商品情報を更新できる(): void
    {
        // テストユーザー、カテゴリ、商品を作成
        $user = User::factory()->create();
        $oldCategory = Category::factory()->create();
        $newCategory = Category::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'name' => '変更前の商品',
            'status' => 'available',
        ]);
        $item->categories()->attach($oldCategory->id);

        // 出品者として認証
        Sanctum::actingAs($user);

        // 商品情報更新のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}", [
            'name' => '変更後の商品',
            'brand' => '変更後ブランド',
            'color' => '白',
            'price' => 8000,
            'description' => '変更後の説明',
            'category_ids' => [$newCategory->id],
            'condition' => 3,
        ]);

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'message' => '商品情報を更新しました。',
                'data' => [
                    'id' => $item->id,
                    'name' => '変更後の商品',
                    'brand' => '変更後ブランド',
                    'color' => '白',
                    'price' => 8000,
                    'description' => '変更後の説明',
                    'condition' => 3,
                    'status' => 'available',
                ],
            ]);

        //  データベースのアサーション
        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'name' => '変更後の商品',
            'price' => 8000,
        ]);

        // カテゴリの更新が反映されていることをアサーション
        $this->assertDatabaseHas('category_item', [
            'item_id' => $item->id,
            'category_id' => $newCategory->id,
        ]);

        // 古いカテゴリとの紐付けが削除されていることをアサーション
        $this->assertDatabaseMissing('category_item', [
            'item_id' => $item->id,
            'category_id' => $oldCategory->id,
        ]);
    }

    #[Test]
    public function 取り下げ済み商品を更新すると再出品される(): void
    {
        // テストユーザー、カテゴリ、商品を作成
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'status' => 'withdrawn',
        ]);
        $item->categories()->attach($category->id);

        // 出品者として認証
        Sanctum::actingAs($user);

        // 商品情報更新のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}", [
            'name' => '再出品商品',
            'price' => 3000,
            'category_ids' => [$category->id],
            'condition' => 2,
        ]);

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJsonPath('data.status', 'available');

        // データベースのアサーション
        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'status' => 'available',
        ]);
    }

    #[Test]
    public function 出品者以外は商品情報を更新できない(): void
    {
        // テストユーザー、カテゴリ、商品を作成
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $owner->id,
            'name' => '変更されない商品',
        ]);

        // 出品者以外のユーザーとして認証
        Sanctum::actingAs($otherUser);

        // 商品情報更新のリクエストを送信
        $response = $this->postJson("/api/items/{$item->id}", [
            'name' => '不正な変更',
            'price' => 9000,
            'category_ids' => [$category->id],
            'condition' => 1,
        ]);

        // レスポンスのアサーション
        $response->assertForbidden();

        // データベースのアサーション（商品情報が変更されていないことを確認）
        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'name' => '変更されない商品',
        ]);
    }

    #[Test]
    public function 画像を送信した場合は既存画像を差し替える(): void
    {
        // ストレージをフェイクに設定
        Storage::fake('public');

        // テストユーザー、カテゴリ、商品を作成
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $item = Item::factory()->create([
            'user_id' => $user->id,
            'image_url' => '/storage/items/old.jpg',
        ]);
        $item->categories()->attach($category->id);
        $item->images()->create([
            'url' => '/storage/items/old.jpg',
        ]);

        // 出品者として認証
        Sanctum::actingAs($user);

        // 商品情報更新のリクエストを送信（新しい画像を含む）
        $response = $this->post("/api/items/{$item->id}", [
            'name' => '画像変更商品',
            'price' => 6000,
            'category_ids' => [$category->id],
            'condition' => 2,
            'images' => [
                $this->fakePng('new-item.png'),
            ],
        ]);

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJsonCount(1, 'data.images');

        $this->assertDatabaseMissing('images', [
            'item_id' => $item->id,
            'url' => '/storage/items/old.jpg',
        ]);

        $this->assertDatabaseHas('items', [
            'id' => $item->id,
            'name' => '画像変更商品',
        ]);

        $this->assertNotSame('/storage/items/old.jpg', $item->fresh()->image_url);
    }

    private function fakePng(string $name): UploadedFile
    {
        // 1x1ピクセルの透明なPNG画像を生成して返す
        return UploadedFile::fake()->createWithContent(
            $name,
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=')
        );
    }
}
