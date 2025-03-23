<?php

namespace App\Http\Controllers\MobileApp;

use App\Http\Controllers\Controller;
use App\Models\TaskManagement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use ApiResponse;
    
    public function getTaskById($id){
        try{
            $task = TaskManagement::with('category')->where('id', $id)->first();
            return $this->successResponse('Task fetched successfully', $task, null, 200);
        }catch(\Exception $e){
            Log::error('Error in Task Controller By Id:', $e->getMesssage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }
}
