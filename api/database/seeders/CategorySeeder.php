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
        Category::insert([
            ['id' => 1, 'name' => 'ファッション'],
            ['id' => 2, 'name' => '家電'],
            ['id' => 3, 'name' => '食品'],
            ['id' => 4, 'name' => '雑貨'],
        ]);
    }
}
