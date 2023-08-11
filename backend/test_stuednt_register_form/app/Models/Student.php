<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name', 'email', 'phone'];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
