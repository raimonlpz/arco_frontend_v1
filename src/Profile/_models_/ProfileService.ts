import { ProfileDTO } from "./ProfileDTO";
import { ProfileError } from "./ProfileError";
import { ProfileResponse } from "./ProfileResponse";

export interface IProfileService {
    getMyProfile(token: string): Promise<ProfileResponse | ProfileError | Error>;
    patchMyProfile(token: string, profile: ProfileDTO): Promise<ProfileResponse | ProfileError | Error>;
    getProfileById(token: string, userId: string | number): Promise<ProfileResponse | ProfileError | Error>;
    mapType<T extends Object>(
        I: T
    ): ProfileResponseType;
}

export type ProfileResponseType = 'ProfileResponse' | 'ProfileError' | 'Error';
