import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchAttendantChildren, selectAttendance } from "../../reducers/attendanceSlice";

import styled from "styled-components";

import TodayItem from "./TodayItem";
import TodayChildDetail from "./TodayChildDetail";

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

function TodayChildren(){
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAttendantChildren());
    }, [dispatch])
    const attendantChildren=useSelector(selectAttendance).attendantChildren;
    return (
        <>
            <TodayChildDetail />
            <Header>
                <h2 style={{ color: 'white' }}>Children of Today</h2>
            </Header>
            <hr style={{ borderColor: '#785050', margin: '10px 0 40px 0' }} />
            {attendantChildren.length===0 && (
                <EmptyChildren>
                    There is no attendant child today.
                </EmptyChildren>
            )}
            {attendantChildren.length!==0 && (
                <List>
                    {
                        attendantChildren.map((child, key)=>(
                            <TodayItem key={key} child={child.child[0]} />
                        ))
                    }
                </List>
                
            )}

        </>
    )
}

export default TodayChildren;
