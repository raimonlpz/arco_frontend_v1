import { Avatar, Button, Grid, Modal, Spacer, Text } from "@nextui-org/react";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { SiSubstack } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Auth/_store_/auth"
import { SearchResponse } from "../Browser/Search/_models_";
import { SearchService } from "../Browser/Search/_services_";
import { useSearchStore } from "../Browser/Search/_store_/search";
import { ProfileResponse } from "../Profile/_models_";
import { Layout } from "../Shared/_ui_/Layout/Layout"
import LoadingSpinner from "../Shared/_ui_/Loading/Loading";
import { DEFAULTS } from "../Shared/_utils_/constants";
import { capitalizeFirstLetter } from "../Shared/_utils_/functions";

export const ActivityPage = () => {

    const navigate = useNavigate();

    const [openAuthHelper, setOpenAuthHelper] = useState(false);

    const [allSearches, setAllSearches] = useState<(SearchResponse & { profile: ProfileResponse })[]>();

    const [
        session,
        session_id
    ] = useAuthStore((state) => [
        state.access_token,
        state.session_id
    ]);

    const [
        setQuery
    ] = useSearchStore((state) => [
        state.setQuery
    ]);

    const [loading, setLoading] = useState(false);

    const getSearches = useCallback((async () => {
        // if (session) {
            setLoading(true);
            const searchService = new SearchService();
            const res = await searchService.getAllSearches();
            const I = searchService.mapType(res);
            switch (I) {
                case 'SearchResponse':
                    setAllSearches((res as 
                        (SearchResponse & { profile: ProfileResponse })[]).reverse());
                    break;
                case 'SearchError':
                case 'Error':
                    // handle Error
                    break;
            }
            setLoading(false);
        // }

    }), []);
    


    useEffect(() => {
        getSearches();
    }, [getSearches])



    const handleSearchHistoricQuery = (query: string) => {
        if (!session) {
            setOpenAuthHelper(true);
            return;
        }
        setQuery(query);
        navigate('/search')
    }


    const handleSearchProfile = (userId?: number) => {
        if (!session) {
            setOpenAuthHelper(true);
            return;
        }
        if (session_id !== userId) {
            navigate(`/profile/${userId}`)
        } 
    }


    return (
        <Layout>
            { allSearches && !loading && (
                <Grid.Container gap={2} justify="center" css={{padding: "2.5rem"}}>
                        <Grid xs={4} style={{display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Text h1>Last Searches</Text>
                        </Grid>
                        {allSearches.map(search => (
                            search.intents[0] && (
                            <Grid xs={4} style={{display: "flex", flexDirection: "row", maxWidth: "33vw", overflow: 'hidden' }} key={search.id}>
                                <Avatar 
                                    css={{ size: "$10" }}
                                    src={search.profile.avatarUrl ?? DEFAULTS.avatar}
                                    color="gradient"
                                    bordered
                                />
                                <Spacer />
                                <div>
                                    <Text
                                        size="$md"
                                        css={{ lineHeight: '1.4rem', '&:hover': {
                                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                                cursor: "pointer",
                                                fontWeight: "bold"
                                        }, }}
                                        onClick={() => handleSearchHistoricQuery(search.intents[0].value)}
                                    >
                                        {capitalizeFirstLetter(search.intents[0].value)}
                                    </Text>
                                    <span style={{fontWeight: "bold", color:"greenyellow", display: "block", fontSize: "11.5px"}}>
                                        {moment(search.createdAt).format('MMMM Do YYYY, h:mm:ss').toString()} 
                                        <Text 
                                            css={{color: 'cyan', fontSize: 16,  '&:hover': {
                                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                                cursor: search.profile.userId !== session_id ? "pointer" : "not-allowed",
                                                fontWeight: "bold"
                                        }}}
                                            onClick={() => handleSearchProfile(search.profile.userId)}
                                        > @{search.profile.handle ?? 'unknown'}</Text>
                                    </span>
                                    <SiSubstack size={18} />
                                    &nbsp;&nbsp;&nbsp;
                                    <MdFavorite size={18} />                              
                                </div>
                            </Grid>
                    )
                ))}
                </Grid.Container>
            )}
            <div style={{height: '80vh'}}>
                <LoadingSpinner loading={loading} />
            </div>


            <Modal
                blur 
                closeButton 
                aria-labelledby="Login/Signup to Continue"
                open={openAuthHelper}
                onClose={() => setOpenAuthHelper(false)}
                css={{ justifyContent: "center", alignItems: "center"}}
            >
                <FaUserAstronaut size={30} />
                <Text>Login / Sign up to continue</Text>
                <Spacer />
                <Button onClick={() => navigate('/login')} bordered color="gradient"> OK </Button>
                <Spacer />
            </Modal>                            

        </Layout>
    )
}