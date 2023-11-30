import { AreaChart, Card, Title,Callout, Metric, Text,BarList  } from "@tremor/react";
import {  DonutChart } from "@tremor/react";
import { useState } from "react";
import { ArrowCircleRightIcon, CheckCircleIcon, ExclamationIcon, LightBulbIcon } from "@heroicons/react/solid";
import { AutoComplete, Button, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { UpdateVPAMapping } from "../apiCallers/FetchSyncWorker";


export function MonthlyDataChart ({data,setMonth}) {
 return (
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
          onValueChange={(v) => setMonth(v)}
          connectNulls={true}
        />
      </Card>
      
          </div>
 )
}


export function VpaDonutChart ({data,onVpaValueChange,index,title}) {

    // var barchartdata = []
    // data.forEach(element => {
    //     var barChart = { name : element.label, value : element.totalamount}
    //     barchartdata.push(barChart)
    //  });
      
      const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
      const customTooltip = ({ payload, active }) => {

        if (!active || !payload) return null;
        const categoryPayload = payload?.[0];
        if (!categoryPayload) return null;

        return (
          <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
            <div className="flex flex-1 space-x-2.5">
              <div className={`max-w-2 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
              <div className="w-full">
                <div className="flex items-center justify-between space-x-8">
                  <p className="text-right text-tremor-content whitespace-nowrap">
                    {categoryPayload?.name}
                  </p>
                  <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                    {categoryPayload?.value}
                  </p>
                  
                </div>
                <div className="flex items-center justify-between space-x-8">
                <p className="text-right text-tremor-content whitespace-nowrap">
                    Total Transaction
                  </p>
                <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                    {categoryPayload.payload.totaltxn}
                  </p>
                  
                </div>
              
              </div>
            </div>
          </div>
        );
      };
      
// console.log("barchart data  :-",barchartdata)
        return (
          <>
            <Card className="mx-auto">
            <Title>{title} : {data?.length} </Title>

              <DonutChart
                className="mt-6"
                data={data || []}
                category="totalamount"
                index={index}
                valueFormatter={valueFormatter}
                customTooltip={customTooltip}
                onValueChange={onVpaValueChange}
              />

{/* <BarList data={barchartdata} 
className="mt-2" 
/> */}


            </Card>
          </>
        );
      
}


export function ChartInfo ({totalAmount,currentMonth}) {
    return(
        <>
    <Card className="max-w-md gap-2">
      <Text> Total spend for month : {currentMonth} </Text>
      <Metric>₹ {totalAmount}</Metric>
      <Callout
        className="h-12 mt-4"
        title="Critical speed limit reached"
        icon={ExclamationIcon}
        color="rose"
      >
        Turbine reached critical speed. Immediately reduce turbine speed.
      </Callout>


      <Callout className="mt-4" title="No critical system data" icon={LightBulbIcon} color="teal">
        Left shows the monthly trend for current year. Click on month to view current Month data
        hover over donut to view data.
             </Callout>

    </Card>

    
  </>
    )
}


export function NonLabeledVpaChart ({data,onVpaValueChange,index,title,slectedNonLabledVpa,doReloadDonuts,availableLabel}) {
    const [label,setLabel] = useState(null)

     function updateLabel(vpa) {
        const payload = {}
        payload[vpa] = label
        //calling server to update the category
        var token = sessionStorage.getItem('access_token');
        const p = {
            'data' : payload
        }

        // console.log("payload for updating the vpa",p)
        doReloadDonuts(false)

        UpdateVPAMapping(p,token).then((res) => {
          console.log("reposne data " , res)
        },(err) => {
          alert(err)
        })
        setLabel("")

     }
     console.log("Available label : ", availableLabel)

    return (
        <div> 
        <VpaDonutChart data={data} onVpaValueChange={onVpaValueChange} index={index} title={title} />

        <Card>
        <div className="flex items-center justify-between space-x-8">
            <p className="text-right text-tremor-content whitespace-nowrap max-w-[20vh]">
              {slectedNonLabledVpa?.vpa}
            </p>
            <AutoComplete
    style={{
      width: 200,
    }}
    options={availableLabel}
    placeholder="try to type `b`"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    onChange={(inputValue) => setLabel(inputValue)} 
    value={label}
    
  />
            {/* <Input title="Enter label" value={label} onChange={(e) => setLabel(e.target.value)}  /> */}
            <ArrowRightOutlined onClick={() => updateLabel(slectedNonLabledVpa?.vpa)}/>
            
          </div>
        </Card>
        </div>
       
    )
}