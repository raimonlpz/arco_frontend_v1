import { Avatar, Grid, Spacer, Text } from "@nextui-org/react";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { SiSubstack } from "react-icons/si";
import { useAuthStore } from "../Auth/_store_/auth"
import { SearchResponse } from "../Browser/Search/_models_";
import { SearchService } from "../Browser/Search/_services_";
import { ProfileResponse } from "../Profile/_models_";
import { Layout } from "../Shared/_ui_/Layout/Layout"
import LoadingSpinner from "../Shared/_ui_/Loading/Loading";
import { DEFAULTS } from "../Shared/_utils_/constants";
import { capitalizeFirstLetter } from "../Shared/_utils_/functions";

export const ActivityPage = () => {

    const [allSearches, setAllSearches] = useState<(SearchResponse & { profile: ProfileResponse })[]>();

    const [
        session,
    ] = useAuthStore((state) => [
        state.access_token
    ]);

    const [loading, setLoading] = useState(false);

    const getSearches = useCallback((async () => {
        if (session) {
            setLoading(true);
            const searchService = new SearchService();
            const res = await searchService.getAllSearches(session!);
            const I = searchService.mapType(res);
            switch (I) {
                case 'SearchResponse':
                    setAllSearches((res as 
                        (SearchResponse & { profile: ProfileResponse })[]).reverse());
                        console.log(res);
                    break;
                case 'SearchError':
                case 'Error':
                    // handle Error
                    break;
            }
            setLoading(false);
        }
    }), [session]);


    useEffect(() => {
        getSearches();
    }, [getSearches])



    return (
        <Layout>
            { allSearches && !loading && (
                <Grid.Container gap={2} justify="center" css={{padding: "2.5rem"}}>
                        <Grid xs={4} style={{display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Text h1>Last Searches</Text>
                        </Grid>
                        {allSearches.map(search => (
                            search.intents[0] && (
                            <Grid xs={4} style={{display: "flex", flexDirection: "row" }} key={search.id}>
                            <Avatar 
                                css={{ size: "$10" }}
                                src={search.profile.avatarUrl ?? DEFAULTS.avatar}
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
                                    {moment(search.createdAt).format('MMMM Do YYYY, h:mm:ss').toString()} | <span style={{color: 'cyan', fontSize: 14}}> @{search.profile.handle ?? 'unknown'}</span>
                                </span>
                                <SiSubstack size={18} />
                                &nbsp;&nbsp;&nbsp;
                                <MdFavorite size={18} />                              
                            </Text>
                        </Grid>
                    )
                ))}
                </Grid.Container>
            )}
            <div style={{height: '80vh'}}>
                <LoadingSpinner loading={loading} />
            </div>
        </Layout>
    )
}