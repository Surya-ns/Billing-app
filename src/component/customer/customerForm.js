import React, {useState} from 'react'
import validator from 'validator'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import {addCustData, updateCustData} from '../../action/actions'
import { MDBIcon } from 'mdbreact';

const CustomerForm = (props)=>
{
    const {name, email, mobile, id, update, edit} = props
    const [cid, setCid] = useState(id?id:'')
    const [cname, setCname] = useState(name?name:'')
    const [cemail, setCemail] = useState(email?email:'')
    const [cmobile, setCmobile] = useState(mobile?mobile:'')
    const [formError, setFormError] = useState({})
    const error = {}
    
    const dispatch = useDispatch()

    const custHandle = (e)=>{
        if(e.target.name==='cname')
        {
            setCname(e.target.value)
        }
        else if(e.target.name==='cemail')
        {
            setCemail(e.target.value)
        }
        else if(e.target.name==='cmobile')
        {
            setCmobile(e.target.value)
        }
    }

    const validateForm = ()=>{
        //Name----------------
        if(cname.trim().length ===0)
        {
            error.cname = "Name cannot be blank"
        }
        else if(cname.trim().length <= 3)
        {
            error.cname = "Name should contain atleast 4 character"
        }

        if(cemail.trim().length===0)
        {
            error.cemail = "Email cannot be blank"
        }
        else if(!validator.isEmail(cemail))
        {
            error.cemail = "Email format incorrect"
        }

        if(cmobile.trim().length ===0)
        {
            error.cmobile = "Name cannot be blank"
        }
        else if(cmobile.trim().length < 10 || cmobile.trim().length > 10)
        {
            error.cmobile = "Mobile should have 10 numbers"
        }
        else if(!cmobile.trim().match(/[0-9]/))
        {
            error.cmobile = "Mobile should contains only numbers"
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
                id: cid,
                name: cname,
                mobile: cmobile,
                email: cemail
            }

            if(update)
            {
                console.log("cid", cid)
                dispatch(updateCustData(formData, cid))
                if(edit)
                { edit() }
            }else
            {
                dispatch(addCustData(formData))
            }
            setCname('')
            setCemail('')
            setCmobile('')
        }
        else{
            setFormError(error)
        }     
    }

    return (<div>
        
        <form onSubmit={formSubmit}>
            <div class="cust_form">
                
            <input type="text" value={cname} class="form-control" name="cname" onChange={custHandle} placeholder = "Customer name"/>
            {formError.cname && <span class="error_align">*{formError.cname}</span>}

            <input type="email" value={cemail} class="form-control" name="cemail" onChange={custHandle} placeholder = "Customer Email"/>
            {formError.cemail && <span class="error_align">*{formError.cemail}</span>}

            <input type="tel" value={cmobile} class="form-control" name="cmobile" onChange={custHandle} placeholder = "Customer Mobile"/>
            {formError.cmobile && <span class="error_align">*{formError.cmobile}</span>}
            
            {update? (<input type="submit" class="btn btn-success" value="Update"/>):(<input type="submit" class="btn btn-success" value="Add customer"/>)}
        </div>
        
        </form>
    </div>)
}

export default CustomerForm