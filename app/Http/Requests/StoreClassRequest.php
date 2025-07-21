<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClassRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => ['required', 'string', 'max:255', 'unique:classes,name'],
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
