<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Personal Information
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('full_name')->nullable(); // Computed or stored
            $table->string('gender')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('country_of_residence')->nullable();
            
            // Contact Information
            $table->string('phone_number')->nullable();
            $table->string('fax_number')->nullable();
            $table->string('primary_email')->nullable(); // Distinct from auth email?
            
            // Identification
            $table->string('id_type')->nullable();
            $table->string('id_number')->nullable();
            $table->string('id_doc')->nullable(); // Path to document
            $table->string('id_type_attachment')->nullable();
            
            $table->string('passport_number')->nullable();
            $table->string('passport_doc')->nullable();
            $table->date('passport_issue_date')->nullable();
            $table->date('passport_expiry_date')->nullable();
            
            // Account & Status
            $table->string('status')->default('active');
            $table->string('account_type')->nullable();
            $table->string('client_id')->nullable(); // Specific client identifier
            $table->unsignedBigInteger('client_title_id')->nullable();
            $table->string('external_id')->nullable();
            $table->boolean('external_id_auto_sync')->default(false);
            $table->boolean('auto_sync_initiated_from_core')->default(false);
            $table->string('legacy_license_certificate_number')->nullable();
            
            // Relations & Representation
            $table->unsignedBigInteger('primary_representative_id')->nullable();
            $table->string('represents')->nullable(); // Could be JSON or relation
            $table->string('represented_by')->nullable();
            $table->string('affiliated_organization')->nullable();
            
            // Files & Media
            $table->string('profile_picture')->nullable();
            $table->string('licence_passport_photo')->nullable();
            $table->string('signature')->nullable();
            
            // System & Meta
            $table->json('client_modules')->nullable();
            $table->json('permissions')->nullable();
            $table->json('languages_spoken')->nullable();
            
            // Security
            $table->timestamp('password_changed_at')->nullable();
            $table->boolean('two_factor_enabled')->default(false);
            $table->string('two_factor_secret')->nullable();
            $table->json('two_factor_channels')->nullable();
            
            // Archival
            $table->boolean('is_archived')->default(false);
            $table->timestamp('archived_at')->nullable();
            $table->unsignedBigInteger('archived_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name', 'middle_name', 'last_name', 'full_name', 'gender', 'date_of_birth',
                'nationality', 'country_of_residence', 'phone_number', 'fax_number', 'primary_email',
                'id_type', 'id_number', 'id_doc', 'id_type_attachment', 'passport_number',
                'passport_doc', 'passport_issue_date', 'passport_expiry_date', 'status',
                'account_type', 'client_id', 'client_title_id', 'external_id', 'external_id_auto_sync',
                'auto_sync_initiated_from_core', 'legacy_license_certificate_number',
                'primary_representative_id', 'represents', 'represented_by', 'affiliated_organization',
                'profile_picture', 'licence_passport_photo', 'signature', 'client_modules',
                'permissions', 'languages_spoken', 'password_changed_at', 'two_factor_enabled',
                'two_factor_secret', 'two_factor_channels', 'is_archived', 'archived_at', 'archived_by'
            ]);
        });
    }
};
