<?php

use App\Http\Controllers\MobileApp\DashboardController;
use App\Http\Controllers\MobileApp\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/login', [LoginController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::group(['prefix' => 'dashboard'], function(){
        Route::get('/pending-tasks', [DashboardController::class, 'getPendingTasks']);
        Route::get('/in-progress-tasks', [DashboardController::class, 'getInProgressTasks']);
        Route::get('/completed-tasks', [DashboardController::class, 'getCompletedTasks']);
    });
});
