import { Button, Card, Grid, Modal, Row, Text } from "@nextui-org/react"
import { useState } from "react";
import { useAuthStore } from "../Auth/_store_/auth";
import { Layout } from "../Shared/_ui_/Layout/Layout"
import { IntentResponse } from "./_models_/Intent";
import { CategoryService } from "./_services_";
import { Categories } from "./_utils_/categories";


export const CategoriesPage = () => {

    const [
        session
    ] = useAuthStore((state) => [
        state.access_token
    ])

    const [intents, setIntents] = useState<IntentResponse[]>();
    const [categorySelected, setCategorySelected] = useState<string>();


    const handleCategorySelected = async (category: {
        id: number;
        title: string;
    }) => {
        setCategorySelected(category.title)

        const categoryService = new CategoryService();
        categoryService.getSearchesByCategory(session!, category.id).then((res) => {
            const I = categoryService.mapType(res);
            switch (I) {
                case 'IntentResponse':
                    setIntents(res as IntentResponse[]);
                    break;
                case 'Error':
                    break;
            } 
        })
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
              aria-labelledby="Category"
            >
                <Modal.Header>
                    {categorySelected}
                </Modal.Header>
                
            </Modal>
        </Layout>
    )
}