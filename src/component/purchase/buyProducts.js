import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import {addToCarts} from '../../action/billing/billActions'

const BuyProducts = (props) =>
{
    const curDate = moment(new Date()).format('YYYY-MM-DD')
    const [date, setDate] = useState(curDate)
    const [qty, setQty] = useState(1)
    const [cust, setCust] = useState('')
    const [product, setProduct] = useState('')
    const [formError, setFormError] = useState({})
    const error={}
        
    const dispatch = useDispatch()
    const selectDate = (e)=>{
        setDate(e.target.value)
    }

    const customers = useSelector((state)=>{
        return state.customer
    })

    const products = useSelector((state)=>{
        return state.products
    })

    const handleInput = (e)=>{
        if(e.target.name==="customer")
        {setCust(e.target.value)}
        if(e.target.name==="product")
        {setProduct(e.target.value)}
        if(e.target.name==="qty")
        {setQty(e.target.value)}
    }

    const validateInput = ()=>{
        if(cust==='')
        {
            error.cust = "Please select a customer"
        }
        else if(product==='')
        {
            error.product = "Please select a Product"
        }
    }

    const formSubmit = (e)=>{
        e.preventDefault()
        validateInput()
        if(Object.keys(error).length===0)
        {
            setFormError({})
            
            let custId = customers.filter((ele)=>{
              return (ele.name===cust)
            
            })

            const customerId = custId[0]._id

            const prodId = products.filter((ele)=>{
                return (ele.name===product)
            
              })

            const productId = prodId[0]._id
            const productPrice = prodId[0].price

            const cartData={
                date:date,
                customer:customerId,
                product:productId,
                quantity:qty,
                price:productPrice  
            }

            console.log(cartData)
            dispatch(addToCarts(cartData))
            setProduct('')
        }
        else{
            setFormError(error)
        }
    }
    return (<div>
        <form onSubmit={formSubmit}>
        <div class="buy_prod">
            <input type="date" class="form-control" value={date} onChange={selectDate} disabled/>
            
            <div style={{display:"block"}}>
            <input list="customer" class="form-control" placeholder="Select a customer" value={cust} name="customer" onChange={handleInput}/>
            {formError.cust && <span class="error_align">*{formError.cust}</span>}</div>
            {<datalist id="customer">
                {customers.map((ele,i)=>{
                    return <option value={ele.name} key={i}> { `${ele.name}, ${ele.mobile}`} </option>
                })}
            </datalist>}
            
            <div style={{display:"block"}}>
            <input list="product" class="form-control" placeholder="Select a product" value={product} name="product" autoComplete="off" onChange={handleInput} />
            {formError.product && <span class="error_align">*{formError.product}</span>}</div>
            {<datalist id="product">
                {products.map((ele)=>{
                    return (<>
                            <option value={ele.name} key={ele._id}> {`${ele.name}, ${ele.price}`}</option> 
                            </>)                      
                })}
            </datalist>}
            

            <input type="number" class="form-control" style={{width:"80px"}} value={qty} name="qty" min="1" max="10" step="1" placeholder="Qantity" onChange={handleInput}/>
            <input type="submit" style={{width:"200px"}} class="btn btn-success" value="Add to cart"/>
            </div>
        </form>

    </div>)
} 

export default BuyProducts