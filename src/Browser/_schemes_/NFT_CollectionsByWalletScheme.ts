
export type NFT_CollectionsByWalletScheme = {
    status: string; 
    total: number;
    page: number;
    page_size: number;
    cursor: string;
    result: {
        token_address: string;
        contract_type: string;
        name: string;
        symbol: string;
    }[]
}