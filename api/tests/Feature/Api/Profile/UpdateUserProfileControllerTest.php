<?php

namespace Api\Tests\Feature\Api\Profile;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UpdateUserProfileControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function ログインユーザーはプロフィールを更新できる(): void
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'name' => '変更前ユーザー',
            'is_profile_set' => false,
        ]);

        // 認証
        Sanctum::actingAs($user);

        // プロフィールを更新
        $response = $this->postJson('/api/mypage/profile', [
            'name' => '変更後ユーザー',
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101',
            'phone_number' => '090-1234-5678',
        ]);

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJson([
                'message' => 'プロフィールが更新されました',
                'user' => [
                    'id' => $user->id,
                    'name' => '変更後ユーザー',
                    'postal_code' => '123-4567',
                    'address' => '東京都渋谷区1-2-3',
                    'building_name' => '渋谷ビル101',
                    'phone_number' => '090-1234-5678',
                    'is_profile_set' => true,
                ],
            ]);

        // データベースのアサーション
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => '変更後ユーザー',
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => '渋谷ビル101',
            'phone_number' => '090-1234-5678',
            'is_profile_set' => true,
        ]);
    }

    #[Test]
    public function 画像を送信した場合はプロフィール画像を保存できる(): void
    {
        // ストレージをモックして、ユーザーを作成
        Storage::fake('public');

        // プロフィール画像が未設定のユーザーを作成
        $user = User::factory()->create([
            'profile_image_url' => null,
        ]);

        // 認証
        Sanctum::actingAs($user);

        // プロフィールを更新（画像を送信）
        $response = $this->post('/api/mypage/profile', [
            'name' => '画像ありユーザー',
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => null,
            'phone_number' => '090-1234-5678',
            'image' => $this->fakePng('profile.png'),
        ]);

        // レスポンスのアサーション
        $response->assertOk()
            ->assertJsonPath('user.name', '画像ありユーザー');

        //  プロフィール画像の保存とユーザーレコードの更新をアサート
        $updatedUser = $user->fresh();

        // プロフィール画像のURLが保存されていることをアサート
        $this->assertNotNull($updatedUser->profile_image_url);
        $this->assertTrue(Storage::disk('public')->exists($updatedUser->profile_image_url));
    }

    #[Test]
    public function 画像を差し替える場合は古いプロフィール画像を削除できる(): void
    {
        // ストレージをモックして、ユーザーを作成
        Storage::fake('public');
        Storage::disk('public')->put('profiles/old.png', 'old-image');

        // プロフィール画像が設定されたユーザーを作成
        $user = User::factory()->create([
            'profile_image_url' => 'profiles/old.png',
        ]);

        // 認証
        Sanctum::actingAs($user);

        // プロフィールを更新（新しい画像を送信）
        $response = $this->post('/api/mypage/profile', [
            'name' => '画像差し替えユーザー',
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'building_name' => null,
            'phone_number' => '090-1234-5678',
            'image' => $this->fakePng('new-profile.png'),
        ]);

        // レスポンスのアサーション
        $response->assertOk();

        // 新しい画像が保存されていることをアサート
        $updatedUser = $user->fresh();

        // 古い画像が削除されていることをアサート
        $this->assertFalse(Storage::disk('public')->exists('profiles/old.png'));
        $this->assertNotSame('profiles/old.png', $updatedUser->profile_image_url);
        $this->assertTrue(Storage::disk('public')->exists($updatedUser->profile_image_url));
    }

    #[Test]
    public function 未ログインユーザーはプロフィールを更新できない(): void
    {
        // APIリクエスト（未認証）
        $response = $this->postJson('/api/mypage/profile', [
            'name' => '未ログインユーザー',
            'postal_code' => '123-4567',
            'address' => '東京都渋谷区1-2-3',
            'phone_number' => '090-1234-5678',
        ]);

        // レスポンスのアサーション
        $response->assertUnauthorized();
    }

    #[Test]
    public function 必須項目が不足している場合はバリデーションエラーになる(): void
    {
        // 認証されたユーザーを作成
        Sanctum::actingAs(User::factory()->create());

        // APIリクエスト（必須項目なし）
        $response = $this->postJson('/api/mypage/profile', []);

        // レスポンスのアサーション
        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'name',
                'postal_code',
                'address',
                'phone_number',
            ]);
    }

    #[Test]
    public function 郵便番号の形式が正しくない場合はバリデーションエラーになる(): void
    {
        // 認証されたユーザーを作成
        Sanctum::actingAs(User::factory()->create());

        // APIリクエスト（郵便番号の形式が不正）
        $response = $this->postJson('/api/mypage/profile', [
            'name' => 'テストユーザー',
            'postal_code' => '1234567',
            'address' => '東京都渋谷区1-2-3',
            'phone_number' => '090-1234-5678',
        ]);

        // レスポンスのアサーション
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['postal_code']);
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
