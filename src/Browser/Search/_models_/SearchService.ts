import { SearchResponse } from "./SearchResponse";


export interface ISearchService {
    getAllSearches(token: string): Promise<SearchResponse | Error>;
    getMySearches(token: string): Promise<SearchResponse | Error>;
    getSearchesByUserId(token: string, userId: string): Promise<SearchResponse | Error>;
    mapType<T extends Object>(
        I: T
    ): any;
}