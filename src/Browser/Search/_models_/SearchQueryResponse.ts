import { Balance_BalanceByWalletScheme } from "../../_schemes_/Balance_BalanceByWalletScheme";
import { Block_BlockByDateScheme } from "../../_schemes_/Block_BlockByDateScheme";
import { Block_BlockByHashScheme } from "../../_schemes_/Block_BlockByHashScheme";
import { Defi_PairAddressScheme } from "../../_schemes_/Defi_PairAddressScheme";
import { Defi_PairReservesScheme } from "../../_schemes_/Defi_PairReservesScheme";
import { Event_EventsByContractScheme } from "../../_schemes_/Event_EventsByContractScheme";
import { Event_LogsByContractScheme } from "../../_schemes_/Event_LogsByContractScheme";
import { NFT_CollectionMetadataScheme } from "../../_schemes_/NFT_CollectionMetadataScheme";
import { NFT_CollectionsByWalletScheme } from "../../_schemes_/NFT_CollectionsByWalletScheme";
import { NFT_LowestPriceScheme } from "../../_schemes_/NFT_LowestPriceScheme";
import { NFT_NFTMetadataScheme } from "../../_schemes_/NFT_NFTMetadataScheme";
import { NFT_NFTsByContractScheme } from "../../_schemes_/NFT_NFTsByContractScheme";
import { NFT_NFTsByWalletScheme } from "../../_schemes_/NFT_NFTsByWalletScheme";
import { NFT_OwnersByContractScheme } from "../../_schemes_/NFT_OwnersByContractScheme";
import { NFT_OwnersByTokenIdScheme } from "../../_schemes_/NFT_OwnersByTokenIdScheme";
import { NFT_SearchNFTsScheme } from "../../_schemes_/NFT_SearchNFTsScheme";
import { NFT_TradesByMarketplaceScheme } from "../../_schemes_/NFT_TradesByMarketplaceScheme";
import { NFT_TransfersByBlockScheme } from "../../_schemes_/NFT_TransfersByBlockScheme";
import { NFT_TransfersByContractScheme } from "../../_schemes_/NFT_TransfersByContractScheme";
import { NFT_TransfersByWalletScheme } from "../../_schemes_/NFT_TransfersByWalletScheme";
import { NFT_TransfersFromBlockToBlockScheme } from "../../_schemes_/NFT_TransfersFromBlockToBlockScheme";
import { Resolver_ResolveENSNameScheme } from "../../_schemes_/Resolver_ResolveENSNameScheme";
import { Resolver_ResolveUnstoppableDomainScheme } from "../../_schemes_/Resolver_UnstoppableDomainScheme";
import { Solana_NFTContractMetadataScheme } from "../../_schemes_/Solana_NFTContractMetadataScheme";
import { Solana_NFTsOwnedScheme } from "../../_schemes_/Solana_NFTsOwnedScheme";
import { Solana_PortfolioScheme } from "../../_schemes_/Solana_PortfolioScheme";
import { Solana_TokenBalanceScheme } from "../../_schemes_/Solana_TokenBalanceScheme";
import { Solana_TokenPriceScheme } from "../../_schemes_/Solana_TokenPriceScheme";
import { Token_BalanceByWalletScheme } from "../../_schemes_/Token_BalanceByWalletScheme";
import { Token_MetadataByContractScheme } from "../../_schemes_/Token_MetadataByContractScheme";
import { Token_MetadataBySymbolsScheme } from "../../_schemes_/Token_MetadataBySymbolsScheme";
import { Token_PriceScheme } from "../../_schemes_/Token_PriceScheme";
import { Token_SpenderAllowanceScheme } from "../../_schemes_/Token_SpenderAllowanceScheme";
import { Token_TransactionsByContractScheme } from "../../_schemes_/Token_TransactionsByContractScheme";
import { Token_TransactionsByWalletScheme } from "../../_schemes_/Token_TransactionsByWalletScheme";
import { Transaction_TransactionByHashScheme } from "../../_schemes_/Transaction_TransactionByHashScheme";
import { Transaction_TransactionsByWalletScheme } from "../../_schemes_/Transaction_TransactionsByWalletScheme";
import { Bookmarker } from "./Bookmarker";


