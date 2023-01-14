import { Table, Text, Tooltip } from "@nextui-org/react";
import { NFT_CollectionsByWalletScheme } from "../../_schemes_/NFT_CollectionsByWalletScheme";


type NFTCollectionsInWalletUI =
    | NFT_CollectionsByWalletScheme;

export default function NFTCollectionsInWallet(
    { collections }: { collections: NFTCollectionsInWalletUI }
) {

    type T = NFTCollectionsInWalletUI["result"][0];

    const columns = Object.keys(collections.result[0] ?? []).map(key => ({
        name: key.replaceAll('_', ' '),
        uid: key
    }));

    const getColor = (columnKey: string) => {
        console.log(columnKey)
        return columnKey === 'name' ? 'success' : 
            columnKey === 'symbol' ? 'warning' : 
            columnKey === 'token_address' ? 'secondary' :
           '';
    }


    return (
        <Table
            aria-label="Results of NFT Collections in Wallet"
            css={{
                height: "100vh",
                minWidth: "100vw"
            }}
            selectionMode="none"
            fixed={true}
            animated={true}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.uid}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={collections.result as any} css={{ zIndex: "1" }}>
                {(item: T) => (
                    <Table.Row key={item.token_address}>
                        {(columnKey) => (
                            <Table.Cell key={item.token_address + columnKey.toString()} css={{maxW: "100px", minW: "50px", paddingLef: ".2rem", paddingRight: ".2rem" }}>
                                <Tooltip
                                    content={item[columnKey as keyof T] ?? '-'} 
                                    contentColor={getColor(columnKey.toString()) as any}
                                >
                                    <Text
                                        size={13}
                                        color={getColor(columnKey.toString())}
                                        css={{ fontWeight: columnKey === 'symbol' ? 'bold' : columnKey === 'name' ? 'bold' : '' }}
                                    >
                                        {item[columnKey as keyof T] ?? '-'}
                                    </Text>
                                </Tooltip>
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