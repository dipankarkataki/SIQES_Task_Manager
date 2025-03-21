<?php

namespace App\Http\Controllers;

use App\Models\TaskCategory;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TaskCategoryController extends Controller
{
    use ApiResponse;

    public function createCategory(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|string|unique:task_categories',
            'description' => 'nullable|string'
        ], [
            'title.unique' => 'Task category with same title already exists'
        ]);

        if ($validate->fails()) {
            return $this->errorResponse('Validation error: '.$validate->errors()->first(), 400);
        }else{
            try{
                $category = TaskCategory::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'created_by' => auth()->user()->id,
                ]);

                return $this->successResponse('Task category created successfully', $category, null, 201);
            }catch(\Exception $e){
                Log::error('Failed to create task category: '.$e->getMessage());
                return $this->errorResponse('Failed to create task category', 500);
            }
        }
    }

    public function getCategories(){
        try{
            $categories = TaskCategory::all();
            return $this->successResponse('Task categories retrieved successfully', $categories, null, 200);
        }catch(\Exception $e){
            Log::error('Failed to retrieve task categories: '.$e->getMessage());
            return $this->errorResponse('Failed to retrieve task categories', 500);
        }
    }

    public function getCategoryById(Request $request, $id){
        try{
            $category = TaskCategory::find($id);
            if($category){
                return $this->successResponse('Task category retrieved successfully', $category, null, 200);
            }else{
                return $this->errorResponse('Task category not found', 404);
            }
        }catch(\Exception $e){
            Log::error('Failed to retrieve task category: '.$e->getMessage());
            return $this->errorResponse('Failed to retrieve task category', 500);
        }
    }

    public function updateCategory(Request $request, $id){
        $validate = Validator::make($request->all(), [
            'title' => 'string|unique:task_categories',
            'description' => 'nullable|string'
        ], [
            'title.unique' => 'Task category with same title already exists'
        ]);

        if ($validate->fails()) {
            return $this->errorResponse('Validation error: '.$validate->errors()->first(), 400);
        }else{
            try{
                $category = TaskCategory::find($id);
                if($category){
                    $update = $category->update([
                        'title' => $request->title ?? $category->title,
                        'description' => $request->description ?? $category->description,
                        'updated_by' => auth()->user()->id,
                    ]);
                    return $this->successResponse('Task category updated successfully', $category, null, 200);
                }else{
                    return $this->errorResponse('Task category not found', 404);
                }
            }catch(\Exception $e){
                Log::error('Failed to update task category: '.$e->getMessage());
                return $this->errorResponse('Failed to update task category', 500);
            }
        }

    }

    public function deleteCategory($id){
        try{
            $category = TaskCategory::find($id);
            if($category){
                TaskCategory::where('id', $id)->update(['deleted_by' => auth()->user()->id]);
                $category->delete();
                return $this->successResponse('Task category deleted successfully', null, null, 200);
            }else{
                return $this->errorResponse('Task category not found', 404);
            }
        }catch(\Exception $e){
            Log::error('Failed to delete task category: '.$e->getMessage());
            return $this->errorResponse('Failed to delete task category', 500);
        }
    }
}
