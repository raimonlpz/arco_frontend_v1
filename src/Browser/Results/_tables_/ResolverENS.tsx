import { Card, Text } from "@nextui-org/react";
import { Resolver_ResolveENSNameScheme } from "../../_schemes_/Resolver_ResolveENSNameScheme";


export default function ResolverENS (
    { ens } : { ens: Resolver_ResolveENSNameScheme}
) {

    return (
        <Card isHoverable css={{ mw: "max-content", padding: '2rem', marginTop: '4rem' }}>
            <Card.Header css={{display: "flex", flexDirection: "column"}}>
                <Text h5>Ethereum Name Service:</Text>
                <Text h4 css={{fontWeight: "bold", color: "$success"}}>{ens.name}</Text>
            </Card.Header>
        </Card>
    )
}