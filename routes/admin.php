<?php

use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\TaskManagementController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::group(['prefix' => 'user-management'], function(){
        Route::post('/create-user', [UserController::class, 'createUser']);
        Route::get('/users', [UserController::class, 'getUsers']);
        Route::get('/user-by-id/{id}', [UserController::class, 'getUserById']);
        Route::put('/update-user/{id}', [UserController::class, 'updateUser']);
        Route::delete('/delete-user/{id}', [UserController::class, 'deleteUser']);
        Route::post('/logout', [UserController::class, 'logout']);
    });

    Route::group(['prefix' => 'task-management'], function(){
        Route::group(['prefix' => 'category'], function(){
            Route::post('/create-category', [TaskCategoryController::class, 'createCategory']);
            Route::get('/all-categories', [TaskCategoryController::class, 'getCategories']);
            Route::get('/category-by-id/{id}', [TaskCategoryController::class, 'getCategoryById']);
            Route::put('/update-category/{id}', [TaskCategoryController::class, 'updateCategory']);
            Route::delete('/delete-category/{id}', [TaskCategoryController::class, 'deleteCategory']);
        });

        Route::group(['prefix' => 'task'], function(){
            Route::post('/create-task', [TaskManagementController::class, 'createTask']);
            Route::get('/all-tasks', [TaskManagementController::class, 'getAllTasks']);
            Route::get('/task-by-id/{id}', [TaskManagementController::class, 'getTaskById']);
            Route::put('/update-task/{id}', [TaskManagementController::class, 'updateTask']);
            Route::delete('/delete-task/{id}', [TaskManagementController::class, 'deleteTask']);
            Route::get('get-all-task-with-count', [TaskManagementController::class, 'getAllTaskWithCount']);
        });
    });
});