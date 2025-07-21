<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClassRequest;
use App\Http\Requests\UpdateClassRequest;
use App\Http\Resources\ClassResource;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {
        $query = ClassModel::query();

        if ($search = request('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        return Inertia::render('classes/index', [
            'classes' => ClassResource::collection($query->paginate(10)->withQueryString()),
            'filters' => request()->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('classes/create');
    }

    public function store(StoreClassRequest $request)
    {
        ClassModel::create($request->validated());
        return redirect()->route('classes.index')->with('success', 'Class created successfully.');
    }

    public function edit(ClassModel $class)
    {
        return Inertia::render('classes/edit', [
            'class' => ClassResource::make($class)->resolve(),
        ]);
    }

    public function update(UpdateClassRequest $request, ClassModel $class)
    {
        $class->update($request->validated());
        return redirect()->route('classes.index')->with('success', 'Class updated successfully.');
    }

    public function destroy(ClassModel $class)
    {
        // Check if there are sections or students in this class
        if ($class->sections()->count() > 0) {
            return redirect()->route('classes.index')
                ->with('error', 'Cannot delete class. There are sections assigned to this class.');
        }

        if ($class->students()->count() > 0) {
            return redirect()->route('classes.index')
                ->with('error', 'Cannot delete class. There are students assigned to this class.');
        }

        $class->delete();
        return redirect()->route('classes.index')->with('success', 'Class deleted successfully.');
    }
}
