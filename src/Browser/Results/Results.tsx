import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchQueryResponse } from "../Search/_models_";
import { Token_TransactionsByContractScheme } from "../_schemes_/Token_TransactionsByContractScheme";
import { Token_TransactionsByWalletScheme } from "../_schemes_/Token_TransactionsByWalletScheme";
import TokenTransactions from "./_tables_/TokenTransactions";


export default function Results(
    { results }: { results: SearchQueryResponse }
) {

    const [tableScheme, setTableScheme] = useState<JSX.Element | null>();

    useEffect(() => {

        switch (results.action.name) {
            case 'TOKEN_get_transactions_by_contract':
            case 'TOKEN_get_transactions_by_wallet':
            case 'TRANSACTION_get_transactions_by_wallet':
            case 'TRANSACTION_get_transactions_by_hash':
                if ((results.data as Token_TransactionsByContractScheme).result.length > 0)
                    setTableScheme(TokenTransactions(
                        (results.data as Token_TransactionsByContractScheme | Token_TransactionsByWalletScheme) 
                    ));
                break;
        }

    }, [results])


    return tableScheme 
        ? tableScheme 
        : <Text css={{
            marginTop: "15%",
            transform: "translateY(-15%)"
        }}>No Results</Text>
}