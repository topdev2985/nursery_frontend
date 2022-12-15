import React from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

import { useDispatch} from 'react-redux';

import { invoicesVariants } from '../../utilities/framerVariants';
import Button from '../../components/Button/Button';
import AddChild from "./AddChild/AddChild";
import List from "./List/List";

import { selectChildModal, newChildModalToggle } from "../../reducers/uiSlice";
import { setIsNew, clearChild } from "../../reducers/childrenReducer";
const Container = styled.div`
    padding: 0 24px 50px 24px;
    margin-bottom: 40px;

    @media (min-width: 890px) {
        width: 100%;
        max-width: 890px;
        margin: 0 auto 40px auto;
        padding: 0 0 50px 0;

    }
`;

const Header = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 18px;
    align-items: center;
    margin: 32px 0;

    @media (min-width: 768px) {
        gap: 40px;
    }

    @media (min-width: 1024px) {
        margin: 72px 0 64px 0;
    }
`;

const Info = styled.div``;

const Title = styled.h1`
    margin-bottom: 4px;
    font-family: 'Spartan', sans-serif;
    font-weight: 700;
    font-size: clamp(1.25rem, 5vw, 2rem);
    letter-spacing: -0.04rem;
    color: hsl(0,0%,100%);
    transition: color 400ms ease-in;

    @media (min-width: 768px) {
        letter-spacing: -0.0625rem;
    }
`;

const Text = styled.p`
    color: hsl(0,0%,100%);
    transition: color 400ms ease-in;
    margin:0;
    padding:0;
`;

function Children() {
    const shouldReduceMotion = useReducedMotion();
    const variant = (element) => {
        return shouldReduceMotion
            ? invoicesVariants.reduced
            : invoicesVariants[element];
    };
    const dispatch = useDispatch();

    return (
        <>
            <AddChild />
            <Container>
                <Header
                    variants={variant('header')}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <Info>
                        <Title>
                            Children
                        </Title>
                        <Text>
                            children list 
                        </Text>
                    </Info>
                    {/* <Filter isDesktop={isDesktop} /> */}

                    <Button 
                        type="button"
                        $newInvoice
                        onClick={()=>{
                            dispatch(newChildModalToggle(true));
                            dispatch(setIsNew(true));
                            dispatch(clearChild());
                        }}
                    > 
                        Add New
                    </Button>
                </Header>
                <List />
            </Container>
        </>

    )
}

export default Children;