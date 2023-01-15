/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Divider, Grid, Input, Modal, Spacer, Text, Textarea, useModal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../Auth/_store_/auth";
import { Layout } from "../Shared/_ui_/Layout/Layout";
import { useProfileStore } from "./_store_/profile";

import { HiUsers } from 'react-icons/hi';
import { FaSearchDollar } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
import { MdFavorite, MdWork } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa';
import { VscSymbolNamespace } from 'react-icons/vsc';
import { RiDoubleQuotesR } from 'react-icons/ri';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl';
import { FaWallet } from 'react-icons/fa';
import { ProfileService } from "./_services_";
import { ProfileResponse } from "./_models_";
import { SearchService } from "../Browser/Search/_services_";
import { SearchResponse } from "../Browser/Search/_models_";
import { capitalizeFirstLetter } from "../Shared/_utils_/functions";
import moment from "moment";
import { DEFAULTS } from "../Shared/_utils_/constants";
import { useSearchStore } from "../Browser/Search/_store_/search";
import LoadingSpinner from "../Shared/_ui_/Loading/Loading";

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

    const [otherProfile, setOtherProfile] = useState<ProfileResponse>();
    const [profileIsFollowed, setProfileIsFollowed] = useState<boolean>(false);


    const [loading, setLoading] = useState(false)


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
        session_id,
        dataLoaded,
        email
    ] = useAuthStore((state) => [ 
        state.access_token, 
        state.session_id,
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

    const [
        setQuery
    ] = useSearchStore((state) => [
        state.setQuery
    ]);


    useEffect(() => {
        setFollowers([])
        setFollowing([])
    }, [isMyProfile])


    useEffect(() => {
        // We check if current User visited is being followed by Us
        if (otherProfile) {
            if ((profile?.following?? []).length > 0) {
                const followingUsers = (profile.following ?? []).map(f => f.followingId)
                if (followingUsers.includes(otherProfile.id!)) {
                    setProfileIsFollowed(true);
                }
            }
        }
    }, [  
        profile,
        otherProfile
    ])


    useEffect(() => {
        if (!session && dataLoaded) navigate('/search')
        if (params.id) {

            if (!otherProfile) {
                // call to get Other User by ID (params.id)
                fetchOtherProfile();
            }

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
        otherProfile,
        setOtherProfile,
        navigate,
    ]);


    const patchProfile = async () => {
        const profileService = new ProfileService();
        setLoading(true);
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
            setLoading(false);
        })
    }


    const getHistoricalSearches = async () => {
        const searchService = new SearchService();
        setLoading(true);
        if (isMyProfile) {
            searchService.getMySearches(session!).then((res) => {
                const I = searchService.mapType(res);
                switch (I) {
                    case 'SearchResponse':
                        setMySearches((res as SearchResponse[]).reverse());
                        setModalSearches(true);
                        break;
                    case 'SearchError':
                        break;
                    case 'Error':
                        break;
                }
                setLoading(false);
            })
        } else {
            searchService.getSearchesByUserId(session!, otherProfile?.userId!).then((res) => {
                const I = searchService.mapType(res);
                switch (I) {
                    case 'SearchResponse':
                        setMySearches((res as SearchResponse[]).reverse());
                        setModalSearches(true);
                        break;
                    case 'SearchError':
                        break;
                    case 'Error':
                        break;
                }
                setLoading(false);
            })
        }
    }

    const fetchOtherProfile = async () => {
        const profileService = new ProfileService();
        setLoading(true);
        profileService.getProfileById(session!, params.id!).then((res) => {
            const I = profileService.mapType(res);
            switch (I) {
                case 'ProfileResponse':
                    setOtherProfile(res as ProfileResponse);
                    break;
                case 'ProfileError':
                case 'Error':
                    // TODO: UI helper-modal showing error
                    break;
                }
                setLoading(false);
        });
    }


    const fetchMyProfileUpdated = async () => {
        const profileService = new ProfileService(); 
        setLoading(true);
        profileService.getMyProfile(session!).then((res) => {
            const I = profileService.mapType(res);
            switch (I) {
                case 'ProfileResponse':
                    setProfile(res as ProfileResponse);
                    break;
                case 'ProfileError':
                case 'Error':
                    // TODO: UI helper-modal showing error
                    break;
                }
                setLoading(false);
        })
    }


    /**
     ***************************** Followers ****************************
     */

    const handleShowFollowers = async (_profile: ProfileResponse) => {
            const profileService = new ProfileService();
            if (
                (_profile.followedBy ?? []).length > 0
            ) {
                // setLoading(true);
                await profileService.getProfileFollowsByIds(
                    session!, 
                    _profile.followedBy?.map(follow => follow.followerId) ?? []
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
                    // setLoading(false);
                })
            }
        setModalFollowers(true);
    }


    /**
     ****************************** Following *****************************
     */
    const handleShowFollowing = async (_profile: ProfileResponse) => {
            const profileService = new ProfileService();
            if (
                (_profile.following ?? []).length > 0
            ) {
                // setLoading(true);
                await profileService.getProfileFollowsByIds(
                    session!, 
                    _profile.following?.map(follow => follow.followingId) ?? []
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
                    // setLoading(false);
                })
            }
        setModalFollowing(true);
    }


    const handleFollowUser = async () => {
        const profileService = new ProfileService();
        setLoading(true);
        await profileService.follow(session!, otherProfile?.id!)
            .then(async (res) => {
                const I = profileService.mapType(res);
                switch (I) {
                    case 'FollowResponse':
                        await fetchOtherProfile();
                        await fetchMyProfileUpdated();
                        setProfileIsFollowed(true);
                        break;
                    case 'ProfileError':
                    case 'Error':
                        // Handle error
                        break;
                } 
                setLoading(false);
            })
    }


    const handleUnfollowUser = async () => {
        const profileService = new ProfileService();
        setLoading(true);
        await profileService.unfollow(session!, otherProfile?.id!)
            .then(async (res) => {
                const I = profileService.mapType(res);
                switch (I) {
                    case 'FollowResponse':
                        await fetchOtherProfile();
                        await fetchMyProfileUpdated();
                        setProfileIsFollowed(false);
                        break;
                    case 'ProfileError':
                    case 'Error':
                        // Handle error
                        break;
                } 
                setLoading(false);
            })
    }


    const handleSearchHistoricQuery = (query: string) => {
        setQuery(query);
        navigate('/search')
    }



    const handleSearchProfile = (userId: number) => {
        if (session_id !== userId) {

            // Reset
            setFollowers([])
            setFollowing([])
            setOtherProfile(undefined);
            setModalFollowers(false);
            setModalFollowing(false);

            navigate(`/profile/${userId}`)
        }
    }



    if (loading) {
        return (
            <div style={{height: '80vh'}}>
                <LoadingSpinner loading={loading} />
            </div>
        )
    }

    return (
        <Layout>
            
            {
                // OTHER PROFILE
                !isMyProfile && (
                    <>
                        <Grid.Container gap={2} css={{justifyContent: "space-evenly"}}>

                            <Grid css={{ marginTop: "3rem", zIndex: "1" }}>
                                <Button.Group size="md" vertical color="gradient" bordered >
                                    <Button onClick={getHistoricalSearches}>
                                        <FaSearchDollar size="25" style={{paddingTop: '.25rem'}} />
                                        <Spacer x={.6} />
                                        <Text h5 css={{paddingTop: '1rem'}}>
                                            Search Historial
                                        </Text>
                                    </Button>
                                    <Spacer />
                                    <Spacer />
                                    <Button>
                                        <SiSubstack size="25" style={{paddingTop: '.25rem'}} />
                                        <Spacer x={.4} />
                                        <Text h5 css={{paddingTop: '1rem'}}>
                                            Subscriptions
                                        </Text>
                                    </Button>
                                </Button.Group>
                            </Grid>


                            <Grid>
                                <Spacer />
                                <Avatar 
                                    css={{ size: "$20", marginLeft: "50%", transform: "translateX(-50%)" }}
                                    src={otherProfile?.avatarUrl ?? DEFAULTS.avatar}
                                    color="gradient"
                                    bordered
                                    squared
                                />
                                   <Button 
                                        size="sm" 
                                        bordered
                                        shadow 
                                        color="gradient" 
                                        css={{marginBottom: "1rem", marginTop: "1rem", marginLeft: "50%", transform: "translateX(-50%)"}}
                                        onClick={profileIsFollowed ? handleUnfollowUser : handleFollowUser}
                                    >
                                        {
                                            profileIsFollowed 
                                                ? (
                                                    <>
                                                        <SlUserUnfollow size="20" /> 
                                                        <i style={{fontSize: '1rem'}}> Unfollow</i> 
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <SlUserFollow size="20" />  
                                                        <i style={{fontSize: '1rem'}}> Follow</i> 
                                                    </>
                                                )
                                        }
                                    </Button>
                                <Divider />
                                <Text size="$md" css={{ justifyContent: "center", marginTop: "1rem"}}>
                                    <FaUserAstronaut size="20" style={{marginRight: ".25rem"}} />
                                    @{otherProfile?.handle ?? 'unknown'}
                                </Text>
                                <Divider />
                                <Text size="$md" css={{ justifyContent: "center", marginTop: "1rem"}}>
                                   <VscSymbolNamespace size="20" style={{marginRight: ".5rem"}} />
                                    {otherProfile?.firstName ?? '-'} {otherProfile?.lastName} 
                                </Text>
                                <Divider />
                                <Text size="$md" css={{ justifyContent: "center", marginTop: "1rem"}}>
                                    <MdWork size="20" style={{marginRight: ".5rem"}} />  
                                    {otherProfile?.profession ?? '-'}
                                </Text>
                                <Divider />
                                <Text size="$md" css={{ justifyContent: "center", marginTop: "1rem"}}>
                                    <RiDoubleQuotesR size="20" style={{marginRight: ".5rem"}} />
                                    {otherProfile?.bio ?? '-'}
                                </Text>
                                <Divider />
                                <Text size="$md" css={{ justifyContent: "center", marginTop: "1rem"}}>
                                    <FaWallet size="20" style={{marginRight: ".5rem"}} />
                                    {otherProfile?.hexAddress ?? '-'}
                                </Text>
                            </Grid>


                            <Grid css={{marginTop: "3rem",  zIndex:"1"}}> 
                                <Button.Group size="md" vertical borderWeight="light" bordered css={{textGradient: "45deg, $yellow600 -20%, $red600 100%"}}>
                                    <Button
                                        onClick={() => handleShowFollowers(otherProfile!)}
                                    >
                                        <HiUsers size="20" /> 
                                        <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                            {otherProfile?.followedBy?.length ?? 0}
                                        </b> 
                                        <i style={{fontSize: '1rem'}}>Followers</i> 
                                    </Button>
                                    <Spacer />
                                    <Spacer />
                                    <Button
                                        onClick={() => handleShowFollowing(otherProfile!)}
                                    >
                                        <HiUsers size="20" />
                                        <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                            {otherProfile?.following?.length ?? 0}
                                        </b> 
                                        <i style={{fontSize: '1rem'}}>Following</i>
                                    </Button>
                                </Button.Group>
                            </Grid>

                        </Grid.Container>
                    </>
                )
            }

            { 
                // MY PROFILE
                isMyProfile && (
                <>
                    <Grid.Container gap={2} css={{justifyContent: "space-evenly" }}>

                        <Grid css={{marginTop: "3rem", zIndex:"1"}}>  
                            <Button.Group size="md" vertical color="gradient" bordered >
                                <Button onClick={getHistoricalSearches}>
                                    <FaSearchDollar size="25" style={{paddingTop: '.25rem'}} />
                                    <Spacer x={.6} />
                                    <Text h5 css={{paddingTop: '1rem'}}>
                                        Search Historial
                                    </Text>
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button>
                                    <SiSubstack size="25" style={{paddingTop: '.25rem'}} />
                                    <Spacer x={.4} />
                                    <Text h5 css={{paddingTop: '1rem'}}>
                                        Subscriptions
                                    </Text>
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button>
                                    <MdFavorite 
                                        size="30" 
                                        style={{paddingTop: '.25rem', paddingBottom: '.25rem'}} 
                                        color="white" 
                                    />
                                    <Spacer x={.4} />
                                    <Text h5 css={{paddingTop: '1rem', paddingBottom: '.5rem'}}>
                                        Favorites
                                    </Text>
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
                            <Button.Group size="md" vertical borderWeight="light" css={{textGradient: "45deg, $yellow600 -20%, $red600 100%"}} bordered >
                                <Button
                                    onClick={() => handleShowFollowers(profile)}
                                >
                                    <HiUsers size="20" /> 
                                    <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                        {profile.followedBy?.length ?? 0}
                                    </b> 
                                    <i style={{fontSize: '1rem'}}>Followers</i> 
                                </Button>
                                <Spacer />
                                <Spacer />
                                <Button
                                    onClick={() => handleShowFollowing(profile)}
                                >
                                    <HiUsers size="20" />
                                    <b style={{margin: '.25rem', fontSize: "2rem"}}> 
                                        {profile.following?.length ?? 0}
                                    </b> 
                                    <i style={{fontSize: '1rem'}}>Following</i>
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
                                        <Text size="$sm" css={{ fontWeight: "bold", '&:hover': {
                                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                                cursor: follower.userId !== session_id ? "pointer" : "not-allowed",
                                                fontWeight: "bold"
                                        } }}
                                            onClick={() => handleSearchProfile(follower.userId!)}
                                        >{follower.user?.email}
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
                                        <Text size="$sm" css={{ fontWeight: "bold", '&:hover': {
                                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                                cursor: follow.userId !== session_id ? "pointer" : "not-allowed",
                                                fontWeight: "bold"
                                        } }}
                                            onClick={() => handleSearchProfile(follow.userId!)}
                                        >{follow.user?.email}
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
                                            src={(isMyProfile ? avatarUrl : otherProfile?.avatarUrl) ?? DEFAULTS.avatar}
                                            color="gradient"
                                            bordered
                                        />
                                        <Spacer />
                                            <div>
                                                <Text 
                                                    size="$md"
                                                    css={{ fontSize: 16,  '&:hover': {
                                                        textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                                        cursor: "pointer",
                                                        fontWeight: "bold"
                                                    }}}
                                                    onClick={() => handleSearchHistoricQuery(search.intents[0].value)}
                                                >
                                                    {capitalizeFirstLetter(search.intents[0].value)}
                                                </Text>
                                                <span style={{fontWeight: "bold", color:"greenyellow", display: "block", fontSize: "11.5px"}}>
                                                    {moment(search.createdAt).format('MMMM Do YYYY, h:mm:ss').toString()}
                                                </span>
                                                <SiSubstack size={18} />
                                                &nbsp;&nbsp;&nbsp;
                                                <MdFavorite size={18} /> 
                                            </div>
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