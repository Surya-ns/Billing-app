import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addtoBill} from '../../action/billing/billActions'
import {Route, withRouter, useHistory} from 'react-router-dom'
import Invoice from "./invoice";
import { Modal, Button } from "react-bootstrap";
import jsPDF from "jspdf"
import { getSingleOrder } from "../../action/billing/billActions";


const Bill = (props)=>{

    let qty= 0, price=0.00, gstPrice =0.00
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const cartInfo = useSelector((state)=>{
        return state.cart
    })

    console.log("KKK", cartInfo)

    function totalQuantity()
    {
        for(let i=0; i<cartInfo.length; i++)
        {
            qty = Number(qty) + Number(cartInfo[i].quantity)
        }
        return qty
    }

    function subTotal()
    {
        for(let i=0; i<cartInfo.length; i++)
        {
            price = price + (cartInfo[i].price * cartInfo[i].quantity)
        }
        return price
    }

    function gst()
    {
        return gstPrice = ((18/100)*price)
    }

    function totalPrice()
    {
        return gstPrice + price
    }


    function generateBill()
    {
        let data={} 
        let date1,customer1
        let lineItems1=[]
        cartInfo.map((ele)=>{
            date1=ele.date
            customer1=ele.customer
            lineItems1.push({product: ele.product, quantity: ele.quantity, price: ele.price})
            })

            data={
                date:date1,
                customer:customer1,
                lineItems:lineItems1
            }
            
            dispatch(addtoBill(data))
            handleShow()
        }

        const genearetPdf=()=>{
            let doc = new jsPDF("landscape","pt","a4")
            doc.setFontSize(16)
            doc.html(document.getElementById('content'), {
                margin:[20,0,20,100],
                callback: function(pdf)
                {
                pdf.save("1.pdf")
                }
            })
        }
      
        
    return (<div class="card border shadow-5" >
            <div class="card-header bg-transparent text-center">Price details</div>
            <div class="card-body ctext">
                <p>Total items: &nbsp;&nbsp; &nbsp;{totalQuantity()}</p>
                <p>Subtotal: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rs. {subTotal()}</p>
                GST(18%): &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Rs. {gst()}
            </div>
            <div class="card-footer bg-transparent">
            <p class="ctext" style={{fontWeight:"bold"}}>Total: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;Rs. {totalPrice()}</p>
                <input type="button" class="genBill btn btn-dark" onClick={generateBill} value="Generate Bill" disabled={qty===0}/>

            </div>

        <div>
        <Modal show={show} onHide={handleClose} dialogClassName="invoice-modal">
          <Modal.Body>
                <div id="content">
                <Invoice />
                </div>
            </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={genearetPdf}>
              Generate PDF
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
            <Route path="/invoice" component={Invoice} exact={true}/>
        </div>)
        
}
export default withRouter(Bill)