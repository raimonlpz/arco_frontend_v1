import create from 'zustand';

export interface IAuthStore {
    access_token: string | null;
    session_id: number | null;
    session_email: string | null;
    dataLoaded: boolean;
    setToken: (session: string) => void;
    setSessionData: (id: number, email: string) => void;
    removeSessionData: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    access_token: null,
    session_id: null,
    session_email: null,
    dataLoaded: false,
    setToken: (session: string) => 
        set((state) => ({ 
            ...state,
            access_token: session
        })),
    setSessionData: (id, email) =>
        set((state) => ({
            ...state,
            session_id: id, 
            session_email: email,
            dataLoaded: true
        })),
    removeSessionData: () =>
        set((state) => ({
            ...state,
            session_id: null, 
            session_email: null,
            access_token: null,
            dataLoaded: true
        }))
}));

