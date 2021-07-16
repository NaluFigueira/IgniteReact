import styled, { css } from "styled-components";

interface InfoContainerProps {
    highlightBackground?: boolean;
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: -10rem;
`;

export const InfoContainer = styled.div<InfoContainerProps>`
    background-color: var(--shape);
    color: var(--text-title);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    ${props => props.highlightBackground &&
        css`
            background-color: var(--green) !important;
            color: #FFF !important;
        `
    }

    header { 
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    strong {
        display: block;
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: 500;
        line-height: 3rem;
    }
`;