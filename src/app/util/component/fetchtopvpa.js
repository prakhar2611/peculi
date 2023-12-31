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



export default function FetchByVPA (){ 
  const [data,setdata] = useState([])
  const [fetched,setfetched] = useState(false);
  var [limit,setlimit] = useState(10)
  var [offset,setoffset] = useState(0)

  
  useEffect( () => {
    FetchGroupedVPA(limit,offset).then((res) => {
        console.log("reposne data " , res)
        setdata(res)
      },(err) => {
        alert(err)
      })
    setfetched(true)
    setlimit(+10)
    setoffset(+10)
  } , [])

  

     return(
        <div >
                 <Datagrid isfetched = {fetched} data = {data}/>
                 {/* <Pagination defaultCurrent={1} total={50} /> */}

        </div>
     
       );
    
}