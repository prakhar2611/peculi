"use client";
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Card, Input, Select } from "antd";
import { useState } from "react";

export default function CreatePockets() {
  //fetch from the data base and fed it to the states
  //pocketsNew = {
  //     name : "FOOD",
  //     lables : ["SWIGGY","DUNZO"]
  //   }

  //labels = distinct labels
  const [pocketsNew, setNewPockets] = useState([]);

  const [labels] = useState([
    {
      label: "SWIGGY",
      value: "SWIGGY",
    },
    {
      label: "ANUBHAV",
      value: "ANUBHAV",
    },
    {
      label: "ZERODHA",
      value: "ZERODHA",
    },
  ]);

  const [isnewPocket, setisnewPocket] = useState(false);

  //#region Componet Internal Methods
  function deleteItem(data) {
    var f = pocketsNew;
    const newArray = f.filter((item) => item.name !== data);
    setNewPockets(newArray);
  }
  function createpocketcomponet(pockettitle) {
    var f = pocketsNew;
    // const n = Pocket(pockettitle)
    const n = {
      name: pockettitle,
      label: [],
    };

    f.push(n);

    setNewPockets(f);
    setisnewPocket(false);
    // console.log("on create new pocket : ", pocketsNew)
  }
  function handleChange(v, item) {
    var f = pocketsNew;
    // console.log("coming value",v)
    f.map((value, index) => {
      if (value.name == item) {
        value.label = v;
      }
    });

    setNewPockets(f);
    // console.log("on multi select pockets : ", pocketsNew)
  }
  //#endregion

  //#region Internal Componets
  //smallest unit of the componet with name and multi select
  //string struct in state and using array to create multiple pocket componet
  function Pocket({ item, defaultvalue }) {
    return (
      <>
        <Card className={`flex h-10 items-center`}> {item} </Card>

        <Select
          className={`w-32`}
          mode="multiple"
          allowClear
          placeholder="Please select"
          onChange={(v) => handleChange(v, item)}
          defaultValue={defaultvalue}
          options={labels}
        />
      </>
    );
  }

  //Pocket board consist of array of structed pocket with help of pocket componet
  //dynamically creating on the client end
  function PocketBoard() {
    return (
      <div className="grid grid-row-2 p-2 gap-2 place-content-center ">
        {pocketsNew.map((item, index) => (
          <div
            className={`flex gap-1 w-auto justify-around place-content-center`}
          >
            <Pocket item={item.name} defaultvalue={item.label} />
            <CloseCircleOutlined
              className="self-start"
              onClick={() => {
                deleteItem(item.name);
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
    <div className="flex flex-col gap-2">
      {/* - consist of all the pockets and cross with it  */}
      <PocketBoard />
      {/* - consist of + sign component  */}

      <AddNewPocket />
      {pocketsNew.length > 0 && (
        <Button className={`max-w-[15ch] self-center`}>Save</Button>
      )}
    </div>
  );
}
