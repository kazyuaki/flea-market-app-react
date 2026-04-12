<?php

use App\Http\Controllers\Api\Address\GetAddressController;
use App\Http\Controllers\Api\Address\UpdateAddressController;
use App\Http\Controllers\Api\Item\GetItemListController;
use App\Http\Controllers\Api\Item\GetItemDetailController;
use App\Http\Controllers\Api\Item\StoreCommentController;
use App\Http\Controllers\Api\Purchase\GetPurchaseItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*** ログイン中ユーザー取得 ***/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*** 認証関連 ***/
Route::middleware('auth:sanctum', 'verified')->group(function () {  

    /*** 商品関連 ***/
    Route::get('/items', GetItemListController::class);
    Route::get('/items/{id}', GetItemDetailController::class);
    Route::post('/items/{item}/comments', StoreCommentController::class);
    
    /**** 購入関連 ****/
    Route::get(('/purchase/{item_id}'), GetPurchaseItemController::class);
    
    /**** 配送先関連 ****/
    Route::get('/purchase/address/{item_id}', GetAddressController::class);
    Route::post('/purchase/address', UpdateAddressController::class);
});
