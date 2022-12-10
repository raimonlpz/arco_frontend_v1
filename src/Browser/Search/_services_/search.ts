import { API_ROUTES } from "../../../Shared/_utils_/api";
import { ISearchService, SearchResponse } from "../_models_";


export class SearchService implements ISearchService {

    getAllSearches = async (token: string): Promise<SearchResponse | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.SEARCH.all, requestOptions)
            .then((res: Response) => res.json())
            .then((data: any) => data)
            .catch((error: Error) => error);
    }

    getMySearches = async (token: string): Promise<SearchResponse | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.SEARCH.mine, requestOptions)
            .then((res: Response) => res.json())
            .then((data: any) => data)
            .catch((error: Error) => error);
    }


    getSearchesByUserId = async (token: string, userId: string): Promise<SearchResponse | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.SEARCH.byUser(userId), requestOptions)
            .then((res: Response) => res.json())
            .then((data: any) => data)
            .catch((error: Error) => error);
    }

    mapType<T extends Object>(I: T) {}

}
