import { Grid, Text } from "@nextui-org/react"
import { Layout } from "../Shared/_ui_/Layout/Layout"


export const CategoriesPage = () => {
    return (
        <Layout>
            <Grid.Container gap={2} justify="center" css={{ padding: "2.5rem" }}>
                <Grid xs={4} style={{display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Text h1>Categories</Text>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}