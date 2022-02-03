import React, {useState} from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import {startUserData} from '../action/actions'
import { withRouter } from 'react-router'

const Register = (props)=>
{
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')
    const [formError, setFormError] = useState({})
    const error = {}

    const handleInput = (e)=>{
        if(e.target.name==='userName')
        {
            setUserName(e.target.value)
        }
        else if(e.target.name==='email')
        {
            setEmail(e.target.value)
        }
        else if(e.target.name==='password')
        {
            setPassword(e.target.value)
        }
        else if(e.target.name==='businessName')
        {
            setBusinessName(e.target.value)
        }
        else if(e.target.name==='address')
        {
            setAddress(e.target.value)
        }
    }

    const validateForm = ()=>{
        //Name----------------
        if(userName.trim().length ===0)
        {
            error.userName = "Name cannot be blank"
        }
        else if(userName.trim().length <= 3)
        {
            error.userName = "Name should contain atleast 4 character"
        }

        //Email --------------------
        if(email.trim().length===0)
        {
            error.email = "Email cannot be blank"
        }
        else if(!validator.isEmail(email))
        {
            error.email = "Email format incorrect"
        }

        //Password --------------- 
        if(password.length===0)
        {
            error.password="Password cannot be blank"
        }
        else if(password.length<=8)
        {
            error.password = "Password should be more than 8 characters"
        }

        //Business name -----------------
        if(businessName.length===0)
        {
            error.businessName="Business name cannot be blank"
        }
        else if(businessName.length<4)
        {
            error.businessName = "Business should contain atleast 4 character"
        }

        //Address ------------- 
        if(address.length===0)
        {
            error.address="Address cannot be blank"
        }
    }

    const submitForm =(e)=>
    {
        e.preventDefault()
        validateForm()
        if(Object.keys(error).length===0)
        {
            setFormError({})
            const formData = {
                username: userName,
                email: email,
                password: password,
                businessName: businessName,
                address: address
            }
            dispatch(startUserData(formData))
        
            setUserName('')
            setEmail('')
            setPassword('')
            setBusinessName('')
            setAddress('')
            
        }
        else{
            setFormError(error)
        }     
    }

    return (<div class="container">
        <form onSubmit={submitForm}>
        <div class="login_reg_style">
        <fieldset>
            <legend> Register </legend>
            <input type="text" value={userName} class="form-control" name="userName" onChange={handleInput} placeholder="Enter you name"/ >
            {formError.userName && <span class="error_align">*{formError.userName}</span>}<br />
            
            <input type="email" value={email} class="form-control" name="email" onChange={handleInput} placeholder="Enter you email"/ > 
            {formError.email && <span class="error_align">*{formError.email}</span>}<br />
            
            <input type="password" value={password} class="form-control" name="password" onChange={handleInput} placeholder="Enter the password"/ > 
            {formError.password && <span class="error_align">*{formError.password}</span>}<br />
            
            <input type="text" value={businessName} class="form-control" name="businessName" onChange={handleInput} placeholder="Enter your Business name"/ > 
            {formError.businessName && <span class="error_align">*{formError.businessName}</span>}<br />

            <textarea type="text" value={address} class="form-control" name="address" onChange={handleInput} placeholder="Enter your address"/ > 
            {formError.address && <span class="error_align">*{formError.address}</span>}<br />

            <input type="submit" class="btn btn-primary" value="Register"/>
            </fieldset></div>
            </form>
        </div>)
}

export default withRouter(Register)
