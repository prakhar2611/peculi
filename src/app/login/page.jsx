"use client"

import '@radix-ui/themes/styles.css';
import "./SignIn.css"
import { GoogleOutlined } from '@ant-design/icons';
import { Card,Flex,Theme,Heading, AspectRatio,Button,Text,ThemePanel,Box,Grid, Container} from '@radix-ui/themes'
import { SignIn } from '../api/SignIn';
export default () => (
  <Theme accentColor="blue" grayColor="sand" radius="large" scaling="95%">
     {/* <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
      <ThemePanel />
    </Flex> */}

    {/* another trail */}
  {/* <Flex  style={{'justifyContent' : 'space-between', 'height' : '50rem'}}>
  <Container style={{'backgroundColor' : '#04FF6D'}} />
    <Container style={{'backgroundColor' : '#04EE6D'}} />
  </Flex> */}

    <Flex className='flexpage'  >
        <Card className='cardmain' style={{'width' : '30rem'}}>
          <div className='left'> 
            <Heading mb="2" size="6">Like Notion</Heading>
            <Text mb="2">Create and Expand your ideas with us !</Text>
            <Text mb="2">Your own free and protected digital folder for files on your own server.</Text>
            <Text mb="2">Best UX using Lexical Based Editor.</Text>
          <div>
              <Heading mb="2" size="3">Lets Start</Heading>
              <Button onClick={SignIn}> 
                  <GoogleOutlined /> 
                  SignIn
              </Button>
            </div>
          </div>
        </Card>
        {/* <ThemePanel /> */}
        {/* <Box  style={{'backgroundColor' : '#04FF6D'}} >box2</Box> */}
    </Flex>

  </Theme>
)