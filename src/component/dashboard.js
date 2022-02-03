import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetCartLists } from "../action/billing/billActions";

const Dashboard = (props)=>{

    let qty=0, amt=0;

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startGetCartLists())
    },[])

    const cust = useSelector((state)=>{
        return state.customer
    })

    const prod = useSelector((state)=>{
        return state.products
    })

    const allPurchase = useSelector((state)=>{
        return state.bills
    })

    {allPurchase.map((ele)=>{
        return ele.lineItems.map((e)=>{
            return qty = qty + e.quantity
        }),
        amt = amt + ele.total
    })}

    return (
        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
        <div class="box box1">
            <h4>Customers</h4>
            <hr/>
            <h1>{cust.length}</h1>
        </div>

        <div class="box box2">
            <h4>Products</h4>
            <hr/>
            <h1>{prod.length}</h1>
        </div>

        <div class="box box3">
            <h4>Quantity</h4>
            <hr/>
            <h1>{qty}</h1>
        </div>

        <div class="box box4">
            <h4>Total Earned</h4>
            <hr/>
            <h1>{amt}</h1>
        </div>
    </div>)

}

export default Dashboard