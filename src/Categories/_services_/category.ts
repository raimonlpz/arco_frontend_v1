import { API_ROUTES } from "../../Shared/_utils_/api";
import { IntentResponse } from "../_models_/Intent";


type CategoryResponseType = 
    | 'IntentResponse'
    | 'Error';


export class CategoryService {

    getSearchesByCategory = async (token: string, intentId: number): Promise<IntentResponse[] | Error> => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.CATEGORIES.getSearchesByCategory + '/' + intentId, requestOptions)
            .then((res: Response) => res.json())
            .then((data: IntentResponse[]) => data)
            .catch((error: Error) => error);
    }


    mapType = <T extends Object>(
        I: T
    ): CategoryResponseType => {
        if (I.hasOwnProperty('length')) {
            return 'IntentResponse';
        } else {
            return 'Error';
        }
    }
}