<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    
    protected $fillable = ['student_id', 'name'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
