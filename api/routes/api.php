<?php

use App\Http\Controllers\Api\Address\GetAddressController;
use App\Http\Controllers\Api\Address\UpdateAddressController;
use App\Http\Controllers\Api\Item\DeleteCommentController;
use App\Http\Controllers\Api\Item\GetItemListController;
use App\Http\Controllers\Api\Item\GetItemDetailController;
use App\Http\Controllers\Api\Item\FavoriteController;
use App\Http\Controllers\Api\Item\StoreItemController;
use App\Http\Controllers\Api\Item\StoreCommentController;
use App\Http\Controllers\Api\Item\UpdateItemController;
use App\Http\Controllers\Api\Item\WithdrawItemController;
use App\Http\Controllers\Api\MyPage\GetMyListedItemsController ;
use App\Http\Controllers\Api\MyPage\GetMyPurchasedItemsController;
use App\Http\Controllers\Api\Profile\UpdateUserProfileController;
use App\Http\Controllers\Api\Purchase\CompleteCheckoutSessionController;
use App\Http\Controllers\Api\Purchase\CreateCheckoutSessionController;
use App\Http\Controllers\Api\Purchase\GetPurchaseItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*** ログイン中ユーザー取得 ***/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*** 公開商品関連 ***/
// 商品一覧
Route::get('/items', GetItemListController::class);
// 商品詳細
Route::get('/items/{id}', GetItemDetailController::class);

/*** 認証関連 ***/
Route::middleware('auth:sanctum', 'verified')->group(function () {  

    /*** 商品関連 ***/
    // 商品出品
    Route::post('/items', StoreItemController::class);
    // 出品した商品の更新
    Route::post('/items/{item}', UpdateItemController::class);
    // 出品した商品の取り下げ
    Route::post('/items/{item}/withdraw', WithdrawItemController::class);
    // 商品へのお気に入り
    Route::post('/items/{item}/favorite', FavoriteController::class);
    // 商品へのコメント投稿/削除
    Route::post('/items/{item}/comments', StoreCommentController::class);
    Route::delete('/comments/{comment}', DeleteCommentController::class);
    
    /**** 購入関連 ****/
    // 購入する商品の情報を取得
    Route::get(('/purchase/{item_id}'), GetPurchaseItemController::class);
    // StripeのCheckout Sessionを作成・完了
    Route::post('/purchase/{item_id}/checkout', CreateCheckoutSessionController::class);
    Route::post('/purchase/checkout/complete', CompleteCheckoutSessionController::class);

    
    /**** 配送先関連 ****/
    // 配送先情報の取得
    Route::get('/purchase/address/{item_id}', GetAddressController::class);
    // 配送先情報の更新
    Route::post('/purchase/address', UpdateAddressController::class);

    /**** マイページ関連 ****/
    // 出品した商品一覧
    Route::get('/mypage/listed', GetMyListedItemsController::class);
    // 購入した商品一覧
    Route::get('/mypage/purchases', GetMyPurchasedItemsController::class);
    Route::post('/mypage/profile', UpdateUserProfileController::class);

});
