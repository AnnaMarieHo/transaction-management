<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\DB;


class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $addresses = DB::select('select * from addresses');

        Log::debug('addresses:', $addresses);

        return response()->json($addresses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'first_name' => ['nullable', 'max:255'],
            'last_name'  => ['required', 'max:255'],
            'phone'      => ['nullable', 'max:255'],
            'company'    => ['nullable', 'unique:addresses','max:255'],
            'address_line1'    => ['required', 'unique:addresses', 'max:255'],
            'address_line2'    => ['nullable', 'max:255'],
            'room_num'   => ['nullable', 'max:255'],
            'city'       => ['required', 'max:255'],
            'state'      => ['required', 'max:255'],
            'zip'        => ['required'],
        ]);

        $address = Address::create($validate);

        Log::debug('address: ', ['address', $address]);

        return response()->json([
            'messasge' => 'success',
            'data' => $address
        ], 201);
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
