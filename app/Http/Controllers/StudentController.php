<?php
// Laravel
namespace App\Http\Controllers;

// Resources

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\StudentResource;

// Models
use App\Models\ClassModel;
use App\Models\Student;

// Inertia
use Inertia\Inertia;


class StudentController extends Controller
{
    public function index()
    {
        $query = Student::query();

        if ($search = request('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        return Inertia::render('students/index', [
            'students' => StudentResource::collection($query->paginate(10)->withQueryString()),
            'filters' => request()->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('students/create', [
            'classes' => ClassResource::collection(ClassModel::all())->resolve(),
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());

        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    public function edit(Student $student)
    {
        $student->load(['class', 'section']);

        $classes = ClassResource::collection(ClassModel::all())->resolve();
        return Inertia::render('students/edit', [
            'classes' => $classes,
            'student' => StudentResource::make($student)->resolve(),
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
    }
}
