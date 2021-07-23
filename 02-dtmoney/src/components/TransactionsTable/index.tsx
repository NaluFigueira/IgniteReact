import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container, StyledTableRow } from "./styles";

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then((response) => setTransactions(response.data.transactions))
    },[]);

    function formatAmount(amount: number) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    }
    
    function formatTimeStamp(timeStamp: string) {
        const date = new Date(timeStamp);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }

    return(
        <Container>
            <table>
                <thead>
                    <StyledTableRow>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Category</th>
                        <th>Date</th>
                    </StyledTableRow>
                </thead>

                <tbody>
                    {
                        transactions.map(transaction => (
                            <StyledTableRow 
                                key={transaction.id}
                                isDeposit={transaction.type === 'deposit'}
                                isWithdraw={transaction.type === 'withdraw'}
                            >
                                <td>{transaction.title}</td>
                                <td>{formatAmount(transaction.amount)}</td>
                                <td>{transaction.category}</td>
                                <td>{formatTimeStamp(transaction.createdAt)}</td>
                            </StyledTableRow>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    );
}