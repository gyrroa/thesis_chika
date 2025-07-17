export interface ChildInput {
  nickname: string;
  age:      number;
  gender:   'male' | 'female';
}

export interface RegisterPayload {
  is_verified: boolean; //temp
  name:     string;
  email:    string;
  password: string;
  child:    ChildInput;
}

export interface RegisterResponse {
  access_token:  string;
  refresh_token: string;
  token_type:    'bearer';
}

export interface FieldError {
  loc:  (string | number)[];
  msg:  string;
  type: string;
}

export interface ValidationErrorResponse {
  detail: FieldError[];
}