export interface SearchQueryResponse {
    action: {
        id: string;
        name: string;
    };
    data: SearchScheme;
    bookmarking: Bookmarker; // for Sub & Favs Bookmarking
}


export type SearchScheme =
    | Balance_BalanceByWalletScheme
    | Block_BlockByDateScheme
    | Block_BlockByHashScheme
    | Defi_PairAddressScheme 
    | Defi_PairReservesScheme 
    | Event_EventsByContractScheme 
    | Event_LogsByContractScheme
    | NFT_CollectionMetadataScheme
    | NFT_CollectionsByWalletScheme
    | NFT_LowestPriceScheme
    | NFT_NFTMetadataScheme 
    | NFT_NFTsByContractScheme 
    | NFT_NFTsByWalletScheme
    | NFT_OwnersByContractScheme
    | NFT_OwnersByTokenIdScheme 
    | NFT_SearchNFTsScheme 
    | NFT_TradesByMarketplaceScheme
    | NFT_TransfersByBlockScheme 
    | NFT_TransfersByContractScheme 
    | NFT_TransfersByWalletScheme 
    | NFT_TransfersFromBlockToBlockScheme
    | Resolver_ResolveENSNameScheme
    | Resolver_ResolveUnstoppableDomainScheme
    | Solana_NFTContractMetadataScheme 
    | Solana_NFTContractMetadataScheme 
    | Solana_NFTsOwnedScheme 
    | Solana_PortfolioScheme 
    | Solana_TokenPriceScheme 
    | Solana_TokenBalanceScheme
    | Token_BalanceByWalletScheme
    | Token_MetadataByContractScheme 
    | Token_MetadataBySymbolsScheme
    | Token_PriceScheme 
    | Token_SpenderAllowanceScheme 
    | Token_TransactionsByContractScheme 
    | Token_TransactionsByWalletScheme 
    | Transaction_TransactionByHashScheme
    | Transaction_TransactionsByWalletScheme;


export type SearchSchemeTypes = 
    | 'Balance_BalanceByWalletScheme'
    | 'Block_BlockByDateScheme'
    | 'Block_BlockByHashScheme'
    | 'Defi_PairAddressScheme' 
    | 'Defi_PairReservesScheme' 
    | 'Event_EventsByContractScheme' 
    | 'Event_LogsByContractScheme'
    | 'NFT_CollectionMetadataScheme'
    | 'NFT_CollectionsByWalletScheme'
    | 'NFT_LowestPriceScheme'
    | 'NFT_NFTMetadataScheme' 
    | 'NFT_NFTsByContractScheme' 
    | 'NFT_NFTsByWalletScheme'
    | 'NFT_OwnersByContractScheme'
    | 'NFT_OwnersByTokenIdScheme' 
    | 'NFT_SearchNFTsScheme' 
    | 'NFT_TradesByMarketplaceScheme'
    | 'NFT_TransfersByBlockScheme' 
    | 'NFT_TransfersByContractScheme' 
    | 'NFT_TransfersByWalletScheme' 
    | 'NFT_TransfersFromBlockToBlockScheme'
    | 'Resolver_ResolveENSNameScheme'
    | 'Resolver_ResolveUnstoppableDomainScheme'
    | 'Solana_NFTContractMetadataScheme' 
    | 'Solana_NFTContractMetadataScheme' 
    | 'Solana_NFTsOwnedScheme' 
    | 'Solana_PortfolioScheme' 
    | 'Solana_TokenPriceScheme' 
    | 'Solana_TokenBalanceScheme'
    | 'Token_BalanceByWalletScheme'
    | 'Token_MetadataByContractScheme' 
    | 'Token_MetadataBySymbolsScheme'
    | 'Token_PriceScheme' 
    | 'Token_SpenderAllowanceScheme' 
    | 'Token_TransactionsByContractScheme' 
    | 'Token_TransactionsByWalletScheme' 
    | 'Transaction_TransactionByHashScheme'
    | 'Transaction_TransactionsByWalletScheme';