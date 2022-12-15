import styled, { css } from 'styled-components';
import {
    primaryFontStyles,
    secondaryFontStyles,
    headingExtraSmall,
    headingMediumLarge,
    headingLarge,
} from '../../utilities/typographyStyles';

export const defaultInput = css`
    padding: 16px 13px 16px 20px;
    border-radius: 4px;
    border: 1px solid hsl(233, 30%, 21%);
    background-color: hsl(233, 31%, 17%);
    color: hsl(0, 0%, 100%);
    font-weight: 700;
    transition: border 400ms ease-in-out, background-color 400ms ease-in-out,
        color 400ms ease-in-out;
    -webkit-appearance: none;

    &:focus {
        border: 1px solid hsl(252, 94%, 67%);
        outline: none;
    }
`;
export const Input = styled.input`
    ${primaryFontStyles}
    ${defaultInput}

    ${({ $error }) =>
        $error &&
        css`
            border: 1px solid hsl(0, 80%, 63%);
        `};
`;

export const TextArea = styled.textarea`
    ${primaryFontStyles}
    ${defaultInput}
    
`;

export const InputsGroup = styled.div`
    display: flex;
    flex-flow: wrap;
    gap: 24px;
    border: none;

    ${({ $fullWidthMobile }) =>
        $fullWidthMobile &&
        css`
            flex-flow: column;

            @media (min-width: 600px) {
                flex-flow: wrap;
            }
        `}
`;
export const InputWrapper = styled.div`
    display: flex;
    flex-flow: column;
    gap: 10px;
    flex: 1;
    min-width: 145px;

    ${({ $fullWidth }) =>
        $fullWidth &&
        css`
            min-width: 100%;
        `}
`;

export const Label = styled.label`
    ${primaryFontStyles}
    display: flex;
    justify-content: space-between;
    color: hsl(231, 75%, 93%);
    transition: color 400ms ease-in-out;

    ${({ $error }) =>
        $error &&
        css`
            color: hsl(0, 80%, 63%);
        `};
`;

export const Fieldset = styled.fieldset`
    display: flex;
    flex-flow: column;
    gap: 24px;
    border: none;
`;

export const Select = styled.select`
    ${primaryFontStyles}
    ${defaultInput}

`;

