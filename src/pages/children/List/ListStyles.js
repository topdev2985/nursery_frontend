import styled from 'styled-components';

import { motion } from 'framer-motion';
import {
    headingExtraSmall,
    headingMedium,
} from '../../../utilities/typographyStyles';

export const StyledList = styled.ul`
    display: flex;
    flex-flow: column;
    gap: 16px;
    list-style:none;
    padding:0;
`;

export const Item = styled(motion.li)`
    background-color: hsl(233, 31%, 17%);
    border-radius: 8px;
    box-shadow: 0 10px 10px -10px hsla(231, 38%, 45%, 10%);
    transition: background-color 400ms ease-in-out;
    
`;

export const Active=styled.p`
    grid-area: active;
    color:hsl(252,94%,67%);
    justify-self:end;
    @media (min-width: 768px) {
        grid-area: unset;
    }
`;

export const Link = styled.div`
    display: grid;
    grid-template-rows: 1.5fr 1fr 1fr;
    grid-template-areas: 'uid deletebutton' 'paymentdue active' 'totalprice clientname';
    justify-content: space-between;
    padding: 24px;
    border: 1px solid transparent;
    border-radius: 8px;
    transition: border 350ms ease-in-out;

    &:focus {
        outline: none;
    }

    &:focus-visible {
        border: 1px solid hsl(252, 94%, 67%);
    }

    @media (min-width: 768px) {
        grid-template-rows: unset;
        grid-template-areas: unset;
        grid-template-columns: 103px 151px 145px 103px 146px 28px;
        align-items: center;
        padding: 10px 20px;

        &:hover {
            border: 1px solid hsl(252, 94%, 67%);
        }

        svg {
            margin-left: auto;
        }
    }
`;

export const DeleteButton=styled.button`
    border:0;
    background:transparent;
    justify-self:end;
    cursor:pointer;
    padding: 0 5px;
`;

export const Uid = styled.p`
    ${headingExtraSmall}
    grid-area: uid;

    @media (min-width: 768px) {
        grid-area: unset;
    }
`;

export const Hashtag = styled.span`
    color: hsl(231, 36%, 63%);
`;

export const PaymentDue = styled.p`
    grid-area: paymentdue;
    color:hsl(231, 75%, 93%);
    transition: color 400ms ease-in-out;

    @media (min-width: 768px) {
        grid-area: unset;
    }
`;

export const ClientName = styled.p`
    grid-area: clientname;
    justify-self: end;
    color: hsl(231, 75%, 93%);
    transition: color 400ms ease-in-out;

    @media (min-width: 768px) {
        grid-area: unset;
        justify-self: start;
    }
`;

export const TotalPrice = styled.p`
    ${headingMedium}
    grid-area: totalprice;

    @media (min-width: 768px) {
        grid-area: unset;
        justify-self: end;
    }
`;

export const Tag = styled.p`
    grid-area: clientname;
    justify-self: end;
    color: hsl(231, 75%, 93%);
    transition: color 400ms ease-in-out;

    @media (min-width: 768px) {
        grid-area: unset;
        justify-self: start;
    }
`;

export const Image=styled.div`
grid-area: uid;

@media (min-width: 768px) {
    grid-area: unset;
}
`;

export const EmptyChildren = styled.div`
    margin: 100px;
    font-size:30px;
    line-height:3;
    color: white;
    text-align: center;
`;

