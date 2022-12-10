import { API_ROUTES } from "../../../Shared/_utils_/api";
import { ISearchService, SearchError, SearchResponse, SearchResponseType } from "../_models_";


export class SearchService implements ISearchService {

    getAllSearches = async (token: string): Promise<SearchResponse[] | SearchError | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.SEARCH.all, requestOptions)
            .then((res: Response) => res.json())
            .then((data: SearchResponse[] | SearchError) => data)
            .catch((error: Error) => error);
    }

    getMySearches = async (token: string): Promise<SearchResponse[] | SearchError | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.SEARCH.mine, requestOptions)
            .then((res: Response) => res.json())
            .then((data: SearchResponse[] | SearchError) => data)
            .catch((error: Error) => error);
    }


    getSearchesByUserId = async (token: string, userId: string): Promise<SearchResponse[] | SearchError | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.SEARCH.byUser(userId), requestOptions)
            .then((res: Response) => res.json())
            .then((data: SearchResponse[] | SearchError) => data)
            .catch((error: Error) => error);
    }

    mapType = <T extends Object | Array<SearchResponse>>(
        I: T
    ): SearchResponseType => {
        if (I.hasOwnProperty('length')) {
            return 'SearchResponse';
        } else if ('message' in I) {
            return 'SearchError';
        } else {
            return 'Error';
        }
    }

}
