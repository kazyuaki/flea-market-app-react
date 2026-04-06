<?php

use App\Http\Controllers\Api\Item\GetItemListController;
use App\Http\Controllers\Api\Item\GetItemDetailController;
use App\Http\Controllers\Api\Item\StoreCommentController;
use App\Models\Item;
use Illuminate\Support\Facades\Route;

/**　商品関連 */
Route::get('/items', GetItemListController::class);
Route::get('/items/{id}', GetItemDetailController::class);
Route::post('/items/{item}/comments', StoreCommentController::class);