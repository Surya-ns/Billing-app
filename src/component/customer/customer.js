import React from "react";
import CustomerForm from "./customerForm";
import CustomerList from './customerList'
import { Link, Route, withRouter } from 'react-router-dom'

const Customer = (props)=>
{
    return (<div class="customerInfo">
        <CustomerList />
        <CustomerForm />
    </div>)
}

export default Customer