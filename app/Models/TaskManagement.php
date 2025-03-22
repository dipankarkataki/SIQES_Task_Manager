<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskManagement extends Model
{
    use SoftDeletes;

    protected $table = 'task_management';
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

    public function category(){
        return $this->belongsTo(TaskCategory::class, 'category_id', 'id');
    }

    public function __call($method, $parameters)
    {
        $relations = ['created_by', 'updated_by', 'deleted_by', 'assigned_to', 'assigned_by'];

        if (in_array($method, $relations)) {
            return $this->belongsTo(User::class, $method, 'id');
        }

        return parent::__call($method, $parameters);
    }
}
