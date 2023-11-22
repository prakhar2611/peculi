"use client"
import React, { useState,useEffect } from 'react';
import { AreaChart, Card, Title,Callout, Metric, Text,BarList  } from "@tremor/react";

import { getMonthlyChartData, getNonLabeledVpaChartData, getVpaChartData } from '../util/apiCallers/Charts';
import { ChartInfo, MonthlyDataChart, NonLabeledVpaChart, VpaDonutChart } from '../util/component/chartsComponent';
import { Input } from 'antd';





export default function FetchByVPA (){
 const [data,setData] = useState(null)
 const [selectedMonth, setSelectedMonth] = useState({month: "", amount : 0});

 const [vpaData,setVpaData] = useState(null)
 const [slectedVpa, setSelectedVpa] = useState(null)

 const [nonLabeledvpaData,setnonLabeledvpaData] = useState(null)
 const [slectedNonLabledVpa, setslectedNonLabledVpa] = useState(null)

const [reloadDonuts ,setreloadDonuts] = useState(false)
 const [isVpaDatafetched,setVpaDatafetched] =  useState(false)
 



  const token = sessionStorage.getItem('access_token');

  
  useEffect( () => {
    getMonthlyChartData(token).then((res) => {
      if (res != null) {
        setData(res.data)
        setSelectedMonth(res.data[res.data.length-1])
  
      }

      },(err) => {
        alert(err)
      })
  } , [])


  useEffect( () => {
    if (selectedMonth.month != "" ) {
      getVpaChartData(token,selectedMonth.month).then((res) => {

        setVpaData(res.data)
        setVpaDatafetched(true)
  
        },(err) => {
          alert(err)
        })

        getNonLabeledVpaChartData(token,selectedMonth.month).then((res) => {

          setnonLabeledvpaData(res.data)
          setslectedNonLabledVpa(res.data[0])
          },(err) => {
            alert(err)
          })
    }

  } , [selectedMonth,reloadDonuts])


  function setMonth(data) {
    if(data != null){
      setSelectedMonth(data)

    }
    // console.log("on monthly clicked change : ", currentMonth)
  }
  
  function onNonLabeledValueChange (data) {
      if(data != null) {
        setslectedNonLabledVpa(data)
      }

  }

  function onVpaValueChange(data) {
    setSelectedVpa(data)
  }

  function doReloadDonuts (value) {
    setreloadDonuts(!reloadDonuts)
    console.log("reload donuts ")

  }


console.log("Monthly Data chart : ",data)
console.log("VPA Data chart : ",vpaData)

console.log("slected month" , selectedMonth)
console.log("slected vpa ", slectedVpa)

console.log("Non labled VPA Data chart : ",nonLabeledvpaData)


console.log("on non labled vpa clicked change : ", slectedNonLabledVpa)



     return(
        <div className='grid grid-row-1 gap-3 md:grid-cols-3'>
          
          <div>
          <MonthlyDataChart data = {data} setMonth = {setMonth} />
          </div>
          {(isVpaDatafetched) ? <ChartInfo totalAmount={selectedMonth.amount} currentMonth={selectedMonth.month} /> : <></>}
          {(isVpaDatafetched) ? <VpaDonutChart data={vpaData} onVpaValueChange={onVpaValueChange} index={"label"} title={"Labeled Data"} /> : <></>}
          {(isVpaDatafetched) ? <NonLabeledVpaChart data={nonLabeledvpaData} onVpaValueChange={onNonLabeledValueChange} index={"vpa"} title={"Unlabeled Data"} slectedNonLabledVpa={slectedNonLabledVpa}  doReloadDonuts= {doReloadDonuts}/>: <></>}

        </div>
     
       );
    
}