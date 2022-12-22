import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchQueryResponse } from "../Search/_models_";
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

    const [tableScheme, setTableScheme] = useState<JSX.Element | null>();

    useEffect(() => {

        switch (results.action.name) {

            case 'NFT_get_nfts_by_contract':
            case 'NFT_get_nfts_by_wallet':
                if ((results.data as NFT_NFTsByContractScheme).result.length > 0)
                    setTableScheme(NFTsCollection(
                        (results.data as
                           | NFT_NFTsByContractScheme
                           | NFT_NFTsByWalletScheme)
                    ));
                break;

            case 'TOKEN_get_transactions_by_contract':
            case 'TOKEN_get_transactions_by_wallet':
            case 'TRANSACTION_get_transactions_by_wallet':
                if ((results.data as Token_TransactionsByContractScheme).result.length > 0)
                    setTableScheme(TokenTransactions(
                        (results.data as 
                            | Token_TransactionsByContractScheme 
                            | Token_TransactionsByWalletScheme
                            | Transaction_TransactionsByWalletScheme)
                    ));
                break;

            case 'TOKEN_get_metadata_by_symbols':
            case 'TOKEN_get_metadata_by_contract':
                if ((results.data as Token_MetadataBySymbolsScheme).length > 0)
                    setTableScheme(TokenMetadata(
                        (results.data as 
                            | Token_MetadataBySymbolsScheme
                            | Token_MetadataByContractScheme)
                    ));
                break;
        }

    }, [results])


    return tableScheme ? tableScheme 
        : <Text css={{
            marginTop: "15%",
            transform: "translateY(-15%)"
        }}>
            0 Results
        </Text>
}