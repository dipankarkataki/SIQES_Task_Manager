<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskManagement extends Model
{
    use SoftDeletes;

    protected $table = 'task_managements';
    protected $fillable = [
        'category_id', 
        'title', 
        'description', 
        'priority', 
        'due_date', 
        'status', 
        'created_by', 
        'updated_by', 
        'deleted_by', 
        'assigned_to', 
        'assigned_by', 
        'remarks'
    ];
}
