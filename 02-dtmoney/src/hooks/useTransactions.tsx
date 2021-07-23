import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { api } from "../services/api";

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionCreationData) => Promise<void>
}

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

type TransactionCreationData = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then((response) => setTransactions(response.data.transactions));
    },[]);

    async function createTransaction(transactionData: TransactionCreationData) {
       const response = await api.post('/transactions', {
           ...transactionData, 
           createdAt: new Date()
        });
       const createdTransaction = response.data.transaction;

       setTransactions([...transactions, createdTransaction]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}