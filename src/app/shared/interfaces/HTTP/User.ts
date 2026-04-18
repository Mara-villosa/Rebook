// /user/get
export interface GetUserDataResponse {
  email: string;
  name: string;
  lastname: string;
  id_document: string;
  birthday: string;
  city: string;
  address: string;
  postal_code: string;
  phone: string;
  card_name?: string;
  card_number?: string;
  cvv?: string;
}

// /user/update
export interface UpdateUserRequest {
  name?: string;
  lastname?: string;
  oldPassword?: string;
  newPassword?: string;
  id_document?: string;
  birthday?: string;
  city?: string;
  address?: string;
  postal_code?: string;
  phone?: string;
  card_name?: string;
  card_number?: string;
  cvv?: string;
}

export interface UpdateUserResponse {
  message: string;
}
