import { useContext } from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext';
import { Container, InfoContainer } from "./styles";

export function Summary() {
    const {transactions} = useContext(TransactionsContext);

    return(
        <Container>
            <InfoContainer>
                <header>
                    <p>Incomes</p>
                    <img src={incomeImg} alt="Incomes" />
                </header>
                <strong>R$1000,00</strong>
            </InfoContainer>
            <InfoContainer>
                <header>
                    <p>Outcomes</p>
                    <img src={outcomeImg} alt="Outcomes" />
                </header>
                <strong>- R$500,00</strong>
            </InfoContainer>
            <InfoContainer highlightBackground>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>R$500,00</strong>
            </InfoContainer>
        </Container>
    );
}