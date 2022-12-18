
export type NFT_SearchNFTsScheme = {
    total: number;
    page: number;
    page_size: number;
    result: {
        token_id: string;
        token_address: string;
        token_uri: string;
        metadata: string;
        is_valid: number;
        syncing: number;
        frozen: number;
        resyncing: number;
        contract_type: string;
        token_hash: string;
        batch_id: string;
        metadata_name: string;
        metadata_description: string;
        metadata_attributes: string;
        block_number_minted: string;
        opensea_lookup: any;
        minter_address: string;
        transaction_minted: string;
        frozen_log_index: any;
        imported: any;
        last_token_uri_sync: string;
        last_metadata_sync: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}