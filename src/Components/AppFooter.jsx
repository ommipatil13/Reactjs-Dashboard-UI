import { Typography } from 'antd'
import React from 'react'

const AppFooter = () => {
    return (
        <div className='AppFooter'>
            <Typography.Link href='tel:9999999999'>9999999999</Typography.Link>
            <Typography.Link href='https://www.google.com'>React Ant Design</Typography.Link>
            <Typography.Link href='https://www.google.com' target={"_blank"}>Dashboard</Typography.Link>
        </div>
    )
}

export default AppFooter