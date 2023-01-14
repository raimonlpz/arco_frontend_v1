import { Card, Divider, Text, Tooltip } from "@nextui-org/react";
import { NFT_CollectionMetadataScheme } from "../../_schemes_/NFT_CollectionMetadataScheme";


type NFTCollectionMetadataUI = 
    | NFT_CollectionMetadataScheme;


export default function NFTCollectionMetadata(
    { metadata }: { metadata: NFTCollectionMetadataUI } 
) {

    return (
            <Card isHoverable css={{ mw: "min-content", padding: '2rem', marginTop: '4rem' }}>
                <Card.Header>
                    <Tooltip
                        content={metadata.token_address ?? '-'}
                        contentColor={'error'}
                    >
                        <Text h6 color="error"> {metadata.token_address}</Text>
                    </Tooltip>
                </Card.Header>
                <Divider />
                <Card.Body>
                    
                    <Text css={{fontWeight: "bold"}}>Name: {metadata.name}</Text>
               
                    <Text color="success" css={{fontWeight: "bold"}}>Symbol: ${metadata.symbol}</Text>
              
                    <Text color="warning" css={{fontWeight: "bold"}}>Contract Type: {metadata.contract_type}</Text>
        
                    <Text>Synced at: {metadata.synced_at}</Text>
                </Card.Body>
            </Card>
    )
}