const initValue = []
const singleItemReducer = (state=initValue, action)=>
{
    switch(action.type)
    {
        case 'SINGLE_ITEM':{
            return [{...action.payload}]
        }

        default:{
            return [...state]
        }
    }
}

export default singleItemReducer