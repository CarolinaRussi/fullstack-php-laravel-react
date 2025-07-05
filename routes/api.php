<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SolicitationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [UserController::class, 'me']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/solicitations', [SolicitationController::class, 'store']);
    Route::get('/solicitations/{id}', [SolicitationController::class, 'show']);
    Route::put('/solicitations/{id}', [SolicitationController::class, 'update']);
    Route::get('/my-solicitations', [SolicitationController::class, 'myRequests']);
    Route::delete('/solicitations/{id}', [SolicitationController::class, 'destroy']);
});
