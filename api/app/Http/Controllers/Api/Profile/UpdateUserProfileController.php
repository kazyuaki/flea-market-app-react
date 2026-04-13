<?php

namespace App\Http\Controllers\Api\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserProfileRequest;
use Illuminate\Support\Facades\Storage;

class UpdateUserProfileController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdateUserProfileRequest $request)
    {
        $user = $request->user();

        $data = $request->validated();

        // 画像があれば保存
        if ($request->hasFile('image')) {
            // 古い画像があれば削除（任意だけどおすすめ）
            if ($user->profile_image_url) {
                Storage::disk('public')->delete($user->profile_image_url);
            }

            // 新しい画像を保存
            $path = $request->file('image')->store('profiles', 'public');

            $data['profile_image_url'] = $path;
        }

        $data['is_profile_set'] = true;

        $user->update($data);

        return response()->json([
            'message' => 'プロフィールが更新されました',
            'user' => $user,
        ]);
    }
}
