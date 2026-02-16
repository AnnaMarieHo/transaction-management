<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'reciepts';
    protected $fillable = [
        'reciept_id',
        'seller_name',
        's_id', 
        's_address',
        's_room_num',
        's_city',
        's_state',
        's_zip',
        'buyer_name',
        'b_id',
        'b_address', 
        'b_room_num', 
        'b_city', 
        'b_state', 
        'b_zip', 
        'sale_total',
        'num_items', 
        'sale_date', 
        'image', 
        'highest_prices', 
    ];

    public function buyer()
    {
        return $this->belongsTo(Address::class, 'b_id');
    }

    public function seller()
    {
        return $this->belongsTo(Address::class, 's_id');
    }
}
