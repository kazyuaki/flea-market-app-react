import type { Category } from './category'

/** 商品の型定義 */ 
export type Item = {
  id: number
  name: string
  brand: string
  price: number
  description: string
  image_url: string
  condition: number
  status: string
  favorites_count: number
  comments_count: number
  comments: {
    id: number
    content: string
    user: {
      name: string
    }
  }[]
  categories: Category[]
  color: string
}

/** 商品出品フォームの型定義 */
export type ItemForm = {
  name: string
  brand: string
  description: string
  price: number | ''
  category_id: number | null
  condition: number | null
  images: File[]
}