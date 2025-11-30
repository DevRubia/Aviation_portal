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
        Schema::create('caa_users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            
            // Professional Details
            $table->string('employee_id')->nullable()->unique();
            $table->string('department')->nullable(); // e.g., Licensing, Airworthiness
            $table->string('job_title')->nullable(); // e.g., Senior Inspector
            $table->string('phone_number')->nullable();
            
            // System Access & Roles
            $table->string('status')->default('active'); // active, inactive, suspended
            $table->string('role')->default('officer'); // officer, manager, admin
            $table->boolean('is_super_admin')->default(false);
            $table->json('permissions')->nullable();
            
            // Operational
            $table->string('signature_path')->nullable(); // For digital signatures on licenses
            
            // Audit
            $table->timestamp('last_login_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caa_users');
    }
};
