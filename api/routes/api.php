<?php

use App\Http\Controllers\Api\ItemController;
use App\Models\Item;
use Illuminate\Support\Facades\Route;

// Route::get('test', function () {
//     return response()->json([
//         'message' => 'API OK'
//     ]);
// });

Route::get('/items', [ItemController::class, 'index']);