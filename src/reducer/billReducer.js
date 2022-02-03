
const initValue = []

const billReducer = (state=initValue, action)=>{
    switch(action.type)
    {      
        case 'BILL_LIST':{
            return [...action.payload]
        }

        default:{
            return [...state]
        }
    }
}



export default billReducer