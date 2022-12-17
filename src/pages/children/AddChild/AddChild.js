import React, { useState, useEffect, useRef } from "react";
import styled, { css } from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";
import Switch from "@mui/material/Switch";

import axios from "axios";

import { Input, InputsGroup, InputWrapper, Label, Fieldset, Select } from "../../../components/FormControls/FormControlStyles";
import { selectChildModal, newChildModalToggle } from "../../../reducers/uiSlice";
import { StyledButton } from "../../../components/Button/ButtonStyles";

// import ImageUpload from './ImageUpload';
// import PhotoUpload from './PhotoUpload';
import AvartarCrop from "./AvatarCrop";

import { setChild, selectChild, insertChild, selectIsNew, selectChildId, editChild } from "../../../reducers/childrenReducer";

const Modal = styled.div`
    height: 100vh;
    width: 500px;
    background: hsl(231deg 47% 16%);
    left:-700px;
    transition: left 1s;
    top:0;
    bottom:0;
    position:fixed;
    @media(max-width:600px){
        width:100%;
    }
    padding-bottom:30px;
    margin-bottom:40px;
    overflow-y:auto;
    z-index:10;
    scrollbar-width: thin;
    scrollbar-color: hsl(233, 30%, 21%) transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: hsl(233, 30%, 21%);
        border-radius: 20px;
    }
    @media(max-width:1024px){
        top:clamp(72px, 10.5vw, 80px);
        padding-bottom:50px;
    }
    ${({ $open }) => $open && css`
        left:103px;
        @media(max-width:1024px){
            left:0px;
        }
    `}
`;
const Container = styled.form`
    margin:50px;
    color:white;
`;
const GotoBack = styled.button`
    color:hsl(252,94%,67%);
    font-size:13px;
    background:transparent;
    border:0;
    visibility:hidden;
    @media(max-width:600px){
        visibility:visible;
    }

`;

const PurpleSwitch = styled(Switch)`
    .MuiSwitch-switchBase.Mui-checked{
        color:hsl(252,94%,67%)
    }
    .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track{
        background-color:hsl(252,94%,67%)
    }
`

function AddChild() {
    /**
     * customer pull
     */
    const [customers, setCustomers]=useState([]);
    useEffect(()=>{
        axios.get('/customerspullapi').then(res=>{
            if(res.data && res.data.length!==0){
                setCustomers(res.data)
            }
        })
        .catch(e=>{
            alert('QuickBooks connection error');
        })

    },[setCustomers]);

    const open = useSelector(selectChildModal);
    const dispatch = useDispatch();
    const editChilId = useSelector(selectChildId);
    const isNew = useSelector(selectIsNew);
    const [date, setDate] = React.useState(dayjs('2022-11-11'));
    const [timeOpen, setTimeOpen] = useState(false);
    const handleChangeDate = (newValue) => {
        setDate(newValue);
        const birthday = dayjs(newValue).format('DD/MM/YYYY');
        dispatch(setChild({ birthday: birthday }));
        // setTimeOpen(false);
    };
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (!timeOpen && ref.current && !ref.current.contains(e.target)) {
                    dispatch(newChildModalToggle(false));
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, timeOpen]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const child = useSelector(selectChild);

    return (

        <Modal
            $open={open}
            ref={wrapperRef}
        >
            <Container onSubmit={e => {
                e.preventDefault();
                dispatch(newChildModalToggle(false));
                if (isNew) {
                    dispatch(insertChild());
                }
                else {
                    dispatch(editChild(editChilId));
                }

            }}>
                <GotoBack
                    onClick={() => {
                        dispatch(newChildModalToggle(false));
                    }}
                >
                    <ArrowBackIosIcon sx={{ fontSize: '0.7rem' }} />
                    Go back
                </GotoBack>
                <h1>New Child</h1>
                <Fieldset>
                    {/* <ImageUpload profile={child.profile} /> */}
                    {/* <PhotoUpload /> */}
                    <AvartarCrop />
                    <InputWrapper>
                        <Label htmlFor="parentname">
                            Parent Name:
                        </Label>
                        <Select
                            onChange={e => {
                                dispatch(setChild({ parentName: e.target.value }));
                            }}
                            value={child.parentName}
                            required
                        >
                            <option value=""></option>
                            {customers.length!==0 && (
                                customers.map((customer, key)=>(
                                    <option value={customer.FullyQualifiedName} key={customer.FullyQualifiedName}>{customer.FullyQualifiedName}</option>
                                ))
                            )}
                        </Select>
                        
                    </InputWrapper>
                    <InputsGroup>
                        <InputWrapper>
                            <Label htmlFor="firstname">
                                First Name:
                            </Label>
                            <Input
                                name="firstname"
                                type="text"
                                required
                                value={child.firstName}
                                onChange={e => {
                                    dispatch(setChild({ firstName: e.target.value }));
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label htmlFor="surname">
                                Sur Name:
                            </Label>
                            <Input
                                name="surname"
                                type="text"
                                required
                                value={child.surName}
                                onChange={e => {
                                    dispatch(setChild({ surName: e.target.value }));
                                }}
                            />
                        </InputWrapper>
                    </InputsGroup>
                    <InputsGroup>
                        <InputWrapper>
                            <Label>
                                Birthday:
                            </Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    inputFormat="DD/MM/YYYY"
                                    value={date}
                                    onChange={handleChangeDate}
                                    onOpen={() => {
                                        setTimeOpen(true);
                                    }}
                                    onClose={() => {
                                        setTimeOpen(false);
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
                    </InputsGroup>
                    <InputsGroup>
                        <InputWrapper>
                            <Label>
                                Funded
                            </Label>
                            <PurpleSwitch
                                checked={child.funded}
                                onChange={e => {
                                    dispatch(setChild({ funded: e.target.checked }));
                                }}
                                size="large"
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>
                                Holding fee(GBP)
                            </Label>
                            <Input
                                name="holdingfee"
                                type="number"
                                value={child.holdingFee}
                                onChange={e => {
                                    dispatch(setChild({ holdingFee: e.target.value }));
                                }}

                            />
                        </InputWrapper>
                    </InputsGroup>
                    <InputWrapper>
                        <Label htmlFor="discount">
                            Discount(%)
                        </Label>
                        <Input
                            name="discount"
                            type="number"
                            value={child.discount}
                            onChange={e => {
                                dispatch(setChild({ discount: e.target.value }));
                            }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label>
                            Active
                        </Label>
                        <PurpleSwitch
                            size="large"
                            checked={child.active}
                            onChange={e => {
                                dispatch(setChild({ active: e.target.checked }));
                            }}
                        />
                    </InputWrapper>
                </Fieldset>
                <StyledButton
                    $save
                    type="submit"
                    style={{
                        width: '100%',
                    }}
                >
                    {isNew ? 'Add New' : 'Save'}
                </StyledButton>
            </Container>

        </Modal>

    )
}

export default AddChild;