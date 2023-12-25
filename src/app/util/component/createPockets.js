/* eslint-disable no-console, no-alert */

"use client";
import { FetchVPALabelPocketMap, UpdatePocketsMapping } from "@/app/util/apiCallers/FetchSyncWorker";
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Card, Input, Select,message } from "antd";
import { useState, useEffect } from "react";



export default function CreatePockets() {
  const [messageApi, contextHolder] = message.useMessage();


  //fetch from the data base and fed it to the states
  //pocketsNew = {
  //     name : "FOOD",
  //     lables : ["SWIGGY","DUNZO"]
  //   }

  //labels = distinct labels

  const [pocketsNew_1, setNewPockets_1] = useState({});
  console.log("real value of pocket state", pocketsNew_1);
  const [labels, setlabels] = useState(new Set());
  const [isnewPocket, setisnewPocket] = useState(false);

  useEffect(() => {
    FetchVPALabelPocketMap().then(
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
  }, []);

  var differenceArray =[]
  try{
    const combined = new Set();
    Object.keys(pocketsNew_1).forEach((key) => {
      pocketsNew_1[key].forEach((element) => {
        combined.add(element);
      });
    });
   differenceArray = Array.from(labels).filter(
      (item) => !Array.from(combined).includes(item)
    );
    console.log("diff labels", differenceArray);
  
  
  }catch{
    
  }



  //#region Componet Internal Methods

  function handleSave() {
    UpdatePocketsMapping(pocketsNew_1).then((res) => {
        setTimeout(messageApi.destroy, 1500);
        console.log("reposne data " , res)
      },(err) => {
        alert(err)
      })
    
  }

//   function getfilteredoption(item) {
//     Object.entries(pocketsNew_1).map((data, index) => {
//       const filteredArray = Array.from(data[1]).filter(
//         (obj) => obj.name !== item
//       );
//     });
//   }

  function deleteItem(data) {
    var f_1 = pocketsNew_1;
    delete f_1[data];
    console.log("deleting item", f_1);
    setNewPockets_1({ ...f_1 });
  }

  function createpocketcomponet(pockettitle) {
    var f_1 = pocketsNew_1;
    f_1[pockettitle] = [];
    setNewPockets_1(f_1);
    setisnewPocket(false);
    console.log("on create new pocket : ", pocketsNew_1);
  }

  function handleChange(v, item) {
    var f_1 = pocketsNew_1;
    Object.keys(f_1).forEach((key) => {
      if (key == item) {
        f_1[key] = new Set(v);
      }
    //   } else {
    //     const filteredArray = f_1[key].filter(
    //       (item) => !Array.from(v).includes(item)
    //     );
    //     f_1[key] = new Set(filteredArray);
    //   }
    });
    setNewPockets_1({ ...f_1 });
    console.log("on multi select pockets : ", pocketsNew_1);
  }
  
  //#endregion

  //#region Internal Componets
  //smallest unit of the componet with name and multi select
  //string struct in state and using array to create multiple pocket componet
  function Pocket({ item, defaultvalue, labels }) {
    return (
      <>
        <p className={`flex min-w-[10ch] text-md font-sans shadow-sm rounded-md place-content-center`}> {item} </p>

        <Select
          className={`w-32`}
          mode="multiple"
          allowClear
          placeholder="Please select"
          onChange={(v) => handleChange(v, item)}
          defaultValue={Array.from(defaultvalue)}
          //  value={Array.from(defaultvalue)}
          options={Array.from(labels).map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </>
    );
  }

  //Pocket board consist of array of structed pocket with help of pocket componet
  //dynamically creating on the client end
  function PocketBoard({ labels }) {
    console.log("rerendering");
    return (
      <div className="grid grid-row-2 p-2 gap-2 place-items-stretch  ">
        {Object.keys(pocketsNew_1).map((key) => (
          <div key={key}
            className={`flex gap-1 w-auto justify-around place-items-center`}
          >
            <Pocket
              item={key}
              defaultvalue={pocketsNew_1[key]}
              labels={labels}
            />
            <CloseCircleOutlined
              className="self-start"
              onClick={() => {
                deleteItem(key);
              }}
            />
          </div>
        ))}

        {!isnewPocket && (
          <PlusCircleFilled onClick={() => setisnewPocket(true)} />
        )}
      </div>
    );
  }

  //+ feature with new name input and push button
  function AddNewPocket() {
    const [pockettitle, setpockettitle] = useState("");

    return (
      <div className="flex flex-col gap-2">
        {isnewPocket && (
          <CloseCircleFilled
            className="self-end"
            onClick={() => setisnewPocket(false)}
          />
        )}
        {isnewPocket && (
          <Input
            className={`max-w-[15ch]`}
            onChange={(e) => {
              setpockettitle(e.target.value);
            }}
            placeholder={"Enter Pocket Name"}
          />
        )}
        {isnewPocket && (
          <Button
            className={`max-w-[15ch]`}
            onClick={() => createpocketcomponet(pockettitle)}
          >
            push
          </Button>
        )}
      </div>
    );
  }
  //#endregion

  return (
    <div className="flex relative flex-col gap-2 min-h-max">
        {/* <div className=' absolute bg-slate-600 h-full blur-sm z-0'></div> */}
      {/* - consist of all the pockets and cross with it  */}
      <PocketBoard  pockets={pocketsNew_1} labels={differenceArray} />
      {/* - consist of + sign component  */}

      <AddNewPocket />
      {!(differenceArray.length > 0) && (
        <Button className={`max-w-[15ch] self-center`} onClick={handleSave}>
          Save
        </Button>
      )
      }
    </div>
  );
}
