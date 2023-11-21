import { AreaChart, Card, Title,Callout, Metric, Text  } from "@tremor/react";
import {  DonutChart } from "@tremor/react";
import { useState } from "react";
import { CheckCircleIcon, ExclamationIcon, LightBulbIcon } from "@heroicons/react/solid";


export function MonthlyDataChart ({data,setMonth}) {
    console.log("Monthly Data chart : ",data)
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


export function VpaDonutChart ({data}) {
  
    console.log("VPA Data chart : ",data)
      
      const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
      
      const customTooltip = ({ payload, active }) => {

        if (!active || !payload) return null;
        const categoryPayload = payload?.[0];
        if (!categoryPayload) return null;

        return (
          <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
            <div className="flex flex-1 space-x-2.5">
              <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
              <div className="w-full">
                <div className="flex items-center justify-between space-x-8">
                  <p className="text-right text-tremor-content whitespace-nowrap">
                    {categoryPayload.name}
                  </p>
                  <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                    {categoryPayload.value}
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
      
    
        return (
          <>
            <Card className="mx-auto">
            <Title>VPA-wise Data </Title>

              <DonutChart
                className="mt-6"
                data={data}
                category="totalamount"
                index="label"
                valueFormatter={valueFormatter}
                customTooltip={customTooltip}
              />

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