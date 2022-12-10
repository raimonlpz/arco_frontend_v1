import { API_ROUTES } from "../../Shared/_utils_/api";
import { ProfileDTO, IProfileService, ProfileError, ProfileResponse, ProfileResponseType } from "../_models_";


export class ProfileService implements IProfileService {

    getMyProfile = async (token: string): Promise<ProfileResponse | ProfileError | Error> => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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
        if ('handle' in I) {
            return 'ProfileResponse';
        } else if ('message' in I) {
            return 'ProfileError';
        } else {
            return 'Error';
        }
    }
}