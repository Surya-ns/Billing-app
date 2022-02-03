import axios from "axios";  


//********************ADD CART INFO  ************************/
export const addtoBill = (cartData)=>{
    return ((dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/bills', cartData, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const billinfo = response.data
            
            dispatch(invic(billinfo))
        })
        
        .catch((err)=>{
            alert(err)
        })
    })
}

export const invic = (billinfo)=>{
    
    return {type:'INVOICE', payload:billinfo}
}

//********************* FETCH CART INFO *********************/
export const startGetCartLists = ()=>{
    return ((dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills', 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const billList = response.data
            dispatch(listOfCartItem(billList))
            console.log("BILLLL", billList)
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const listOfCartItem = (billList)=>{
    return {type:'BILL_LIST', payload: billList}
}

// //***********************Remove Item from cart********************** */
export const removeBillItem = (id)=>
{
    return ((dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const removedCartItem = response.data
            console.log("Remove", removedCartItem)
        dispatch(startGetCartLists())
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const singleBill = (id)=>
{
    return ((dispatch)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response)=>{
            const singleItem = response.data
            dispatch(getSingleOrder(singleItem))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const getSingleOrder = (singleItem=[])=>{
    return {type:'SINGLE_ITEM', payload: singleItem}
}

export const addToCarts = (data)=>{
    return {type:'ADD_CART', payload:data}
}

export const removeCartItem = (id)=>{
    return {type:'REMOVE_ITEM', payload:id}

}

export const decQty = (id)=>{
    return { type: 'DEC', payload: id}
}

export const incQty = (id)=>{
    return {type: 'INC', payload: id}
}

export const resetStore = ()=>{
    return {type: 'RESET'}
}
