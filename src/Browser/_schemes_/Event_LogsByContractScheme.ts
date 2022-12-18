
export type Event_LogsByContractScheme = {
    total: number;
    page: number;
    page_size: number;
    cursor: string;
    result: {
        transaction_hash: string;
        address: string;
        block_timestamp: string;
        block_number: string;
        block_hash: string;
        data: string;
        topic0: string;
        topic1: string;
        topic2: string;
        topic3: string;
        transaction_index: number;
        log_index: number;
    }[]
}