import { API_DEV_URL, API_PROD_URL } from "./constants"
import { isDevelopment } from "./functions";

export class API_ROUTES {

    static BASE = isDevelopment() 
        ? API_DEV_URL 
        : API_PROD_URL;
    
    static AUTH = {
        session: `${this.BASE}/users/me`,
        signup: `${this.BASE}/auth/signup`,
        signin: `${this.BASE}/auth/signin`
    }

    static PROFILE = {
        me: `${this.BASE}/profiles/me`,
        byId: (userId: string | number) => `${this.BASE}/profiles/${userId}`,
        byIds: (userIds: (string | number)[]) => `${this.BASE}/profiles?ids=${userIds.join(',')}`
    }

    static SEARCH = {
        all: `${this.BASE}/search/users`,
        mine: `${this.BASE}/search/users/me`,
        byUser: (userId: string | number) => `${this.BASE}/search/users/${userId}`,
        raw: `${this.BASE}/search/raw`
    }
}