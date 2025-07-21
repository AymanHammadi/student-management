<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\Section;
use App\Models\Student;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get summary statistics
        $totalStudents = Student::count();
        $totalClasses = ClassModel::count();
        $totalSections = Section::count();

        // Get recent students (last 5)
        $recentStudents = Student::with(['class', 'section'])
            ->latest()
            ->take(5)
            ->get();

        // Get class distribution data
        $classDistribution = ClassModel::withCount('students')
            ->get()
            ->map(function ($class) {
                return [
                    'name' => $class->name,
                    'students_count' => $class->students_count,
                ];
            });

        // Get section distribution per class
        $sectionDistribution = ClassModel::with(['sections' => function ($query) {
            $query->withCount('students');
        }])
            ->get()
            ->map(function ($class) {
                return [
                    'class_name' => $class->name,
                    'sections' => $class->sections->map(function ($section) {
                        return [
                            'name' => $section->name,
                            'students_count' => $section->students_count,
                        ];
                    }),
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'totalClasses' => $totalClasses,
                'totalSections' => $totalSections,
            ],
            'recentStudents' => $recentStudents,
            'classDistribution' => $classDistribution,
            'sectionDistribution' => $sectionDistribution,
        ]);
    }
}
