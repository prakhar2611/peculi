import { Text,Title,Subtitle, Italic } from "@tremor/react";
import { Button, Flex } from "antd";
import Image from 'next/image'


export function HeadBar () {

    return(
        <div className="flex place-content-between  m-2 gap-3">
            <div className="flex max-w-sm max-h-sm gap-5">
            <Image 
              src="/stingray.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={40}
              height={40}
              priority
            />
            <div className="flex-col  place-content-around  "> 
            <Title color="white">Peculi</Title>
            <Text ><Italic>Expens-alytics</Italic></Text>
            </div>
            </div>
           
            {/* <div className="flex flex-1 bg-[url('/new.jpg')] opacity-80 ">

            </div >
           */}
             
             </div>
    )
}