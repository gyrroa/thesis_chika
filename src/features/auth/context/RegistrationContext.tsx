// src/contexts/RegistrationContext.tsx
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import type { RegisterPayload } from '../types';

const defaultForm: RegisterPayload = {
  is_verified: true, //temp
  name:        '',
  email:       '',
  password:    '',
  child:       [
    { nickname: '', age: 6, gender: 'MALE' }
  ],  
};

type RegCtx = {
  form:     RegisterPayload;
  setForm:  Dispatch<SetStateAction<RegisterPayload>>;
  reset:    () => void;
};

const RegistrationContext = createContext<RegCtx | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<RegisterPayload>(defaultForm);
  const reset = () => setForm(defaultForm);
  return (
    <RegistrationContext.Provider value={{ form, setForm, reset }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration(): RegCtx {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error('useRegistration must be under RegistrationProvider');
  return ctx;
}
