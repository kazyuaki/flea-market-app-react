import Header from '../../components/Header/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { updateAddress } from '../../api/address'

type AddressErrors = {
  postal_code?: string[]
  address?: string[]
  building_name?: string[]
}

type AddressForm = {
  postal_code: string
  address: string
  building_name: string
}

/** 配送先変更バリデーション */
const validateAddress = (form: AddressForm): AddressErrors => {
  const nextErrors: AddressErrors = {}

  if (!form.postal_code.trim()) {
    nextErrors.postal_code = ['郵便番号を入力してください']
  } else if (!/^\d{3}-\d{4}$/.test(form.postal_code)) {
    nextErrors.postal_code = ['郵便番号は「123-4567」の形式で入力してください']
  }

  if (!form.address.trim()) {
    nextErrors.address = ['住所を入力してください']
  } else if (form.address.length > 255) {
    nextErrors.address = ['住所は255文字以内で入力してください']
  }

  if (form.building_name.length > 255) {
    nextErrors.building_name = ['建物名は255文字以内で入力してください']
  }

  return nextErrors
}


/** 配送先変更画面 */
export const ChangeAddressPage = () => {
  const navigate = useNavigate()

  // 住所フォームの状態
  const [form, setForm] = useState<AddressForm>({
    postal_code: '',
    address: '',
    building_name: ''
  })

  // バリデーションエラーの状態
  const [errors, setErrors] = useState<AddressErrors>({})

  const clientErrors = validateAddress(form)
  const displayErrors = {
    ...clientErrors,
    ...errors,
  }

  // エラーがあるかどうか
  const hasErrors =
    Object.keys(clientErrors).length > 0 ||
    Object.keys(errors).length > 0

  // 住所変更の送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasErrors) {
      return
    }

    try {
      await updateAddress(form)
      navigate(-1)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors)
        } else {
          alert('サーバーエラーが発生しました')
        }
      }
    }
  }

  return (
    <>
      <Header />
          <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-[1000px] mx-auto flex gap-10">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 text-center">住所の変更</h2>
                      
                {/* 住所変更フォーム */}
                <div className="bg-white p-10 rounded shadow max-w-[800px] mx-auto">
                  <form onSubmit={handleSubmit}>

                    {/* 郵便番号 */}
                    <div className="mb-8">
                      <label className="block text-xl font-bold mb-2">
                        郵便番号
                      </label>
                      <input
                        type="text"
                        value={form.postal_code}
                        onChange={(e) => {
                          setForm({ ...form, postal_code: e.target.value })
                          setErrors((prev) => ({ ...prev, postal_code: undefined }))
                        }}
                        className="w-full border px-3 py-2 rounded"
                      />
                      <p className="mt-2 text-sm text-red-500">
                        {displayErrors.postal_code?.[0]}
                      </p>
                    </div>
                
                    {/* 住所 */}
                    <div className="mb-8">
                      <label className="block text-xl font-bold mb-2">
                        住所
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => {
                          setForm({ ...form, address: e.target.value })
                          setErrors((prev) => ({ ...prev, address: undefined }))
                        }}
                        className="w-full border px-3 py-2 rounded"
                      />
                      <p className="mt-2 text-sm text-red-500">
                        {displayErrors.address?.[0]}
                      </p>
                    </div>
                
                  {/* 建物名 */}
                    <div className="mb-8">
                      <label className="block text-xl font-bold mb-2">
                        建物名
                      </label>
                      <input
                        type="text"
                        value={form.building_name}
                        onChange={(e) => {
                          setForm({ ...form, building_name: e.target.value })
                          setErrors((prev) => ({ ...prev, building_name: undefined }))
                        }}
                        className="w-full border px-3 py-2 rounded"
                      />
                      <p className="mt-2 text-sm text-red-500">
                        {displayErrors.building_name?.[0]}
                      </p>
                    </div>

                  {/* 送信ボタン */}
                  <div className="flex justify-center">
                    <button
                    type="submit"
                    disabled={hasErrors}
                    className={`
                      w-full py-3 rounded font-bold text-white
                      ${hasErrors
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600'}
                    `}
                    >
                      変更を保存
                    </button>
                  </div>
                    
                  </form>
                </div>
             </div>
          </div>
        </div>
    </>
  )
}
