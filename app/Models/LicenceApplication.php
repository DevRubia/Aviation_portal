<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LicenceApplication extends Model
{
    protected $fillable = ['licence_type', 'status', 'applicant_details', 'payload'];

    protected $casts = [
        'applicant_details' => 'array',
        'payload' => 'array',
    ];
    //
}
