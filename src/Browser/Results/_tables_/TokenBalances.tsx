import { Avatar, Table, Text, Tooltip } from "@nextui-org/react";
import { Token_BalanceByWalletScheme } from "../../_schemes_/Token_BalanceByWalletScheme";

type TokenBalanceUI =
    | Token_BalanceByWalletScheme;

export default function TokenBalances(
    { balances }: { balances: TokenBalanceUI }
) { 

    type T = TokenBalanceUI[0];

    const columns = Object.keys(balances[0] ?? [])
        .map((key)  => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))
        .filter((col) => col.name !== 'thumbnail');

    const getColor = (columnKey: string) => {
        return columnKey === 'name' ? 'success' : 
            columnKey === 'symbol' ? 'error' : 
            '';
    }

    return (
        <Table
            aria-label="Results of Token balances by Wallet"
            css={{
                height: "100vh",
                minWidth: "100vw"
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
            <Table.Body items={balances} css={{ zIndex: "1" }}>
                    {(item) => (
                        <Table.Row key={item.token_address} >
                            {(columnKey) => (
                                <Table.Cell key={item.token_address + columnKey.toString()}>
                                    { columnKey === 'logo'
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
                                                css={{ fontWeight: columnKey === 'symbol' ? 'bold' : columnKey === 'name' ? 'bold' : ''}}
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