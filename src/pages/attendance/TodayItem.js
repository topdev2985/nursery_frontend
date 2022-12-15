import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, {css} from "styled-components";

import { attendanceDetailToggle } from "../../reducers/uiSlice";
import { setAttendantChildDetail } from "../../reducers/attendanceSlice";

const Item = styled.div`
    color:white;
    cursor:pointer;
    padding:10px;
    border-radius:10px;
    &:hover{
        background-color:#0c0c0cf5;
        transition:background-color 1s;
    }
    ${({ $selected }) => $selected && css`
        background-color:#0c0c0cf5;
    `}
`;
const Text = styled.div`
    margin-top: 9px;
    text-align: center;
`;
const ChildName = styled.h5`
    color:#9d9cfb;
`;
const Birthday = styled.p`
    font-size:10px;
`;
const ParentName = styled.p`
    font-size:10px;
`;

const SubText = styled.div`
    margin-top: 5px;
    color: #b3b3b3;
`;
const Img=styled.img`
    width:120px;
    height:120px;
    border-radius:50%;
    @media (max-width:600px){
        width:90px;
        height:90px;
    }
`;
function TodayItem(props) {
    const { parentName, firstName, birthday, profile, _id } = props.child;
    const dispatch=useDispatch();
    const handleClick=()=>{
        dispatch(attendanceDetailToggle(true));
        dispatch(setAttendantChildDetail(props.child));
    }
    return (
        <Item
           
            onClick={handleClick}
        >
            <Img src={profile} />
            <Text>
                <ChildName>{firstName}</ChildName>
                <SubText>
                    <ParentName>{parentName}</ParentName>
                    <Birthday>{birthday}</Birthday>
                </SubText>

            </Text>

        </Item>
    )
}

export default TodayItem;