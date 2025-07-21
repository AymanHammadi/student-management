<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'class_id' => $this->class_id,
            'section_id' => $this->section_id,
            'class' => ClassResource::make($this->whenLoaded('class')),
            'section' => SectionResource::make($this->whenLoaded('section')),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
