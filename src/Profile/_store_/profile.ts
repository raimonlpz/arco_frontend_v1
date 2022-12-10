import create from 'zustand';
import { ProfileResponse } from '../_models_';

export interface IProfileStore {
    profile: ProfileResponse;
    setProfile: (data: ProfileResponse) => void;
}

export const useProfileStore = create<IProfileStore>((set) => ({
    profile: {},
    setProfile: (data) => 
        set((state) => ({
            ...state, 
            profile: {
                ...state.profile,
                ...data
            }
        }))
}))