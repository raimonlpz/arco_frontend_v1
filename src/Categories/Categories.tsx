import { Button, Card, Grid, Row, Text } from "@nextui-org/react"
import { Layout } from "../Shared/_ui_/Layout/Layout"


export const CategoriesPage = () => {

    const categories = [
        {
            id: 'social',
            title: 'Social'
        },
        {
            id: 'nfts',
            title: 'NFTs'
        },
        {
            id: 'defi',
            title: 'DeFi'
        },
        {
            id: 'solana',
            title: 'Solana'
        },
        {
            id: 'daos',
            title: 'DAOs'
        },
        {
            id: 'dex',
            title: 'DeX'
        },
        {
            id: 'evm',
            title: 'EVM'
        },
        {
            id: 'privacy',
            title: 'Privacy'
        }
    ]

    return (
        <Layout>
            <Grid.Container gap={2} justify="center" css={{ padding: "2.5rem" }}>
    
                { categories.map(category => (
                    <Grid xs={3} style={{display: "flex", flexDirection: "row", justifyContent: "center" }} key={category.id}>
                        <Card variant="bordered" css={{width: '200px', height: '200px'}}>
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
        </Layout>
    )
}