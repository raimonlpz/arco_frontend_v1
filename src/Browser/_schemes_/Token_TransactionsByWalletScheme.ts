
export type Token_TransactionsByWalletScheme = {
    total: number;
    page: number;
    page_size: number;
    result: {
        transaction_hash: string;
        address: string;
        block_timestamp: string;
        block_number: string;
        block_hash: string;
        to_address: string;
        from_address: string;
        value: string; 
        transaction_index: number; 
        log_index: number;
    }[]
}