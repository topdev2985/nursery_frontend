import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { selectAttendance, setSelectedChildren } from "../../reducers/attendanceSlice";
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
const Img = styled.img`
    width:120px;
    height:120px;
    border-radius:50%;
    @media (max-width:600px){
        width:90px;
        height:90px;
    }
`;
function ChildItem(props) {
    const { parentName, firstName, birthday, profile, _id } = props.child;
    const dispatch = useDispatch();
    const selectedChildren = useSelector(selectAttendance).selectedChildren;

    const [selected, setSelected] = useState(selectedChildren.indexOf(_id) !== -1);
    useEffect(() => {
        setSelected(selectedChildren.indexOf(_id) !== -1);
    }, [selectedChildren]);

    const handleChildClick = () => {
        // console.log(childId, selected);

        dispatch(setSelectedChildren({ childId: _id, selected: !selected }));

    };
    return (
        <Item
            $selected={selected}
            onClick={handleChildClick}
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

export default ChildItem;