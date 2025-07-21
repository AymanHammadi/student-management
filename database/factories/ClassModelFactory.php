<?php

namespace Database\Factories;

use App\Models\ClassModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ClassModel>
 */
class ClassModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true) . ' Class',
        ];
    }
}
