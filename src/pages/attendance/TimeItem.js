import React, { useEffect, useState } from "react";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { TextField } from "@mui/material";

import { updateChildActivityTime } from '../../actions/attendanceApi';

const TimeProvider = <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MobileTimePicker
        // value={dayjs(activity.endTime)}
        onChange={newVal => {
            const _time = dayjs(newVal).toDate().toString();
            // dispatch(setRegisterValue({endTime:_time}))
        }}
        onOpen={() => {
            // setTimeOpen(true);
        }}
        onClose={() => {
            // setTimeOpen(false);
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
</LocalizationProvider>;

export default function TimeItem(props) {
    const { childId, activity, type, handleOpen } = props;
    const [time, setTime]=useState(dayjs(activity[type]));
    useEffect(()=>{
        setTime(dayjs(activity[type]));
    }, [activity])
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                    value={time}
                    onChange={newVal => {
                        setTime(newVal);
                    }}
                    onOpen={() => {
                        handleOpen(true);
                    }}
                    onClose={() => {
                        updateChildActivityTime(childId, type, activity._id, dayjs(time), (res)=>{
                            console.log(res);
                        });
                        handleOpen(false);
                    }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                    fontFamily: "'Spartan',sans-serif",
                                    fontSize: '0.8rem',
                                    backgroundColor: 'hsl(231deg 47% 16%)',
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
        </>
    )
}