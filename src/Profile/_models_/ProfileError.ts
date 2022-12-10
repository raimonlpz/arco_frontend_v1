
type NotFound = 'Not Found';
type BadRequest = 'Bad Request';
type Unauthorized = 'Unauthorized';
type InternalServer = 'Internal server error';

export interface ProfileError {
    error?: BadRequest | string;
    message: 
     | NotFound 
     | InternalServer 
     | Unauthorized 
     | string;
    statusCode: number;
}