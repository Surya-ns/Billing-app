import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {startGetCartLists} from '../../action/billing/billActions'
import AllBills from './allBills'

const AllBillGenerater=(props)=>
{
    const dispatch = useDispatch()

    const allBils = useSelector((state)=>{
        return state.bills
    })

    useEffect(()=>{
        dispatch(startGetCartLists())
    },[])
    

    console.log("BILLS", allBils)
    return (<div>
                {allBils.map((ele,i)=>{
                    return ele.lineItems.map((e)=>{
                        return <AllBills key={i} itemId={ele._id}
                                date={ele.date}
                                customer={ele.customer} 
                                user={ele.user}
                                total={ele.total}
                                prodId={e._id}
                                product={e.product}
                                price={e.price}
                                quantity={e.quantity}
                                subTotal={e.subTotal} 
                                />
                    })
                        
                })   
                }     
    </div>)
  
}

export default AllBillGenerater