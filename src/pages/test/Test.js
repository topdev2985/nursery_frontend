import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    change1,
    change2,
    testAsync,
    selectMessage
} from '../../reducers/testReducer';



const Test=()=>{
    const message = useSelector(selectMessage);
    const dispatch=useDispatch();
    const [msg1, setMsg1]=useState('');
    return (
        <>
            <h3>{message}</h3>
            <div>
                <input 
                    value={msg1}
                    onChange={e=>{
                        setMsg1(e.target.value);
                    }} 
                />
                <button
                    onClick={e=>{
                        dispatch(change1(msg1))
                    }}
                >change1</button>
                <button
                    onClick={e=>{
                        dispatch(change2(msg1))
                    }}
                >change2</button>
                <button
                    onClick={e=>{
                        dispatch(testAsync())
                    }}
                >Async</button>
            </div>
        </>
    )
}

export default Test;