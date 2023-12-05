"use client"
/* eslint-disable no-console, no-alert */


import React from 'react';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

export default function Pockets () {
const pockets = ["HOUSEHOLD", "MONTHLY", "SWIGGY" ]

const l = pockets.length

function CreatePockets({data}) {
    return(
        <div className={`grid grid-cols-2 gap-2 justify-items-center`}>
            {data.map((item,index)=>(
                  <Card bordered={false}>
                  <Statistic
                    title={item}
                    value={11.28}
                    precision={2}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
                ))
                }
        </div>
        
    )
}

    return (
        
             <CreatePockets data={pockets}/>
      
    )
}