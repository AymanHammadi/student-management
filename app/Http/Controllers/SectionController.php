<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\SectionResource;
use App\Models\ClassModel;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    public function index()
    {
        $query = Section::with('class');

        if ($search = request('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhereHas('class', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        }

        return Inertia::render('sections/index', [
            'sections' => SectionResource::collection($query->paginate(10)->withQueryString()),
            'filters' => request()->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('sections/create', [
            'classes' => ClassResource::collection(ClassModel::all())->resolve(),
        ]);
    }

    public function store(StoreSectionRequest $request)
    {
        Section::create($request->validated());
        return redirect()->route('sections.index')->with('success', 'Section created successfully.');
    }

    public function edit(Section $section)
    {
        $section->load('class');

        return Inertia::render('sections/edit', [
            'classes' => ClassResource::collection(ClassModel::all())->resolve(),
            'section' => SectionResource::make($section)->resolve(),
        ]);
    }

    public function update(UpdateSectionRequest $request, Section $section)
    {
        $section->update($request->validated());
        return redirect()->route('sections.index')->with('success', 'Section updated successfully.');
    }

    public function destroy(Section $section)
    {
        // Check if there are students in this section
        if ($section->students()->count() > 0) {
            return redirect()->route('sections.index')
                ->with('error', 'Cannot delete section. There are students assigned to this section.');
        }

        $section->delete();
        return redirect()->route('sections.index')->with('success', 'Section deleted successfully.');
    }
}
