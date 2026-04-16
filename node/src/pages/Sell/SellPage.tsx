import type { ChangeEvent } from "react"
import axios from "../../lib/axios"
import Header from "../../components/Layouts/Header/Header"
import { useExhibitionForm } from "../../hooks/useExhibitionForm"
import { CATEGORY_OPTIONS } from "../../constants/category/category"
import { CONDITION_OPTIONS } from "../../constants/condition/item"

/** 商品出品ページのコンポーネント */
export const SellPage = () => {
  const { form, handleChange } = useExhibitionForm();

  // 画像ファイルの変更を処理するハンドラー関数
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleChange("images", Array.from(e.target.files))
    }
  }

  const categories = CATEGORY_OPTIONS.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ))

  const conditions = CONDITION_OPTIONS.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ))

  const validate = () => {
    const errors: string[] = []
    if (!form.name) errors.push("商品名は必須です")
    if (!form.price) errors.push("価格は必須です")
    if (!form.category_id) errors.push("カテゴリーは必須です")
    if (!form.condition) errors.push("商品の状態は必須です")
    return errors
  }

  // フォームの内容をサーバーに送信する関数
  const handleSubmit = async () => {
    const errors = validate();
    if (errors.length > 0) {
      console.log(errors);
      return;
    }

    const formData = new FormData()

    formData.append("name", form.name)
    formData.append("brand", form.brand)
    formData.append("description", form.description)
    formData.append("price", form.price.toString())
    if (form.category_id !== null) {
      formData.append("category_id", form.category_id.toString())
    }
    if (form.condition !== null) {
      formData.append("condition", form.condition.toString())
    }

    if (form.images.length > 0) {
      form.images.forEach((image) => {
        formData.append("images", image)
      })
    }

    await axios.post("/api/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

return (
  <>
    <Header />

    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold text-center mb-6">商品の出品</h1>

        {/* 画像 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">商品の画像</h2>

          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
            クリックして画像を選択
            <input
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />
          </label>

          {form.images.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {form.images.length}枚選択中
            </p>
          )}
        </div>

        {/* 商品詳細 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">商品の詳細</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">カテゴリー</label>
            <select
              value={form.category_id || ""}
              onChange={(e) =>
                handleChange(
                  "category_id",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                カテゴリーを選択してください
              </option>
              {categories}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">商品の状態</label>
            <select
              value={form.condition || ""}
              onChange={(e) =>
                handleChange(
                  "condition",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                商品の状態を選択してください
              </option>
              {conditions}
            </select>
          </div>
        </div>

        {/* 商品情報 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">商品情報</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">商品名</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">ブランド</label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">商品の説明</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 h-24"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">販売価格</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                handleChange(
                  "price",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition"
        >
          出品する
        </button>
      </div>
    </div>
  </>
);
}
