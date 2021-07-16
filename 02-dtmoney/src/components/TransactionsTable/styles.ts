import styled, { css } from "styled-components";

interface StyledTableRowProps {
    isWithdraw?: boolean;
    isDeposit?: boolean;
}

export const Container = styled.div`
    margin-top: 4rem;

    table { 
        width: 100%;
        border-spacing: 0 0.5rem;

        th { 
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }
    }
`;

export const StyledTableRow = styled.tr<StyledTableRowProps>`
    td {
        padding: 1rem 2rem;
        border: 0;
        background: var(--shape);
        color: var(--text-body);
        border-radius: 0.25rem;

        &:first-child {
            color: var(--text-title);
        } 

        &:nth-child(2) {
            ${props => props.isWithdraw && css`
                color: var(--red);
            `}

            ${props => props.isDeposit && css`
                color: var(--green);
            `}
        }

    }
`