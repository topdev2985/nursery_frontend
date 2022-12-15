import React, { useRef, useState, useEffect } from "react";

import styled, { css } from 'styled-components';

import { useSelector, useDispatch } from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { TextField } from "@mui/material";
import Switch from "@mui/material/Switch";

import { StyledButton } from "../../components/Button/ButtonStyles";
import { Fieldset, Input, InputsGroup, InputWrapper, Label, Select, TextArea } from "../../components/FormControls/FormControlStyles";
import { newAttendanceModalToggle, selectAttendanceModal } from "../../reducers/uiSlice";

import { selectAttendance, setRegisterValue, updateAttendantChildActivity } from "../../reducers/attendanceSlice";
import { snackbarToggle } from "../../reducers/uiSlice";


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
`;
function Update() {
    const dispatch = useDispatch();
    const open = useSelector(selectAttendanceModal);
    const [timeOpen, setTimeOpen] = useState(false);
    
    
    const registerValues=useSelector(selectAttendance).registerValues;
    const [isHoldingFee, setIsHoldingFee]=useState(false);

    useEffect(()=>{
        setIsHoldingFee(registerValues.holdingFee);
    }, [registerValues])
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (!timeOpen && ref.current && !ref.current.contains(e.target)) {
                    dispatch(newAttendanceModalToggle(false));
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, timeOpen]);
    }

    const wrapperRef1 = useRef(null);
    useOutsideAlerter(wrapperRef1);

    const dateStr=dayjs(registerValues.entryTime).format('YYYY-MM-DD');

    return (
        <Modal
            $open={open} 
            ref={wrapperRef1}
        >
            <Container
                onSubmit={(e)=>{
                    e.preventDefault();
                    dispatch(newAttendanceModalToggle(false));
                    dispatch(snackbarToggle({open:true, message:'Success! Refresh page to see result'}));
                    dispatch(updateAttendantChildActivity(registerValues._id));
                }}
            >
                <GotoBack
                    onClick={() => {
                        dispatch(newAttendanceModalToggle(false));
                    }}
                >
                    <ArrowBackIosIcon sx={{ fontSize: '0.7rem' }} />
                    Go back
                </GotoBack>
                <h1 style={{marginTop:'20px'}}>Edit</h1>
                <p style={{margin:'50px 0 0 0'}}>Date: {dateStr}</p>
                <Fieldset
                    style={{
                        margin: '50px 0'
                    }}
                >
                    <InputsGroup>
                        <InputWrapper>
                            <Label>
                                Entry time:
                            </Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker
                                    value={dayjs(registerValues.entryTime)}
                                    onChange={newVal => {
                                        const _time = dayjs(newVal).toDate().toString();
                                        dispatch(setRegisterValue({entryTime:_time}))
                                    }}
                                    onOpen={()=>{
                                        setTimeOpen(true);
                                    }}
                                    onClose={()=>{
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
                        <InputWrapper>
                            <Label>
                                End time:
                            </Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker
                                    value={dayjs(registerValues.endTime)}
                                    onChange={newVal => {
                                        const _time = dayjs(newVal).toDate().toString();
                                        dispatch(setRegisterValue({endTime:_time}))
                                    }}
                                    onOpen={()=>{
                                        setTimeOpen(true);
                                    }}
                                    onClose={()=>{
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
                    <InputWrapper>
                        <Label>
                            Holding fee:
                        </Label>
                        <PurpleSwitch
                            size="large"
                            checked={registerValues.holdingFee}
                            onChange={e=>{
                                dispatch(setRegisterValue({holdingFee:e.target.checked}));
                                setIsHoldingFee(e.target.checked);
                            }}
                        />
                    </InputWrapper>

                    <InputsGroup style={{display: isHoldingFee ?'inherit':'none'}}>
                        <InputWrapper>
                            <Label>
                                Type:
                            </Label>
                            <Select
                                value={registerValues.holdingFee_type}
                                onChange={e=>{
                                    dispatch(setRegisterValue({holdingFee_type:e.target.value}));

                                }}
                            >
                                <option value=""></option>
                                <option value="Bank Holiday">Bank Holiday</option>
                                <option value="Half Term">Half Term</option>
                                <option value="Summer Holiday">Summer Holiday</option>
                            </Select>
                        </InputWrapper>
                        <InputWrapper>
                            <Label>
                                Name:
                            </Label>
                            <Input 
                                value={registerValues.holdingFee_name}
                                onChange={e=>{
                                    dispatch(setRegisterValue({holdingFee_name:e.target.value}));
                                }}
                            />
                        </InputWrapper>
                    </InputsGroup>
                    <InputWrapper style={{display: isHoldingFee ?'inherit':'none'}}>
                        <Label>
                            Description:
                        </Label>
                        <TextArea 
                            value={registerValues.holdingFee_desc}
                            onChange={e=>{
                                dispatch(setRegisterValue({holdingFee_desc:e.target.value}));
                            }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label>
                            Meal:
                        </Label>
                        <PurpleSwitch
                            checked={registerValues.meal}
                            onChange={e=>{
                                dispatch(setRegisterValue({meal:e.target.checked}));
                            }}
                            size="large"
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
                    Update
                </StyledButton>
            </Container>
        </Modal>
    )
}

export default Update;