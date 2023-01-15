import { API_ROUTES } from "../../Shared/_utils_/api";
import { ProfileDTO, IProfileService, ProfileError, ProfileResponse, ProfileResponseType } from "../_models_";
import { FollowResponse } from "../_models_/FollowResponse";


export class ProfileService implements IProfileService {


    follow = async (token: string, followingId: number): Promise<FollowResponse | ProfileError | Error> => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                followingId
            })
        }

        return await fetch(API_ROUTES.FOLLOWS.follow, requestOptions)
            .then((res: Response) => res.json())
            .then((data) => data)
            .catch((error: Error) => error);

    }


    unfollow = async (token: string, followingId: number): Promise<FollowResponse | ProfileError | Error> => {

        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                followingId
            })
        }

        return await fetch(API_ROUTES.FOLLOWS.unfollow, requestOptions)
            .then((res: Response) => res.json())
            .then((data) => data)
            .catch((error: Error) => error);
    } 


    getMyProfile = async (token: string): Promise<ProfileResponse | ProfileError | Error> => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await fetch(API_ROUTES.PROFILE.me, requestOptions) 
            .then((res: Response) => res.json())
            .then((data: ProfileError | ProfileResponse) => data)
            .catch((error: Error) => error);
    }


    getProfileById = async (token: string, userId: string | number): Promise<ProfileResponse | ProfileError | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.PROFILE.byId(userId), requestOptions) 
            .then((res: Response) => res.json())
            .then((data: ProfileError | ProfileResponse) => data)
            .catch((error: Error) => error);
    }


    getProfileFollowsByIds = async (token: string, userIds: number[]): Promise<ProfileResponse[] | ProfileError | Error> => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.PROFILE.byIds(userIds), requestOptions)
            .then((res: Response) => res.json())
            .then((data: ProfileError | ProfileResponse[]) => data)
            .catch((error: Error) => error);
    }


    patchMyProfile = async (token: string, profile: ProfileDTO): Promise<ProfileResponse | ProfileError | Error> => {

        const requestOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        }

        return await fetch(API_ROUTES.PROFILE.me, requestOptions)
            .then((res: Response) => res.json())
            .then((data: ProfileError | ProfileResponse) => data)
            .catch((error: Error) => error);
    }

    mapType = <T extends Object>(
        I: T
    ): ProfileResponseType => { 
        if (I.hasOwnProperty('length')) {
            return 'ProfilesArrayResponse';
        } else if ('handle' in I) {
            return 'ProfileResponse';
        } else if ('followerId' in I) {
                return 'FollowResponse';
        } else if ('message' in I) {
            return 'ProfileError';
        } else {
            return 'Error';
        } 
    }
}