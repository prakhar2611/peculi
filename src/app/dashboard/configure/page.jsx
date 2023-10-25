"use client";

import { BulbTwoTone } from "@ant-design/icons";
import { Transition } from "@headlessui/react";
import { Button, IconButton } from "@radix-ui/themes";
import { Select } from "antd";
import CreateLabels from "../component/createlabels";
import CreatePockets from "../component/createPockets";
import FetchByVPA from "../component/fetchtopvpa";
import Pockets from "../component/pockets";
import { useState } from "react";
import { SyncWorker } from "@/app/api/FetchSyncWorker";


function sync() {
  SyncWorker(token).then(
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

export default function ConfigurePage() {
const [isShowing, setisShowing] = useState(true)


const comps = [<Welcome/>,<ConfigureBankBlock/>, <ConfigureVPABlock/>, <WhatArePockets/>,<ConfigurePocketsBlock/>]
const [curr,setcurrcomp] = useState(0)
const [next,setnextcomp] = useState(1)



function Welcome() {
  return( <div className={`flex gap-2 rounded-md flex-col min-h-[20ch] p-3`}>
  <h1 className={`mb-3 text-4xl font-semibold`}>Start Configuring</h1>
  <p className={`m-0 max-w-[40ch] text-xl`}>
    Configure your own VPA Labels and Pockets.
  </p>
</div>)
}

  function ConfigureBankBlock() {
    return (
      <div className={`flex gap-2 rounded-md flex-col min-h-[40ch] p-3`}>
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
      <div className={`flex gap-2 rounded-md flex-col min-h-[40ch] p-3`}>
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
      <div className={`flex flex-col min-h-[50ch] gap-2 p-4`}>
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


  function nextbutton() {
    if(curr < comps.length){
      setcurrcomp(curr+1)
      setnextcomp(curr+1)
      setisShowing(!isShowing)

    }
      
   
    console.log("value of curr:" , curr)
  }

  
  function prevbutton() {
    if(curr > 0){
      setcurrcomp(curr-1)
      setnextcomp(curr-1)
    setisShowing(!isShowing)
    }
    
  }

  return (
    <div
      className={`grid grid-cols-1 min-h-[80ch] shadow-md gap-4 justify-items-center md:grid-cols-3  `}
    >
     
    {/* <Button onClick={()=>prevbutton()}>back</Button>
    <Button onClick={()=>nextbutton()}>fwd</Button> */}

      {/* Background overlay */}
      {/* <Transition
      show={isShowing}
        enter="transition-opacity ease-linear delay-400 duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        
        leave="transition-opacity ease-linear delay-400 duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {comps[curr]}
      </Transition> */}

      {/* Sliding sidebar */}
      {/* <Transition
      show={isShowing}
        enter="transition ease-in-out delay-300 duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-outdelay-300 duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {comps[curr]}
      </Transition>

      <Transition
      show={!isShowing}
        enter="transition ease-in-out delay-300 duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out delay-300 duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {comps[curr]}
      </Transition>
   */}

   <Welcome/>
   <ConfigureBankBlock/>
   <ConfigureVPABlock/>
   <ConfigurePocketsBlock/>

  {/* <button class="transition ease-in-out delay-150  bg-blue-500 hover:-translate-x-full  hover:bg-indigo-500 duration-300 ...">
  Save Changes
  </button> */}
     
    </div>
  );
}
