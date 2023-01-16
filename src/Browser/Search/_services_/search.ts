import { API_ROUTES } from "../../../Shared/_utils_/api";
import { ISearchService, SearchError, SearchQueryResponse, SearchResponse, SearchResponseType } from "../_models_";
import { Bookmarker } from "../_models_/Bookmarker";


export class SearchService implements ISearchService {

    getAllSearches = async (token?: string): Promise<SearchResponse[] | SearchError | Error> => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
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


    getSearchesByUserId = async (token: string, userId: number): Promise<SearchResponse[] | SearchError | Error> => {
        
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



    searchRaw = async (token: string, query: string): Promise<SearchQueryResponse | SearchError | Error> => {

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        }

        return await fetch(API_ROUTES.SEARCH.raw, requestOptions)
            .then((res: Response) => res.json())
            .then((data: SearchQueryResponse | SearchError) => data)
            .catch((error: Error) => error);

    }


    addToFavorites = async (token: string, bookmarker: Bookmarker): Promise<any> => {

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bookmarker }) 
        }

        return await fetch (API_ROUTES.FAVORITES.addToFavorites, requestOptions)
            .then((res: Response) => res.json())
            .catch((error: Error) => error);
    }


    addToSubscriptions = async (token: string, bookmarker: Bookmarker): Promise<any> => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bookmarker }) 
        }

        return await fetch (API_ROUTES.FAVORITES.addToSubscription, requestOptions)
            .then((res: Response) => res.json())
            .catch((error: Error) => error);

    }



    mapType = <T extends Object | Array<SearchResponse>>(
        I: T
    ): SearchResponseType => {
        if ('action' in I && 'data' in I) { // is query -Moralis- response
            return 'SearchQueryResponse';
        } else if (I.hasOwnProperty('length')) { // is Array of historial Searches
            return 'SearchResponse';
        } else if ('message' in I) {
            return 'SearchError';
        } else {
            return 'Error';
        }
    }

}
