<?php

use App\Http\Controllers\MobileApp\DashboardController;
use App\Http\Controllers\MobileApp\LoginController;
use App\Http\Controllers\MobileApp\LogoutController;
use App\Http\Controllers\MobileApp\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::post('/login', [LoginController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::group(['prefix' => 'dashboard'], function(){
        Route::get('/pending-tasks', [DashboardController::class, 'getPendingTasks']);
        Route::get('/in-progress-tasks', [DashboardController::class, 'getInProgressTasks']);
        Route::get('/completed-tasks', [DashboardController::class, 'getCompletedTasks']);
    });
    Route::group(['prefix' => 'task'], function(){
        Route::get('task-by-id/{id}', [TaskController::class, 'getTaskById']);
    });
    Route::post('/logout', [LogoutController::class, 'logout']);
});
