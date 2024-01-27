import { Badge, Drawer, Image, List, Space, Typography } from 'antd'
import { MailOutlined, BellFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { getComments, getOrders } from './Api/Api'

const AppHeader = () => {

    const [comments, setComments] = useState([])
    const [orders, setOrders] = useState([])

    const [cOpen, setCOpen] = useState(false)
    const [nOpen, setNOpen] = useState(false)

    useEffect(() => {
        getComments().then(res => {
            setComments(res.comments)
        })

        getOrders().then(res => {
            setOrders(res.products)
        })
    }, [])

    return (
        <div className='AppHeader'>

            <Image width={40} src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'></Image>
            <Typography.Title style={{ marginBottom: 0 }}>React Ant Design Dashboard Practice</Typography.Title>
            <Space>
                <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => { setCOpen(true) }} />
                </Badge>
                <Badge count={orders.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => { setNOpen(true) }} />
                </Badge>
            </Space>

            <Drawer title="Comments"
                open={cOpen}
                onClose={() => {
                    setCOpen(false);
                }}
                maskClosable
            >
                <List dataSource={comments} renderItem={(item) => {
                    return <List.Item> {item.body} </List.Item>
                }}></List>
            </Drawer>

            <Drawer title="Notification"
                open={nOpen}
                onClose={() => {
                    setNOpen(false);
                }}
                maskClosable
            >
                <List dataSource={orders} renderItem={(item) => {
                    return <List.Item> <Typography.Text strong> {item.title} </Typography.Text> {" "}
                        has been ordered  </List.Item>
                }}></List>
            </Drawer>














        </div>
    )
}

export default AppHeader