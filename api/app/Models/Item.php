<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    // アイテムの属性を定義
    protected $fillable = [
        'user_id',
        'name',
        'brand',
        'price',
        'description',
        'image_url',
        'condition',
        'status',
    ];

    // アイテムの属性の型を定義
    protected $casts = [
        'price' => 'integer',
    ];

    // アイテムとユーザーのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // アイテムとお気に入りのリレーション
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // アイテムとコメントのリレーション
    public function comments()
    {
        return $this->hasMany('App\\Models\\Comment');
    }

    // アイテムと画像のリレーション
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    // アイテムと取引のリレーション
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // アイテムとカテゴリーのリレーション
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
}
