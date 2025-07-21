<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\ListSectionsRequest;
use Illuminate\Http\Request;
use App\Models\Section;
use App\Http\Resources\SectionResource;

class SectionController extends Controller
{
    public function __invoke(ListSectionsRequest $request)
    {
        // Handle the request to list sections
        // This method can be used to return sections based on the request parameters
        // For example, you might want to filter sections by class_id

        $sections = Section::where('class_id', $request->validated('class_id'))->get();

        return SectionResource::collection($sections);
    }
}
