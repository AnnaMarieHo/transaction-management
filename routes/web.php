<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ReceiptController;

Route::get('/', function () {
    return view('app');
});


// Address routes
Route::get('/addresses', [AddressController::class, 'index']);
Route::post('/add-address', [AddressController::class, 'store']);
Route::post('/edit-address/{id}', [AddressController::class, 'update']);


// Reciept routes
Route::get('/test-receipts', [ReceiptController::class, 'index']);
