import { AuthError } from "./AuthError";
import { CredentialsDTO } from "./CredentialsDTO";
import { TokenResponse } from "./TokenResponse";


export interface IAuthService {
    signup(credentials: CredentialsDTO): Promise<TokenResponse | AuthError | Error>
    resolveInterface<T extends Object>(
        I: T
    ): AuthResponse
}

export type AuthResponse = 'TokenResponse' | 'AuthError' | 'Error';