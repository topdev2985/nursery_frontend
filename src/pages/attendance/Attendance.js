import React, { useState } from "react";

import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

import { invoicesVariants } from '../../utilities/framerVariants';
import Register from "./Register";
import ChildrenList from "./ChildrenList";
import TodayChildren from "./TodayChildren";

const Container = styled.div`
    padding: 0 24px 50px 24px;
    margin-bottom:40px;
    @media (min-width:890px){
        width:100%;
        max-width:890px;
        margin:0 auto 40px auto;
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

const SwitchButton = styled.button`
    border-radius: 30px;
    padding: 15px 30px;
    background-color: #1b5b8f;
    border: 0px;
    color: white;
    font-weight: bold;
    font-size:18px;
    cursor:pointer;
    &:hover{
        background-color:#2f82d1;
    }
`;


function Attendance() {
    const shouldReduceMotion = useReducedMotion();
    const variant = (element) => {
        return shouldReduceMotion
            ? invoicesVariants.reduced
            : invoicesVariants[element];
    };
    const [isDashboard, setIsDashboard] = useState(true);
    return (
        <>
            <Container>
                <Register />
                <Header
                    variants={variant('header')}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <Info>
                        <Title>
                            Attendance Mangament
                        </Title>
                        <Text>
                            Entry date/time, holding fee, meal ...
                        </Text>
                    </Info>
                    {/* <Filter isDesktop={isDesktop} /> */}

                    <SwitchButton
                        onClick={(e)=>{
                            setIsDashboard(!isDashboard);
                        }}
                    >
                        {isDashboard ? 'Attendance Register' : 'Today Children'}

                    </SwitchButton>
                </Header>
                {!isDashboard && <ChildrenList />}
                {isDashboard && <TodayChildren />}
            </Container>
        </>
    );
}

export default Attendance;