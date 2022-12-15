import styled, { css } from 'styled-components';
import { primaryFontStyles } from '../../utilities/typographyStyles';
import plusIcon from '../../assets/images/icon-plus.svg';

export const buttonDefault = css`
    ${primaryFontStyles}
    padding: 17px 24px 16px 24px;
    font-weight: 700;
    background-color: transparent;
    color: hsl(0, 0%, 100%);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    transition: background-color 300ms ease-in-out, color 400ms ease-in-out;

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: 2px dashed hsl(252, 94%, 67%);
        outline-offset: 3px;
    }

    ${({ $small }) =>
        $small &&
        css`
            padding: 17px 16px 16px 16px;

            @media (min-width: 768px) {
                padding: 17px 24px 16px 24px;
            }
        `}
`;

export const buttonPrimary = css`
    ${buttonDefault}
    background-color: hsl(252, 94%, 67%);
    color: hsl(0, 0%, 100%);

    @media (min-width: 768px) {
        &:hover {
            background-color:hsl(252, 100%, 73%);
        }
    }
`;

export const buttonSecondary = css`
    ${buttonDefault}
    background-color: hsl(252, 100%, 73%);
    color:hsl(231, 75%, 93%);

    @media (min-width: 768px) {
        &:hover {
            background-color: hsl(233, 30%, 15%);
        }
    }
`;

export const buttonDelete = css`
    ${buttonDefault}
    background-color: hsl(0, 80%, 63%);
    color: hsl(0, 0%, 100%);

    @media (min-width: 768px) {
        &:hover {
            background-color: hsl(0, 100%, 80%);
        }
    }
`;

export const buttonSave = css`
    ${buttonDefault}
    background-color: hsl(231, 20%, 27%);
    color: hsl(231, 75%, 93%);

    @media (min-width: 768px) {
        &:hover {
            background-color: hsl(233, 31%, 17%);
        }
    }
`;

const buttonNewInvoice = css`
    ${buttonPrimary}
    position: relative;
    padding: 15px 15px 14px 46px;

    &::before {
        position: absolute;
        content: '';
        top: 50%;
        left: 6px;
        width: 32px;
        height: 32px;
        background-color: hsl(0, 0%, 100%);
        background-image: url('${plusIcon}');
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 50%;
        transform: translateY(-50%);

        @media (min-width: 768px) {
            left: 8px;
        }
    }

    @media (min-width: 768px) {
        padding: 17px 15px 16px 58px;
    }
`;

export const StyledButton = styled.button`
    ${({ $newInvoice }) =>
        $newInvoice &&
        css`
            ${buttonNewInvoice}
        `};

    ${({ $primary }) =>
        $primary &&
        css`
            ${buttonPrimary}
        `};

    ${({ $secondary }) =>
        $secondary &&
        css`
            ${buttonSecondary}
        `};

    ${({ $delete }) =>
        $delete &&
        css`
            ${buttonDelete}
        `};

    ${({ $save }) =>
        $save &&
        css`
            ${buttonSave}
        `};
`;
