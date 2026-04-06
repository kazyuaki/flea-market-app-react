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

    // コメントとユーザーのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // コメントとアイテムのリレーション
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}