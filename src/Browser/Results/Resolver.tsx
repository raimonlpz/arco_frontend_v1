import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchQueryResponse, SearchScheme } from "../Search/_models_";
import { NFT_NFTsByContractScheme } from "../_schemes_/NFT_NFTsByContractScheme";
import { NFT_NFTsByWalletScheme } from "../_schemes_/NFT_NFTsByWalletScheme";
import { Token_MetadataByContractScheme } from "../_schemes_/Token_MetadataByContractScheme";
import { Token_MetadataBySymbolsScheme } from "../_schemes_/Token_MetadataBySymbolsScheme";
import { Token_TransactionsByContractScheme } from "../_schemes_/Token_TransactionsByContractScheme";
import { Token_TransactionsByWalletScheme } from "../_schemes_/Token_TransactionsByWalletScheme";
import { Transaction_TransactionsByWalletScheme } from "../_schemes_/Transaction_TransactionsByWalletScheme";
import NFTsCollection from "./_tables_/NFTsCollection";
import TokenMetadata from "./_tables_/TokenMetadata";
import TokenTransactions from "./_tables_/TokenTransactions";


export default function Resolver(
    { results }: { results: SearchQueryResponse }
) {

    const [scheme, setScheme] = useState<string>();
    const [params, setParams] = useState<SearchScheme>();

    useEffect(() => {

        switch (results.action.name) {

            case 'NFT_get_nfts_by_contract':
            case 'NFT_get_nfts_by_wallet':
                if ((results.data as NFT_NFTsByContractScheme).result.length > 0) {
                    setScheme('NFTsCollectionUI')
                    setParams(results.data)
                }
                break;

            case 'TOKEN_get_transactions_by_contract':
            case 'TOKEN_get_transactions_by_wallet':
            case 'TRANSACTION_get_transactions_by_wallet':
                if ((results.data as Token_TransactionsByContractScheme).result.length > 0) {
                    setScheme('TokenTransactionsUI')
                    setParams(results.data)
                }
                break;

            case 'TOKEN_get_metadata_by_symbols':
            case 'TOKEN_get_metadata_by_contract':
                if ((results.data as Token_MetadataBySymbolsScheme).length > 0) {
                    setScheme('TokenMetadataUI')
                    setParams(results.data)
                }
                break;
        }

    }, [results])


    if (scheme) {
        if (scheme === 'NFTsCollectionUI') {
            return <NFTsCollection nfts={params! as
                | NFT_NFTsByContractScheme
                | NFT_NFTsByWalletScheme 
            }/>
        }

        if (scheme === 'TokenTransactionsUI') {
            return <TokenTransactions transactions={params! as 
                | Token_TransactionsByContractScheme 
                | Token_TransactionsByWalletScheme
                | Transaction_TransactionsByWalletScheme
            }/>
        }

        if (scheme === 'TokenMetadataUI') {
            return <TokenMetadata metadata={params! as 
                | Token_MetadataBySymbolsScheme
                | Token_MetadataByContractScheme
            }/>
        }
    }
    

    return (
        <Text css={{
                marginTop: "15%",
                transform: "translateY(-15%)"
            }}>
            0 Results
        </Text>
    )
}