<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::upsert([
            ['id' => 1, 'name' => 'ファッション'],
            ['id' => 2, 'name' => '家電'],
            ['id' => 3, 'name' => 'インテリア'],
            ['id' => 4, 'name' => 'レディース'],
            ['id' => 5, 'name' => 'メンズ'],
            ['id' => 6, 'name' => 'コスメ'],
            ['id' => 7, 'name' => '本'],
            ['id' => 8, 'name' => 'ゲーム'],
            ['id' => 9, 'name' => 'おもちゃ'],
            ['id' => 10, 'name' => 'スポーツ'],
            ['id' => 11, 'name' => 'キッチン'],
            ['id' => 12, 'name' => 'ハンドメイド'],
            ['id' => 13, 'name' => 'アクセサリー'],
            ['id' => 14, 'name' => 'ベビー・キッズ'],
            ['id' => 15, 'name' => 'その他'],
        ], ['id'], ['name']);
    }
}
