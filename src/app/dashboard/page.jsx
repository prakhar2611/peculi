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
import { ChartInfo, MonthlyDataChart, VpaDonutChart } from '../util/component/chartsComponent';





export default function FetchByVPA (){
 const [data,setData] = useState(null)
 const [vpaData,setVpaData] = useState(null)
 const [isVpaDatafetched,setVpaDatafetched] =  useState(false)
 const [currentMonth, setCurrentMonth] = useState(null)
 const [currentMonthSpend, setcurrentMonthSpend] = useState(null)
 const [value, setValue] = React.useState(null);



  const token = sessionStorage.getItem('access_token');

  
  useEffect( () => {
    getMonthlyChartData(token).then((res) => {

      setData(res.data)
      setCurrentMonth(res.data[res.data.length-1].month)
      setcurrentMonthSpend(res.data[res.data.length-1].amount)

      },(err) => {
        alert(err)
      })
  } , [])


  useEffect( () => {
    getVpaChartData(token,currentMonth).then((res) => {

      setVpaData(res.data)
      setVpaDatafetched(true)

      },(err) => {
        alert(err)
      })
  } , [currentMonth])


  function setMonth(data) {
    setValue(data)
    setCurrentMonth(data.month)
    setcurrentMonthSpend(data.amount)
    // console.log("on monthly clicked change : ", currentMonth)
  } 


console.log("total amount" , currentMonthSpend)
console.log("total amount" , currentMonth)


     return(
        <div className='grid grid-cols-3 gap-3'>
          
          <div>
          <MonthlyDataChart data = {data} setMonth = {setMonth} />
          </div>
           <ChartInfo totalAmount={currentMonthSpend} currentMonth={currentMonth}/>
          
          {(isVpaDatafetched) ? <VpaDonutChart data={vpaData} /> : <></>}

        </div>
     
       );
    
}