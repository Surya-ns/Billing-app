import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {startGetProductLists} from '../../action/prodAction/prodAction'
import {Modal, Button} from 'react-bootstrap';
import {startRemoveProd} from '../../action/prodAction/prodAction'
import ProductForm from './productsForm'
import { MDBDataTable } from 'mdbreact';
import ProductItem from './productItem'

const ProductList = (props)=>
{
    const [id, setId] = useState('')
    const [name, setName]=useState('')
    const [price, setPrice] = useState('')
    const [isEdit,setIsedit] = useState(false)

    const dispatch = useDispatch()
    const product = useSelector((state)=>{
        return state.products
    })

    useEffect(()=>{
        dispatch(startGetProductLists())
    },[])


     //***************************** */
     const data = {
        columns: [
          {
            label: 'Product',
            field: 'prdct',
            sort: 'asc',  
            width: 100
          },
          {
            label: 'Price',
            field: 'price',
            sort: 'asc',
            width: 100          
          },
          {
            label: 'Edit',
            field: 'edit',
            width: 100
          },
          {
            label: 'Remove',
            field: 'remove',
            width:100
          }
        ],
        rows: [...product.map((e,i)=>(
            {
                prdct:e.name,
                price:e.price,
                edit: <button type="button" class="btn btn-sm btn-success" onClick={()=>{edit(e._id, e.name, e.price)}}> Edit </button>,
                remove:<button type="button" class="btn btn-sm btn-danger" onClick={()=>{remove(e._id)}}> Delete </button>               
            }))
            ]
      };
/***************************** */
      const remove=(id)=>{
        if(window.confirm("Are you sure want to delete the product?"))
        dispatch(startRemoveProd(id))
    }

    const edit = (pid, pname, pprice)=>{
        setIsedit(!isEdit)
        setId(pid)
        setName(pname)
        setPrice(pprice)
    }

    // return (<div>
    //     {product.map((prod,i)=>{   
    //         return (<div>
    //             <ProductItem key={i} id={prod._id} name={prod.name} price={prod.price} show={true}/>
    //             </div>)
    //     })}
    // </div>)   

    return (<>
        {isEdit && 
            (<Modal show={true} onHide={edit}>
            <Modal.Body>
                <ProductForm id={id} name={name} price={price} update={true} edit={edit}/>
                <Button variant="secondary" onClick={edit}> Cancel </Button>
            </Modal.Body>
            </Modal>)}
        
        <div class="list_container">
        <MDBDataTable
        scrollY
        maxHeight="340px"
        striped
        bordered
        hover
        small
        data={data}
        order
        
        />
        </div>
        {/* <h5>{name} - Rs. {price}
        <button onClick={()=>{edit()}}> Edit </button>
        <button onClick={()=>{remove(id)}}> Delete </button>
        </h5> */}
    </>)
}

export default ProductList