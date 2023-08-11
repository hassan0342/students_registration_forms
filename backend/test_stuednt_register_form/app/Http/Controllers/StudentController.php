<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Document;
use Illuminate\Http\JsonResponse;


class StudentController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone' => 'required|string|max:20',
            'subjects' => 'required|array|min:1',
            'subjects.*' => 'string|max:255',
            'documents' => 'required|array|min:1',
            'documents.*.image' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            'documents.*.file' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        try {
            $student = new Student();
            $student->name = $request->name;
            $student->email = $request->email;
            $student->phone = $request->phone;
            $student->save();
    
            foreach ($request->subjects as $subjectData) {
                $subject = new Subject;
                $subject->student_id = $student->id;
                $subject->name = $subjectData;
                $subject->save();
            }
    
            foreach ($request->documents as $documentData) {
                $document = new Document;
                $document->student_id = $student->id;
    
                // Handle the image and file fields separately if they exist in $documentData
                if (isset($documentData['image'])) {
                    $document->image = $documentData['image']->store('documents');
                }
                if (isset($documentData['file'])) {
                    $document->file = $documentData['file']->store('documents');
                }
    
                $document->save();
            }
    
            // return $this->sendResponse(['message' => 'Registration successful', 'student' => $student], 201);
            return $this->sendResponse(200, $student);

        } 
        catch (\Exception $e) {
            return $this->sendResponse(
                500,
                null,
                [$e->getMessage()]
            );
        }
    }
    

    public function show($id)
    {
        $student = Student::with('subjects', 'documents')->findOrFail($id);
        return $this->sendResponse(200, $student);

    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $id,
            'phone' => 'required|string|max:20',
            'subjects' => 'required|array|min:1',
            'subjects.*' => 'string|max:255',
        ]);

        $student = Student::findOrFail($id);
        $student->name = $validatedData['name'];
        $student->email = $validatedData['email'];
        $student->phone = $validatedData['phone'];
        $student->save();

        $student->subjects()->delete();
        foreach ($validatedData['subjects'] as $subject) {
            $student->subjects()->create(['name' => $subject]);
        }

        return response()->json(['message' => 'Update successful']);
    }
}