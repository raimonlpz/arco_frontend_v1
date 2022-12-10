import { API_DEV_URL, API_PROD_URL } from "./constants"

export class API_ROUTES {
    static isDevelopment = () => window.location.href.includes('localhost');

    static BASE = this.isDevelopment() 
        ? API_DEV_URL 
        : API_PROD_URL;
    
    static AUTH = {
        session: `${this.BASE}/users/me`,
        signup: `${this.BASE}/auth/signup`,
        signin: `${this.BASE}/auth/signin`
    }

    static PROFILE = {
        me: `${this.BASE}/profiles/me`,
        byId: (userId: string | number) => `${this.BASE}/profiles/${userId}`
    }
}