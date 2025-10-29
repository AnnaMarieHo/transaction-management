<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ReceiptController;

Route::get('/', function () {
    return view('app');
});

Route::get('/test-addresses', [AddressController::class, 'index']);
Route::get('/test-receipts', [ReceiptController::class, 'index']);
