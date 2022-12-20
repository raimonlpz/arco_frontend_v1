import { Table, Text } from "@nextui-org/react";
import { Token_TransactionsByContractScheme } from "../../_schemes_/Token_TransactionsByContractScheme";

export default function TokenTransactions(
    transactions: Token_TransactionsByContractScheme
) { 
    type T = Token_TransactionsByContractScheme["result"][0];

    const columns = Object.keys(transactions.result[0] ?? []).map(key => ({
        name: key.replaceAll('_', ' '),
        uid: key
    }));


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
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={transactions.result} css={{ zIndex: "1" }}>
                 {(item: T) => (
                        <Table.Row key={item.transaction_index + 'row'}>
                            {(columnKey) => (
                                <Table.Cell key={item.transaction_index + 'cell'} css={{ maxW: "100px", minW: "50px" }}>
                                    <Text size={13}>{item[columnKey as keyof T] ?? '-'}</Text>
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
                onPageChange={(page) => console.log({ page })}
                color="warning"
            ></Table.Pagination>
        </Table>
    )
}