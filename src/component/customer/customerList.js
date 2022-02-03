import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getCustomerLists} from '../../action/actions'
import {removeCust} from '../../action/actions'
import CustomerForm from './customerForm'
import {Modal, Button} from 'react-bootstrap';
import CustomerItem from './customerItem'
import { MDBDataTable } from 'mdbreact';

const CustomerList = (props)=>
{
    const dispatch = useDispatch()
    const [name, setName]=useState('')
    const [id, setId] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [isEdit,setIsedit] = useState(false)

    const customer = useSelector((state)=>{
        return state.customer
    })

    useEffect(()=>{
        dispatch(getCustomerLists())
    },[])


    //***************************** */
    const data = {
        columns: [
          {
            label: 'Customer',
            field: 'customr',
            sort: 'asc',
            width:110
          },
          {
            label: 'Mobile',
            field: 'mobile',
            sort: 'asc',
            width:110
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width:180
          },
          {
            label: 'Edit',
            field: 'edit', 
            width:100
          },
          {
            label: 'Remove',
            field: 'remove',     
            width:100       
          }
        ],
        rows: [...customer.map((e,i)=>(
            {
                customr:e.name,
                mobile:e.mobile,
                email:e.email,
                edit: <button type="button" class="btn btn-sm btn-success" onClick={()=>{edit(e._id, e.name, e.mobile, e.email)}}> Edit </button>,
                remove:<button type="button" class="btn btn-sm btn-danger" onClick={()=>{remove(e._id)}}> Delete </button>
                
            }))
                ]
      };
    
    //****************************** */

      const remove=(id)=>{
        if(window.confirm("Are you sure want to delete the customer?"))
        dispatch(removeCust(id))
    }
    

    const edit = (cid, cname, cmobile, cemail)=>{
        setIsedit(!isEdit)
        setId(cid)
        setName(cname)
        setMobile(cmobile)
        setEmail(cemail)
    }

      
    // return (<div>
    //     {customer.map((cust,i)=>{   
    //         return (<div>
    //             <CustomerItem key={i} id={cust._id} name={cust.name} mobile={cust.mobile} email={cust.email} show={true}/>
                
    //             </div>)
    //     })}
    // </div>)   

    return (<>
        {isEdit && 
            (<Modal show={true} onHide={edit}>
            <Modal.Body>
                <CustomerForm id={id} name={name} email={email} mobile={mobile} update={true} edit={edit}/>
                <Button variant="danger" onClick={edit}>Cancel</Button>
            </Modal.Body>
            </Modal>)}
            
        <div class="list_container">
        <MDBDataTable
        scrollY
        maxHeight="340px"
        striped
        bordered
        small
        data={data}
        order
        />
        </div>
    </>)
}

export default CustomerList