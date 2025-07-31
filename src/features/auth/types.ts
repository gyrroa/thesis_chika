// type.ts
export interface ChildInput {
  nickname: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
}

export interface RegisterPayload {
  is_verified: boolean; //temp
  name: string;
  email: string;
  password: string;
  child: ChildInput[];
}

export type RegisterResponse = {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  user: {
    id: string;
    name: string;
    email: string;
    is_verified: boolean;
  };
};

export interface FieldError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ValidationErrorResponse {
  detail: FieldError[];
}

export interface LoginPayload {
  grant_type?: 'password';
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  user: User;
}

export interface RefreshPayload {
  refresh_token: string;
}

export interface IsEmailExistingQuery {
  email: string;
}

export type IsEmailExistingResponse = boolean;

export type RefreshResponse = LoginResponse;

export type VerifyTokenResponse = string;

export type AuthResponse = RegisterResponse | LoginResponse | RefreshResponse;