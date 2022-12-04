
const API_URL = "http://localhost:3333"

export class API_ROUTES {

    static AUTH = {
        session: `${API_URL}/users/me`,
        signup: `${API_URL}/auth/signup`,
        signin: `${API_URL}/auth/signin`
    }
}