
const initValue = []

const userReducer = (state=initValue, action)=>{
    switch(action.type)
    {      

        case 'USER_INFO':{
            return {...action.payload}
        }

        // case 'UPDATE_CUST':{
        //     return {...state, ...action.payload}
        // }

        default:{
            return {...state}
        }
    }
}

export default userReducer