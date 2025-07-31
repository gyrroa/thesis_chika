// src/contexts/LoginContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import type { LoginPayload } from '../types';

// 1️⃣ Define the default login form shape
const defaultLoginForm: LoginPayload = {
  grant_type:    'password',
  username:      '',
  password:      '',
  scope:         '',
  client_id:     null,
  client_secret: null,
};

type LoginFormContextType = {
  form:    LoginPayload;
  setForm: Dispatch<SetStateAction<LoginPayload>>;
  reset:   () => void;
};

const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);

export function LoginFormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<LoginPayload>(defaultLoginForm);
  const reset = () => setForm(defaultLoginForm);

  return (
    <LoginFormContext.Provider value={{ form, setForm, reset }}>
      {children}
    </LoginFormContext.Provider>
  );
}

export function useLoginForm(): LoginFormContextType {
  const ctx = useContext(LoginFormContext);
  if (!ctx) {
    throw new Error('useLoginForm must be used within a LoginFormProvider');
  }
  return ctx;
}
