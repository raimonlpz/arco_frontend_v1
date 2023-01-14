
import { useEffect, useState } from "react";
import NoResults from "../../Shared/_ui_/NoResults/NoResults";
import { SearchQueryResponse, SearchScheme } from "../Search/_models_";
import { NFT_CollectionMetadataScheme } from "../_schemes_/NFT_CollectionMetadataScheme";
import { NFT_CollectionsByWalletScheme } from "../_schemes_/NFT_CollectionsByWalletScheme";
import { NFT_NFTsByContractScheme } from "../_schemes_/NFT_NFTsByContractScheme";
import { NFT_NFTsByWalletScheme } from "../_schemes_/NFT_NFTsByWalletScheme";
import { NFT_TransfersByBlockScheme } from "../_schemes_/NFT_TransfersByBlockScheme";
import { NFT_TransfersByContractScheme } from "../_schemes_/NFT_TransfersByContractScheme";
import { NFT_TransfersByWalletScheme } from "../_schemes_/NFT_TransfersByWalletScheme";
import { NFT_TransfersFromBlockToBlockScheme } from "../_schemes_/NFT_TransfersFromBlockToBlockScheme";
import { Token_BalanceByWalletScheme } from "../_schemes_/Token_BalanceByWalletScheme";
import { Token_MetadataByContractScheme } from "../_schemes_/Token_MetadataByContractScheme";
import { Token_MetadataBySymbolsScheme } from "../_schemes_/Token_MetadataBySymbolsScheme";
import { Token_TransactionsByContractScheme } from "../_schemes_/Token_TransactionsByContractScheme";
import { Token_TransactionsByWalletScheme } from "../_schemes_/Token_TransactionsByWalletScheme";
import { Transaction_TransactionsByWalletScheme } from "../_schemes_/Transaction_TransactionsByWalletScheme";
import { SchemeUI } from "./_models_";
import NFTCollectionMetadata from "./_tables_/NFTCollectionMetadata";
import NFTCollectionsInWallet from "./_tables_/NFTCollectionsInWallet";
import NFTsCollection from "./_tables_/NFTsCollection";
import NFTsTransfers from "./_tables_/NFTsTransfers";
import TokenBalances from "./_tables_/TokenBalances";
import TokenMetadata from "./_tables_/TokenMetadata";
import TokenTransactions from "./_tables_/TokenTransactions";



export default function Resolver(
    { results }: { results: SearchQueryResponse }
) {

    const [scheme, setScheme] = useState<SchemeUI>();
    const [params, setParams] = useState<SearchScheme>();

    useEffect(() => {

        console.log(results.action.name)

        switch (results.action.name) {

            case 'NFT_get_collections_by_wallet':
                if ((results.data as NFT_CollectionsByWalletScheme).result.length > 0) {
                    setScheme(SchemeUI.NFTCollectionsByWalletUI)
                    setParams(results.data)
                }
                break;

            case 'NFT_get_collection_metadata':
                if ((results.data as NFT_CollectionMetadataScheme)) {
                    setScheme(SchemeUI.NFTCollectionMetadataUI)
                    setParams(results.data);
                }
                break;

            case 'NFT_get_nfts_by_contract':
            case 'NFT_get_nfts_by_wallet':
                if ((results.data as NFT_NFTsByContractScheme).result.length > 0) {
                    setScheme(SchemeUI.NFTSCollectionUI)
                    setParams(results.data)
                }
                break;

            case 'NFT_get_transfers_by_block':
            case 'NFT_get_transfers_by_wallet':
            case 'NFT_get_transfers_by_contract':
            case 'NFT_get_transfers_from_block_to_block':
                if ((results.data as NFT_TransfersByBlockScheme).result.length > 0) {
                    setScheme(SchemeUI.NFTSTransfersUI)
                    setParams(results.data)
                }
                break;

            case 'TOKEN_get_balance_by_wallet':
                if ((results.data as Token_BalanceByWalletScheme).length > 0) {
                    setScheme(SchemeUI.TokenBalancesUI)
                    setParams(results.data)
                }
                break;

            case 'TOKEN_get_transactions_by_contract':
            case 'TOKEN_get_transactions_by_wallet':
            case 'TRANSACTION_get_transactions_by_wallet':
                if ((results.data as Token_TransactionsByContractScheme).result.length > 0) {
                    setScheme(SchemeUI.TokenTransactionsUI)
                    setParams(results.data)
                }
                break;

            case 'TOKEN_get_metadata_by_symbols':
            case 'TOKEN_get_metadata_by_contract':
                if ((results.data as Token_MetadataBySymbolsScheme).length > 0) {
                    setScheme(SchemeUI.TokenMetadataUI)
                    setParams(results.data)
                }
                break;
        }

    }, [results])


    if (typeof scheme === 'number') {

        if (scheme === SchemeUI.TokenTransactionsUI) {
            return <TokenTransactions transactions={params! as 
                | Token_TransactionsByContractScheme 
                | Token_TransactionsByWalletScheme
                | Transaction_TransactionsByWalletScheme
            }/>
        }

        if (scheme === SchemeUI.TokenMetadataUI) {
            return <TokenMetadata metadata={params! as 
                | Token_MetadataBySymbolsScheme
                | Token_MetadataByContractScheme
            }/>
        }
        
        if (scheme === SchemeUI.TokenBalancesUI) {
            return <TokenBalances balances={params! as 
                | Token_BalanceByWalletScheme
            }/>
        }

        if (scheme === SchemeUI.NFTCollectionMetadataUI) {
            return <NFTCollectionMetadata metadata={params! as
                | NFT_CollectionMetadataScheme
            }/>
        }

        if (scheme === SchemeUI.NFTSCollectionUI) {
            return <NFTsCollection nfts={params! as
                | NFT_NFTsByContractScheme
                | NFT_NFTsByWalletScheme 
            }/>
        }

        if (scheme === SchemeUI.NFTCollectionsByWalletUI) {
            return <NFTCollectionsInWallet collections={params! as 
                | NFT_CollectionsByWalletScheme
            }/>
        }

        if (scheme === SchemeUI.NFTSTransfersUI) {
            return <NFTsTransfers transfers={params! as 
                | NFT_TransfersByBlockScheme 
                | NFT_TransfersByContractScheme
                | NFT_TransfersByWalletScheme
                | NFT_TransfersFromBlockToBlockScheme
            }/>
        }
    }
    

    return (
        <div style={{
            marginTop: "10%"
        }}>
            <NoResults />
        </div>
    )
}