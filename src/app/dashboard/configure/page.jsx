"use client"

import { BulbTwoTone } from "@ant-design/icons";
import { Button, IconButton } from "@radix-ui/themes";
import CreatePockets from "../component/createPockets";
import Pockets from "../component/pockets";

export default function ConfigurePage () {
    return(
      <div className={`grid grid-cols-1 min-h-[80ch] shadow-md gap-4 justify-items-center md:grid-cols-3  `}>

        <div className={`p-3 rounded-md `}>
           <h1 className={`mb-3 text-4xl font-semibold`}>
            Pockets
            </h1>
            <p className={`m-0 max-w-[40ch] text-m `}>
            Configure your own pockets. These pockets are the keys to visualize your expenses and saving.
            These pockets will be available to map to your VPA(s).
            For eg : Swiggy@paytm is a VPA you can map it to your FOOD pocket.
          </p>
        </div>

        <div  className={`flex gap-2 rounded-md flex-col min-h-[40ch] p-3` }>
           <h2 className={`mb-3 text-2xl font-semibold`}>
            What are Pockets?
            </h2>
            <p className={`m-0 max-w-[40ch] text-s `}>
            Pockets are the fundamental blocks to trace your exense and saving like 'Gullak' 
            Below are your currently configured Pockets.
          </p>
          <Pockets/>

        </div>
{/*         
        <div  className={`min-h-[40ch]`}>
           <h1 className={`mb-3 text-2xl font-semibold`}>
            Configure your Pockets
            </h1>
            <p className={`m-0 max-w-[40ch] text-m `}>
            Configure your own pockets. These pockets are the keys to visualize your expenses and saving.
            These pockets will be available to map to your VPA(s).
            For eg : Swiggy@paytm is a VPA you can map it to your FOOD pocket.
          </p>
        </div> */}

        <div  className={`flex flex-col min-h-[50ch] gap-2`}>
           <h1 className={`mb-3 text-2xl font-semibold`}>
            Configure your Pockets
            </h1>
            <p className={`m-0 max-w-[40ch] text-m `}>
            Configure your own pockets. These pockets are the keys to visualize your expenses and saving.
            These pockets will be available to map to your VPA(s).
            For eg : Swiggy@paytm is a VPA you can map it to your FOOD pocket.
          </p>
          <CreatePockets/>
        </div>

       

       
        </div>
    )
}