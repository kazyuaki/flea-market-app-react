export type ProfileInput = {
  name: string;
  postal_code: string;
  address: string;
  building_name?: string;
  phone_number: string;
};

export type ProfileForm = {
  name: string;
  postal_code: string;
  address: string;
  building_name: string;
  phone_number: string;
};

export type ProfileUser = {
  name?: string | null;
  postal_code?: string | null;
  address?: string | null;
  building_name?: string | null;
  phone_number?: string | null;
};
