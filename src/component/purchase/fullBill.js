import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCustomerLists} from '../../action/actions'
import {startGetProductLists} from '../../action/prodAction/prodAction'
import {removeBillItem, startGetCartLists} from '../../action/billing/billActions'
import { MDBDataTable } from 'mdbreact';
import { Link, Route } from 'react-router-dom'
import BillDetails from './billDetails'
import { Modal, Button } from "react-bootstrap";

const FullBill = (props)=>{

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [id, setId] = useState('')
    
    const handleClose = () => setShow(false);
    const handleShow = (oid) => {
        setShow(true);
        setId(oid)
    }


    useEffect(()=>{
        dispatch(getCustomerLists())
        dispatch(startGetProductLists())
        dispatch(startGetCartLists())
    },[])

    const allPurchase = useSelector((state)=>{
        return state.bills
    })

    const cust = useSelector((state)=>{
        return state.customer
    })

    const custName=(custId)=>
    {
        let cname=""
        const customerName = cust.filter((ele)=>{
            return ele._id===custId
        })

        customerName.map((e)=>{
            cname = e.name
            console.log("Name.....", cname)
        })     
        return cname
    }
    

    //***************************** */
    const data = {
        columns: [
          {
            label: 'Order ID',
            field: 'orderId',
            sort: 'asc',  
            width: 210
          },
          {
            label: 'Customer',
            field: 'customer',
            sort: 'asc',
            width: 110          
          },
          {
            label: 'Date',
            field: 'date',
            width: 100
          },
          {
            label: 'Remove',
            field: 'remove',
            width:100
          }
        ],
        rows: [...allPurchase.map((e,i)=>(
            {
                // orderId:<><Link to={`/billDetails/${e._id}`} >{e._id}</Link> </>,
                orderId:<><h6 onClick={()=>{handleShow(e._id)}}>{e._id}</h6> </>,            
                customer:custName(e.customer),
                date:(e.date).slice(0,10),
                remove:<button type="button" class="btn btn-sm btn-danger" onClick={()=>{remove(e._id)}}> Delete </button>               
            }))
            ]
      };

/***************************** */



const remove=(id)=>{
    if(window.confirm("Are you sure want to delete the product?"))
    dispatch(removeBillItem(id))
}


    return (<div class="container">
        <div class="bill_container">
        <MDBDataTable
        striped
        bordered
        hover
        small
        data={data}
        order
        />
        </div>

        <div class="my-modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
                <BillDetails id={id}/>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        <Route path="/billDetails/:id" component={BillDetails} exact={true}/>

    </div>)
}

export default FullBill