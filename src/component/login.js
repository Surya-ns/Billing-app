import React, {useState} from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import {startLoginInfo} from '../action/actions'


const Login = (props)=>{
    
    const {handleAuth, history} = props
    const dispatch = useDispatch()
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [formError, setFormError] = useState({})
    const error = {}

    const handleInput=(e)=>{
        if(e.target.name==="userEmail")
        {
            setUserEmail(e.target.value)
        }
        if(e.target.name==="userPassword")
        {
            setUserPassword(e.target.value)
        }
    }

    const validateLogin = ()=>{
        if(userEmail.trim().length===0)
        {
            error.userEmail = "Email cannot be blank"
        }
        else if(!validator.isEmail(userEmail))
        {
            error.userEmail ="Email format is incorrect"
        }
        if(userPassword.trim().length===0)
        {
            error.userPassword = "Password cannot be blank"
        }

    }
    const loginSubmit=(e)=>{
        e.preventDefault()
        validateLogin()

        if(Object.keys(error).length===0)
        {
            setFormError({})
            
            const loginData = {
                email:userEmail,
                password:userPassword
            }

            dispatch(startLoginInfo(loginData, handleAuth, history))

            setUserEmail('')
            setUserPassword('')
        }
        else
        {
            setFormError(error)
        }
    }

    return (
        <div class="container">
        <form onSubmit={loginSubmit}>
        <div class="login_reg_style">
        <fieldset>
            <legend> Login </legend>
            <input type="email" value={userEmail} class="form-control" id="umeial" name="userEmail" onChange={handleInput} placeholder="User email" autoComplete="on"/>
            {formError.userEmail && <span class="error_align">*{formError.userEmail}</span>}<br/>
            
            <input type="password" value={userPassword} class="form-control" name="userPassword" onChange={handleInput} placeholder="User password"/>
            {formError.userPassword && <span class="error_align">*{formError.userPassword}</span>}<br/>
            <input type="submit" class="btn btn-primary" value="Sign in"/>
        </fieldset>
        </div>
        </form>
    </div>)
}

export default Login