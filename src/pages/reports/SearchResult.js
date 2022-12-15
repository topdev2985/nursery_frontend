import React from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { selectSearch } from "../../reducers/searchSlice";
import { setRegisterValue } from "../../reducers/attendanceSlice";
import { newAttendanceModalToggle } from "../../reducers/uiSlice";
import Update from "./Update";

const SearchTable = styled.table`
    width: 100%;
    color: white;
    margin-top: 30px;
    border: 1px solid #545454;
    border-collapse:collapse;
    th, td{
        border:1px solid #545454;
        padding: 4px;
        line-height:2.5;
        text-align:center;
        border-collapse:collapse;
        
    }
    th{
        color:#1976d2;
    }
    tr{
        cursor:pointer;
        &:hover{
            background-color:rgb(0 0 0 / 54%);
        }
    }
    #mobilehide{
        @media(max-width:600px){
            display:none;
        }
    }
`;

const EmptySearch = styled.div`
    color: white;
    margin: 50px;
    font-size: 30px;
    text-align: center;
`;

export default function SearchResult() {
    const results = useSelector(selectSearch).results;
    const dispatch=useDispatch();
    const handleClick=(result)=>{
        const register=result;
        dispatch(setRegisterValue(register));
        dispatch(newAttendanceModalToggle(true));
    }
    return (
        <>
            {results.length === 0 && <EmptySearch>There is no result.</EmptySearch>}
            {results.length !== 0 && (
                <SearchTable border="">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Entry time</th>
                            <th>End time</th>
                            <th>Holding fee</th>
                            <th id="mobilehide">Type</th>
                            <th id="mobilehide">Name</th>
                            <th id="mobilehide">Description</th>
                            <th>Meal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((res, key) => (
                                <tr key={key} onClick={()=>{handleClick(res)}}>
                                    <td>{key + 1}</td>
                                    <td>{dayjs(res.entryTime).format('HH:mm')}</td>
                                    <td>{dayjs(res.endTime).format('HH:mm')}</td>
                                    <td>{res.holdingFee?'Active':'Inactive'}</td>
                                    <td id="mobilehide">{res.holdingFee_type}</td>
                                    <td id="mobilehide">{res.holdingFee_name}</td>
                                    <td id="mobilehide">{res.holdingFee_desc}</td>
                                    <td>{res.meal?'Active':'Inactive'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </SearchTable>
            )}
            <Update />
        </>

    )
}