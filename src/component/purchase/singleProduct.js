import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {removeCartItem, incQty, decQty} from '../../action/billing/billActions'
// import CustomerBill from './customerBill'
// import { MDBDataTable } from 'mdbreact';
// import { Table } from 'react-bootstrap';

const SingleProducts = (props)=>{

 const {customer, product, quantity, price, show, showbill} = props

    
    const [showcart, setShowCart] = useState(show?show:false)
    let custo, produ =''

    const dispatch = useDispatch()
    
        const carts = useSelector((state)=>{
            return state.cart
        })
   
        
    // //**************Fetch Customer name******************** */
    const cust = useSelector((state)=>{
        return state.customer
    })

    const cId=cust.filter((ele)=>{
        return ele._id===customer
    })
    
    // //**************************************************** */


    // //**************Fetch Product name******************** */
    const prod = useSelector((state)=>{
        return state.products
    })

    const pId=prod.filter((ele)=>{
        return ele._id===product
    })
    // //**************************************************** */
 

    const decrement = (id)=>{
        dispatch(decQty(id))
    }

    const increment = (id)=>{
        dispatch(incQty(id))
    }

    const remove =(id)=>{
        dispatch(removeCartItem(id))
    }

    cId.map((e)=>{
        return custo = e.name
    })

    pId.map((e)=>{
        return produ = e.name
    })

    console.log("CARTS", carts)
    
    return (<div>     
        {showcart &&

            (<div class="cartcontainer">
            <table class="cart-table">
                <tr> <td><h5 class="cart-product">{produ}</h5></td>
                <td><h6 class="card-text">&#8377; {price}</h6> </td>

                <td><div>
                <input type="button" class="inc-dec-btn" onClick={()=>{decrement(product)}} disabled={quantity===1} value="-"/>
                <span style={{paddingLeft:"8px", paddingRight:"8px", color: "black"}}>{quantity}</span>
                <input type="button" class="inc-dec-btn" onClick={()=>{increment(product)}} disabled={quantity===10} value="+"/>
                </div></td>
                <td><input type="button" class="btn btn-sm btn-danger btn-rounded" onClick={()=>{remove(product)}} value="Remove"/></td>
                </tr>
            </table>
            </div>)
            }
            
        </div>)
}

export default SingleProducts