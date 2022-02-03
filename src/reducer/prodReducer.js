
const initValue = []

const prodReducer = (state=initValue, action)=>{
    switch(action.type)
    {      
        case 'PROD_LIST':{
            return [...action.payload]
        }

        case 'UPDATE_PROD':{
            return [{...state, ...action.payload}]
        }
        
        default:{
            return [...state]
        }
    }
}

export default prodReducer