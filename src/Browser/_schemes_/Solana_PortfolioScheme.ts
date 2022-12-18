
export type Solana_PortfolioScheme = {
    nativeBalance: {
        solana: string;
        lamports: string;
    };
    nfts: {
        associatedTokenAddress: string;
        mint: string;
        name: string;
        symbol: string;
    }[];
    tokens: {
        associatedTokenAddress: string;
        mint: string;
        name: string;
        symbol: string;
        amount: string;
        amountRaw: string;
        decimals: number;
    }[]
}