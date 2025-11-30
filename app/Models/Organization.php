<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'legal_name',
        'registration_number',
        'tax_id',
        'organization_type',
        'industry',
        'email',
        'phone_number',
        'fax_number',
        'website',
        'address_line_1',
        'address_line_2',
        'city',
        'state_province',
        'postal_code',
        'country',
        'primary_contact_name',
        'primary_contact_email',
        'primary_contact_phone',
        'logo_path',
        'status',
        'external_id',
        'external_id_auto_sync',
        'is_archived',
        'archived_at',
        'archived_by',
        'metadata',
    ];

    protected $casts = [
        'external_id_auto_sync' => 'boolean',
        'is_archived' => 'boolean',
        'archived_at' => 'datetime',
        'metadata' => 'array',
    ];

    /**
     * Get the users that belong to this organization.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'organization_id');
    }

    /**
     * Get the primary representative for this organization.
     */
    public function primaryRepresentative()
    {
        return $this->belongsTo(User::class, 'primary_representative_id');
    }
}
