

export type NFT_TransfersFromBlockToBlockScheme = {
    total: number; 
    page: number;
    page_size: number;
    cursor: string;
    result: {
        token_address: string;
        token_id: string;
        from_address?: string;
        to_address: string;
        value?: string;
        amount?: string;
        contract_type: string;
        block_number: string;
        block_timestamp: string;
        block_hash: string;
        transaction_hash: string;
        transaction_type?: string;
        transaction_index?: number;
        log_index: number;
        operator?: string;
    }[];
    block_exists: boolean;
    index_complete: boolean;
}