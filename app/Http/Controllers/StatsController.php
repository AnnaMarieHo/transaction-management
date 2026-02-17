<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReceiptStatsService; 
use Illuminate\Support\Facades\Log;


class StatsController extends Controller
{
    protected $statsService;

    public function __construct(ReceiptStatsService $statsService)
    {
        $this->statsService = $statsService;
    }

    /**
     * Get global stats (all users)
     */
    public function index()
    {
        return response()->json([
            'topSpenders' => $this->statsService->getTopSpenders(7),
            'mostActive' => $this->statsService->getMostActive(7),
            'topMarkets' => $this->statsService->getTopMarkets(7),
        ]);
    }

    /**
     * Get stats for a specific user
     */
    public function getUserStats($addressId)
    {
        return response()->json(
            $this->statsService->getSummaryStats($addressId)
        );
    }

    /**
     * Get top partners for a specific user
     */
    public function getPartners($addressId)
    {
        return response()->json(
            $this->statsService->getTopPartners($addressId, 7)
        );
    }
}