<?php

namespace App\Http\Controllers\Api\Address;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAddressRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UpdateAddressController extends Controller
{
    public function __invoke(UpdateAddressRequest $request)
    {
        $user = Auth::user() ?? User::first();

        // バリデーションはUpdateAddressRequestで行われるため、ここでは直接更新処理を行う
        $user->update([
            'postal_code' => $request->postal_code,
            'address' => $request->address,
            'building_name' => $request->building_name,
        ]);

        return response()->json([
            'message' => '配送先情報が更新されました。',
        ]);
    }
}