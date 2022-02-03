import React from 'react'
import {useSelector} from 'react-redux'
import SingleProducts from './singleProduct'


const AllProducts=(props)=>
{
    const mycart = useSelector((state)=>{
        return state.cart
    })

return (<div>
                {mycart.map((ele, i)=>{
                    return <SingleProducts key={i} 
                    customer={ele.customer} 
                    product={ele.product} 
                    quantity={ele.quantity}
                    price={ele.price}
                    show={true}/>
                    })
                }  
    </div>)
  
}

export default AllProducts