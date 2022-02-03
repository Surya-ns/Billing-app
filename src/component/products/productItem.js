import React, { useState } from "react";
import ProductForm from './productsForm'
import {useDispatch } from "react-redux";
import {startRemoveProd} from '../../action/prodAction/prodAction'
import {Modal, Button} from 'react-bootstrap'

const ProductItem = (props)=>
{    
    const {id, name, price} = props
    const [isEdit,setIsedit] = useState(false)
    const [show, setShow] = useState(true)

    const dispatch = useDispatch()

    const edit = ()=>{
        setIsedit(!isEdit)
    }

    const remove=(id)=>{
        if(window.confirm("Are you sure want to delete the product?"))
        dispatch(startRemoveProd(id))
    }

    return (<div>
        {isEdit && 
            (<Modal show={show} onHide={edit}>
            <Modal.Body>
                <ProductForm id={id} name={name} price={price} update={true} edit={edit}/>
                <Button variant="secondary" onClick={edit}> Cancel </Button>
            </Modal.Body>
            </Modal>)}
        
        <h5>{name} - Rs. {price}
        <button onClick={()=>{edit()}}> Edit </button>
        <button onClick={()=>{remove(id)}}> Delete </button>
        </h5>
    </div>)
}

export default ProductItem