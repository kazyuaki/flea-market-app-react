<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

/*** ユーザー取得（これ追加）***/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/** メール認証リンク */
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('http://localhost:5173/mypage/profile'); // プロフィール入力へ誘導
})->middleware(['auth', 'signed'])->name('verification.verify');

/** 認証メール再送 */
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Verification link sent']);
})->middleware(['auth'])->name('verification.send');
