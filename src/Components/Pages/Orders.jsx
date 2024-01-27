import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../Api/Api'

const Orders = () => {

    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)

        getOrders().then(res => {
            setDataSource(res.products)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Space size={20} direction='vertical' style={{ display: "grid" }}>
                <Typography.Title level={4}>
                    Orders
                </Typography.Title>

                <Table
                    loading={loading}
                    columns={[
                        {
                            title: "Thumbnail",
                            dataIndex: "thumbnail",
                            render: (link) => {
                                return <Avatar src={link} />
                            }
                        },
                        {
                            title: "Title",
                            dataIndex: "title"
                        },
                        {
                            title: "Price",
                            dataIndex: "price",
                            render: (value) => <span>${value}</span>
                        },
                        {
                            title: "Quantity",
                            dataIndex: "quantity",

                        },
                        {
                            title: "Discount Percentage",
                            dataIndex: "discountPercentage"
                        },

                        {
                            title: "Discounted Price",
                            dataIndex: "discountedPrice"
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