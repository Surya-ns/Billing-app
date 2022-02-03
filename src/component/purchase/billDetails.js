import React,{useEffect, useState} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleBill } from "../../action/billing/billActions";
import Account from "../account";


const BillDetails=(props)=>{

    const {id}=props
    // const {id}=props.match.params
    console.log("ORDER",id)
    
    const dispatch = useDispatch()
    
   

    dispatch(singleBill(id))
         
    
    const singleItems = useSelector((state)=>{
        return state.singleitem
    })

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


    return (<div>
        <table class="bd-table">
            <thead >
                <tr>
                    <th class="bd-head">Product</th>
                    <th class="bd-head">Quantity</th>
                    <th class="bd-head">Price</th>
                    <th class="bd-head">Total</th>
                </tr>
            </thead>
            <tbody>
                {singleItems.map((ele)=>{
                    return ele.lineItems.map((e)=>{
                        return (<tr><td class="bd-data">{productName(e.product)}</td>
                                    <td class="bd-data">{e.quantity}</td>
                                    <td class="bd-data">Rs.{e.price}</td>
                                    <td class="bd-data">Rs.{e.subTotal}</td>
                                </tr>)
                    })
                })}
               <tr>
                   <td colspan="2" class="bd-total"></td>
                   <td class="bd-total" colspan="2">Total Price: &#8377; {singleItems.map((e)=>{
                       return e.total
                   })}</td>
                </tr>
            </tbody>
        </table>
      
    </div>)
}

export default withRouter(BillDetails)