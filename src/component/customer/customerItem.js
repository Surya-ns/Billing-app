import React, { useState } from "react";
import CustomerForm from './customerForm'
import {useDispatch } from "react-redux";
import {removeCust} from '../../action/actions'
import {Modal, Button} from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';


const CustomerItem = (props)=>
{   
    const {id, name, email, mobile} = props
    const [isEdit,setIsedit] = useState(false)
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()

    const edit = ()=>{
        setIsedit(!isEdit)
    }

    const remove=(id)=>{
        dispatch(removeCust(id))
    }

    
    return (<div>
        {isEdit && 
            (<Modal show={show} onHide={edit}>
            <Modal.Body>
                <CustomerForm id={id} name={name} email={email} mobile={mobile} update={true} edit={edit}/>
                <Button variant="secondary" onClick={edit}>Close Modal</Button>
            </Modal.Body>
            </Modal>)}
    
        <h5>{name} 
        <button onClick={()=>{edit()}}> Edit </button>
        <button onClick={()=>{remove(id)}}> Delete </button>
        </h5>
    </div>)
}

export default CustomerItem