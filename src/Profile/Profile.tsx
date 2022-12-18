import { Avatar, Button, Grid, Input, Modal, Spacer, Text, Textarea, useModal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../Auth/_store_/auth";
import { Layout } from "../Shared/_ui_/Layout/Layout";
import { useProfileStore } from "./_store_/profile";

import { HiUsers } from 'react-icons/hi';
import { FaSearchDollar } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
import { MdFavorite } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa';
import { ProfileService } from "./_services_";
import { ProfileResponse } from "./_models_";
import { SearchService } from "../Browser/Search/_services_";
import { SearchResponse } from "../Browser/Search/_models_";
import { capitalizeFirstLetter } from "../Shared/_utils_/functions";
import moment from "moment";
import { DEFAULTS } from "../Shared/_utils_/constants";

export const ProfilePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isMyProfile, setIsMyProfile] = useState(false);

    const [mySearches, setMySearches] = useState<SearchResponse[]>([]);
    const { setVisible: setModalSearches, bindings: bindingsModalSearches } = useModal();

    const [followers, setFollowers] = useState<ProfileResponse[]>([]);
    const { setVisible: setModalFollowers, bindings: bindingsModalFollowers } = useModal();

    const [following, setFollowing] = useState<ProfileResponse[]>([]);
    const { setVisible: setModalFollowing, bindings: bindingsModalFollowing } = useModal();


    /**
     * Editable values
     */
    const [bio, setBio] = useState('');
    const [handle, setHandle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hexAddress, setHexAddress] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
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

            console.log(params.id)

            // call to get User by ID (params.id)

        } else {
            setIsMyProfile(true)
            // Editable Profile values
            setBio(profile.bio ?? '');
            setHandle(profile.handle ?? '');
            setAvatarUrl(profile.avatarUrl ?? '');
            setFirstName(profile.firstName ?? '');
            setLastName(profile.lastName ?? '');
            setProfession(profile.profession ?? '');
            setHexAddress(profile.hexAddress ?? '');
        }

    }, [
        params,
        session,
        dataLoaded,
        profile,
        navigate
    ]);


    const patchProfile = async () => {
        const profileService = new ProfileService();
        profileService.patchMyProfile(session!, {
            bio,
            handle,
            firstName,
            lastName,
            avatarUrl,
            profession,
            hexAddress,
        }).then((res) => {
            const I = profileService.mapType(res);
            switch (I) {
                case 'ProfileResponse':
                    setProfile(res as ProfileResponse);
                    break;
                case 'ProfileError':
                    // TODO: UI helper-modal showing error
                    break;
                case 'Error':
                    break;
            }
        })
    }


    const getMySearches = async () => {
        const searchService = new SearchService();
        searchService.getMySearches(session!).then((res) => {
            const I = searchService.mapType(res);
            switch (I) {
                case 'SearchResponse':
                    setMySearches(res as SearchResponse[]);
                    setModalSearches(true);
                    break;
                case 'SearchError':
                    break;
                case 'Error':
                    break;
            }
        })
    }


    const handleShowFollowers = async () => {
        if (followers.length === 0) {
            const profileService = new ProfileService();
            await profileService.getProfileFollowsByIds(
                session!, 
                profile.followedBy?.map(follow => follow.followerId) ?? []
            ).then((res) => {
                const I = profileService.mapType(res);
                switch (I) {
                    case 'ProfilesArrayResponse':
                        setFollowers(res as ProfileResponse[]);
                        break;
                    case 'ProfileError':
                    case 'Error':
                        break;
                }
            })
        }
        setModalFollowers(true);
    }


    const handleShowFollowing = async () => {
        if (following.length === 0) {
            const profileService = new ProfileService();
            await profileService.getProfileFollowsByIds(
                session!, 
                profile.following?.map(follow => follow.followingId) ?? []
            ).then((res) => {
                const I = profileService.mapType(res);
                switch (I) {
                    case 'ProfilesArrayResponse':
                        setFollowing(res as ProfileResponse[]);
                        break;
                    case 'ProfileError':
                    case 'Error':
                        break;
                }
            })
        }
        setModalFollowing(true);
    }


    return (
        <Layout>
            { isMyProfile && (
                <>
                    <Grid.Container gap={2} css={{justifyContent: "space-evenly" }}>

                        <Grid css={{marginTop: "3rem", zIndex:"1"}}>  
                            <Button.Group size="md" vertical color="gradient" bordered >
                                <Button onClick={getMySearches}>
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
                                value={hexAddress}
                                onChange={(e) => setHexAddress(e.target.value)}
                            />
                            <Spacer />
                            <Spacer />
                            <Button 
                                css={{ marginLeft: "50%", transform: "translateX(-50%)"}}
                                color="gradient" 
                                size='lg'
                                auto 
                                ghost 
                                onClick={patchProfile}
                            >
                                Save
                            </Button>

                        </Grid>

                        <Grid css={{marginTop: "3rem",  zIndex:"1"}}> 
                            <Button.Group size="md" vertical borderWeight="light" color="error" bordered >
                                <Button
                                    onClick={handleShowFollowers}
                                >
                                    <HiUsers size="20" /> 
                                    <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                        {profile.followedBy?.length ?? 0}
                                    </b> 
                                    <i>Followers</i> 
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button
                                    onClick={handleShowFollowing}
                                >
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



            <Modal
                scroll 
                width="20vw"
                closeButton 
                aria-labelledby="Followers"
                aria-describedby="My Followers"
                {...bindingsModalFollowers}
            >
                <Modal.Header>
                    <HiUsers size="20" /> 
                    <Text>Followers</Text>
                </Modal.Header>
                <Modal.Body>
                       <ul>
                        {
                            followers.map((follower) => (
                                <li key={follower.id} style={{display: "flex",  alignItems: "center"}}>
                                      <Avatar 
                                            css={{ size: "$10" }}
                                            src={follower.avatarUrl ?? DEFAULTS.avatar}
                                            color="gradient"
                                            bordered
                                        />
                                        <Spacer />
                                        <Text size="$sm" css={{ fontWeight: "bold" }}>
                                            {follower.user?.email}
                                        </Text>
                                </li>
                            ))
                        }
                        </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto bordered color="secondary" onClick={() => setModalFollowers(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            
            <Modal
                scroll 
                width="20vw"
                closeButton 
                aria-labelledby="Following"
                aria-describedby="Following users"
                {...bindingsModalFollowing}
            >
                <Modal.Header>
                    <HiUsers size="20" /> 
                    <Text>Following</Text>
                </Modal.Header>
                <Modal.Body>
                       <ul>
                        {
                            following.map((follow) => (
                                <li key={follow.id} style={{display: "flex",  alignItems: "center"}}>
                                      <Avatar 
                                            css={{ size: "$10" }}
                                            src={follow.avatarUrl ?? DEFAULTS.avatar}
                                            color="gradient"
                                            bordered
                                        />
                                        <Spacer />
                                        <Text size="$sm" css={{ fontWeight: "bold" }}>
                                            {follow.user?.email}
                                        </Text>
                                </li>
                            ))
                        }
                        </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto bordered color="secondary" onClick={() => setModalFollowing(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal
                scroll
                width="50vw"
                closeButton
                aria-labelledby="Searches"
                aria-describedby="My Searches historic"
                {...bindingsModalSearches}
            >
                <Modal.Header>
                    <FaSearchDollar size={40}/>
                </Modal.Header>
                <Modal.Body>
                    {
                        mySearches.map(search => (
                            search.intents[0] && (
                                    <div style={{display: "flex", flexDirection: "row" }} key={search.id}>
                                        <Avatar 
                                            css={{ size: "$10" }}
                                            src={avatarUrl}
                                            color="gradient"
                                            bordered
                                        />
                                        <Spacer />
                                            <Text size="$md" onClick={() => console.log(search.query, search.id)} css={{ '&:hover': {
                                                color: '$pink800',
                                                cursor: "pointer"
                                            }, }}>
                                                {capitalizeFirstLetter(search.intents[0].value)}
                                                <span style={{fontWeight: "bold", color:"greenyellow", display: "block", fontSize: "11.5px"}}>
                                                    {moment(search.createdAt).format('MMMM Do YYYY, h:mm:ss').toString()}
                                                </span>
                                                <SiSubstack size={18} />
                                                &nbsp;&nbsp;&nbsp;
                                                <MdFavorite size={18} /> 
                                            </Text>
                               
                                    </div>
                            )
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button auto bordered color="secondary" onClick={() => setModalSearches(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}