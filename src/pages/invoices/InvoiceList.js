import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";
import { selectInvoice } from "../../reducers/invoiceSlices";
import { InputsGroup, InputWrapper, Label, Input } from "../../components/FormControls/FormControlStyles";

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
        @media(max-width:900px){
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

const Memo = styled.div`
padding: 36px;
color: white;
margin-top: 20px;
line-height: 2;
border: 1px solid;
`;


export default function InvoiceList() {
    const results = useSelector(selectInvoice).invoices;
    const [invoiceno, setInvoiceno] = useState(0);
    const [invoicedate, setInvoicedate] = useState(dayjs(new Date()));
    const [duedate, setDuedate] = useState(dayjs(new Date()));

    const handleExport = () => {
        // if(invoiceno<=0)return;
        // console.log('this is invoice export');
        if(results.service.length===0)return;
        tableToCSV()
    }
    function tableToCSV() {

        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td,th');


            // Stores each csv row data
            var csvrow = [];
            if (i === 0) {
                csvrow.push('InvoiceNo');
                csvrow.push('Customer');
                csvrow.push('InvoiceDate');
                csvrow.push('DueDate');
                csvrow.push('Memo');
            }
            else{
                csvrow.push(invoiceno);
                csvrow.push(results.parentName);
                csvrow.push(dayjs(invoicedate).format('DD/MM/YYYY'));
                csvrow.push(dayjs(duedate).format('DD/MM/YYYY'));
                csvrow.push(results.memoInfo.join('|'));
            }

            for (var j = 0; j < cols.length; j++) {

                // Get the text data of each cell
                // of a row and push it to csvrow
                csvrow.push(cols[j].innerHTML);
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }

        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file 
        downloadCSVFile(csv_data);

    }

    function downloadCSVFile(csv_data) {

        // Create CSV file object and feed
        // our csv_data into it
        var CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        let filename=dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')+'_invoice.csv';
        temp_link.download = filename;
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
    }

    return (
        <>
            <h3 style={{ margin: '30px 0 10px 0', color: 'white', fontSize: '20px' }}>Export Invoice</h3>
            <hr />
            <InputsGroup style={{ marginTop: '30px' }}>
                <InputWrapper>
                    <Label>Invoice No</Label>
                    <Input value={invoiceno} onChange={e => { setInvoiceno(e.target.value) }} />
                </InputWrapper>
                {/* <InputWrapper>
                    <Label>Customer</Label>
                    <Input />

                </InputWrapper> */}
                <InputWrapper>
                    <Label>Invoice Date</Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={invoicedate}
                            onChange={val => {
                                setInvoicedate(val);
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
                    </LocalizationProvider>
                </InputWrapper>
                <InputWrapper>
                    <Label>Due Date</Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={duedate}
                            onChange={val => {
                                setDuedate(val);
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
                    </LocalizationProvider>
                </InputWrapper>
                <InputWrapper>
                    <Label>Export</Label>
                    <StyledButton
                        onClick={handleExport}
                    >Export Invoice</StyledButton>
                </InputWrapper>
            </InputsGroup>
            {results.service.length === 0 && <EmptySearch>There is no result.</EmptySearch>}
            {results.service.length !== 0 && results.service[0].data.length !== 0 && (
                <SearchTable border="">
                    <thead>
                        <tr>
                            <th>Item(product/service)</th>
                            <th>Item Description</th>
                            <th id="mobilehide">ItemQuantity</th>
                            <th id="mobilehide">ItemRate</th>
                            <th id="mobilehide">Discount</th>
                            <th >ItemAmount</th>
                            <th id="mobilehide">Service Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.service.map((ser, key) =>
                                ser.data.map((s, k) => (
                                    <tr key={k}>
                                        <td>{s._id.serviceName}</td>
                                        <td>{s.extra[0].childName} {ser.weeks.start}-{ser.weeks.end}</td>
                                        <td id="mobilehide">{s.amount}</td>
                                        <td id="mobilehide">{parseFloat(s.extra[0].servicePrice, 2).toFixed(2)}</td>
                                        <td id="mobilehide">{results.discount}</td>
                                        <td>{parseFloat(s.amount * s.extra[0].servicePrice * (100 - results.discount) / 100).toFixed(2)}</td>
                                        <td id="mobilehide">{ser.weeks.start}-{ser.weeks.end}</td>
                                    </tr>
                                ))
                            )
                        }
                        <tr>
                            <td>Meals</td>
                            <td>Child{results.dateRange.start}-{results.dateRange.start}</td>
                            <td id="mobilehide">{results.meal}</td>
                            <td id="mobilehide">{parseFloat(results.mealPrice).toFixed(2)}</td>
                            <td id="mobilehide">{results.discount}</td>
                            <td>{parseFloat(results.meal * results.mealPrice * (100 - results.discount) / 100)}</td>
                            <td id="mobilehide">{results.dateRange.start}-{results.dateRange.start}</td>
                        </tr>
                    </tbody>
                </SearchTable>
            )}

            {results.memoInfo.length!==0&&<Memo>
                <ul>
                    {
                        results.memoInfo.map((memo, key) => (
                            memo !== null && <li key={key}>{memo}</li>
                        ))
                    }
                </ul>
            </Memo>}
        </>

    )
}