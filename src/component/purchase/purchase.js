import React from 'react'
import AllProducts from './allProducts'
import Bill from './bill'
import BuyProducts from './buyProducts'

const Purcahse =(props)=>{

    return (<div>
                <BuyProducts />
                    <hr/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        <div class="cartInfo" >
                            <AllProducts />
                        </div>
                        <Bill />
                        </div>
                        
                        {/* <Route path="/billDetails/:id" component={BillDetails} exact={true}/> */}
            </div>)
}

export default Purcahse