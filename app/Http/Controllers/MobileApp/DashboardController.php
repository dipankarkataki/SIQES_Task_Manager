<?php

namespace App\Http\Controllers\MobileApp;

use App\Http\Controllers\Controller;
use App\Models\TaskManagement;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    use ApiResponse;

    public function getPendingTasks(){
        try{
            $pendingTasks = TaskManagement::with('category')->where('status', 'pending')->where('assigned_to', auth()->user()->id)->orderBy('due_date', 'ASC')->get();
            return $this->successResponse('Pending Tasks', $pendingTasks, null, 200);
        }catch(\Exception $e){
            Log::error('Error in Pending Task - Dashboard Controller: '. $e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }

    public function getInProgressTasks(){
        try{
            $inProgressTasks = TaskManagement::with('category')->where('status', 'in_progress')->where('assigned_to', auth()->user()->id)->orderBy('due_date', 'ASC')->get();
            return $this->successResponse('In Progress Tasks', $inProgressTasks, null, 200);
        }catch(\Exception $e){
            Log::error('Error in InProgress Task - Dashboard Controller: '. $e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }

    public function getCompletedTasks(){
        try{
            $completedTasks = TaskManagement::with('category')->where('status', 'completed')->where('assigned_to', auth()->user()->id)->orderBy('due_date', 'ASC')->get();
            return $this->successResponse('Completed Tasks', $completedTasks, null, 200);
        }catch(\Exception $e){
            Log::error('Error in Completed Task - Dashboard Controller: '. $e->getMessage());
            return $this->errorResponse('Something went wrong', 500);
        }
    }
}
