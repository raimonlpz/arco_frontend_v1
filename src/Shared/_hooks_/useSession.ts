import { useEffect } from "react";
import { SessionResponse } from "../../Auth/_models_/SessionResponse";
import { AuthService } from "../../Auth/_services_";
import { useAuthStore } from "../../Auth/_store_/auth";
import { LocalStorage } from "../_services_";


export const useSession = () => {
    const [
        setSessionData,
        setToken
      ] = useAuthStore((state) => [ 
        state.setSessionData, 
        state.setToken 
      ]);
    
      useEffect(() => {
        const token = LocalStorage.getToken();
        if (token) {
          const auth = new AuthService();
          auth.session(token).then((res) => {
            const I = auth.resolveInterface(res);
            switch (I) {
              case 'SessionResponse': 
                const response = res as SessionResponse;
                setSessionData(response.id, response.email);
                setToken(token);
                break;
              case 'AuthError':
              case 'Error':
                // Token expired
                LocalStorage.removeToken();
                break;
            }
          });
        }
      }, [setSessionData, setToken])
}