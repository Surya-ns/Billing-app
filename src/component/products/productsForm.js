import React, {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import {startAddProductData, startUpdateProductData} from '../../action/prodAction/prodAction'

const ProductForm = (props)=>
{
    const {id, name, price, update, edit} = props
    const [pid, setPid] = useState(id?id:'')
    const [pname, setPname] = useState(name?name:'')
    const [pprice, setPprice] = useState(price?price:'')
    const [formError, setFormError] = useState({})
    const error = {}
    
    const dispatch = useDispatch()

    const productHandle = (e)=>{
        if(e.target.name==='pname')
        {
            setPname(e.target.value)
        }
        else if(e.target.name==='pprice')
        {
            setPprice(e.target.value)
        }
    }

    const validateForm = ()=>{
        //Name----------------
        if(pname.trim().length ===0)
        {
            error.pname = "Name cannot be blank"
        }
        else if(pname.trim().length <= 3)
        {
            error.pname = "Name should contain atleast 4 character"
        }

        if(pprice.length ===0)
        {
            error.pprice = "Price cannot be empty"
        }

    }

    const formSubmit =(e)=>
    {
        e.preventDefault()
        validateForm()
        if(Object.keys(error).length===0)
        {
            setFormError({})
            const formData = {
                id: pid,
                name: pname,
                price: pprice,
            }

            if(update)
            {
                console.log("pid", pid)
                dispatch(startUpdateProductData(formData, pid))
                if(edit)
                { edit() }
            }else
            {
                dispatch(startAddProductData(formData))
            }
            setPname('')
            setPprice('')
        }
        else{
            setFormError(error)
        }     
    }

    return (<div>
        <form onSubmit={formSubmit}>
        <div class="prod_form">
            <input type="text" value={pname} class="form-control" name="pname" onChange={productHandle} placeholder = "Product name"/>
            {formError.pname && <span class="error_align">*{formError.pname}</span>}

            <input type="number" class="price" value={pprice} class="form-control" name="pprice" min="0" step="1" onChange={productHandle} placeholder = "Product price"/>
            {formError.pprice && <span class="error_align">*{formError.pprice}</span>}

            {update? (<input type="submit" class="btn btn-success" value="Update"/>):(<input type="submit" class="btn btn-success" value="Add product"/>)}
            </div>
        </form>
    </div>)
}

export default ProductForm