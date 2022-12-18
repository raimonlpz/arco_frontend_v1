

export type Solana_TokenPriceScheme = {
    nativePrice: {
        value: string;
        decimals: number;
        name: string;
        symbol: string;
    };
    usdPrice: number;
    exchangeAddress: string;
    exchangeName: string;
}