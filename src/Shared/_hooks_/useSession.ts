import { useEffect } from "react";
import { SessionResponse } from "../../Auth/_models_";
import { AuthService } from "../../Auth/_services_";
import { useAuthStore } from "../../Auth/_store_/auth";
import { useProfileStore } from "../../Profile/_store_/profile";
import { LocalStorage } from "../_services_";


export const useSession = () => {

  const setProfileData = useProfileStore((state) => state.setProfile)
  const [
      removeSessionData,  
      setSessionData,
      access_token,
      // dataLoaded,
      setToken,
  ] = useAuthStore((state) => [ 
      state.removeSessionData,
      state.setSessionData, 
      state.access_token,
      // state.dataLoaded,
      state.setToken,
  ]);

    
      useEffect(() => {
        const token = LocalStorage.getToken();
        if (token) {
          const auth = new AuthService();
          auth.session(token).then((res) => {
            const I = auth.mapType(res);
            switch (I) {
              case 'SessionResponse': 
                const response = res as SessionResponse;
                setSessionData(response.id, response.email);
                setProfileData(response)
                if (!access_token) setToken(token);
                break;
              case 'AuthError':
              case 'Error':
                // Token expired
                LocalStorage.removeToken();
                break;
            }
          });
        } else {
          removeSessionData();
        }
      }, [
        removeSessionData, 
        setProfileData,
        setSessionData, 
        access_token,
        // dataLoaded,
        setToken, 
      ]);
}