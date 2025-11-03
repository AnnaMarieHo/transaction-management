<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'company',
        'address_line1',
        'address_line2',
        'root_num',
        'city',
        'state',
        'zip'
    ];
}
