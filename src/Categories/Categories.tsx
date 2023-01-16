import { Button, Card, Divider, Grid, Modal, Row, Spacer, Text, useModal } from "@nextui-org/react"
import { useState } from "react";
import { FaSearchDollar, FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Auth/_store_/auth";
import { useSearchStore } from "../Browser/Search/_store_/search";
import { Layout } from "../Shared/_ui_/Layout/Layout"
import { capitalizeFirstLetter } from "../Shared/_utils_/functions";
import { IntentResponse } from "./_models_/Intent";
import { CategoryService } from "./_services_";
import { Categories } from "./_utils_/categories";


export const CategoriesPage = () => {

    const navigate = useNavigate();

    const [
        session
    ] = useAuthStore((state) => [
        state.access_token
    ]);

    const [
        setQuery
    ] = useSearchStore((state) => [
        state.setQuery
    ]);


    const [openAuthHelper, setOpenAuthHelper] = useState(false);

    const { setVisible: setModalCategories, bindings: bindingsModalCategories } = useModal();

    const [intents, setIntents] = useState<IntentResponse[]>([]);
    const [categorySelected, setCategorySelected] = useState<string>();


    const handleCategorySelected = async (category: {
        id: number;
        title: string;
    }) => {

        if (!session) {
            setOpenAuthHelper(true);
            return;
        }

        setCategorySelected(category.title)

        const categoryService = new CategoryService();
        categoryService.getSearchesByCategory(session!, category.id).then((res) => {
            const I = categoryService.mapType(res);
            switch (I) {
                case 'IntentResponse':
                    setIntents(res as IntentResponse[]);
                    setModalCategories(true);
                    break;
                case 'Error':
                    break;
            } 
        })
    }


    const handleSearchQuery = async (value: string) => {
        setQuery(value);
        navigate('/search');
    }


    return (
        <Layout>
            <Grid.Container gap={2} justify="center" css={{ padding: "2.5rem" }}>
    
                { Categories.map(category => (
                    <Grid xs={3} style={{display: "flex", flexDirection: "row", justifyContent: "center" }} key={category.id}>
                        <Card variant="bordered" css={{width: '200px', height: '200px'}} isPressable onClick={() => handleCategorySelected(category)}>
                            <Card.Body>
                                <Card.Image
                                    src="https://static.vecteezy.com/system/resources/previews/002/525/469/non_2x/lines-in-modern-style-line-art-minimalist-print-pattern-geometric-style-black-and-white-illustration-vector.jpg"
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                    alt="Card example background"
                                />
                            </Card.Body>
                            <Card.Footer
                                isBlurred
                                css={{
                                  position: "absolute",
                                  bgBlur: "#ffffff66",
                                  borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                                  bottom: 0,
                                  zIndex: 1,
                                }}
                            >   
                                <Row css={{justifyContent: "space-between"}}>
                                    <Text h4 color="black">{category.title}</Text>
                                    <Button auto rounded bordered color="gradient">
                                        <Text
                                            css={{ color: "inherit" }}
                                            size={12}
                                        >
                                            new
                                        </Text>
                                    </Button>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>



            <Modal
              scroll
              width="50vw"
              closeButton
              aria-labelledby="Searches by Category"
              {...bindingsModalCategories}
            >
                <Modal.Header>
                    <FaSearchDollar size={40} />
                    <Spacer />
                    <Text h3>
                        {categorySelected}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {
                        intents?.map(intent => (
                            <div style={{ display: "flex", flexDirection: "row" }} key={intent.id}>
                                <Text
                                    size="$md"
                                    css={{ fontSize: 16,  '&:hover': {
                                        textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}}
                                    onClick={() => handleSearchQuery(intent.value)}
                                >
                                    {capitalizeFirstLetter(intent.value)}
                                </Text>
                            </div>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button auto bordered color="secondary" onClick={() => setModalCategories(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


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