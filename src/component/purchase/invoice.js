import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {getCustomerLists} from '../../action/actions'
import {startGetProductLists} from '../../action/prodAction/prodAction'
import jsPDF from "jspdf"

const Invoice = (props)=>{
    
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getCustomerLists())
        dispatch(startGetProductLists())
        // dispatch(startGetCartLists())
    },[])

    const billInvoice = useSelector((state)=>{
        return state.invoice
    })

    console.log("INVOICE", billInvoice)
    const cust = useSelector((state)=>{
        return state.customer
    })

    const custName=(custId)=>
    {
        let cname=""
        const customerName = cust.filter((ele)=>{
            return ele._id===custId
        })

        customerName.map((e)=>{
            cname = e.name
            console.log("Name.....", cname)
        })     
        return cname
    }


    const prodname= useSelector((state)=>{
        return state.products
    })

    const productName=(pId)=>
    {
        let pname=""
        const productName = prodname.filter((ele)=>{
            return ele._id===pId
        })

        productName.map((e)=>{
            pname = e.name
            
        })     
        return pname    
    }

 
    

    return (<div class="invoice-container">
        
        <h3 class="invoice">Invoice</h3>
        
        {billInvoice.map((e)=>{
            return <p class="cust-info">
            <h5>Customer: {custName(e.customer)}</h5>
            <h5>Date: {(e.date).slice(0,10)}</h5>
            <h5>Order ID: {e._id}</h5>
            </p>
        })}
        
        <hr/>

        <table class="i-table">
            <thead>
                <tr>
                    <th class="i-head" style={{width:"20px"}}>S.No</th>
                    <th class="i-head" style={{width:"200px"}}>Product</th>
                    <th class="i-head" style={{width:"20px"}}>Quantity</th>
                    <th class="i-head" style={{width:"fit-content"}}>Price</th>
                    <th class="i-head" style={{width:"150px"}}>Total</th>
                </tr>
                
            </thead>
            
            <tbody>
                {billInvoice.map((ele)=>{
                    return ele.lineItems.map((e,i)=>{
                        return (<tr>
                                    <td class="i-data">{i+1}</td>
                                    <td class="i-data">{productName(e.product)}</td>
                                    <td class="i-data">{e.quantity}</td>
                                    <td class="i-data" style={{width:"100"}}>Rs.{e.price}</td>
                                    <td class="i-data">Rs.{e.subTotal}</td>
                                </tr>)
                    })
                })}
                
               <tr style={{border:"1px solid rgb(114, 114, 114)"}}>
                   <td colspan="2" class="i-total"></td>
                   <td colspan="2" class="i-total">Total Price: </td>
                   <td class="i-total"> Rs.{billInvoice.map((ele)=>{return ele.total})}</td>
                </tr>
            </tbody>
        </table> 
    </div>)

}
export default withRouter(Invoice)