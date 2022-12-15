import styled, { css } from 'styled-components';

export const StyledStatus = styled.div`
    width: 104px;
    padding: 13px 0;
    font-weight: 700;
    text-align: center;
    border-radius: 6px;
    color: hsl(252,94%,67%);
    transition: background-color 400ms ease-in-out, color 400ms ease-in-out;

    ${({ $statusType }) =>
        $statusType === 'draft' &&
        css`
            background-color: hsla(231, 75%, 93%, 5.71%);
            color:hsl(231, 75%, 93%);
        `}

    ${({ $statusType }) =>
        $statusType === 'pending' &&
        css`
            background-color: hsla(34, 100%, 50%, 5.71%);
            color:hsl(34, 100%, 50%);
        `}

    ${({ $statusType }) =>
        $statusType === 'paid' &&
        css`
            background-color: hsla(160, 67%, 52%, 5.71%);
            color: hsl(160, 67%, 52%);
        `}

    ${({ $grid }) =>
        $grid &&
        css`
            grid-area: status;
            align-self: center;

            @media (min-width: 768px) {
                grid-area: unset;
                justify-self: end;
            }
        `}
`;

export const Circle = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 50%;
    transition: background-color 400ms ease-in-out;

    ${({ $statusType }) =>
        $statusType === 'draft' &&
        css`
            background-color: hsl(231, 75%, 93%);
        `}
    ${({ $statusType }) =>
        $statusType === 'pending' &&
        css`
            background-color: hsl(34, 100%, 50%);
        `}
        ${({ $statusType }) =>
        $statusType === 'paid' &&
        css`
            background-color:hsl(160, 67%, 52%);
        `};
`;
