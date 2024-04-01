"use client"
import React, { useState,useEffect } from 'react';
import { 
    Button,
    DatePicker,
    Form,
    Select,
    Space,
    Radio,
    Pagination,
    Card
   } from 'antd'
   import axios from 'axios'
import  Datagrid  from '../../util/component/datagrid';
import { FetchGroupedVPA} from '../../util/apiCallers/FetchSyncWorker';
import { getCookie } from 'cookies-next';
import { getUniqueVpaData } from '@/app/util/apiCallers/Charts';



export default function FetchByVPA (){ 
  const [data,setdata] = useState([])
  const [fetched,setfetched] = useState(false);
  var [limit,setlimit] = useState(10)
  var [offset,setoffset] = useState(0)
  
  const [availableLabel, setavailableLabel] = useState(null);

  const token = getCookie("access_token")

  
  useEffect(() => {
    const availableLabel = [];

    FetchGroupedVPA(limit,offset,"CONFIGURE").then((res) => {
      console.log("reposne data " , res)
      setdata(res)
    },(err) => {
      alert(err)
    })
  setfetched(true)
  setlimit(+10)
  setoffset(+10)
    
  getUniqueVpaData(token).then(
    (res) => {
      console.log("uniquue vpa testing " ,res)

      res?.data.forEach((element) => {
        availableLabel.push({ value: element.label });
      });
      setavailableLabel(availableLabel);
    },
    (err) => {
      alert(err);
    }
  );

 
  },[] );

   
  

     return(
      <Card className="max-w-lg flex flex-col">
                 <Datagrid isfetched = {fetched} data = {data} labels = {availableLabel}/>
                 {/* <Pagination defaultCurrent={1} total={50} /> */}

        </Card>
     
       );
    
}