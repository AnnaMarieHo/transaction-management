<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReceiptStatsService; // Add this import!
use Illuminate\Support\Facades\Log;


class StatsController extends Controller
{
    protected $statsService;

    public function __construct(ReceiptStatsService $statsService)
    {
        $this->statsService = $statsService;
    }

    public function index() {
        return response()->json([
            'topSpenders' => $this->statsService->getTopSpenders(),
            'markets'     => $this->statsService->getCityVolume(),
        ]);
    }

    public function getUserStats($addressId) {
        Log::denug("current address Id: ", ['addresId', $addressId]);
        return response()->json(
            $this->statsService->getSummaryStats($addressId)
        );
    }

    public function getPartners($addressId) {
        return response()->json([
            'partnerships' => $this->statsService->getPartnerStats($addressId),
        ]);
    }
}