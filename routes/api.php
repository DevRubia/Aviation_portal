<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\SystemOptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// System Options (Public - for dropdowns)
Route::get('/options', [SystemOptionController::class, 'index']);
Route::get('/options/{category}', [SystemOptionController::class, 'byCategory']);

// System Options Management (Admin only)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/options', [SystemOptionController::class, 'store']);
    Route::delete('/options/{id}', [SystemOptionController::class, 'destroy']);
});

// Applications
Route::post('/applications', [ApplicationController::class, 'store']);
Route::get('/applications', [ApplicationController::class, 'index']);
Route::get('/applications/{id}', [ApplicationController::class, 'show']);
Route::put('/applications/{id}', [ApplicationController::class, 'update']);
