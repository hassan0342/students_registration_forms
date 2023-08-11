<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['student_id', 'image', 'file'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }}
