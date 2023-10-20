"use client"

import { UploadOutlined, UserOutlined,SlidersFilled,PieChartFilled, VideoCameraOutlined,DiffFilled } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';

import { useRouter } from 'next/navigation'


const { Header, Content, Footer, Sider } = Layout;

const navBarItems = {
  'Home' : PieChartFilled ,
  'VPA' : SlidersFilled,
  'Pockets': DiffFilled ,
}

const menu = ["HOME","VPA","POCKETS"]

export default function Dashboard({children}) {

    const {
        token: { colorBgContainer },
      } = theme.useToken();
      const router = useRouter()

      
      function handleSiderNav(index) {
        console.log("nav bar index:",index.key)
        if(index.key == '3')
            router.push('/dashboard/configure')
        else if(index.key == '2')
            router.push('/dashboard/vpa')
    }
    

    return(
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}

          // items={Object.keys(navBarItems).forEach((key,index)=>(
          //   {
          //     key: String(index + 1),
          //     icon: React.createElement(navBarItems[key]),
          //     label: key,
          //     onClick :((e)=> handleSiderNav(e))
          //   }
          // ))}
          
          items={[PieChartFilled, SlidersFilled, DiffFilled].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: menu[index],
              onClick :((e)=> handleSiderNav(e))
            }),
          )}
        />

      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 900,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    
    )
}