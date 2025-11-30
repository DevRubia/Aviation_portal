<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'key',
        'value',
        'label',
        'is_active',
        'sort_order',
        'metadata',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'metadata' => 'array',
    ];

    /**
     * Get options by category
     */
    public static function byCategory(string $category)
    {
        return self::where('category', $category)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('label')
            ->get();
    }

    /**
     * Get all options grouped by category
     */
    public static function getAllGrouped()
    {
        return self::where('is_active', true)
            ->get()
            ->groupBy('category')
            ->mapWithKeys(function ($items, $category) {
                return [$category => $items->pluck('label', 'value')->toArray()];
            });
    }
}
