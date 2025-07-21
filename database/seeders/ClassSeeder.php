<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

use App\Models\ClassModel;
use App\Models\Section;
use App\Models\Student;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 classes
        ClassModel::factory()
            ->count(10)
            ->sequence(fn($sequence) => ['name' => 'Class ' . ($sequence->index + 1)])
            ->create()
            ->each(function ($class) {
                // Create 2-3 sections for each class
                $sections = Section::factory()
                    ->count(rand(2, 3))
                    ->sequence(
                        ['name' => 'Section A'],
                        ['name' => 'Section B'],
                        ['name' => 'Section C']
                    )
                    ->create(['class_id' => $class->id]);

                // Create 15-25 students for each class distributed across sections
                $sections->each(function ($section) use ($class) {
                    Student::factory()
                        ->count(rand(5, 8))
                        ->create([
                            'class_id' => $class->id,
                            'section_id' => $section->id
                        ]);
                });
            });
    }
}
