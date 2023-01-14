import { Card, Divider, Text } from "@nextui-org/react";
import { NFT_CollectionMetadataScheme } from "../../_schemes_/NFT_CollectionMetadataScheme";


type NFTCollectionMetadataUI = 
    | NFT_CollectionMetadataScheme;


export default function NFTCollectionMetadata(
    { metadata }: { metadata: NFTCollectionMetadataUI } 
) {

    return (
        <>
            <Card isHoverable variant="bordered" css={{ mw: "min-content", padding: '2rem', marginTop: '4rem' }}>
                <Card.Header>
                    <Text h4 color="error"> {metadata.token_address}</Text>
                </Card.Header>
                <Card.Body>
                    Name: <Text css={{fontWeight: "bold"}}>{metadata.name}</Text>
                    <Divider />
                    Symbol: <Text color="success" css={{fontWeight: "bold"}}>{metadata.symbol}</Text>
                    <Divider />
                    Contract Type: <Text color="warning" css={{fontWeight: "bold"}}>{metadata.contract_type}</Text>
                    <Divider />
                    Synced at: <Text>{metadata.synced_at}</Text>
                </Card.Body>
            </Card>
        </>
    )
}