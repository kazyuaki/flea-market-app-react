import type { Category } from './category';

/** 商品の型定義 */ 
export type Item = {
  id: number;
  user_id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image_url: string;
  condition: number;
  status: "selling" | "sold";
  favorites_count: number;
  comments_count: number;
  comments: {
    id: number;
    content: string;
    user: {
      name: string;
      profile_image_url?: string | null;
    };
  }[];
  categories: Category[];
  color: string;
  is_favorited: boolean;
};

/** 商品出品フォームの型定義 */
export type ItemForm = {
  name: string;
  brand: string;
  color: string;
  description: string;
  price: number | '';
  category_ids: number[];
  condition: number | null;
  images: File[];
};
