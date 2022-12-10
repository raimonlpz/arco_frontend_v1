import { API_ROUTES } from "../../Shared/_utils_/api";
import { ProfileDTO, IProfileService } from "../_models_";


export class ProfileService implements IProfileService {

    getMyProfile = async (token: string): Promise<any> => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.PROFILE.me, requestOptions) 
            .then((res: Response) => res.json())
            .then((data: any) => data)
            .catch((error: Error) => error);
    }


    getProfileById = async (token: string, userId: string | number): Promise<any> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.PROFILE.byId(userId), requestOptions) 
            .then((res: Response) => res.json())
            .then((data: any) => data)
            .catch((error: Error) => error);
    }


    patchMyProfile = async (token: string, profile: ProfileDTO): Promise<any> => {

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
            .then((data: any) => data)
            .catch((error: Error) => error);
    }


    mapType<T extends Object>(I: T) { }
}