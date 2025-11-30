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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            
            // Basic Information
            $table->string('name');
            $table->string('legal_name')->nullable();
            $table->string('registration_number')->nullable()->unique();
            $table->string('tax_id')->nullable();
            $table->string('organization_type')->nullable(); // e.g., airline, training_org, maintenance_org
            $table->string('industry')->nullable();
            
            // Contact Information
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('fax_number')->nullable();
            $table->string('website')->nullable();
            
            // Address
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state_province')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->nullable();
            
            // Primary Contact Person
            $table->string('primary_contact_name')->nullable();
            $table->string('primary_contact_email')->nullable();
            $table->string('primary_contact_phone')->nullable();
            $table->unsignedBigInteger('primary_representative_id')->nullable();
            
            // Branding
            $table->string('logo_path')->nullable();
            
            // Status & Sync
            $table->string('status')->default('active'); // active, inactive, suspended
            $table->string('external_id')->nullable();
            $table->boolean('external_id_auto_sync')->default(false);
            
            // Archival
            $table->boolean('is_archived')->default(false);
            $table->timestamp('archived_at')->nullable();
            $table->unsignedBigInteger('archived_by')->nullable();
            
            // Additional metadata
            $table->json('metadata')->nullable();
            
            $table->timestamps();
            
            // Foreign key constraints
            $table->foreign('primary_representative_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('archived_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
