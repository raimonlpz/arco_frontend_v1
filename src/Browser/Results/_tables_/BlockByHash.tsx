import { Table, Text, Tooltip } from "@nextui-org/react";
import { Block_BlockByHashScheme } from "../../_schemes_/Block_BlockByHashScheme";

type BlockByHashUI = 
    | Block_BlockByHashScheme;

export default function BlockByHash(
    { block } : { block: BlockByHashUI }
) {

    type T$Hash = Omit<BlockByHashUI, "transactions" | "logs_bloom" | "sha3_uncles">
    type T$Transaction = Omit<BlockByHashUI['transactions'][0], "logs" | "input">
    
    const columnsHashTable = Object.keys(block)
        .map((key) => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))
        .filter((col) => col.uid !== 'transactions' && col.uid !== 'sha3_uncles' && col.uid !== 'logs_bloom');

    const getColorHashTable = (columnKey: string) => {
        return columnKey === 'hash' ? 'success' : 
        columnKey === 'timestamp' ? 'error' : 
        columnKey === 'miner' ? 'warning' : 
       '';
    }

    const columnsTransactionsTable = Object.keys(block.transactions[0])
        .map((key) => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))
        .filter((col) => col.uid !== "logs" && col.uid !== "input");



    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Table
                aria-label="Results of Block by Hash"
                css={{
                    height: "max-content",
                    minWidth: "100vw",
                }}
                selectionMode="none"
                fixed={true}
                animated={true}
            >
                <Table.Header columns={columnsHashTable}>
                    {(column) => (
                        <Table.Column
                            key={column.uid}
                            align={"start"}
                        >
                            {column.name}
                        </Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={[block]} css={{ zIndex: "1" }}>
                    {(item: T$Hash) => (
                        <Table.Row key={item.hash}>
                            {(columnKey) => (
                                <Table.Cell key={item.hash + columnKey.toString()} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem' }}>
                                    <Tooltip
                                        content={item[columnKey as keyof T$Hash] ?? '-'}
                                        contentColor={getColorHashTable(columnKey.toString()) as any}
                                    >
                                        <Text
                                            size={13}
                                            color={getColorHashTable(columnKey.toString())}
                                        >
                                            {item[columnKey as keyof T$Hash] ?? '-'}
                                        </Text>
                                    </Tooltip>
                                </Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
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
                <Table.Header columns={columnsTransactionsTable} >
                    {(column) => (
                        <Table.Column
                            key={column.uid}
                            align={"start"}
                        >
                            {column.name}
                        </Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={block.transactions} css={{ zIndex: "1" }}>
                    {(item: T$Transaction) => (
                        <Table.Row key={item.hash}>
                            {(columnKey) => (
                                <Table.Cell key={item.hash + columnKey.toString()} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem' }}>
                                    <Tooltip
                                        content={item[columnKey as keyof T$Transaction] ?? '-'}
                                        // contentColor={getColor(columnKey.toString()) as any}
                                    >
                                        <Text
                                            size={13}
                                            // color={getColor(columnKey.toString())}
                                            // css={{ fontWeight: columnKey === 'symbol' ? 'bold' : columnKey === 'name' ? 'bold' : '' }}
                                        >
                                            {item[columnKey as keyof T$Transaction] ?? '-'}
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
        </div>
    )
} 