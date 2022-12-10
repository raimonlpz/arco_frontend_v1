import { SearchError } from "./SearchError";
import { SearchResponse } from "./SearchResponse";

export interface ISearchService {
    getAllSearches(token: string): Promise<SearchResponse[] | SearchError | Error>;
    getMySearches(token: string): Promise<SearchResponse[] | SearchError | Error>;
    getSearchesByUserId(token: string, userId: string): Promise<SearchResponse[] | SearchError | Error>;
    mapType<T extends Object | Array<SearchResponse>>(
        I: T
    ): SearchResponseType;
}

export type SearchResponseType = 
    | 'SearchResponse' 
    | 'SearchError' 
    | 'Error';