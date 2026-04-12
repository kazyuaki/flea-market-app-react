<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // 認証済み前提ならOK
    }


    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'regex:/^\d{3}-\d{4}$/'],
            'address' => ['required', 'string', 'max:255'],
            'building_name' => ['nullable', 'string', 'max:255'],
            'phone_number' =>  ['required', 'regex:/^[0-9\-]+$/', 'max:20'],
            'image' =>  ['nullable', 'image', 'mimes:jpeg,png', 'max:2048'], // 画像は任意、最大2MB
        ];
    }
}