<?php

namespace App\Services;

use App\Models\Receipt;
use App\Models\Address;
use Illuminate\Support\Facades\DB;

class ReceiptStatsService
{

    public function getSummaryStats($addressId = null)
    {
        $query = Receipt::query();
        

        if ($addressId) {
            $query->where(function($q) use ($addressId) {
                $q->where('b_id', $addressId)->orWhere('s_id', $addressId);
            });
        }

        $stats = $query->selectRaw('
            COUNT(*) as count, 
            SUM(sale_total) as total_volume, 
            AVG(sale_total) as average_sale
        ')->first();

        return [
            'totalVolume' => $stats->total_volume ?? 0,
            'average'     => $stats->average_sale ?? 0,
            'count'       => $stats->count ?? 0,
        ];
    }
    
    public function getTopSpenders($limit = 3)
    {
        return Address::whereHas('buyerReceipts') 
            ->withSum('buyerReceipts as total_spent', 'sale_total')
            ->withAvg('buyerReceipts as avg_spent', 'sale_total')
            ->withSum('buyerReceipts as total_items', 'num_items')
            ->orderByDesc('total_spent')
            ->limit($limit)
            ->get()
            ->map(fn($addr) => [
                'name'  => $addr->first_name,
                'total' => $addr->total_spent,
                'avg'   => round($addr->avg_spent),
                'items' => $addr->total_items,
            ]);
    }

    public function getCityVolume()
    {
        return Receipt::query()
            ->select('b_city', DB::raw('SUM(sale_total) as total'))
            ->groupBy('b_city')
            ->orderByDesc('total')
            ->get();
    }

    public function getPartnerStats($addressId)
    {
        return Receipt::query()
            ->where(function($q) use ($addressId) {
                $q->where('b_id', $addressId)->orWhere('s_id', $addressId);
            })
            ->selectRaw("
                CASE WHEN b_id = ? THEN s_id ELSE b_id END as partner_id,
                COUNT(*) as transaction_count,
                SUM(sale_total) as total_value
            ", [$addressId, $addressId]) 
            ->groupBy('partner_id')
            ->join('addresses', 'addresses.id', '=', DB::raw('partner_id'))
            ->selectRaw('addresses.first_name, addresses.last_name, addresses.company')
            ->get();
    }
}
