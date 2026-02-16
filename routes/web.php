<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\StatsController;

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

// Client / Reciept routes
Route::get('/stats', [StatsController::class, 'index']);
Route::post('/user-partners/{addressId}', [StatsController::class, 'getPartners']);
Route::get('/stats/user/{addressId}', [StatsController::class, 'getUserStats']);