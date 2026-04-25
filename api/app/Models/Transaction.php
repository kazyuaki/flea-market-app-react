<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'user_id'];

    // 取引は1つの商品に紐づく
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    // 取引は1人の購入者に紐づく
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}