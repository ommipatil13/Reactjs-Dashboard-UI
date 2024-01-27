import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../Api/Api'

const Orders = () => {

    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)

        getAllUsers().then(res => {
            setDataSource(res.users)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Space size={20} direction='vertical' style={{ display: "grid" }}>
                <Typography.Title level={4}>
                    Customers
                </Typography.Title>

                <Table
                    loading={loading}
                    columns={[
                        {
                            title: "Image",
                            dataIndex: "image",
                            render: (link) => {
                                return <Avatar src={link} />
                            }
                        },
                        {
                            title: "First Name",
                            dataIndex: "firstName"
                        },
                        {
                            title: "Last Name",
                            dataIndex: "lastName"
                        },

                        {
                            title: "Email",
                            dataIndex: "email"
                        },

                        {
                            title: "Phone",
                            dataIndex: "phone"
                        },
                        {
                            title: "Address",
                            dataIndex: "address",
                            render: (address) => {
                                return <span>{address.address}, {address.city}</span>
                            }
                        },




                    ]}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 5,
                        position: ["bottomCenter"]
                    }}
                >

                </Table>

            </Space>
        </div>
    )
}

export default Orders