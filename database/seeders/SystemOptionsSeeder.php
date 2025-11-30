<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SystemOption;

class SystemOptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $options = [
            // Gender
            ['category' => 'gender', 'value' => 'male', 'label' => 'Male', 'sort_order' => 1],
            ['category' => 'gender', 'value' => 'female', 'label' => 'Female', 'sort_order' => 2],
            ['category' => 'gender', 'value' => 'other', 'label' => 'Other', 'sort_order' => 3],

            // Document Types
            ['category' => 'document_type', 'value' => 'national_id', 'label' => 'National ID', 'sort_order' => 1],
            ['category' => 'document_type', 'value' => 'passport', 'label' => 'Passport', 'sort_order' => 2],
            ['category' => 'document_type', 'value' => 'military_id', 'label' => 'Military ID', 'sort_order' => 3],
            ['category' => 'document_type', 'value' => 'driver_license', 'label' => 'Driver License', 'sort_order' => 4],

            // Organization Types
            ['category' => 'organization_type', 'value' => 'airline', 'label' => 'Airline / Operator', 'sort_order' => 1],
            ['category' => 'organization_type', 'value' => 'ato', 'label' => 'Approved Training Organization (ATO)', 'sort_order' => 2],
            ['category' => 'organization_type', 'value' => 'amo', 'label' => 'Approved Maintenance Organization (AMO)', 'sort_order' => 3],
            ['category' => 'organization_type', 'value' => 'mro', 'label' => 'Maintenance Repair Organization (MRO)', 'sort_order' => 4],
            ['category' => 'organization_type', 'value' => 'charter', 'label' => 'Charter Operator', 'sort_order' => 5],
            ['category' => 'organization_type', 'value' => 'manufacturer', 'label' => 'Aircraft Manufacturer', 'sort_order' => 6],
            ['category' => 'organization_type', 'value' => 'other', 'label' => 'Other', 'sort_order' => 99],

            // Departments (CAA)
            ['category' => 'caa_department', 'value' => 'licensing', 'label' => 'Licensing', 'sort_order' => 1],
            ['category' => 'caa_department', 'value' => 'airworthiness', 'label' => 'Airworthiness', 'sort_order' => 2],
            ['category' => 'caa_department', 'value' => 'operations', 'label' => 'Flight Operations', 'sort_order' => 3],
            ['category' => 'caa_department', 'value' => 'safety', 'label' => 'Safety & Security', 'sort_order' => 4],
            ['category' => 'caa_department', 'value' => 'air_navigation', 'label' => 'Air Navigation Services', 'sort_order' => 5],
            ['category' => 'caa_department', 'value' => 'legal', 'label' => 'Legal & Compliance', 'sort_order' => 6],
            ['category' => 'caa_department', 'value' => 'administration', 'label' => 'Administration', 'sort_order' => 7],
            ['category' => 'caa_department', 'value' => 'it', 'label' => 'IT & Systems', 'sort_order' => 8],

            // Nationalities - East African Countries
            ['category' => 'nationality', 'value' => 'kenyan', 'label' => 'Kenyan', 'key' => 'KE', 'sort_order' => 1],
            ['category' => 'nationality', 'value' => 'ugandan', 'label' => 'Ugandan', 'key' => 'UG', 'sort_order' => 2],
            ['category' => 'nationality', 'value' => 'tanzanian', 'label' => 'Tanzanian', 'key' => 'TZ', 'sort_order' => 3],
            ['category' => 'nationality', 'value' => 'rwandan', 'label' => 'Rwandan', 'key' => 'RW', 'sort_order' => 4],
            ['category' => 'nationality', 'value' => 'burundian', 'label' => 'Burundian', 'key' => 'BI', 'sort_order' => 5],
            ['category' => 'nationality', 'value' => 'south_sudanese', 'label' => 'South Sudanese', 'key' => 'SS', 'sort_order' => 6],

            // Other African
            ['category' => 'nationality', 'value' => 'ethiopian', 'label' => 'Ethiopian', 'key' => 'ET', 'sort_order' => 10],
            ['category' => 'nationality', 'value' => 'somali', 'label' => 'Somali', 'key' => 'SO', 'sort_order' => 11],
            ['category' => 'nationality', 'value' => 'nigerian', 'label' => 'Nigerian', 'key' => 'NG', 'sort_order' => 12],
            ['category' => 'nationality', 'value' => 'south_african', 'label' => 'South African', 'key' => 'ZA', 'sort_order' => 13],
            ['category' => 'nationality', 'value' => 'egyptian', 'label' => 'Egyptian', 'key' => 'EG', 'sort_order' => 14],

            // Common International
            ['category' => 'nationality', 'value' => 'american', 'label' => 'American', 'key' => 'US', 'sort_order' => 20],
            ['category' => 'nationality', 'value' => 'british', 'label' => 'British', 'key' => 'GB', 'sort_order' => 21],
            ['category' => 'nationality', 'value' => 'indian', 'label' => 'Indian', 'key' => 'IN', 'sort_order' => 22],
            ['category' => 'nationality', 'value' => 'chinese', 'label' => 'Chinese', 'key' => 'CN', 'sort_order' => 23],
            ['category' => 'nationality', 'value' => 'other', 'label' => 'Other', 'key' => null, 'sort_order' => 999],

            // Countries (for residence) - East Africa
            ['category' => 'country', 'value' => 'kenya', 'label' => 'Kenya', 'key' => 'KE', 'sort_order' => 1],
            ['category' => 'country', 'value' => 'uganda', 'label' => 'Uganda', 'key' => 'UG', 'sort_order' => 2],
            ['category' => 'country', 'value' => 'tanzania', 'label' => 'Tanzania', 'key' => 'TZ', 'sort_order' => 3],
            ['category' => 'country', 'value' => 'rwanda', 'label' => 'Rwanda', 'key' => 'RW', 'sort_order' => 4],
            ['category' => 'country', 'value' => 'burundi', 'label' => 'Burundi', 'key' => 'BI', 'sort_order' => 5],
            ['category' => 'country', 'value' => 'south_sudan', 'label' => 'South Sudan', 'key' => 'SS', 'sort_order' => 6],

            // Other African
            ['category' => 'country', 'value' => 'ethiopia', 'label' => 'Ethiopia', 'key' => 'ET', 'sort_order' => 10],
            ['category' => 'country', 'value' => 'somalia', 'label' => 'Somalia', 'key' => 'SO', 'sort_order' => 11],
            ['category' => 'country', 'value' => 'nigeria', 'label' => 'Nigeria', 'key' => 'NG', 'sort_order' => 12],
            ['category' => 'country', 'value' => 'south_africa', 'label' => 'South Africa', 'key' => 'ZA', 'sort_order' => 13],
            ['category' => 'country', 'value' => 'egypt', 'label' => 'Egypt', 'key' => 'EG', 'sort_order' => 14],

            // International
            ['category' => 'country', 'value' => 'united_states', 'label' => 'United States', 'key' => 'US', 'sort_order' => 20],
            ['category' => 'country', 'value' => 'united_kingdom', 'label' => 'United Kingdom', 'key' => 'GB', 'sort_order' => 21],
            ['category' => 'country', 'value' => 'india', 'label' => 'India', 'key' => 'IN', 'sort_order' => 22],
            ['category' => 'country', 'value' => 'china', 'label' => 'China', 'key' => 'CN', 'sort_order' => 23],
            ['category' => 'country', 'value' => 'canada', 'label' => 'Canada', 'key' => 'CA', 'sort_order' => 24],
            ['category' => 'country', 'value' => 'australia', 'label' => 'Australia', 'key' => 'AU', 'sort_order' => 25],
            ['category' => 'country', 'value' => 'other', 'label' => 'Other', 'key' => null, 'sort_order' => 999],
        ];

        foreach ($options as $option) {
            SystemOption::updateOrCreate(
                [
                    'category' => $option['category'],
                    'value' => $option['value']
                ],
                [
                    'label' => $option['label'],
                    'key' => $option['key'] ?? null,
                    'sort_order' => $option['sort_order'],
                    'is_active' => true,
                ]
            );
        }

        $this->command->info('System options seeded successfully!');
    }
}
