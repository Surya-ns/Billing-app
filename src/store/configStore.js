
import userReducer from '../reducer/userReducer'
import custReducer from '../reducer/custReducer'
import prodReducer from '../reducer/prodReducer'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import billReducer from '../reducer/billReducer'
import cartReducer from '../reducer/cartReducer'
import finalBillReducer from '../reducer/finalBillReducer'
import singleItemReducer from '../reducer/singleItemReducer'
import invoiceReducer from '../reducer/invoiceReducer'


const configStore = ()=>{
    const store = createStore(combineReducers({
        user: userReducer,
        customer: custReducer,
        products: prodReducer,
        bills: billReducer,
        cart: cartReducer,
        finalbills: finalBillReducer,
        singleitem: singleItemReducer,
        // OrderId: billId
        invoice:invoiceReducer
    }), applyMiddleware(thunk))
    return store
}

{console.log("configstore", configStore)}

export default configStore

