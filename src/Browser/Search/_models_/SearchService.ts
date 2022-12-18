import { SearchError } from "./SearchError";
import { SearchQueryResponse } from "./SearchQueryResponse";
import { SearchResponse } from "./SearchResponse";

export interface ISearchService {
    getAllSearches(token: string): Promise<SearchResponse[] | SearchError | Error>;
    getMySearches(token: string): Promise<SearchResponse[] | SearchError | Error>;
    getSearchesByUserId(token: string, userId: string): Promise<SearchResponse[] | SearchError | Error>;
    searchRaw(token: string, query: string): Promise<SearchQueryResponse | SearchError | Error>;
    mapType<T extends Object | Array<SearchResponse>>(
        I: T
    ): SearchResponseType;
}

export type SearchResponseType = 
    | 'SearchQueryResponse'
    | 'SearchResponse' 
    | 'SearchError' 
    | 'Error';