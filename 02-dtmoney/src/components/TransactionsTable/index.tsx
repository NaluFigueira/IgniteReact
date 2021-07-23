import { useTransactions } from "../../hooks/useTransactions";
import { Container, StyledTableRow } from "./styles";

export function TransactionsTable() {
    const { transactions } = useTransactions();

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