import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import styled from "styled-components";
import { Input, InputsGroup, InputWrapper, Label, Fieldset } from "../../components/FormControls/FormControlStyles";
import { register } from "../../actions/logApi";
import { setAuth } from "../../reducers/authReducer";
import { snackbarToggle } from "../../reducers/uiSlice";
const Container=styled.form`
    width: 328px;
    margin-right: auto;
    margin-left: auto;
    margin-top: calc(50vh - 240px);
`

const StyledButton = styled.button`
    font-size: 20px;
    color: white;
    background-color: hsl(252deg 94% 67%);
    border: 0;
    border-radius: 4px;
    line-height: 2.55;
    font-weight: bold;
    cursor:pointer;
    &:hover{
        background-color:hsl(252deg 100% 73%);
    }
`;
export default function Register() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [cpassword, setCPassword]=useState('');
    const handleClick=()=>{
        if(username===''||password===''){
            return;
        }
        if(password!==cpassword){
            alert('Pleae enter password again')
            return;
        }
        register(username, password, (res)=>{
            if(res.data.message==="Success"){
                // alert(res.data.message);
                
                navigate('/login');
                dispatch(snackbarToggle({open:true, message:"Success!!!"}));
            } else {    
                alert(res.data.message);
            }
        })
    }
    return (
        <Container onSubmit={e=>{
            e.preventDefault();
            handleClick();
        }}>
            <h2 style={{width:"100%", color:'white', textAlign:'center', marginBottom:'40px'}}>Nursery System</h2>
            <Fieldset>
                <InputWrapper>
                    <Label>Username</Label>
                    <Input value={username} required onChange={e=>{
                        setUsername(e.target.value);
                    }}/>
                </InputWrapper>
                <InputWrapper>
                    <Label>Password</Label>
                    <Input value={password} type="password" name="pw1" required onChange={e=>{
                        setPassword(e.target.value);
                    }}/>
                </InputWrapper>
                <InputWrapper>
                    <Label>Confirm Password</Label>
                    <Input value={cpassword} type="password" name="pw2" required onChange={e=>{
                        setCPassword(e.target.value);
                    }}/>
                </InputWrapper>
                <InputWrapper>
                    <StyledButton type="submit">Register</StyledButton>
                </InputWrapper>
                <Link to="/login">to login</Link>
            </Fieldset>
            
        </Container>
    )
}

