<?php

use App\Http\Controllers\Api\Item\GetItemListController;
use App\Http\Controllers\Api\Item\GetItemDetailController;
use App\Models\Item;
use Illuminate\Support\Facades\Route;

/**　商品関連 */
Route::get('/items', GetItemListController::class);
Route::get('/items/{id}', GetItemDetailController::class);