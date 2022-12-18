
export type Defi_PairAddressScheme = {
    token0?: {
        address: string;
        name: string; 
        symbol: string;
        decimals: string;
        logo: string;
        logo_hash: string;
        thumbnail: string;
        block_number: string; 
        validated: number;
        created_at: string;
    },
    token1?: {
        address: string;
        name: string; 
        symbol: string;
        decimals: string;
        logo: string;
        logo_hash: string;
        thumbnail: string;
        block_number: string;
        validated: number;
        created_at: string;
    }
    pairAddress?: string;
}