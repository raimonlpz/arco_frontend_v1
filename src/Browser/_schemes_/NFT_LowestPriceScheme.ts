
export type NFT_LowestPriceScheme = {
    transaction_hash: string;
    transaction_index: string;
    token_ids: string[];
    seller_address: string;
    buyer_address: string;
    marketplace_address: string;
    price: string;
    block_timestamp: string;
    block_number: string;
    block_hash: string;
}