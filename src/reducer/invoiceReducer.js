
const initValue = []

const invoiceReducer = (state=initValue, action)=>{
    switch(action.type)
    {      
        case 'INVOICE':{
            
            return [{...action.payload}]
        }

        default:{
            return [...state]
        }
    }
}

export default invoiceReducer