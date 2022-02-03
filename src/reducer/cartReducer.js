
const initValue = []

const cartReducer = (state=initValue, action)=>{
    switch(action.type)
    {      
        case 'ADD_CART':{
            return [...state, {...action.payload}]
        }

        case 'REMOVE_ITEM':{
            return state.filter((ele)=>{
                return ele.product!==action.payload
            })
        }

        case 'INC':{
            return state.map((ele)=>{
    
                    if(ele.product===action.payload)
                    {
                    return {...ele, quantity: ele.quantity + 1}
                    }
                    else 
                    {return {...ele}}
               
            })
        }

        case 'DEC':{
            return state.map((ele)=>{
    
                    if(ele.product===action.payload)
                    {
                    return {...ele, quantity: ele.quantity - 1}
                    }
                    else 
                    {return {...ele}}
               
            })
        }

        case 'RESET':{
            return []
        }

        default:{
            return [...state]
        }
    }
}

export default cartReducer