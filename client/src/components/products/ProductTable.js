import React, {Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Modal, Button } from 'react-bootstrap'
import { useProducts, getProducts,setCurrent } from '../../context/product/ProductState';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import Spinner from '../layout/Spinner';




const ProductTable = ({product}) => {
 
  const [productState, productDispatch] = useProducts();
  const { products} = productState;
  const prodID = products._id
  console.log(prodID)






  useEffect(() => {
    getProducts(productDispatch);
  }, [productDispatch]);

  if (products !== null && products.length === 0) {
    return <h4>Please add a product</h4>;
  }

  return (
   
    
    <Fragment>
      
          {products !== null ? (
      
        <TransitionGroup>
          
          {/* <Table striped hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>UPC</th>
              <th>Type</th>
            </tr>
          </thead>
        <tbody>
      
          {filtered !== null
            ? filtered.map((product) => (
                <CSSTransition
                  key={product._id}
                  timeout={500}
                  classNames='item'
                >
                 <tr><ProductItem product={product} /></tr> 
                </CSSTransition>
              ))
            : products.map((product) => (
                <CSSTransition
                  key={product._id}
                  timeout={500}
                  classNames='item'
                >
              <tr><ProductItem product={product} /></tr>
                </CSSTransition>
              ))}
              
            </tbody>
            </Table> */}
           

        </TransitionGroup> 
        
      ) : (
        <Spinner />
      )} 
   </Fragment>
   
   
  );
};

export default ProductTable;