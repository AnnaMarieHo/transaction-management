<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Address;
use Illuminate\Support\Facades\DB;

class ReceiptStatsService
{

    public function getSummaryStats($addressId = null)
    {
        $query = Transaction::query();


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
        return Transaction::query()
            ->select('b_city', DB::raw('SUM(sale_total) as total'))
            ->groupBy('b_city')
            ->orderByDesc('total')
            ->get();
    }

    /**
     * Get most active users (by transaction count)
     */
    public function getMostActive($limit = 3)
    {
        $addresses = Address::all();

        return $addresses->map(function($address) {
            // Count transactions as buyer OR seller
            $buyerCount = Transaction::where('b_id', $address->id)->count();
            $sellerCount = Transaction::where('s_id', $address->id)->count();
            $totalCount = $buyerCount + $sellerCount;

            // Calculate total value
            $buyerValue = Transaction::where('b_id', $address->id)->sum('sale_total');
            $sellerValue = Transaction::where('s_id', $address->id)->sum('sale_total');
            $totalValue = $buyerValue + $sellerValue;

            return [
                'name' => $address->last_name,
                'count' => $totalCount,
                'value' => $totalValue,
            ];
        })
        ->filter(fn($user) => $user['count'] > 0) // Only include active users
        ->sortByDesc('count')
        ->take($limit)
        ->values()
        ->toArray();
    }

    /**
     * Get top markets with market share percentage
     */
    public function getTopMarkets($limit = 3)
    {
        $totalVolume = Transaction::sum('sale_total');
        
        $cityVolume = Transaction::query()
            ->select('b_city', DB::raw('SUM(sale_total) as total'))
            ->groupBy('b_city')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        return $cityVolume->map(function($market) use ($totalVolume) {
            return [
                'name' => str_replace('_', ' ', $market->b_city),
                'total' => $market->total,
                'share' => $totalVolume > 0 
                    ? round(($market->total / $totalVolume) * 100, 1) 
                    : 0,
            ];
        })->toArray();
    }

    /**
     * Get top trading partners for a specific address
     * Uses application-level logic to avoid complex SQL joins
     */
    public function getTopPartners($addressId, $limit = 3)
    {
        // Get all transactions involving this address
        $transactions = Transaction::query()
            ->where(function($q) use ($addressId) {
                $q->where('b_id', $addressId)->orWhere('s_id', $addressId);
            })
            ->get();

        // Group by partner and calculate stats
        $partnerStats = $transactions->groupBy(function($transaction) use ($addressId) {
            // Get the partner ID (the other party in the transaction)
            return $transaction->b_id == $addressId 
                ? $transaction->s_id 
                : $transaction->b_id;
        })->map(function($partnerTransactions, $partnerId) use ($addressId) {
            // Load the partner's address info
            $partner = Address::find($partnerId);
            
            if (!$partner) return null;

            // Calculate buy/sell counts
            $buys = $partnerTransactions->where('b_id', $addressId)->count();
            $sells = $partnerTransactions->where('s_id', $addressId)->count();
            $totalValue = $partnerTransactions->sum('sale_total');

            return [
                'id' => $partnerId,
                'name' => trim($partner->first_name . ' ' . $partner->last_name),
                'company' => $partner->company,
                'buys' => $buys,
                'sells' => $sells,
                'totalValue' => $totalValue,
            ];
        })
        ->filter() // Remove null entries
        ->sortByDesc('totalValue') // Sort by total value
        ->take($limit) // Take top N
        ->values() // Re-index array
        ->toArray();

        return $partnerStats;
    }
}
