import { API_ROUTES } from "../../Shared/_utils_/api"
import { AuthError, AuthResponse, CredentialsDTO, IAuthService, TokenResponse } from "../_models_";


export class AuthService implements IAuthService  {
    
    signup = async (credentials: CredentialsDTO): Promise<TokenResponse | AuthError | Error>  => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }
    
        return await fetch(API_ROUTES.AUTH.signup, requestOptions)
            .then((res: Response) =>  res.json())
            .then((data: AuthError | TokenResponse) => data)
            .catch((error: Error) => error);
    }


    resolveInterface = <T extends Object>(
        I: T
    ): AuthResponse => {
        if ('access_token' in I) {
            return 'TokenResponse';
        } else if ('error' in I) {
            return 'AuthError';
        } else {
            return 'Error';
        }
    }
}
