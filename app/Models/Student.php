<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'section_id', 'class_id'];
    protected $with = ['section', 'class'];

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }
}
