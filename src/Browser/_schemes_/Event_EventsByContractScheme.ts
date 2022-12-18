
export type Event_EventsByContractScheme = {
    total: number; 
    page: number;
    page_size: number;
    result: {
        transaction_hash: string;
        address: string;
        block_timestamp: string;
        block_number: string;
        block_hash: string;
        data: {
            from: string;
            to: string;
            value: string;
        }
    }[]
}