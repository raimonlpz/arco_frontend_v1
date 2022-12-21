import { Avatar, Table, Text, Tooltip } from "@nextui-org/react";
import { NFT_NFTsByContractScheme } from "../../_schemes_/NFT_NFTsByContractScheme"

type NFTsCollectionUI = 
    | NFT_NFTsByContractScheme;

export default function NFTsCollection(
    nfts: NFTsCollectionUI
) {

    type T = NFTsCollectionUI["result"][0] & {
        'name': string, 
        'image': string
    };

    const result: (T)[] = nfts.result.map(nft => ({
        ...nft, 
        name: nft.normalized_metadata?.name ?? '', 
        image: nft.normalized_metadata?.image ?? ''
    }))
    .reverse();

    const columns = Object.keys(result[0] ?? [])
        .map((key) => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))
        .filter((col) => 
            col.name !== 'normalized metadata' &&
            col.name !== 'metadata' &&
            col.name !== 'last token uri sync' &&
            col.name !== 'last metadata sync'
        )
        .reverse();

    
    const getColor = (columnKey: string) => {
            return columnKey === 'name' ? 'success' : 
                columnKey === 'symbol' ? 'secondary' : 
                columnKey === 'token_hash' ? 'warning' :
               '';
    }

    return (
        <Table
            aria-label="Results of NFTs Collection"
            css={{
                height: "100vh",
                minWidth: "100vw",
            }}
            selectionMode="none"
            fixed={true}
            animated={true}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.uid}
                        align={"start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={result as any} css={{ zIndex: "1"}}>
                {(item: T) => (
                    <Table.Row key={item.token_id}>
                        {(columnKey) => (
                            <Table.Cell key={item.token_id + columnKey.toString()} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem' }}>
                                {columnKey === "image"
                                    ? <Avatar 
                                        squared 
                                        src={item[columnKey]}
                                        color={'gradient'}
                                    />
                                    :   <Tooltip
                                            content={item[columnKey as keyof T] ?? '-' as any} 
                                            contentColor={getColor(columnKey.toString()) as any}
                                        >
                                        <Text
                                            size={13}
                                            color={getColor(columnKey.toString())}
                                            css={{ fontWeight: columnKey === 'symbol' 
                                                ? 'bold' : columnKey === 'name' 
                                                ? 'bold' : columnKey === 'minter_address' 
                                                ? 'bold' : '' }}
                                        >
                                            {item[columnKey as keyof T] ?? '-' as any}
                                        </Text>
                                </Tooltip>
                                }
                            </Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
            <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={20}
                onPageChange={(page) => {}}
                color="warning"
            ></Table.Pagination>
        </Table>
    )
}