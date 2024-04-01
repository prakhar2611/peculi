"use client"
import React, { useState,useEffect } from 'react';
import { 
    Button,
    DatePicker,
    Form,
    Select,
    Space,
    Radio,
    Pagination
   } from 'antd'
   import axios from 'axios'
import  Datagrid  from './datagrid';
import { FetchGroupedVPA} from '../apiCallers/FetchSyncWorker';
import { getUniqueVpaData } from '../apiCallers/Charts';



export default function FetchByVPA ({token}){ 
  const [data,setdata] = useState([])
  const [fetched,setfetched] = useState(false);
  var [limit,setlimit] = useState(10)
  var [offset,setoffset] = useState(0)
  const [labels,setlables] = useState(null)

  
  useEffect( () => {
    FetchGroupedVPA(limit,offset,"CONFIGURE").then((res) => {
        console.log("reposne data " , res)
        setdata(res)
      },(err) => {
        alert(err)
      })
    setfetched(true)
    setlimit(+10)
    setoffset(+10)

    var availableLabel = [];

    getUniqueVpaData(token).then(
      (res) => {
        console.log(res)
        res?.data.forEach((element) => {
          availableLabel.push({ value: element.label });
        });
        setlables(availableLabel)
      },
      (err) => {
        alert(err);
      }
    );
  
  } , [])

  

     return(
        <div >
                 <Datagrid isfetched = {fetched} data = {data} labels={labels}/>
                 {/* <Pagination defaultCurrent={1} total={50} /> */}

        </div>
     
       );
    
}