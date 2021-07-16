import { Container, StyledTableRow } from "./styles";

export function TransactionsTable() {
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
                    <StyledTableRow isDeposit>
                        <td>Website development</td>
                        <td>R$ 12.800</td>
                        <td>Development</td>
                        <td>20/02/2021</td>
                    </StyledTableRow>
                    <StyledTableRow isWithdraw>
                        <td>Rent</td>
                        <td>- R$ 1.100</td>
                        <td>Home</td>
                        <td>17/02/2021</td>
                    </StyledTableRow>
                    <StyledTableRow isDeposit>
                        <td>Website development</td>
                        <td>R$ 12.800</td>
                        <td>Development</td>
                        <td>20/02/2021</td>
                    </StyledTableRow>
                    <StyledTableRow isDeposit>
                        <td>Website development</td>
                        <td>R$ 12.800</td>
                        <td>Development</td>
                        <td>20/02/2021</td>
                    </StyledTableRow>
                </tbody>
            </table>
        </Container>
    );
}