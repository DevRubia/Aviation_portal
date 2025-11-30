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
        Schema::table('caa_users', function (Blueprint $table) {
            $table->string('office_location')->nullable()->after('phone_number');
            $table->string('supervisor_name')->nullable()->after('office_location');
            $table->text('access_justification')->nullable()->after('permissions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('caa_users', function (Blueprint $table) {
            $table->dropColumn(['office_location', 'supervisor_name', 'access_justification']);
        });
    }
};
