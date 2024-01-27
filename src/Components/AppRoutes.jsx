import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Customers from './Pages/Customers'
import Orders from './Pages/Orders'
import Inventory from './Pages/Inventory'


const AppRoutes = () => {
    return (

        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/inventory' element={<Inventory />}></Route>
        </Routes>

    )
}

export default AppRoutes