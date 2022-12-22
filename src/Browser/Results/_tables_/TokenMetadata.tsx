import { Avatar, Table, Text, Tooltip } from "@nextui-org/react";
import { Token_MetadataByContractScheme } from "../../_schemes_/Token_MetadataByContractScheme";
import { Token_MetadataBySymbolsScheme } from "../../_schemes_/Token_MetadataBySymbolsScheme";


type TokenMetadataUI = 
    | Token_MetadataBySymbolsScheme
    | Token_MetadataByContractScheme

export default function TokenMetadata(
    { metadata }: { metadata: TokenMetadataUI }
) {

    type T = TokenMetadataUI[0];

    const columns = Object.keys(metadata[0] ?? [])
        .map((key) => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))
        .filter((col) => col.name !== 'logo hash' && col.name !== 'thumbnail');

    const getColor = (columnKey: string) => {
        return columnKey === 'name' ? 'success' : 
            columnKey === 'symbol' ? 'error' : 
           '';
    }
    

    return (
        <Table
            aria-label="Results of Token Transactions"
            css={{
                height: "100vh",
                minWidth: "100vw",
            }}
            selectionMode="none"
            fixed={true}
            animated={true}
        >
            <Table.Header columns={columns} >
                {(column) => (
                    <Table.Column
                        key={column.uid}
                        align={"start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={metadata} css={{ zIndex: "1" }}>
                {(item) => (
                    <Table.Row key={item.address} >
                        {(columnKey) => (
                            <Table.Cell key={item.address + columnKey.toString()} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem' }}>
                                
                                {columnKey === 'logo'
                                    ? <Avatar
                                        squared 
                                        src={item[columnKey]}
                                        color={'gradient'}
                                    />
                                    : <Tooltip
                                        content={item[columnKey as keyof T] ?? '-'}
                                        contentColor={getColor(columnKey.toString()) as any}
                                    >
                                        <Text
                                            size={13}
                                            color={getColor(columnKey.toString())}
                                            css={{ fontWeight: columnKey === 'symbol' ? 'bold' : columnKey === 'name' ? 'bold' : '' }}
                                        >
                                            {columnKey === 'symbol' ? '$' : ''}{item[columnKey as keyof T] ?? '-'}
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