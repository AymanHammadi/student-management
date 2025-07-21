<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'class_id' => ['required', 'exists:classes,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Section name is required.',
            'name.max' => 'Section name cannot exceed 255 characters.',
            'class_id.required' => 'Please select a class.',
            'class_id.exists' => 'The selected class does not exist.',
        ];
    }
}
