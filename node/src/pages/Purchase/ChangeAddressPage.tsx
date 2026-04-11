import Header from '../../components/Header/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { updateAddress } from '../../api/address'


/** 配送先変更画面 */
export const ChangeAddressPage = () => {
  const navigate = useNavigate()

  // 住所フォームの状態
  const [form, setForm] = useState({
    postal_code: '',
    address: '',
    building_name: ''
  })

  // バリデーションエラーの状態
  const [errors, setErrors] = useState < {
    postal_code?: string[]
    address?: string[]
    building_name?: string[]
  }>({})

  // エラーがあるかどうか
  const hasErrors = Object.keys(errors).length > 0

  // 住所変更の送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
                        onChange={(e) => 
                          setForm({ ...form, postal_code: e.target.value})
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                      <p className="mt-2 text-sm text-red-500">
                        {errors.postal_code?.[0]}
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
                        onChange={(e) => 
                          setForm({ ...form, address: e.target.value})
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                      <p className="mt-2 text-sm text-red-500">
                        {errors.address?.[0]}
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
                        onChange={(e) => 
                          setForm({ ...form, building_name: e.target.value})
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                      <p className="mt-2 text-sm text-red-500">
                        {errors.building_name?.[0]}
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
