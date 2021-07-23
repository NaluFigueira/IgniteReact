import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container, InfoContainer } from "./styles";

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((accumulator, transaction) => {
        if(transaction.type === "deposit") {
            accumulator.totalDeposits += transaction.amount;
            accumulator.totalTransactions += transaction.amount;
        } else {
            accumulator.totalWithdraws += transaction.amount;
            accumulator.totalTransactions -= transaction.amount;
        }


        return accumulator;
    }, {
        totalDeposits: 0,
        totalWithdraws: 0,
        totalTransactions: 0,
    });

    function formatAmount(amount: number) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    }

    return(
        <Container>
            <InfoContainer>
                <header>
                    <p>Incomes</p>
                    <img src={incomeImg} alt="Incomes" />
                </header>
                <strong>{formatAmount(summary.totalDeposits)}</strong>
            </InfoContainer>
            <InfoContainer>
                <header>
                    <p>Outcomes</p>
                    <img src={outcomeImg} alt="Outcomes" />
                </header>
                <strong>- {formatAmount(summary.totalWithdraws)}</strong>
            </InfoContainer>
            <InfoContainer highlightBackground>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{formatAmount(summary.totalTransactions)}</strong>
            </InfoContainer>
        </Container>
    );
}

