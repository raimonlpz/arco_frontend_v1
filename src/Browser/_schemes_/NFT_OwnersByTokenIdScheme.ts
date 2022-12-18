

export type NFT_OwnersByTokenIdScheme = {
    status: string;
    total: number;
    page: number;
    page_size: number;
    cursor: string;
    result: {
        token_address: string;
        token_id: string;
        contract_type: string;
        owner_of: string;
        block_number: string;
        block_number_minted: string;
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
        };
        amount?: string;
        name: string;
        symbol: string;
        token_hash: string;
        last_token_uri_sync: string;
        last_metadata_sync: string;
    }[]
}