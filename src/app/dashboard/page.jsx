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
import { getMonthlyChartData, getVpaChartData } from '../util/apiCallers/Charts';
import { AreaChart, Card, Title } from "@tremor/react";




export default function FetchByVPA (){
 const [data,setData] = useState(null)
 const [vpaData,setVpaData] = useState(null)
 const [currentMonth, setCurrentMonth] = useState(null)


  const token = sessionStorage.getItem('access_token');

  
  useEffect( () => {
    getMonthlyChartData(token).then((res) => {

      setData(res.data)
      setCurrentMonth(res.data[0].month)

      },(err) => {
        alert(err)
      })
  } , [])


  useEffect( () => {
    getVpaChartData(token,currentMonth).then((res) => {

      setVpaData(res.data)

      },(err) => {
        alert(err)
      })
  } , [])



  

  const [value, setValue] = React.useState(null);

  console.log("reposne data " , data)

     return(
        <div className='grid grid-cols-3'>
          <div>
          <Card >
        <Title>Monthly Total amount </Title>
        <AreaChart
          className="h-72S mt-6"
          data={data}
          index="month"
          categories={["amount"]}
          colors={[ "indigo"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
      </Card>
      <pre>{JSON.stringify(value)}</pre> 
          </div>
      

        </div>
     
       );
    
}