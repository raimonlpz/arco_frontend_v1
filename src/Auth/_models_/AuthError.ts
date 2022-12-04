
type CredentialsTakenError = 'Credentials taken';

export interface AuthError {
    error: string;
    message: CredentialsTakenError | string;
    statusCode: number;
}