<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SolicitationController;
use App\Http\Controllers\UserController;

Route::post('/users', [UserController::class, 'store']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/solicitations', [SolicitationController::class, 'index']);

Route::post('/solicitations', [SolicitationController::class, 'store']);
