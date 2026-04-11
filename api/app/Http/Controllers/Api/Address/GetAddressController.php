<?php

namespace App\Http\Controllers\Api\Address;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GetAddressController extends Controller
{
    public function __invoke()
    {
        // 認証されたユーザーを取得。認証されていない場合は最初のユーザーを取得（テスト用）
        $user = Auth::user() ?? User::first(); 

        return response()->json([
            'postal_code' => $user->postal_code,
            'address' => $user->address,
            'building_name' => $user->building_name,
        ]);
    }
}
