

export type NFT_NFTsByContractScheme = {
    total: number;
    page: number;
    page_size: number;
    cursor: string;
    result: {
        token_address: string;
        token_id: string;
        owner_of?: string;
        token_hash?: string;
        block_number?: string;
        block_number_minted?: string;
        contract_type: string;
        token_uri?: string;
        metadata?: string;
        normalized_metadata?: {
            name: string;
            description: string;
            image: string;
            external_link: string;
            animation_url: string;
            attributes: {
                trait_type: string;
                value: any;
                display_type: string;
                max_value: number;
                trait_count: number;
                order: number;
            }[]
        }
        minter_address: string;
        last_token_uri_sync: string;
        last_metadata_sync: string;
        amount: string;
        name: string;
        symbol: string;
    }[]
}