import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {startGetUserInfo, getCustomerLists} from '../action/actions'
import { startGetProductLists } from '../action/prodAction/prodAction'
import Customer from './customer/customer'
import Products from './products/products'
import Purcahse from './purchase/purchase'
import {Route, Link, withRouter } from 'react-router-dom'
import FullBill from './purchase/fullBill'
import Invoice from './purchase/invoice'
import Dashboard from './dashboard'
import IntervalExample from './timez'


const Account = (props)=>
{  
    const dispatch = useDispatch()
    const [dashboard, setDashboard] = useState(true)
    const [customer, setCustomer] = useState(false)
    const [product, setProduct] = useState(false)
    const [purchase, setPurchase] = useState(false)
    const [allbills, setAllbills] = useState(false)
   
    
    useEffect(()=>{
        dispatch(startGetUserInfo())
        dispatch(getCustomerLists())
        dispatch(startGetProductLists())
    },[])

    const loggedinUser = useSelector((state)=>{
        return state.user
    })

    const showCust = ()=>{
        setCustomer(true)
        setProduct(false)
        setPurchase(false)
        setAllbills(false)
        setDashboard(false)
    }

    const showProd = ()=>{
        setCustomer(false)
        setProduct(true)
        setPurchase(false)
        setAllbills(false)
        setDashboard(false)
    }

    const showPurc = ()=>{
        setCustomer(false)
        setProduct(false)
        setPurchase(true)
        setAllbills(false)
        setDashboard(false)
    }

    const showBills = ()=>{
        setCustomer(false)
        setProduct(false)
        setPurchase(false)
        setAllbills(true)
        setDashboard(false)
    }

    const showDash = ()=>{
        setCustomer(false)
        setProduct(false)
        setPurchase(false)
        setAllbills(false)
        setDashboard(true)
    }

    return (<div class="continer">
         <div class="side_nav">
            <h5 class="name_style">Welcome, {loggedinUser.username}</h5>
                    <ul class="abc">
                        <li onClick={()=>{showDash()}}>Dashboard</li>
                        <li onClick={()=>{showCust()}}>Customer</li>
                        <li onClick={()=>{showProd()}}>Product</li>
                        <li onClick={()=>{showPurc()}}>Purcahse</li>
                        <li onClick={()=>{showBills()}}>Bills</li>
                    </ul>
            </div>

            <div class="pages">
                <IntervalExample />
                {dashboard && <Dashboard />}
                {customer && <Customer />}
                {product && <Products />}
                {purchase && <Purcahse />}
                {allbills && <FullBill />}
            </div>
            <div class="clearfix"> </div>
    
         </div>)
}

export default withRouter(Account)