import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ChildItem from "./ChildItem";
import { selectChildren, fetchChildren } from "../../reducers/childrenReducer";
import { setSelectedChildren, selectAttendance } from "../../reducers/attendanceSlice";
import { newAttendanceModalToggle } from "../../reducers/uiSlice";
const List = styled.div`
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    justify-content:left;
`;

const EmptyChildren = styled.div`
    margin: 100px;
    font-size:30px;
    line-height:3;
    color: white;
    text-align: center;

`;

const Header = styled.div`
    display:grid;
    grid-template-columns:1.5fr auto auto;
    gap:10px;
`;

const RegisterButton = styled.button`
    background: none;
    border: 0;
    color: white;
    font-size: 20px;
    cursor:pointer;
    &:hover{
        color:#ffb1b1;
    }
`;


function ChildrenList() {
    const children = useSelector(selectChildren);
    const selectedChildren = useSelector(selectAttendance).selectedChildren;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChildren());
    }, [dispatch]);
    const handleRegisterClick = () => {
        dispatch(newAttendanceModalToggle(true));
    }

    return (
        <>
            <Header>
                <h2 style={{ color: 'white' }}>Register children today</h2>
                {selectedChildren.length !== 0 && <RegisterButton onClick={handleRegisterClick}>Register</RegisterButton>}
            </Header>

            <hr style={{ borderColor: '#785050', margin: '10px 0 40px 0' }} />
            {children.length === 0 && <EmptyChildren>
                There is no child. Please add new child.
            </EmptyChildren>}
            {children.length !== 0 && (
                <List>
                    {children.map((child, key) => (
                        child.active && <ChildItem key={key} child={child} />
                    ))}
                </List>
            )}

        </>

    );
}

export default ChildrenList;