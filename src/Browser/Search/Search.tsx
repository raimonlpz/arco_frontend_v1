import { Button, Grid, Input, Modal, Spacer, Text, Tooltip } from "@nextui-org/react";
import { Layout } from "../../Shared/Layout/Layout";
import { BsChevronBarContract, BsSearch } from 'react-icons/bs';
import { GoSettings } from 'react-icons/go'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../Shared/_utils_/routes";

export const SearchPage = () => {
    const navigate = useNavigate();
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <Layout>
            <Grid css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <BsChevronBarContract size="140" />
                <Input 
                    css={{
                        width: "60vw",
                        marginTop: "2rem",
                    }}
                    size="xl" 
                    bordered
                    shadow={true} 
                    labelPlaceholder="Search" 
                    status="default"                    
                />
                <Button auto size="lg" css={{alignSelf: "end", background: "none"}}>
                <Tooltip content="Advanced Search" color="invert" placement="bottom">
                    <GoSettings size={30} onClick={() => setOpenSettings(true)} />
                </Tooltip>
                </Button>
                <Button bordered rounded color="gradient" auto size="lg">
                    Try your luck <span style={{paddingLeft: ".5rem"}}><BsSearch /></span>
                </Button>
                <Spacer />
                <Button auto size="lg" css={{background: "none"}} onClick={() => navigate(pages.activity)}>
                    <Text size={15}>
                        What are people looking for?
                    </Text>
                </Button>
            </Grid>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={openSettings}
                onClose={() => setOpenSettings(false)}
            >
                <div style={{width: "200px", height: "200px"}}></div>
            </Modal>
        </Layout>
    );
}