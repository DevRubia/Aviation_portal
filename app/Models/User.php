<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'organization_id',
        'first_name',
        'middle_name',
        'last_name',
        'full_name',
        'gender',
        'date_of_birth',
        'nationality',
        'country_of_residence',
        'phone_number',
        'fax_number',
        'primary_email',
        'id_type',
        'id_number',
        'id_doc',
        'id_type_attachment',
        'passport_number',
        'passport_doc',
        'passport_issue_date',
        'passport_expiry_date',
        'status',
        'account_type',
        'client_id',
        'client_title_id',
        'external_id',
        'external_id_auto_sync',
        'auto_sync_initiated_from_core',
        'legacy_license_certificate_number',
        'primary_representative_id',
        'represents',
        'represented_by',
        'affiliated_organization',
        'profile_picture',
        'licence_passport_photo',
        'signature',
        'client_modules',
        'permissions',
        'languages_spoken',
        'password_changed_at',
        'two_factor_enabled',
        'two_factor_secret',
        'two_factor_channels',
        'is_archived',
        'archived_at',
        'archived_by',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'passport_issue_date' => 'date',
            'passport_expiry_date' => 'date',
            'client_modules' => 'array',
            'permissions' => 'array',
            'languages_spoken' => 'array',
            'two_factor_channels' => 'array',
            'external_id_auto_sync' => 'boolean',
            'auto_sync_initiated_from_core' => 'boolean',
            'two_factor_enabled' => 'boolean',
            'is_archived' => 'boolean',
            'archived_at' => 'datetime',
            'password_changed_at' => 'datetime',
        ];
    }

    /**
     * Get the organization that the user belongs to.
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
