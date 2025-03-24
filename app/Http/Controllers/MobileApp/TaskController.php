<?php

namespace App\Http\Controllers\MobileApp;

use App\Http\Controllers\Controller;
use App\Models\TaskManagement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    use ApiResponse;
    
    public function getTaskById($id){
        try{
            $task = TaskManagement::with('category')->where('id', $id)->first();
            return $this->successResponse('Task fetched successfully', $task, null, 200);
        }catch(\Exception $e){
            Log::error('Error in Task Controller By Id:'. $e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }

    public function updateTaskStatus(Request $request){
        try{
            $task = TaskManagement::find($request->task_id);
            if(!$task){
                return $this->errorResponse('Invalid Task', 400);
            }else{
                TaskManagement::where('id', $request->task_id)->update([
                    'status' => $request->new_status
                ]);
                return $this->successResponse('Task status updated successfully', null, null, 200);
            }
        }catch(\Exception $e){
            Log::error('Error in Task Controller By Id:'. $e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }
}
