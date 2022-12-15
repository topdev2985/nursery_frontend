import React, { useState } from "react";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Input, InputsGroup, InputWrapper, Label, Fieldset, TextArea, Select } from "../../components/FormControls/FormControlStyles";

import { selectServices, setService } from "../../reducers/serviceSlice";
import { TextField } from "@mui/material";

const Container = styled.div`
    color: white;
    margin: 20px;
`;

function AddService() {
    const service = useSelector(selectServices).service;
    const dispatch = useDispatch();
    const [isPeriod, setIsPeriod] = useState(false);
    return (
        <Container>
            <Fieldset>
                <InputsGroup>
                    <InputWrapper>
                        <Label htmlFor="servicename">
                            Product/Service Name:
                        </Label>
                        <Input
                            name="servicename"
                            type="text"
                            required
                            value={service.servicename}
                            onChange={e => {
                                dispatch(setService({ serviceName: e.target.value }));
                            }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="price">
                            Price(£):
                        </Label>
                        <Input
                            name="price"
                            type="number"
                            required
                            value={service.price}
                            onChange={e => {
                                dispatch(setService({ price: e.target.value }));
                            }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="type">
                            Type:
                        </Label>
                        <Select
                            value={service.type}
                            required
                            onChange={e => {
                                dispatch(setService({ type: e.target.value }));
                                if (e.target.value === "Time period rate") setIsPeriod(true);
                                else setIsPeriod(false);
                            }}
                        >
                            <option value=""></option>
                            <option value="Hourly">Hourly</option>
                            <option value="Meal">Meal</option>
                            <option value="Time period rate">Time period rate</option>

                        </Select>
                    </InputWrapper>
                </InputsGroup>
                <InputsGroup style={{ display: isPeriod ? 'inherit' : 'none'}}>
                    <InputWrapper>
                        <Label>Start time:</Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                                value={dayjs(service.startTime)}
                                onChange={newVal => {
                                    const _time = dayjs(newVal).format('YYYY-MM-DDTHH:mm:ss');
                                    dispatch(setService({ startTime: _time }))
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
                        <Label>End time:</Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                                value={dayjs(service.endTime)}
                                onChange={newVal => {
                                    const _time = dayjs(newVal).format('YYYY-MM-DDTHH:mm:ss');
                                    dispatch(setService({ endTime: _time }))
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
                    </InputWrapper>
                </InputsGroup>
                <InputWrapper>
                    <Label htmlFor="description">
                        Description:
                    </Label>
                    <TextArea
                        name="description"
                        value={service.description}
                        onChange={e => {
                            dispatch(setService({ description: e.target.value }));
                        }}
                    />
                </InputWrapper>
            </Fieldset>
        </Container>
    );
}

export default AddService;