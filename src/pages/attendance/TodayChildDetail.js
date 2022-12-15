import React, { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { TextField } from "@mui/material";
import Switch from "@mui/material/Switch";

import { StyledButton } from "../../components/Button/ButtonStyles";

import { Fieldset, Input, InputsGroup, InputWrapper, Label, Select, TextArea } from "../../components/FormControls/FormControlStyles";
import { snackbarToggle } from "../../reducers/uiSlice";
import { selectAttendanceDetail, attendanceDetailToggle } from "../../reducers/uiSlice";
import { fetchAttendantChildActivity, selectAttendance, fetchAttendantChildren } from "../../reducers/attendanceSlice";
import { saveRegisterValuesApi } from "../../actions/attendanceApi";

import TimeItem from "./TimeItem";

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
const Container = styled.div`
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

const Img = styled.img`
    border-radius: 50%;
    height: 250px;
    width: 250px;
    margin: 20px;
`;

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const ChildName = styled.p`
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    color: hsl(252deg 94% 67%);
`;

const AttendanceInfo = styled.div`
margin-bottom: 10px;
`;

const MealInfo = styled.p`
`;
const HoldingFeeInfo = styled.div`
line-height: 1.5;
margin-bottom: 10px;
`;
const HoldingFeeText = styled.div`
    margin-left:25px;
`





export default function TodayChildDetail() {

    const open = useSelector(selectAttendanceDetail);

    const childDetail = useSelector(selectAttendance).attendantChildDetail;
    const childActivity = useSelector(selectAttendance).attendantChildActivity;

    const dispatch = useDispatch();

    useEffect(() => {
        if (childDetail._id === '') return;
        dispatch(fetchAttendantChildActivity(childDetail._id));
    }, [dispatch, childDetail]);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (!timeOpen && ref.current && !ref.current.contains(e.target)) {
                    dispatch(attendanceDetailToggle(false));
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, timeOpen]);
    }

    const [timeOpen, setTimeOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const dateStr = dayjs(new Date()).format('YYYY-MM-DD');

    const [newEntryTime, setNewEntryTime] = useState(dayjs(new Date()));
    const [newEndTime, setNewEndTime] = useState(dayjs(new Date()));

    const handleNewClick = () => {
        const newAc = {
            entryTime: newEntryTime,
            endTime: newEndTime,
            holdingFee: false,
            meal: false,
            holdingFee_type: '',
            holdingFee_name: '',
            holdingFee_desc: ''
        }
        const selChild = [childDetail._id];
        saveRegisterValuesApi(selChild, newAc, (res) => {
            dispatch(fetchAttendantChildren());
            dispatch(snackbarToggle({ open: true, message: 'Success!' }));
            dispatch(attendanceDetailToggle(false));

        })
    }

    return (
        <Modal
            $open={open}
            ref={wrapperRef}
        >
            <Container>
                <GotoBack
                    onClick={() => {
                        dispatch(attendanceDetailToggle(false));
                    }}
                >
                    <ArrowBackIosIcon sx={{ fontSize: '0.7rem' }} />
                    Go back
                </GotoBack>
                <p style={{ margin: '50px 0 0 0' }}>Today: {dateStr}</p>
                <ImgContainer>
                    <Img src={childDetail.profile} />
                </ImgContainer>

                <ChildName>
                    {childDetail.firstName}
                </ChildName>

                <AttendanceInfo>
                    {childActivity.length !== 0 && childActivity[0].meal && <MealInfo>- Meal Applied</MealInfo>}
                    {childActivity.length !== 0 && childActivity[0].holdingFee && (
                        <HoldingFeeInfo>
                           - Holding fee Applied

                            <HoldingFeeText>
                                Type: {childActivity[0].holdingFee_type}<br />
                                Name: {childActivity[0].holdingFee_name}<br />
                                Description: {childActivity[0].holdingFee_desc}<br />
                            </HoldingFeeText>

                        </HoldingFeeInfo>
                    )}

                </AttendanceInfo>
                <InputsGroup style={{ marginBottom: '20px' }}>
                    <InputWrapper>
                        <Label>Entry Time</Label>
                    </InputWrapper>
                    <InputWrapper>
                        <Label>End Time</Label>
                    </InputWrapper>
                </InputsGroup>

                {
                    childActivity.length !== 0 && (
                        childActivity.map((activity, key) => (
                            <InputsGroup key={key} style={{ marginBottom: '20px' }}>
                                <InputWrapper>
                                    <TimeItem activity={activity} childId={childDetail._id} handleOpen={(open) => setTimeOpen(open)} type="entryTime" />
                                </InputWrapper>
                                <InputWrapper>
                                    <TimeItem activity={activity} childId={childDetail._id} handleOpen={(open) => setTimeOpen(open)} type="endTime" />
                                </InputWrapper>
                            </InputsGroup>
                        ))
                    )
                }

                <h3>Insert New</h3>
                <hr />
                <InputsGroup style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <InputWrapper>
                        <Label>
                            Entry time:
                        </Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                                value={newEntryTime}
                                onChange={newVal => {
                                    setNewEntryTime(newVal);
                                }}
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
                    <InputWrapper>
                        <Label>
                            End time:
                        </Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                                value={newEndTime}
                                onChange={newVal => {
                                    setNewEndTime(newVal);
                                }}
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

                <StyledButton
                    $save
                    type="button"
                    style={{
                        width: '100%',
                    }}
                    onClick={() => {
                        handleNewClick();
                    }}
                >
                    Register
                </StyledButton>
            </Container>


        </Modal>
    )
}