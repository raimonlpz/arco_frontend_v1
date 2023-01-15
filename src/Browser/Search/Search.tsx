import { Button, Grid, Input, Modal, Radio, Spacer, Text, Tooltip } from "@nextui-org/react";
import { Layout } from "../../Shared/_ui_/Layout/Layout";
import { BsChevronBarContract, BsSearch } from 'react-icons/bs';
import { GoSettings } from 'react-icons/go'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../Shared/_utils_/routes";
import { SearchService } from "./_services_";
import { useAuthStore } from "../../Auth/_store_/auth";
import LoadingSpinner from "../../Shared/_ui_/Loading/Loading";
import { SearchQueryResponse } from "./_models_";
import Resolver from "../Results/Resolver";
import { CHAINS } from "./_utils_/chains";
import { useSearchStore } from "./_store_/search";


export const SearchPage = () => {
    const navigate = useNavigate();

    const [
        session,
    ] = useAuthStore((state) => [ 
        state.access_token, 
    ]);

    const [
        search_query,
        removeQuery
    ] = useSearchStore((state) => [
        state.query,
        state.removeQuery
    ]);
    
    const [openSettings, setOpenSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchQueryResponse>();

    const [chain, setChain] = useState<string>();


    useEffect(() => {
        if (search_query) {
            handleSearch(search_query);
            removeQuery();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSearch = async (search_query?: string) => {
        const searchService = new SearchService();
        
        const Q = search_query ? search_query : query;
        const CH = chain ? `, chain ${chain}` : '';

        if (Q.length > 0) {
            setLoading(true)
            await searchService.searchRaw(
                session!, 
                Q + CH
            ).then((res) => {
                const I = searchService.mapType(res);
                switch (I) {
                    case 'SearchQueryResponse':
                        setResults(res as SearchQueryResponse);
                        break;
                    case 'SearchError':
                    case 'Error':
                        // TO-DO: handle error in UI
                        break;
                }
                setLoading(false)
            })
        }   
    }


    const handleChainSelected = (e: string) => {
        setChain(e);
    }


    return (
        <Layout>
            {
                results 
                ? (<Resolver results={results} />) 
                : 
                <Grid css={{
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    marginTop: "4rem", 
                    visibility: `${loading ? "hidden" : "visible"}`
                }}>
                    <BsChevronBarContract size="140" />
                    <Input 
                        css={{
                            width: "60vw",
                            marginTop: "2rem",
                        }}
                        size="xl" 
                        bordered
                        color="secondary"
                        shadow={true} 
                        labelPlaceholder="Search" 
                        status="default"      
                        onChange={(e) => setQuery(e.target.value)}              
                    />
                    <Button auto size="lg" css={{alignSelf: "end", background: "none"}}>
                    <Tooltip content="Advanced Search" color="invert" placement="bottom">
                        <GoSettings size={30} onClick={() => setOpenSettings(true)} />
                    </Tooltip>
                    </Button>
                    <Button 
                        bordered 
                        rounded 
                        color="gradient" 
                        auto 
                        size="lg"
                        onClick={() => handleSearch()}
                    >
                        Try your luck <span style={{paddingLeft: ".5rem"}}><BsSearch /></span>
                    </Button>
                    <Spacer />
                    <Button auto size="lg" css={{background: "none"}} onClick={() => navigate(pages.activity)}>
                        <Text size={15}>
                            What are people looking for?
                        </Text>
                    </Button>
                </Grid>
            }

            <Modal
                blur
                closeButton
                aria-labelledby="Advanced Search"
                open={openSettings}
                onClose={() => setOpenSettings(false)}
            >
                <div style={{padding: '2rem'}}>
                    <Radio.Group label="Select Chain" defaultValue="A" validationState="invalid" onChange={handleChainSelected}>
                        {CHAINS.map((chain) => (
                            <Radio value={chain.id} description={chain.id} key={chain.id}>
                              {chain.name}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            </Modal>
            <LoadingSpinner loading={loading} />
        </Layout>
    );
}