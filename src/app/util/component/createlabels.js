/* eslint-disable no-console, no-alert */

"use client"
import { CloseCircleFilled, CloseCircleOutlined, PlusCircleFilled } from "@ant-design/icons"
import { Button, Card, Input } from "antd"
import { useState } from "react"


export default function CreateLabels() {
    const [pockets,setpockets] = useState(["HOUSEHOLD", "MONTHLY", "SWIGGY" ])
    const [isnewPocket,setisnewPocket] = useState(false)


    function deleteItem(data){
        var f = pockets 
        const newArray = f.filter(item => item !== data)
                setpockets(newArray)
    }



    function PocketswithEdit({data}) {
        const [pockettitle,setpockettitle] = useState("")

        function createNewPocket() {
            var f = pockets 
            f.push(pockettitle)
            setisnewPocket(false)
            setpockets(f)
        }

        return(
            <div className="grid grid-cols-2 p-2 gap-2 place-content-center ">
            {data.map((item,index)=> (
                <div className={`flex gap-1`}>
                    <Card className={`flex wd-2 h-10 items-center`}> {item} </Card>
                <CloseCircleOutlined className="self-start" onClick={() =>{deleteItem(item)}} />

                </div>
            ))}
            {!isnewPocket && <PlusCircleFilled  onClick={() => setisnewPocket(true)}/>}

            <div className="flex flex-col gap-2">
            {isnewPocket && <CloseCircleFilled className="self-end" onClick={() =>setisnewPocket(false)} />}
            {isnewPocket && <Input className={`max-w-[15ch]`} onChange={(e)=>{setpockettitle(e.target.value)}} placeholder={"Enter Pocket Name"}/>}
            {isnewPocket && <Button className={`max-w-[15ch]`} onClick={()=> createNewPocket()}>save</Button>}  

                </div>
            </div>
        )
    } 

    return(
        <div className="flex flex-col gap-2">
            <PocketswithEdit className="flex justify-item-center" data={pockets}/>
           
        </div>
    )
}