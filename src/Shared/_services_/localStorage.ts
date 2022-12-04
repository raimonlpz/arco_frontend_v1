

export class LocalStorage {

    static getToken = (): string | null => {
        return localStorage.getItem('access_token');
    } 

    static setToken = (accessToken: string): void => {
        localStorage.setItem('access_token', accessToken);
    }

    static removeToken = (): void => {
        localStorage.removeItem('access_token');
    }
}