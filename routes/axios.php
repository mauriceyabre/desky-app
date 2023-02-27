<?php

use App\Http\Controllers\AuthController;

Route::prefix('api/fetch')->name('api.fetch.')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user'])->name('auth.user');
});
