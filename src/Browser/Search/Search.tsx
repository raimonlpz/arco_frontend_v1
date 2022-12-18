import { Button, Grid, Input, Modal, Spacer, Text, Tooltip } from "@nextui-org/react";
import { Layout } from "../../Shared/_ui_/Layout/Layout";
import { BsChevronBarContract, BsSearch } from 'react-icons/bs';
import { GoSettings } from 'react-icons/go'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../Shared/_utils_/routes";
import { SearchService } from "./_services_";
import { useAuthStore } from "../../Auth/_store_/auth";
import LoadingSpinner from "../../Shared/_ui_/Loading/Loading";
import { SearchQueryResponse } from "./_models_";


export const SearchPage = () => {
    const navigate = useNavigate();

    const [
        session,
    ] = useAuthStore((state) => [ 
        state.access_token, 
    ]);
    
    const [openSettings, setOpenSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchQueryResponse>();
    

    const handleSearch = async () => {
        const searchService = new SearchService();
        if (query.length > 0) {
            setLoading(true)
            await searchService.searchRaw(session!, query).then((res) => {
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
                // console.log(res)
                setLoading(false)
            })
        }   
    }


    return (
        <Layout>
            {
                results ? (
                    <div>Results...</div>
                ) : 
                <Grid css={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem"}}>
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
                        onClick={handleSearch}
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
                <div style={{width: "200px", height: "200px"}}></div>
            </Modal>
            <LoadingSpinner loading={loading} />
        </Layout>
    );
}