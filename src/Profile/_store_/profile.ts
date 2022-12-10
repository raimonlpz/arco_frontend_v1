import create from 'zustand';
import { ProfileDTO } from '../_models_';

export interface IProfileStore {
    profile: ProfileDTO;
    setProfile: (data: ProfileDTO) => void;
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