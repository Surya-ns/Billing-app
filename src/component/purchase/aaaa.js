import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = (props) => {
    
  const data = {
    columns: [
      {
        label: 'Customer',
        field: 'customer',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Product',
        field: 'product',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Total',
        field: 'total',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        customer: "Pramodini",
        product: 'Pen',
        quantity: '5',
        price: '10',
        date: '2011/04/25',
        total: '50'
      }
      
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
      order
    />
  );
}

export default DatatablePage;