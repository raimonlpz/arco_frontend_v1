
export type Solana_NFTContractMetadataScheme = {
    mint: string;
    standard: string;
    name: string;
    symbol: string;
    metaplex: {
        metadataUri: string;
        masterEdition: boolean;
        isMutable: boolean;
        primarySaleHappened: boolean;
        sellerFeeBasisPoints: number;
        updateAuthority: string;
    }
}