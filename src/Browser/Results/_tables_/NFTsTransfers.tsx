
import { NFT_TransfersByBlockScheme } from "../../_schemes_/NFT_TransfersByBlockScheme";
import { NFT_TransfersByWalletScheme } from "../../_schemes_/NFT_TransfersByWalletScheme";
import { NFT_TransfersByContractScheme } from "../../_schemes_/NFT_TransfersByContractScheme";
import { NFT_TransfersFromBlockToBlockScheme } from "../../_schemes_/NFT_TransfersFromBlockToBlockScheme";
import { Table, Text, Tooltip } from "@nextui-org/react";


type NFTsTransfersUI = 
    | NFT_TransfersByBlockScheme 
    | NFT_TransfersByContractScheme
    | NFT_TransfersByWalletScheme 
    | NFT_TransfersFromBlockToBlockScheme;


export default function NFTsTransfers(
    { transfers } : { transfers: NFTsTransfersUI } 
) {

    type T = NFTsTransfersUI['result'][0];

    const columns = Object.keys(transfers.result[0] ?? [])
        .map((key) => ({
            name: key.replaceAll('_', ' '),
            uid: key
        }))

    const getColor = (columnKey: string) => {
        return columnKey === 'from_address' ? 'success' :
            columnKey === 'to_address' ? 'warning' :
            columnKey === 'transaction_hash' ? 'secondary' :
            '';
    }
    

    return (
        <Table
            aria-label="Results of NFTs Transfers" 
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
                        align={"start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={transfers.result as any} css={{ zIndex: "1" }}>
                    {(item: T) => (
                        <Table.Row key={item.log_index.toString()}>
                            {(columnKey) => (
                                <Table.Cell key={item.log_index + (Math.random() * 100)} css={{ maxW: "100px", minW: "50px", paddingLeft: '.2rem', paddingRight: '.2rem' }}>
                                    <Tooltip
                                        content={item[columnKey as keyof T] ?? '-'} 
                                        contentColor={getColor(columnKey.toString()) as any}
                                    >
                                            <Text 
                                                size={13}
                                                color={getColor(columnKey.toString()) as any}
                                                css={{ fontWeight: columnKey === 'transaction_hash' ? 'bold' : columnKey === 'token_address' ? 'bold' : '', '&:hover': {
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