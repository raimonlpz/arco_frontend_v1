import { AuthError } from "./AuthError";
import { CredentialsDTO } from "./CredentialsDTO";
import { SessionResponse } from "./SessionResponse";
import { TokenResponse } from "./TokenResponse";


export interface IAuthService {
    session(token: string): Promise<SessionResponse | AuthError | Error>;
    signup(credentials: CredentialsDTO): Promise<TokenResponse | AuthError | Error>;
    signin(credentials: CredentialsDTO): Promise<TokenResponse | AuthError | Error>;
    mapType<T extends Object>(
        I: T
    ): AuthResponseType;
}

export type AuthResponseType = 'TokenResponse' | 'SessionResponse' | 'AuthError' | 'Error';