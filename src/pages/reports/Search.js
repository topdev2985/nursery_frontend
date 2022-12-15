import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";

import styled from 'styled-components';
import { Select, InputsGroup, InputWrapper, Label } from "../../components/FormControls/FormControlStyles";
import { selectChildren, fetchChildren } from "../../reducers/childrenReducer";
import { fetchSearch } from "../../reducers/searchSlice";
import { snackbarToggle } from "../../reducers/uiSlice";

const SearchPan = styled.div`

`;

const SearchButton = styled.button`
border: 0;
    background-color:  #1976d2c2;
    color: white;
    font-size: 19px;
    border-radius: 5px;
    line-height: 2.5;
    cursor:pointer;
    &:hover{
        background-color:#1976d2;
    }
`;


export default function Search() {
    const dispatch = useDispatch();
    const children = useSelector(selectChildren);

    useEffect(() => {
        dispatch(fetchChildren());
    }, [dispatch])

    const [date, setDate] = useState(dayjs(new Date()));
    const [childId, setChildId]=useState('');

    const handleSearch = () => {
        if(childId===''){
            dispatch(snackbarToggle({open:true, message: 'Please select child'}));
            return;
        }
        console.log(childId)
        const dateStr=dayjs(date).format('YYYY-MM-DD');
        dispatch(fetchSearch({dateStr, childId}));

    }

    return (
        <SearchPan>
            <InputsGroup>
                <InputWrapper>
                    <Label>Date:</Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={date}
                            onOpen={() => {
                            }}
                            onClose={() => {
                            }}
                            onChange={newVal => {
                                setDate(newVal);
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            color: 'white',
                                            fontFamily: "'Spartan',sans-serif",
                                            fontSize: '0.8rem',
                                            backgroundColor: 'hsl(233, 31%, 17%)'
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: ' hsl(233,30%,21%)',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline:focus': {
                                            borderColor: 'hsl(252,94%,67%)'
                                        }
                                    }}
                                />}
                        />
                    </LocalizationProvider>
                </InputWrapper>
                <InputWrapper>
                    <Label>Child Name:</Label>
                    <Select
                        onChange={e=>{
                            setChildId(e.target.value);
                        }}
                    >
                        <option value=""></option>
                        {children.length !== 0 && (
                            children.map((child, key) => (
                                <option value={child._id} key={key}>{child.surName + ' ' + child.firstName}</option>
                            ))
                        )}

                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <Label>Action:</Label>
                    <SearchButton onClick={handleSearch}>Search</SearchButton>
                </InputWrapper>
            </InputsGroup>




        </SearchPan>
    )
}