import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders, getRevenue, getAllUsers, getInventory } from '../Api/Api'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Dashboard = () => {

    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        getOrders().then(res => {
            setOrders(res.total)
            setRevenue(res.discountedTotal)
        })
        getInventory().then(res => {
            setInventory(res.total)
        })
        getAllUsers().then(res => {
            setCustomers(res.total)
        })
        // getRevenue().then(res => {
        //     setRevenue(res.total)
        // })
    })

    return (
        <>
            <Space size={20} direction='vertical'>
                <Typography.Title level={4} >
                    Dashboard
                </Typography.Title>

                <div className='CardSection'>

                    <DashboardCard icon={<ShoppingCartOutlined style={{ color: "red", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, padding: 8, fontSize: 24, }} />} title="Orders" value={orders} />
                    <DashboardCard icon={<ShoppingOutlined style={{ color: "purple", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, padding: 8, fontSize: 24 }} />} title="Inventory" value={inventory} />
                    <DashboardCard icon={<UserOutlined style={{ color: "darkgreen", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 20, padding: 8, fontSize: 24 }} />} title="Customers" value={customers} />
                    <DashboardCard icon={<DollarCircleOutlined style={{ color: "black", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, padding: 8, fontSize: 24 }} />} title="Revenue" value={revenue} />

                </div>

                <div className='Charts'>
                    <RecentOrders />
                    <DashboardChart />
                </div>

            </Space>

        </>
    )
}

const DashboardCard = ({ title, value, icon }) => {
    return (
        <Card>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

const RecentOrders = () => {

    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        getOrders().then(res => {
            setDataSource(res.products.splice(0, 4))
            setLoading(false)
        })
    }, [])


    return (
        <Card className='Shadow'>
            <Typography.Text>
                Recent Orders
            </Typography.Text>
            <Table
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity'
                    }, {
                        title: 'Price',
                        dataIndex: 'discountedPrice'
                    },

                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            >

            </Table>
        </Card>
    )
}


const DashboardChart = () => {

    const [revenueData, setRevenueData] = useState({
        label: [],
        datasets: []
    })

    useEffect(() => {
        getRevenue().then(res => {
            const labels = res.carts.map(cart => {
                return `User-${cart.userId}`
            })

            const data = res.carts.map(cart => {
                return cart.discountedTotal
            })

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                    },

                ],
            };

            setRevenueData(dataSource);
        })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];




    return (<Card >
        <Bar options={options} data={revenueData} />;
    </Card>
    )
}


export default Dashboard