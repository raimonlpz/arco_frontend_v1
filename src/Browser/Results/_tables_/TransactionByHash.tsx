import { Table, Text, Tooltip } from "@nextui-org/react";
import { Transaction_TransactionByHashScheme } from "../../_schemes_/Transaction_TransactionByHashScheme";


type TransactionHashUI = 
    | Transaction_TransactionByHashScheme;

export default function TransactionByHash(
    { transaction } : { transaction: Transaction_TransactionByHashScheme }
) {

    type T = Omit<TransactionHashUI, "logs" | "input">;

    const columns = Object.keys(transaction ?? []) 
        .map((key) => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))
        .filter((col) => col.name !== 'logs' && col.name !== 'input');

    
    const getColor = (columnKey: string) => {
        return columnKey === 'from_address' ? 'success' : 
            columnKey === 'to_address' ? 'warning' : 
            columnKey === 'block_timestamp' ? 'secondary' :
            columnKey === 'block_hash' ? 'error' :
            '';
    }


    return (
        <Table
            aria-label="Results of Transaction by Hash"
            css={{
                height: "max-content",
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
            <Table.Body items={[transaction]} css={{ zIndex: "1" }}>
                {(item: T) => (
                    <Table.Row key={item.hash}>
                        {(columnKey) => (
                            <Table.Cell key={item.hash + columnKey.toString()} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem'  }}>
                                <Tooltip
                                    content={item[columnKey as keyof T] ?? '-'}
                                    contentColor={getColor(columnKey.toString()) as any}
                                >
                                    <Text
                                        size={13}
                                        color={getColor(columnKey.toString())}
                                        css={{ fontWeight: columnKey === 'block_hash' ? 'bold' : '', '&:hover': {
                                            cursor: 'help'
                                        } }}
                                    >
                                        {item[columnKey as keyof T] ?? '-'}
                                    </Text>
                                </Tooltip>
                            </Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}