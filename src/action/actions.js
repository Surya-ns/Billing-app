import axios from "axios"

// **************** REGISTER *************************
export const startUserData = (formdata)=>
{
    return (()=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formdata)
        .then((response)=>{
            const responseData = response.data
            console.log("Response:", responseData)
            if(responseData.hasOwnProperty('errors'))
            {
                alert("Then error:", responseData)
            }
            else
            {
                alert("Success....")
                console.log("Result", responseData) 
            }
        })
        .catch((err)=>{
            alert("Catch error:", err)
        })
    })
}



//******************LOGIN***********************/
export const startLoginInfo = (logindata, handleAuth, history)=>
{
    return (()=>
    {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', logindata)
        .then((response)=>{
            const responseData = response.data
            if(responseData.hasOwnProperty('errors'))
            {
                alert("Then error:", responseData.message)
            }
            else
            {
                console.log('Token:', responseData)
                localStorage.setItem('token', responseData.token)
                handleAuth()
                history.push('/account')
                console.log("lllll", responseData)                
            }
        })
        .catch((err)=>{
            alert(err)
        })
    })
}



//*****************FETCH ALL USERS DATA*******************/
export const startGetUserInfo = ()=>{
    return ((dispatch)=>
    {
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account', 
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const userData = response.data
            dispatch(userInfo(userData))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const userInfo = (userData)=>{
    return {type:'USER_INFO', payload:userData}
}



//********************ADD NEW CUSTOMER ************************/
export const addCustData = (formData)=>{
    return ((dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', formData, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const userData = response.data
            console.log(userData)
           dispatch(getCustomerLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })
}



//********************* FETCH ALL CUSTOMERS INFO *********************/
export const getCustomerLists = ()=>{
    return ((dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers', 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const custList = response.data
            console.log(custList)
           dispatch(listOfCustomers(custList))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const listOfCustomers = (custList)=>{
    return {type:'CUST_LIST', payload: custList}
}



//************************ REMOVE SPECIFIC CUSTOMER ******************/
export const removeCust = (id)=>
{
    return ((dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const removedCust = response.data
            console.log("Remove", removedCust)
           dispatch(getCustomerLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })
}



//***************** UPDATE SPECIFIC CUSTOMER ******************/
export const updateCustData = (formdata, id)=>
{
    return ((dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, formdata,
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const updateCust = response.data
            console.log("Remove.........", updateCust)
            dispatch(updateCustomer(updateCust))
            dispatch(getCustomerLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })

}

export const updateCustomer = (updateCust)=>{
    return {type:'UPDATE_CUST', payload: updateCust}
}