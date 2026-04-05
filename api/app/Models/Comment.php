<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'item_id',
        'content',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}