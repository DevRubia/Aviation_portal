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
        Schema::create('licence_applications', function (Blueprint $table) {
            $table->id();
            $table->string('licence_type'); // SPL, PPL, CPL
            $table->string('status')->default('draft');
            $table->json('applicant_details')->nullable(); // Name, email, etc.
            $table->json('payload')->nullable(); // The full form data
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licence_applications');
    }
};
