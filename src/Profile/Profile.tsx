import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../Auth/_store_/auth"
import { Layout } from "../Shared/Layout/Layout"
import { useProfileStore } from "./_store_/profile";

export const ProfilePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isMyProfile, setIsMyProfile] = useState(false);

    const [
        session,
        dataLoaded,
        email
    ] = useAuthStore((state) => [ 
        state.access_token, 
        state.dataLoaded,
        state.session_email,
    ]);

    const [
        profile, 
        setProfile
    ] = useProfileStore((state) => [
        state.profile,
        state.setProfile
    ]);


    useEffect(() => {
        if (!session && dataLoaded) navigate('/search')
        if (!params.id) 
            setIsMyProfile(true)
    }, [
        params,
        session,
        dataLoaded,
        profile,
        navigate
    ]);


    return (
        <Layout>
            <div>Profile: {email}</div>
        </Layout>
    )
}