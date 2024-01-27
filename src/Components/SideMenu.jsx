import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {

    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState('/')

    useEffect(() => {
        const pathName = location.pathname
        setSelectedKeys(pathName)
    }, [location.pathname])

    const navigate = useNavigate();
    return (
        <div className='SideMenu'>
            <Menu
                className='SideMenuV'
                mode='vertical'
                onClick={(item) => {
                    //item.key
                    navigate(item.key);
                }}
                selectedKeys={[selectedKeys]}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: "/"
                    },
                    {
                        label: 'Inventory',
                        key: '/inventory ',
                        icon: <ShopOutlined />
                    },
                    {
                        label: "Orders",
                        key: "/orders",
                        icon: <ShoppingCartOutlined />
                    },
                    {
                        label: "Customers",
                        key: "/customers",
                        icon: <UserOutlined />
                    }
                ]}>

            </Menu>
        </div >
    )
}

export default SideMenu