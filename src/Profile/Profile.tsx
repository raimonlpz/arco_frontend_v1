import { Avatar, Button, Grid, Input, Spacer, Text, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../Auth/_store_/auth"
import { Layout } from "../Shared/Layout/Layout"
import { useProfileStore } from "./_store_/profile";

import { HiUsers } from 'react-icons/hi';
import { FaSearchDollar } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
import { MdFavorite } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa';

export const ProfilePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isMyProfile, setIsMyProfile] = useState(false);

    /**
     * Editable values
     */
    const [bio, setBio] = useState('');
    const [handle, setHandle] = useState('');
    const [lastName, setLastName] = useState('');
    const [hexWallet, setHexWallet] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profession, setProfession] = useState('');

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
        if (params.id) {

            // call to get User by ID (params.id)

        } else {

            setIsMyProfile(true)

            setBio(profile.bio ?? '');
            setHandle(profile.handle ?? '');
            setAvatarUrl(profile.avatarUrl ?? '');
            setFirstName(profile.firstName ?? '');
            setLastName(profile.lastName ?? '');
            setProfession(profile.profession ?? '');
            setHexWallet(profile.hexAddressId ?? '');
        }

    }, [
        params,
        session,
        dataLoaded,
        profile,
        navigate
    ]);


    return (
        <Layout>
            { isMyProfile && (
                <>
                    <Grid.Container gap={2} css={{justifyContent: "space-evenly" }}>

                        <Grid css={{marginTop: "3rem"}}>  
                            <Button.Group size="md" vertical color="gradient" bordered >
                                <Button >
                                    <FaSearchDollar size="20" />
                                    <Spacer x={.4} />
                                    Search Historial
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button>
                                    <SiSubstack size="20" />
                                    <Spacer x={.4} />
                                    Subscriptions
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button>
                                    <MdFavorite size="20" color="white" />
                                    <Spacer x={.4} />
                                    Favorites
                                </Button>
                            </Button.Group>
                        </Grid>
                    
                        <Grid>
                            <Spacer />
                            <Avatar 
                                css={{ size: "$20", marginLeft: "50%", transform: "translateX(-50%)" }}
                                src={avatarUrl}
                                color="gradient"
                                bordered
                                squared
                            />
                            <Text color="secondary" size="$sm" css={{ marginLeft: "53%", marginTop: "1rem", transform: "translateX(-50%)" }}><FaUserAstronaut size="18" /> {email}</Text>
                            <Input
                                clearable        
                                bordered
                                color="secondary"
                                shadow={false}
                                type="text"
                                label="Handle"
                                helperText={`@${handle ?? ''}`}
                                placeholder="@"
                                css={{width: "400px"}}
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                            />
                            <Spacer />
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Input css={{width: "185px"}}  
                                    clearable        
                                    bordered
                                    color="secondary"
                                    type="text"
                                    label="Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    shadow={true}/>
                                <Input css={{width: "185px"}}  
                                    clearable        
                                    bordered
                                    color="secondary"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    label="Last name"
                                    shadow={true}/>
                            </div>
                            <Spacer />
                            <Input
                                clearable        
                                bordered
                                color="secondary"
                                shadow={false}
                                type="text"
                                label="Avatar URL"
                                helperText="https://"
                                placeholder="https://"
                                css={{width: "400px"}}
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                            />
                            <Spacer />
                            <Input
                                clearable        
                                bordered
                                color="secondary"
                                shadow={false}
                                type="text"
                                label="Profession"
                                placeholder="Software engineer"
                                css={{width: "400px"}}
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            />
                            <Spacer />
                            <Textarea
                                label="Bio"
                                css={{width: "400px"}}
                                bordered
                                color="secondary"
                                placeholder="Enter your amazing ideas."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <Spacer />
                            <Input
                                clearable        
                                bordered
                                color="secondary"
                                shadow={false}
                                type="text"
                                label="Wallet"
                                placeholder="0x..."
                                css={{width: "400px"}}
                                value={hexWallet}
                                onChange={(e) => setHexWallet(e.target.value)}
                            />
                            <Spacer />
                            <Spacer />
                            <Button 
                                css={{ marginLeft: "50%", transform: "translateX(-50%)"}}
                                color="gradient" 
                                size='lg'
                                auto 
                                ghost 
                                onClick={() => {}}
                            >
                                Save
                            </Button>

                        </Grid>

                        <Grid css={{marginTop: "3rem"}}> 
                            <Button.Group size="md" vertical borderWeight="light" color="error" bordered >
                                <Button>
                                    <HiUsers size="20" /> 
                                    <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                        {profile.followedBy?.length ?? 0}
                                    </b> 
                                    <i>Followers</i> 
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button>
                                    <HiUsers size="20" />
                                    <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                        {profile.following?.length ?? 0}
                                    </b> 
                                    <i>Following</i>
                                </Button>
                            </Button.Group>
                        </Grid>

                    </Grid.Container>
                </>
            )}
        </Layout>
    );
}