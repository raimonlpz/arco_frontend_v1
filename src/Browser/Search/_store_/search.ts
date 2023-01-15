import create from 'zustand';

export interface ISearchStore {
    query: string | null;
    setQuery: (query: string) => void;
    removeQuery: () => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
    query: null,
    setQuery: (query: string) => 
        set((state) => ({
            ...state, 
            query
        })),
    removeQuery: () => 
        set((state) => ({
            ...state,
            query: null
        }))
}));