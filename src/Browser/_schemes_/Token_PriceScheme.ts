
export type Token_PriceScheme = {
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