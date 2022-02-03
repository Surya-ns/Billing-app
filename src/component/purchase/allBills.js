import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCustomerLists} from '../../action/actions'
import {startGetProductLists} from '../../action/prodAction/prodAction'
import {removeBillItem, startGetCartLists} from '../../action/billing/billActions'
import axios from 'axios'
import DatatablePage from './aaaa'

const AllBills = (props)=>{

    const {itemId, prodId, customer, product, date, subTotal, user, quantity, price, total} = props
    console.log("ITEMID", itemId)
    const dispatch = useDispatch()

    let custo, produ =''

    const mycart = useSelector((state)=>{
        return state.cart
    })

    const allPurchase = useSelector((state)=>{
        return state.bills
    })

    //**************Fetch Customer name******************** */
    const cust = useSelector((state)=>{
        return state.customer
    })

    const cId=cust.filter((ele)=>{
        return ele._id===customer
    })
    //**************************************************** */


    //**************Fetch Product name******************** */
    const prod = useSelector((state)=>{
        return state.products
    })

    const pId=prod.filter((ele)=>{
        return ele._id===product
    })
    //**************************************************** */
    
    useEffect(()=>{
        dispatch(getCustomerLists())
        dispatch(startGetProductLists())
        dispatch(startGetCartLists())
    },[])

    const remove =(id)=>{
        dispatch(removeBillItem(id))
    }

    const removeAllBills=()=>{
        allPurchase.map((e)=>{
            axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${e._id}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const removedCartItem = response.data
            console.log("Remove", removedCartItem)
        //    dispatch(startGetCartLists())
        })
        .catch((err)=>{
            alert(err)
        })
        })

    }

    cId.map((e)=>{
        return custo = e.name
    })

    pId.map((e)=>{
        return produ = e.name
    })
   
    return (<div>
            {/* <input type="button" value = "Delete All" onClick={()=>{removeAllBills()}}/> */}
                               
                <h5> {custo} - {produ} - {quantity} - {price} - {total}</h5>
              
                <input type="button" value = "Delete" onClick={()=>{remove(itemId)}}/>

    
            </div>)

}

export default AllBills