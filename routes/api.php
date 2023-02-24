<?php

use App\Http\Controllers\Api\V1\CustomerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->prefix('v1')->namespace('App\Http\Controllers\Api\V1')->name('api.v1.')->group(function () {
    Route::name('customers.')->group(function () {
        Route::get('/customers', [CustomerController::class, 'index'])->name('index');
    });
});
