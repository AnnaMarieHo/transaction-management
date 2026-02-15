<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Transaction;


class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaction = Transaction::OrderBy('sale_date', 'desc')->get();
        Log::debug('transactions:', ['transactions' => $transaction->toArray()]);

        return response()->json($transaction);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'seller_name' => ['required', 'max:255'],
            's_id' => ['required', 'unique:reciepts,s_id'],
            's_address' => ['required', 'max:255'],
            's_room_num' => ['nullable', 'max:255'],
            's_city' => ['required', 'max:255'],
            's_state' => ['required', 'max:255'],
            's_zip' => ['required', 'max:255'],
            'buyer_name' => ['required', 'max:255'],
            'b_id' => ['required', 'unique:reciepts,b_id'],
            'b_address' => ['required', 'max:255'],
            'b_room_num' => ['nullable', 'max:255'],
            'b_city' => ['required', 'max:255'],
            'b_state' => ['required', 'max:255'],
            'b_zip' => ['required', 'max:255'],
            'sale_total' => ['required', 'numeric'],
            'num_items' => ['required', 'integer', 'min:0'],
            'sale_date' => ['required', 'date'],
            'image' => ['nullable', 'image', 'max:2048'],
            'highest_prices' => ['required', 'string'],
        ]);

        if ($request->hasFile('image')) {
            $validatedRequest['image'] = $request->file('image')->store('receipts', 'public');
        } else {
            $validatedRequest['image'] = null;
        }

        $transaction = Transaction::create($validatedRequest);

         Log::debug('transaction: ', ['transaction', $transaction->toArray()]);

         return response()->json([
            'message' => 'success',
            'data' => $transaction
         ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
