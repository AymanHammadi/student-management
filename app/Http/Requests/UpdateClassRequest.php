<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClassRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $classId = request()->route('class')?->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('classes', 'name')->ignore($classId)
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Class name is required.',
            'name.unique' => 'A class with this name already exists.',
            'name.max' => 'Class name cannot exceed 255 characters.',
        ];
    }
}
