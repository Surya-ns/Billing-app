import React from "react";
import ProductForm from "./productsForm";
import ProductList from './productList'

const Products = (props)=>
{
    return (<div class="customerInfo">
        <ProductList />
        <ProductForm />
    </div>)
}

export default Products