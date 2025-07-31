// src/features/users/types.ts
export interface UpdateUserPayload {
  name: string;
  email: string;
  password: string;
  verify_password: string;
}

export interface UpdateUserResponse {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
}

export interface UpdateChildPayload {
  nickname: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | string;
}

export interface Child {
  id: string;
  nickname: string;
  age: number;
  gender: string;
}

export interface FieldError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ValidationErrorResponse {
  detail: FieldError[];
}
