import type { ItemForm } from "../types/ItemForm";

export const buildFormData = (form: ItemForm): FormData => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("brand", form.brand);
  formData.append("description", form.description);
  formData.append("price", form.price.toString());
  form.category_ids.forEach((categoryId) => {
    formData.append("category_ids[]", categoryId.toString());
  });

  if (form.condition !== null) {
    formData.append("condition", form.condition.toString());
  };

	form.images.forEach((image) => {
		formData.append("images[]", image);
	});

	return formData;
};