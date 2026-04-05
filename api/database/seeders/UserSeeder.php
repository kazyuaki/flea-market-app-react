<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 管理者
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        // sellerA
        User::create([
            'name' => 'Seller A',
            'email' => 'sellerA@example.com',
            'password' => Hash::make('password'),
        ]);

        // sellerB
        User::create([
            'name' => 'Seller B',
            'email' => 'sellerB@example.com',
            'password' => Hash::make('password'),
        ]);

        // viewer
        User::create([
            'name' => 'Viewer',
            'email' => 'viewer@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
