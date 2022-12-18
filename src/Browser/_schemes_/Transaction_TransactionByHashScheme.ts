
export type Transaction_TransactionByHashScheme = {
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
    logs: {
        log_index: string;
        transaction_hash: string;
        transaction_index: string;
        address: string;
        data: string;
        topic0: string;
        topic1: string;
        topic2: string;
        topic3: string;
        block_timestamp: string;
        block_number: string;
        block_hash: string;
    }[]
}