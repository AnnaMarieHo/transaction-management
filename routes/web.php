<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return view('app');
});


// Address routes
Route::get('/addresses', [AddressController::class, 'index']);
Route::post('/add-address', [AddressController::class, 'store']);
Route::post('/edit-address/{id}', [AddressController::class, 'update']);
Route::delete('/delete-address/{id}', [AddressController::class, 'destroy']);

// Receipt / Transaction routes
Route::get('/receipts', [TransactionController::class, 'index']);
Route::post('/receipts', [TransactionController::class, 'store']);
