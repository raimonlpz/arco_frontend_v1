import { Table, Text, Tooltip } from "@nextui-org/react";
import { Token_TransactionsByContractScheme } from "../../_schemes_/Token_TransactionsByContractScheme";
import { Token_TransactionsByWalletScheme } from "../../_schemes_/Token_TransactionsByWalletScheme";
import { Transaction_TransactionsByWalletScheme } from "../../_schemes_/Transaction_TransactionsByWalletScheme";

type TokenTransactionsUI =
    | Token_TransactionsByContractScheme 
    | Token_TransactionsByWalletScheme
    | Transaction_TransactionsByWalletScheme;


export default function TokenTransactions(
    transactions: TokenTransactionsUI
) { 
    type T = TokenTransactionsUI["result"][0];

    const columns = Object.keys(transactions.result[0] ?? []).map(key => ({
        name: key.replaceAll('_', ' '),
        uid: key
    }));


    const getColor = (columnKey: string) => {
        return  columnKey === 'from_address' ? 'success' : 
            columnKey === 'to_address' ? 'warning' : 
            columnKey === 'block_timestamp' ? 'secondary' :
            columnKey === 'hash' ? 'error' :
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
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={transactions.result as any} css={{ zIndex: "1" }}>
                 {(item: T) => (
                        <Table.Row key={item.transaction_index.toString() + Date.now()}>
                            {(columnKey) => (
                                <Table.Cell key={item.transaction_index + columnKey.toString()} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem' }}>
                                    <Tooltip 
                                        content={item[columnKey as keyof T] ?? '-'} 
                                        contentColor={getColor(columnKey.toString()) as any}>
                                            <Text 
                                                size={13}
                                                color={getColor(columnKey.toString())}
                                                css={{ fontWeight: columnKey === 'hash' ? 'bold' : '' }}
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