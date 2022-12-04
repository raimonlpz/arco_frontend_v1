
type CredentialsTakenError = 'Credentials taken';
type CredentialsIncorrect = 'Credentials incorrect';
type Unauthorized = 'Unauthorized';

type ErrorForbidden = "Forbidden";
type ErrorBadRequest = "Bad Request";

export interface AuthError {
    error?: ErrorForbidden | ErrorBadRequest | string;
    message: CredentialsTakenError | CredentialsIncorrect | Unauthorized | string;
    statusCode: number;
}