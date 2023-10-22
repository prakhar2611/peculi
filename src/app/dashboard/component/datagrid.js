"use client"




    import { Space, Table,Button, Tag,Select,Input,message,Pagination} from 'antd';
    import { useState, useEffect } from "react";
    import { ColumnProps } from "antd/lib/table";
    import axios from 'axios'
    import {UpdateVPAMapping} from '../../api/FetchSyncWorker'






    export default function Datagrid({isfetched,data}) {
        // for(int i =0; i<length(data) ;)
        // var i
        // for(i=0; i < data.length; i++){
        //    data.key = i+1
        // }
        const [messageApi, contextHolder] = message.useMessage();

        messageApi.open({
          type: 'loading',
          content: 'Action in progress..',
          duration: 0,
        });


        //const [tableData, setTableData] = useState(data);
        var [payload,setpayload] = useState({})
        const [loadings, setLoadings] = useState([]);
        const [disable,setdisable] = useState(true); 
    


        
        
        const onConfirm = (index) => {

            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = true;
                return newLoadings;
              });
      
              setTimeout(() => {
                  setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[index] = false;
                    return newLoadings;
                  });
                }, 6000);

          
            //calling server to update the category
            var token = sessionStorage.getItem('access_token');
            const p = {
                'data' : payload
            }

            UpdateVPAMapping(p,token).then((res) => {
              setTimeout(messageApi.destroy, 1500);
              console.log("reposne data " , res)
            },(err) => {
              alert(err)
            })
        };

        const onInputChange = (key, index,value) => {
            var y = payload

            // // payload.get
            // if (index in y ) {
            //     var i = y[index]
            //     i[key] = value
            //     y[index] = i 
            // }
            // else {
            //     var o = {}
            //     o[key] = value
            //     y[index] = o
            // }
            y[index] = value
            // y.push(d)
            setpayload(y)
            setdisable(false)

            console.log("payload data :" , payload)

            //solution to save the changes on the same data, dta should have key and need to pass index as record.key
            // console.log("value of the input :",value)
            // var newData = [...tableData];
            // console.log("vlaue of new index,key :", newData[1]["amount_debited"] )
            // newData[index][key] = value;
            // setTableData(newData);
          };

          const getDeafaultvalue=(category) => {
            return category
          }

        const columns = [
            // {
            //   title: 'ID',
            //   dataIndex: 'id',
            //   key: 'id',
            //   render: (text) => <a>{text}</a>,
            // },
            {
              title: 'vpa',
              dataIndex: 'vpa',
              key: 'vpa',
            },
            // {
            //     title: 'totalAmount',
            //     dataIndex: 'totalAmount',
            //     key: 'totalAmount',
            //   },
            // {
            //   title: 'totalTxn',
            //   dataIndex: 'totalTxn',
            //   key: 'totalTxn',
            // },
              // {
              //   title: 'Category',
              // dataIndex : 'category',
              // key: 'category',
              //   render: (text, record) => (
              //     <Input defaultValue={record.category} onChange={(e) => onInputChange("category", record.vpa,e.target.value)} />
              //   )
              // },
            {
                title: 'Label',
              dataIndex : 'label',
              key: 'label',
                render: (text, record) => (
                  <Input  defaultValue={record.label} onChange={(e) => onInputChange("label", record.vpa,e.target.value)} />
                )
              },
          ];

          if (isfetched == false) {
            return null
          }
          return (
        <div >
            <Table className='flex place-content-evenly' columns={columns} 
            pagination ={false}
            dataSource={data} rowKey={record => record.key}/>
            <Button type="primary" disabled={disable} loading={loadings[0]} onClick={() => onConfirm(0)}>
                Submit
            </Button>
        </div>
          );

    }
