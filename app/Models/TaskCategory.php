<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskCategory extends Model
{
    use SoftDeletes;

    protected $table = 'task_categories';
    protected $fillable = ['title', 'description', 'created_by', 'updated_by', 'deleted_by'];
}
