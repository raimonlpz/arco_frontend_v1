
export type Transaction_TransactionsByWalletScheme = {
    total: number;
    page: number; 
    page_size: number;
    result: {
        hash: string;
        nonce: string;
        transaction_index: string;
        from_address: string;
        to_address: string;
        value: string;
        gas: string;
        gas_price: string;
        input: string;
        receipt_cumulative_gas_used: string;
        receipt_gas_used: string;
        receipt_contract_address: string;
        receipt_root: string;
        receipt_status: string;
        block_timestamp: string;
        block_number: string;
        block_hash: string;
    }[]
}