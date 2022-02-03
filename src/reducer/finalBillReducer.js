
const initValue = []

const finalBillReducer = (state=initValue, action)=>{
    switch(action.type)
    {      
        case 'FINAL_BILL':{
            return [...state, {...action.payload}]
        }

        default:{
            return [...state]
        }
    }
}

export default finalBillReducer