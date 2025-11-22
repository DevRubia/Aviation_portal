<?php

namespace App\Http\Controllers;

use App\Models\LicenceApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = LicenceApplication::latest()->get();
        return response()->json($applications);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'licence_type' => 'required|string',
            'applicant_details' => 'required|array',
            'payload' => 'required|array',
        ]);

        $application = LicenceApplication::create([
            'licence_type' => $validated['licence_type'],
            'status' => 'submitted',
            'applicant_details' => $validated['applicant_details'],
            'payload' => $validated['payload'],
        ]);

        Log::info('New Application Submitted', ['id' => $application->id]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'application_id' => $application->id,
        ], 201);
    }

    public function show($id)
    {
        $application = LicenceApplication::findOrFail($id);
        return response()->json($application);
    }

    public function update(Request $request, $id)
    {
        $application = LicenceApplication::findOrFail($id);

        $validated = $request->validate([
            'payload' => 'required|array',
            'applicant_details' => 'sometimes|array',
        ]);

        $application->update([
            'payload' => $validated['payload'],
            'applicant_details' => $validated['applicant_details'] ?? $application->applicant_details,
        ]);

        Log::info('Application Updated', ['id' => $application->id]);

        return response()->json([
            'message' => 'Application updated successfully',
            'application' => $application,
        ]);
    }
}
