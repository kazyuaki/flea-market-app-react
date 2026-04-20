<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'integer', 'min:1'],
            'category_ids' => ['required', 'array', 'min:1'],
            'category_ids.*' => ['required', 'integer', 'exists:categories,id'],
            'condition' => ['required', 'integer', 'between:1,4'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:2048'],
        ];
    }

    /* バリデーションエラーメッセージのカスタマイズ */
    public function messages(): array
    {
        return [
            'name.required' => '商品名は必須です。',
            'name.string' => '商品名は文字列でなければなりません。',
            'name.max' => '商品名は255文字以内でなければなりません。',
            'brand.string' => 'ブランドは文字列でなければなりません。',
            'brand.max' => 'ブランドは255文字以内でなければなりません。',
            'description.string' => '説明は文字列でなければなりません。',
            'price.required' => '価格は必須です。',
            'price.integer' => '価格は整数でなければなりません。',
            'price.min' => '価格は1以上でなければなりません。',
            'category_ids.required' => 'カテゴリーは必須です。',
            'category_ids.array' => 'カテゴリーは配列でなければなりません。',
            'category_ids.min' => '少なくとも1つのカテゴリーを選択してください。',
            'category_ids.*.required' => '各カテゴリーIDは必須です。',
            'category_ids.*.integer' => '各カテゴリーIDは整数でなければなりません。',
            'category_ids.*.exists' => '選択されたカテゴリーIDが存在しません。',
            'condition.required' => '商品の状態は必須です。',
            'condition.integer' => '商品の状態は整数でなければなりません。',
            'condition.between' => '商品の状態は1から4の間でなければなりません。',
            'images.required' => '画像は必須です。',
            'images.array' => '画像は配列でなければなりません。',
            'images.min' => '少なくとも1枚の画像をアップロードしてください。',
            'images.*.required' => '各画像ファイルは必須です。',
            'images.*.image' => '各ファイルは画像でなければなりません。',
            'images.*.mimes' => '各画像ファイルの形式はjpeg、jpg、png、webp、gifのいずれかでなければなりません。',
            'images.*.max' => '各画像ファイルのサイズは2MB以下でなければなりません。',
        ];
    }
}
