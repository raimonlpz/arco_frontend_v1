import { API_ROUTES } from "../../Shared/_utils_/api"
import { AuthError, AuthResponse, CredentialsDTO, IAuthService, TokenResponse, SessionResponse } from "../_models_";


export class AuthService implements IAuthService  {


    session = async (token: string): Promise<SessionResponse | AuthError | Error> => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        return await fetch(API_ROUTES.AUTH.session, requestOptions)
            .then((res: Response) => res.json())
            .then((data: AuthError | SessionResponse) => data)
            .catch((error: Error) => error);
    }


    signin = async (credentials: CredentialsDTO): Promise<TokenResponse | AuthError | Error> => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }

        return await fetch(API_ROUTES.AUTH.signin, requestOptions) 
            .then((res: Response) => res.json())
            .then((data: AuthError | TokenResponse) => data)
            .catch((error: Error) => error);
    }

    
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


    mapType = <T extends Object>(
        I: T
    ): AuthResponse => {
        if ('access_token' in I) {
            return 'TokenResponse';
        } else if ('email' in I) {
            return 'SessionResponse';
        } else if ('error' in I) {
            return 'AuthError';
        } else {
            return 'Error';
        }
    }
}
