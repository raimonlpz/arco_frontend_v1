import { FollowResponse } from "./FollowResponse";
import { ProfileDTO } from "./ProfileDTO";
import { ProfileError } from "./ProfileError";
import { ProfileResponse } from "./ProfileResponse";

export interface IProfileService {
    follow(token: string, followingId: number): Promise<FollowResponse | ProfileError | Error>;
    unfollow(token: string, followingId: number): Promise<FollowResponse | ProfileError | Error>;
    getMyProfile(token: string): Promise<ProfileResponse | ProfileError | Error>;
    patchMyProfile(token: string, profile: ProfileDTO): Promise<ProfileResponse | ProfileError | Error>;
    getProfileById(token: string, userId: string | number): Promise<ProfileResponse | ProfileError | Error>;
    getProfileFollowsByIds(token: string, userIds: number[]): Promise<ProfileResponse[] | ProfileError | Error>;
    mapType<T extends Object>(
        I: T
    ): ProfileResponseType;
}

export type ProfileResponseType = 
    | 'ProfileResponse' 
    | 'ProfilesArrayResponse' 
    | 'FollowResponse'
    | 'ProfileError' 
    | 'Error';
