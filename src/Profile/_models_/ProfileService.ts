import { ProfileDTO } from "./ProfileDTO";


export interface IProfileService {
    getMyProfile(token: string): Promise<any>;
    patchMyProfile(token: string, profile: ProfileDTO): Promise<any>;
    getProfileById(token: string, userId: string | number): Promise<any>;
    mapType<T extends Object>(
        I: T
    ): any;
}


