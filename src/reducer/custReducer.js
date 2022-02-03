
const initValue = []

const custReducer = (state=initValue, action)=>{
    switch(action.type)
    {      
        case 'CUST_LIST':{
            return [...action.payload]
        }

        case 'UPDATE_CUST':{
            return [{...state, ...action.payload}]
        }

        default:{
            return [...state]
        }
    }
}

export default custReducer