<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('item_id')->constrained()->cascadeOnDelete();
            $table->integer('payment_method')->comment('0: クレジットカード, 1: PayPal, 2: 銀行振込');
            $table->integer('status')->comment('0: 注文受付, 1: 支払い完了, 2: 発送準備中, 3: 発送済み, 4: 配達完了, 5: キャンセル');
            $table->string('shipping_postal_code');
            $table->string('shipping_address');
            $table->string('shipping_building')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
