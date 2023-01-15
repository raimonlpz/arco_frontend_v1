import { Card, Divider, Text } from "@nextui-org/react";
import { Token_PriceScheme } from "../../_schemes_/Token_PriceScheme";


type TokenPriceUI = 
    | Token_PriceScheme;

export default function TokenPrice(
    { prices } : { prices: TokenPriceUI }
) {
    return (
        <Card isHoverable css={{ mw: "min-content", padding: '2rem', marginTop: '4rem' }}>
            <Card.Header css={{display: "flex", flexDirection: "column"}}>
                <Text h5>{prices.exchangeName}</Text>
                <Text h6 color="error">{prices.exchangeAddress}</Text>
                <Text h6>USD price: {prices.usdPrice}</Text>
            </Card.Header>
            <Divider />
            <Card.Body>
                
                <Text css={{fontWeight: "bold"}}><i>Native Price</i></Text>

                <Text color="success">Symbol: ${prices.nativePrice.symbol}</Text>
                <Text color="success">Name: {prices.nativePrice.name}</Text>
                <Text color="success">Decimals: {prices.nativePrice.decimals}</Text>
        
                <Text color="warning">Value: {prices.nativePrice.value}</Text>

            </Card.Body>
        </Card>
    )
}