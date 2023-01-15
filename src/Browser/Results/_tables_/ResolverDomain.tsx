import { Card, Text } from "@nextui-org/react";
import { Resolver_ResolveUnstoppableDomainScheme } from "../../_schemes_/Resolver_UnstoppableDomainScheme";


export default function ResolverDomain (
    { domain } : { domain: Resolver_ResolveUnstoppableDomainScheme}
) {

    return (
        <Card isHoverable css={{ mw: "max-content", padding: '2rem', marginTop: '4rem' }}>
            <Card.Header css={{display: "flex", flexDirection: "column"}}>
                <Text h5>Domain (UNS) Address:</Text>
                <Text h4 css={{fontWeight: "bold", color: "$success"}}>{domain.address}</Text>
            </Card.Header>
        </Card>
    )
}