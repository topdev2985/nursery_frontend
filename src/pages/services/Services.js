import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

import { useSelector, useDispatch } from 'react-redux';

import Button from '../../components/Button/Button';
import AddService from './AddService';
import ServiceList from './ServiceList';

import { invoicesVariants } from '../../utilities/framerVariants';
import { insertNewService } from '../../reducers/serviceSlice';

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

const Form = styled.form`

`;
const Divider=styled.hr`
    margin: 0 20px;
    color: #482424;
    border: 2px solid;
`
const SubTitle=styled.h2`
    color:white;
    margin: 30px 20px 10px 20px;

`;
function Services() {
    const shouldReduceMotion = useReducedMotion();
    const variant = (element) => {
        return shouldReduceMotion
            ? invoicesVariants.reduced
            : invoicesVariants[element];
    };
    const dispatch = useDispatch();
    return (
        <>
            <Container>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    dispatch(insertNewService());
                }}>
                    <Header
                        variants={variant('header')}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Info>
                            <Title>
                                Product & Services
                            </Title>
                            <Text>
                                Full day, Morning, Afternoon, Hourly ...
                            </Text>
                        </Info>
                        <Button
                            type="submit"
                            $newInvoice
                        >
                            Add New
                        </Button>
                    </Header>
                    <AddService />
                </Form>
                <SubTitle>Services List</SubTitle>
                <Divider />
                <ServiceList />
            </Container>

        </>
    )
}

export default Services;