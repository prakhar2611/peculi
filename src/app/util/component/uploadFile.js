"use client"
import React, { useState } from 'react';
import {
    BanIcon,
  DeleteColumnOutlined,
  DocumentRemoveIcon
  } from "@heroicons/react/solid";
  import {  InboxOutlined, UpCircleFilled } from '@ant-design/icons';
import { Button, Input, message, Upload } from 'antd';
import { Card, Icon } from '@tremor/react';
import { getUserInfo } from '../apiCallers/Google';
import { getCookie } from 'cookies-next';
const { Dragger } = Upload;
const XLSX = require('xlsx');

const props = {
  name: 'file',
  multiple: true,
  onChange(info) {
   
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

 export default function UploadFile( {callback,f,disabled}) {


    const [filename, setfilename] = useState(f);

    function handleFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});

            // Process the workbook and extract data
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const transactions = XLSX.utils.sheet_to_json(sheet, {header:1});

            // Assuming transactional data starts at a specific row
            const startRow = 20; // Adjust based on your Excel file
            const extractedData = processTransactions(transactions, startRow);
            callback(extractedData,sheetName)
            // Display or use the extracted data as needed
            // document.getElementById('output').textContent = JSON.stringify(extractedData, null, 2);
        };

        reader.readAsArrayBuffer(file);
    }



    function ExcelDateToJSDate(date) {
        return new Date(Math.round((date - 25569)*86400*1000));
      }
    
    function processTransactions(data, startRow) {
        const transactions = [];
    
        var userid =  getCookie("user_id")


        for (let i = startRow; i < data.length; i++) {
            const row = data[i];
            if (row && row.length > 0) {
                const f = String(row[2]).split('/')
                const vpa = f[3]
                const txnid = f[2]

                if (f.length > 1 && f[1] == 'DR') {
                    const transaction = {
                    
                        etime: formatDateToISOString(ExcelDateToJSDate(row[0])),
                        date: formatDateToDateSring(ExcelDateToJSDate(row[1]))  ,
                        msgId: txnid,
                        to_vpa: vpa,
                        amount_debited: row[4],
                        UserId : userid
                    };
                    transactions.push(transaction);
                }
                
            }
        }

        return transactions;
    }

    function formatDateToISOString(date) {
        const pad = (num) => num.toString().padStart(2, '0');
    
        const year = date.getUTCFullYear();
        const month = pad(date.getUTCMonth() + 1); // getUTCMonth() returns 0-11
        const day = pad(date.getUTCDate());
       
    
        return `${year}-${month}-${day}T15:04:05Z7:00`;
    }


    
    function formatDateToDateSring(date) {
        const pad = (num) => num.toString().padStart(2, '0');
    
        const year = date.getUTCFullYear();
        const month = pad(date.getUTCMonth() + 1); // getUTCMonth() returns 0-11
        const day = pad(date.getUTCDate());
        const hours = pad(date.getUTCHours());
        const minutes = pad(date.getUTCMinutes());
        const seconds = pad(date.getUTCSeconds());
    
        return `${day}-${month}-${year}`;
    }
    

   

    
    return (
        <input
        disabled = {disabled}
        accept=".xlsx, xls"
        className='flex gap-2'
   type="file"
   
   onChange={(e) => {
   //   const file = e.target.files[0];
   handleFile(e);
   }}
   
 />
      
       
    //     <p className="ant-upload-drag-icon">
    //       <InboxOutlined />
    //     </p>
    //     <p className="ant-upload-text">Click or drag file to this area to upload</p>
    //     <p className="ant-upload-hint">
    //       Support for a single or bulk upload. Strictly prohibited from uploading company data or other
    //       banned files.
    //     </p>
    //   </Input>
    )
  }