import axios from "axios"

//********************ADD NEW PRODUCT ************************/
export const startAddProductData = (formData)=>{
    return ((dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/products', formData, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const prodData = response.data
            console.log(prodData)
           dispatch(startGetProductLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })
}



//********************* FETCH ALL PRODUCTS INFO *********************/
export const startGetProductLists = ()=>{
    return ((dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products', 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const prodList = response.data
           dispatch(listOfProducts(prodList))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const listOfProducts = (custList)=>{
    return {type:'PROD_LIST', payload: custList}
}


//***************** UPDATE SPECIFIC CUSTOMER ******************/
export const startUpdateProductData = (formdata, id)=>
{
    return ((dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, formdata,
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const updateProd = response.data
            dispatch(updateProduct(updateProd))
            dispatch(startGetProductLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })

}

export const updateProduct = (updateProd)=>{
    return {type:'UPDATE_PROD', payload: updateProd}
}



//************************ REMOVE SPECIFIC CUSTOMER ******************/
export const startRemoveProd = (id)=>
{
    return ((dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const removedProd = response.data
            console.log("Remove", removedProd)
           dispatch(startGetProductLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })
}
