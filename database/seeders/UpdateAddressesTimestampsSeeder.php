<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UpdateAddressesTimestampsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all addresses with null timestamps
        $addresses = DB::table('addresses')
                        ->whereNull('created_at')
                        ->orWhereNull('updated_at')
                        ->get();

        foreach ($addresses as $address) {
            // Generate a random date within the last year, for example
            $randomDate = Carbon::now()->subDays(rand(1, 365));

            DB::table('addresses')
                ->where('id', $address->id)
                ->update([
                    'created_at' => $randomDate,
                    'updated_at' => $randomDate, // Can be the same date
                ]);
        }
    }
}
