import React, { useState } from "react";

import { Link , useNavigate} from "react-router-dom";

import styled from "styled-components";

import axios from "axios";

import { Input, InputWrapper, Label, Fieldset } from "../../components/FormControls/FormControlStyles";


import { login } from "../../actions/logApi";
// import { setAuth } from "../../reducers/authReducer";
const Container=styled.form`
    width: 328px;
    margin-right: auto;
    margin-left: auto;
    margin-top: calc(50vh - 200px);
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
const StyledButton1 = styled.button`
font-size: 20px;
color: white;
background-color:#2dbfffba;
border: 0;
border-radius: 4px;
line-height: 2.55;
font-weight: bold;
cursor:pointer;
&:hover{
    background-color: #2dbfff;
}
`;
export default function Login() {
    
    const navigate=useNavigate();

    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const handleClick=()=>{
        if(username===''||password===''){
            return;
        }
        login(username, password, (res)=>{
            console.log(res.data);
            if(res.data.message==="Success"){
                localStorage.setItem("token", res.data.token);
                navigate('/attendance');
            }else {
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
                    <Input value={password} type="password" required onChange={e=>{
                        setPassword(e.target.value);
                    }}/>
                </InputWrapper>
                <InputWrapper>
                    <StyledButton type="submit">Login</StyledButton>
                </InputWrapper>
                <Link to="/register">to register</Link>
                <StyledButton1
                   
                    onClick={e=>{
                        e.preventDefault();
                        axios.get('/authUri');
                    }}
                >Connect to QuickBooks</StyledButton1>
            </Fieldset>
        </Container>
    )
}

