import React, { useEffect, useState } from "react";

import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import Icon from '../../components/Icon/Icon';
import { selectServices, fetchServiceAsync, deleteService, setService } from "../../reducers/serviceSlice";
import AlertDialog from "../AlertDialog";
import dayjs from "dayjs";

const Content = styled.div`

`;

const Item = styled.div`
    margin:10px;
    border:0px solid #f00;
    color:white;
    display:grid;
    grid-template-columns: 0.8fr 0.8fr 1.2fr 2fr 1.3fr 0.3fr;
    padding: 10px 20px;
    line-height: 3;
    margin: 20px;
    border-radius: 7px;
    background-color: hsl(233, 31%, 17%);
    cursor:pointer;
    border: 1px solid transparent;
    box-shadow: 0 10px 10px -10px hsla(231, 38%, 45%, 10%);
    grid-template-areas:unset;
    &:hover{
        // background-color:hsl(220deg 40% 20%);
        border:1px solid hsl(252,94%,67%);
        transition: border 400ms ease-in-out;
    }
    @media(max-width:768px){
        grid-template-rows:1.5fr 1fr 1fr;
        grid-template-columns:unset;
        grid-template-areas:
         'productname  deletebutton' 
         'type price' 
         'time description';
        line-height:1.5;
    }
`;

export const DeleteButton = styled.button`
    border:0;
    background:transparent;
    justify-self:end;
    cursor:pointer;
    padding: 0 5px;
    grid-area:deletebutton;
    @media (min-width: 768px) {
        grid-area: unset;
    }
`;

const Id = styled.p`
`;

const ProductName = styled.p`
    grid-area:productname;
    @media (min-width: 768px) {
        grid-area: unset;
    }
`;
const Price = styled.p`
    grid-area:price;
    justify-self:end;
    @media (min-width: 768px) {
        grid-area: unset;
        justify-self:unset;
    }
`;
const Type = styled.p`
    grid-area:type;
    @media (min-width: 768px) {
        grid-area: unset;
    }
`;
const Description = styled.p`
    grid-area:description;
    justify-self:end;
    @media (min-width: 768px) {
        grid-area: unset;
        justify-self:unset;
    }
`;

const EmptyServices = styled.div`
    margin: 100px;
    font-size:30px;
    line-height:3;
    color: white;
    text-align: center;
`;

const Time = styled.p`
    grid-area:time;
    @media (min-width: 768px) {
        grid-area: unset;
    }
`;
function ServiceList() {
    const services = useSelector(selectServices).services;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchServiceAsync());
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceId, setServiceId] = useState('');
    return (
        <Content>
            <AlertDialog
                open={isModalOpen}
                handleClose={(agree) => {
                    if (agree && serviceId !== '') {
                        dispatch(deleteService(serviceId));

                    }
                    setIsModalOpen(false);
                }}
            />
            {services.length === 0 && (
                <EmptyServices>
                    There are no product / services. <br />Please add new.
                </EmptyServices>
            )}
            {services.length !== 0 && (
                services.map((service, key) => (
                    <Item key={key}>
                        <ProductName>
                            {service.serviceName}
                        </ProductName>
                        <Price>
                        £{Number.parseFloat(service.price).toFixed(2)}
                        </Price>
                        {
                            service.type === "Time period rate" && (<Time>{dayjs(service.startTime).format('HH:mm')} - {dayjs(service.endTime).format('HH:mm')}</Time>)

                        }
                        {
                            service.type !== "Time period rate" && <Time>N/A</Time>
                        }
                        <Description>
                            {service.description.length > 20 ? service.description.substr(0, 20) + '...' : service.description}
                        </Description>
                        <Type

                        >
                            {service.type}
                        </Type>
                        <DeleteButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                                setServiceId(service._id);
                            }}
                        >
                            <Icon
                                name={'delete'}
                                size={20}
                                color="hsl(252, 94%, 67%)"
                            />
                        </DeleteButton>

                    </Item>
                ))
            )}

        </Content>
    );
}

export default ServiceList;