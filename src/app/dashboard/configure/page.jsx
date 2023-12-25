/* eslint-disable no-console, no-alert */

"use client";


import { BulbTwoTone } from "@ant-design/icons";
import { Transition } from "@headlessui/react";
import { Button, IconButton } from "@radix-ui/themes";
import { Select, Spin } from "antd";
import CreateLabels from "../../util/component/createlabels";
import CreatePockets from "../../util/component/createPockets";
import FetchByVPA from "../../util/component/fetchtopvpa";
import Pockets from "../../util/component/pockets";
import { useState } from "react";
import { SyncWorker } from "@/app/util/apiCallers/FetchSyncWorker";
import { getCookie } from "cookies-next";



export default function ConfigurePage() {


// const comps = [<Welcome/>,<ConfigureBankBlock/>, <ConfigureVPABlock/>, <WhatArePockets/>,<ConfigurePocketsBlock/>]
const [curr,setcurrcomp] = useState(0)
const [next,setnextcomp] = useState(1)
const [activeComponentIndex, setActiveComponentIndex] = useState(1);
const [isFadingOut, setIsFadingOut] = useState(false);



function sync() {
  var token = getCookie("token")
  SyncWorker(token,"","","HDFC").then(
    (apiresp) => {
      Object.keys(apiresp).forEach((key) => {
        if (key == "Pockets") {
          setNewPockets_1(apiresp[key]);
        } else if (key == "Labels") {
          setlabels(apiresp[key]);
        }
      });
    },
    (err) => {
      alert(err);
    }
  );

}

function Welcome() {
  return( 
    <div className={`flex gap-2 place-items-center flex-col min-h-[40ch]`}>
    <h1 className={`mb-3 text-4xl font-semibold`}>Start Configuring</h1>
  <p className={`m-0 max-w-[40ch] text-xl`}>
    Configure your own VPA Labels and Pockets.
  </p>
</div>)
}

  function ConfigureBankBlock() {
    return (
      <div className={`flex gap-2 place-items-center flex-col min-h-[40ch]`}>
        <h2 className={` text-2xl font-semibold`}>Choose Your Bank</h2>
        <p className={`m-0 max-w-[40ch] text-s dark:text-stone-900 `}>
          Select Bank from below which will have gmail support for all your
          spendings.
        </p>
        <Select
          className={`w-2/3 m-5 self-center`}
          options={[
            { value: "HDFC", label: "HDFC" },
            { value: "SBI", label: "SBI" },
          ]}
        />
        <Button className={`shadow-md w-20 self-center `} onClick={sync}>Sync</Button>
      </div>
    );
  }

  function WhatArePockets() {
    return (
      <div className={`flex gap-2 place-items-center flex-col min-h-[40ch]`}>
        <h2 className={`text-2xl font-semibold`}>What are Pockets?</h2>
        <p className={`m-0 max-w-[40ch] text-s `}>
          Pockets are the fundamental blocks to trace your exense and saving
          like 'Gullak' Below are your currently configured Pockets.
        </p>
        <Pockets />
      </div>
    );
  }

  function ConfigureVPABlock() {
    return (
      <div className={`flex gap-2 place-items-center flex-col min-h-[40ch]`}>
        <h1 className={`text-2xl font-semibold`}>Configure your own labels</h1>
        <p className={`max-w-[40ch] text-s `}>
          These are the building blocks for assinging your transactions. you can
          think it as classification of you vpas into one small category. For eg
          : Swiggy@paytm and Swiggy@axis is a VPA you can map it to your swiggy
          label.
        </p>
        <FetchByVPA  />
      </div>
    );
  }

  function ConfigurePocketsBlock() {
    return (
      <div className={`flex gap-2 place-items-center flex-col min-h-[40ch]`}>
        <h1 className={` text-2xl font-semibold`}>
          Configure your Pockets
        </h1>
        <p className={`m-0 max-w-[40ch] text-m `}>
          Configure your own pockets. These pockets are the keys to visualize
          your expenses and saving. These pockets will be available to map to
          your VPA(s). For eg : Swiggy@paytm is a VPA you can map it to your
          FOOD pocket.
        </p>
        <CreatePockets />
      </div>
    );
  }


  
  
  // return (
  //   <div
  //     className={`grid grid-cols-1 min-h-[80ch] shadow-md gap-4 justify-items-center md:grid-cols-3  `}
  //   >

  //  <Welcome/>
  //  <ConfigureBankBlock/>
  //  <ConfigureVPABlock/>
  //  <ConfigurePocketsBlock/>

  //   </div>
  // );

  const changeComponent = (newIndex) => {
    setIsFadingOut(true);
    setTimeout(() => {
        setActiveComponentIndex(newIndex);
        setIsFadingOut(false);
    }, 500); // 500ms for fade-out duration
};

const nextComponent = () => {
    changeComponent(activeComponentIndex === 4 ? 1 : activeComponentIndex + 1);
};

const prevComponent = () => {
    changeComponent(activeComponentIndex === 1 ? 4 : activeComponentIndex - 1);
};

const components = [
  <Welcome key={0}/>,
   <ConfigureBankBlock  key={1}/>,
   <ConfigureVPABlock  key={2}/>,
   <ConfigurePocketsBlock  key={3}/>
];

  return(

    <div className={`flex flex-col place-items-center gap-8
    `}>

          <div className="flex max-h-[5vh] gap-7 ">
          <Button className={`shadow-md w-20 self-center `} onClick={prevComponent}>Backward</Button>
            <Button  className={`shadow-md w-20 self-center `} onClick={nextComponent}>Forward</Button>
          </div>
            
           
            <div className={` min-w-[20vh] transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                {components[activeComponentIndex - 1]}
            </div>

        </div>
  );
}
