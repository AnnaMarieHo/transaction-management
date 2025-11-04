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
        
        // $addresses = DB::select('select * from addresses');

        $addresses = Address::orderBy('updated_at', 'desc')->get();
        // $addresses = Address::all();
        
        Log::debug('addresses', ['addresses' => $addresses->toArray()]);
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
        // Accept either nested payload under 'editData' (from frontend) or top-level fields
        $input = $request->input('editData', $request->all());

        // Validate only fields that are present (partial update)
        $validated = validator($input, [
            'first_name'     => ['sometimes', 'nullable', 'max:255'],
            'last_name'      => ['sometimes', 'nullable', 'max:255'],
            'phone'          => ['sometimes', 'nullable', 'max:255'],
            'company'        => ['sometimes', 'required', 'max:255'],
            'address_line1'  => ['sometimes', 'required', 'max:255'],
            'address_line2'  => ['sometimes', 'nullable', 'max:255'],
            'room_num'       => ['sometimes', 'nullable', 'max:255'],
            'city'           => ['sometimes', 'required', 'max:255'],
            'state'          => ['sometimes', 'required', 'max:255'],
            'zip'            => ['sometimes', 'required', 'max:255'],
        ])->validate();

        $address = Address::findOrFail($id);
        $address->fill($validated);
        $address->save();

        Log::debug('Address updated', ['id' => $address->id, 'changes' => $validated]);

        return response()->json([
            'message' => 'success',
            'data' => $address,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Log::debug('delet item with id: ', ['id', $id]);
        $address = Address::findOrFail($id);
        Log::debug('delet address with id: ', ['id', $address]);
    
        $address->delete();

        return response()->json([
            'message' => 'success'
        ], 201);
    }
}
