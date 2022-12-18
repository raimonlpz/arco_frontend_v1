

export type NFT_TradesByMarketplaceScheme = {
    total: number;
    page: number;
    page_size: number;
    result: {
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
    }[]
}