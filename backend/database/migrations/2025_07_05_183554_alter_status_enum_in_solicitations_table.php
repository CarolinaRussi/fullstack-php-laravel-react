<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE solicitations MODIFY status ENUM('pending', 'in_review', 'completed', 'canceled') DEFAULT 'pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE solicitations MODIFY status ENUM('pending', 'in_review', 'completed') DEFAULT 'pending'");
    }
};
