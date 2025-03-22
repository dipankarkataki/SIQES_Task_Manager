<?php

namespace App\Http\Controllers;

use App\Models\TaskManagement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TaskManagementController extends Controller
{
    use ApiResponse;

    public function createTask(Request $request)
    {
       $validate = Validator::make($request->all(), [
            'category_id' => 'required|exists:task_categories,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'required|date',
            'remarks' => 'nullable|string'
        ]);

        if($validate->fails()){
            return $this->errorResponse('Validation Error: '.$validate->errors()->first(), 400);
        }else{
            try{
                $task = TaskManagement::create([
                    'category_id' => $request->category_id,
                    'title' => $request->title,
                    'description' => $request->description,
                    'priority' => $request->priority,
                    'due_date' => $request->due_date,
                    'assigned_to' => $request->assigned_to,
                    'assigned_by' => $request->assigned_to != null ? auth()->user()->id : null,
                    'remarks' => $request->remarks,
                    'created_by' => auth()->user()->id
                ]);

                return $this->successResponse('Task created successfully', $task, 201);
            }catch(\Exception $e){
                Log::error('Failed to create task: ' . $e->getMessage());
                return $this->errorResponse('Failed to create task: ', 500);
            }

        }
    }

    public function getAllTasks(){
        try{
            $tasks = TaskManagement::withTrashed()->with('category', 'assigned_to', 'created_by', 'updated_by', 'deleted_by')->OrderBy('created_at', 'DESC')->get();
            return $this->successResponse('Tasks fetched successfully', $tasks, null, 200);
        }catch(\Exception $e){
            Log::error('Failed to fetch tasks: ' . $e->getMessage());
            return $this->errorResponse('Failed to fetch tasks', 500);
        }
    }

    public function getTaskById($id){
        try{
            $task = TaskManagement::with('category')->find($id);
            if($task){
                return $this->successResponse('Task fetched successfully', $task, null, 200);
            }else{
                return $this->errorResponse('Task not found', 404);
            }
        }catch(\Exception $e){
            Log::error('Failed to fetch task: ' . $e->getMessage());
            return $this->errorResponse('Failed to fetch task', 500);
        }
    }

    public function updateTask(Request $request, $id){
        $validate = Validator::make($request->all(), [
            'category_id' => 'exists:task_categories,id',
            'title' => 'string',
            'description' => 'string',
            'priority' => 'in:low,medium,high',
            'status' => 'in:pending,in_progress,completed',
            'assigned_to' => 'nullable|exists:users,id',
            'assigned_by' => 'nullable|exists:users,id',
            'due_date' => 'date',
            'remarks' => 'nullable|string'
        ]);

        if($validate->fails()){
            return $this->errorResponse('Validation Error: '.$validate->errors()->first(), 400);
        }else{
            try{
                $task = TaskManagement::find($id);
                if($task){
                    $update = $task->update([
                        'category_id' => $request->category_id ?? $task->category_id,
                        'title' => $request->title ?? $task->title,
                        'description' => $request->description ?? $task->description,
                        'priority' => $request->priority ?? $task->priority,
                        'due_date' => $request->due_date ?? $task->due_date,
                        'status' => $request->status ?? $task->status,
                        'assigned_to' => $request->assigned_to ?? $task->assigned_to,
                        'assigned_by' => $request->assigned_to != null ? auth()->user()->id : $task->assigned_by,
                        'updated_by' => auth()->user()->id,
                        'remarks' => $request->remarks ?? $task->remarks,
                    ]);

                    return $this->successResponse('Task updated successfully', $task, null, 200);
                }else{
                    return $this->errorResponse('Task not found', 404);
                }
            }catch(\Exception $e){
                Log::error('Failed to update task: ' . $e->getMessage());
                return $this->errorResponse('Failed to update task', 500);
            }
        }
    }

    public function deleteTask($id){
        try{
            $task = TaskManagement::find($id);
            if($task){
                TaskManagement::where('id', $id)->update(['deleted_by' => auth()->user()->id]);
                $task->delete();
                return $this->successResponse('Task deleted successfully', null, null, 200);
            }else{
                return $this->errorResponse('Task not found', 404);
            }
        }catch(\Exception $e){
            Log::error('Failed to delete task: ' . $e->getMessage());
            return $this->errorResponse('Failed to delete task', 500);
        }
    }

    public function getAllTaskWithCount(){
        try{
            $taskCounts = TaskManagement::selectRaw("
            COUNT(*) as total_tasks,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_tasks,
            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_tasks,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_tasks
        ")
        ->first();
            return $this->successResponse('Tasks counts fetched successfully', $taskCounts, null, 200);
        }catch(\Exception $e){
            Log::error('Failed to fetch tasks: ' . $e->getMessage());
            return $this->errorResponse('Failed to fetch tasks', 500);
        }
    }
}
