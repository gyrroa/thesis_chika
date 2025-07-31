// src/features/users/context/UserContext.tsx
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';
import type { UpdateUserPayload } from '../types';

const defaultUserForm: UpdateUserPayload = {
    name: '',
    email: '',
    password: '',
    verify_password: '',
};

type UserFormContextType = {
    form: UpdateUserPayload;
    setForm: Dispatch<SetStateAction<UpdateUserPayload>>;
    reset: () => void;
};

const UserFormContext = createContext<UserFormContextType | undefined>(undefined);

export function UserFormProvider({ children }: { children: ReactNode }) {
    const [form, setForm] = useState<UpdateUserPayload>(defaultUserForm);
    const reset = () => setForm(defaultUserForm);

    return (
        <UserFormContext.Provider value={{ form, setForm, reset }}>
            {children}
        </UserFormContext.Provider>
    );
}

export function useUserForm(): UserFormContextType {
    const ctx = useContext(UserFormContext);
    if (!ctx) {
        throw new Error('useUserForm must be used within a UserFormProvider');
    }
    return ctx;
}
