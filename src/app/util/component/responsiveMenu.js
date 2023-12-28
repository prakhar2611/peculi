

import { PieChartFilled, CustomerServiceOutlined,SlidersFilled,DiffFilled } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useRouter } from 'next/navigation'

export function ResponsiveMenu () {

    const router = useRouter()

    const handleclick = (index) => {
        console.log('clicked :', index)
        if(index == '3')
            router.push('/dashboard/configure')
        else if(index == '2')
            router.push('/dashboard/vpa')
        else if(index    == '1')
            router.push('/dashboard')
          
    }
    return (<>
     <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      icon={<CustomerServiceOutlined />}
    >

           
      <FloatButton onClick={() => handleclick('1')} icon={<PieChartFilled />} />
      <FloatButton onClick={() => handleclick('2')} icon={<SlidersFilled />} />
      <FloatButton onClick={() => handleclick('3')} icon={<DiffFilled />} />

    </FloatButton.Group>
    </>)
}