<?php

namespace App\Http\Controllers;

use App\Models\SystemOption;
use Illuminate\Http\Request;

class SystemOptionController extends Controller
{
    /**
     * Get all system options grouped by category
     */
    public function index()
    {
        $options = SystemOption::getAllGrouped();
        
        return response()->json([
            'success' => true,
            'data' => $options
        ]);
    }

    /**
     * Get options for a specific category
     */
    public function byCategory($category)
    {
        $options = SystemOption::byCategory($category)
            ->map(function ($option) {
                return [
                    'value' => $option->value,
                    'label' => $option->label,
                    'key' => $option->key,
                ];
            });

        return response()->json([
            'success' => true,
            'category' => $category,
            'data' => $options
        ]);
    }

    /**
     * Create or update a system option (Admin only)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'value' => 'required|string',
            'label' => 'required|string',
            'key' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $option = SystemOption::updateOrCreate(
            [
                'category' => $validated['category'],
                'value' => $validated['value']
            ],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Option saved successfully',
            'data' => $option
        ]);
    }

    /**
     * Delete a system option (Admin only)
     */
    public function destroy($id)
    {
        $option = SystemOption::findOrFail($id);
        $option->delete();

        return response()->json([
            'success' => true,
            'message' => 'Option deleted successfully'
        ]);
    }
}
