import create from 'zustand';

export interface IAuthStore {
    access_token: string | null;
    setToken: (session: string) => void;
    removeToken: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    access_token: null,
    setToken: (session: string) => 
        set((_) => ({ access_token: session })),
    removeToken: () =>
        set((_) => ({ access_token: null }))
}));

