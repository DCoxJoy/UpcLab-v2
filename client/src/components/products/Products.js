import React, { Fragment, useEffect, useState } from 'react';
//  import {Table} from 'react-bootstrap';
 import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'; 
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 

import Spinner from '../layout/Spinner';
import ProductState, { useProducts, getProducts,setCurrent, deleteProduct } from '../../context/product/ProductState';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Modal, Button } from 'react-bootstrap'
//import { get } from 'config';




const Products = () => {
  
  
    const [productState, productDispatch] = useProducts();
    const { products } = productState;
    
    
    
   
  
    const[modalInfo, setModalInfo] = useState([])
    const[showModal, setShowModal] = useState(false)
    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    


    const columns = [
      {
      dataField: 'productname',
      text: 'Product Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'upc',
      text: 'UPC Code',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'modelsku',
      text: 'SKU',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'innercarton',
      text: 'Inner Carton',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'mastercarton',
      text: 'Master Carton',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'producttype',
      text: 'Product Type',
      sort: true,
      filter: textFilter()

    },{
      dataField: 'productline',
      text: 'Product Line',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'devicebrand',
      text: 'Device Brand',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'devicetype',
      text: 'Device Type',
      sort: true,
      filter: textFilter()
    },{
      dataField: 'specs',
      text: 'Specs',
      sort: true,
      filter: textFilter()
     
    },{
      dataField: 'edit',
      text: 'Edit Row',
      formatter: editBtn
   
    },{
      dataField: 'delete',
      text: 'Delete Row',
      formatter: deleteBtn
   
    }
    
  ];


    
    

    useEffect(() => {
      getProducts(productDispatch);
    }, [productDispatch]);
  
    if (products !== null && products.length === 0) {
      return <h4>Please add a product</h4>;
    };
  



  const ModalContent = () =>{
      return(
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>ARE YOU SURE YOU WANT TO DELETE - 
                    {modalInfo.productname} ?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
              product id: {modalInfo._id}<br/>
              product sku: {modalInfo.modelsku}<br/>
              product upc: {modalInfo.upc}<br/>
              product type: {modalInfo.producttype}<br/>
              product line: {modalInfo.productline}<br/>
              device type: {modalInfo.devicetype}<br/>
              device brand: {modalInfo.devicebrand}<br/>
              innercarton: {modalInfo.innercarton}<br/>
              mastercarton: {modalInfo.mastercarton}<br/>
              delivery id: {modalInfo.deliveryid}<br/>
              package id: {modalInfo.pkgid}<br/>
              specs: {modalInfo.specs}<br/>
              status: {modalInfo.status}<br/>
              



              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</Button> 
                  {/* <Button className='btn btn-dark btn-sm' onClick={() => setCurrent(productDispatch, modalInfo._id)}>Edit</Button> */}
              </Modal.Footer>

          </Modal>

      )

      
     
  };





const toggleTrueFalse = () => {
  setShowModal(handleShow)
};


  function editBtn(row, rowEvents){ 

    return ( 
          < div 
              style={{ textAlign: "center",
                 cursor: "pointer",
                lineHeight: "normal" }}>
                   <Button className='btn btn-primary btn-sm'  onClick={() => setCurrent(productDispatch, rowEvents)}>Edit</Button>
              </div> 

     
); 
} 

const rowEvents = {
  onClick: (e, row) => {
    setModalInfo(row)
    toggleTrueFalse() 
    console.log(row)
     
  }
};


// const rowEvents=(e, row)=>{
//   console.log(row)
//   setModalInfo(row)
//   toggleTrueFalse() 
   
// }



const openModal = (row) => {
 setModalInfo(row)
  toggleTrueFalse()
    

};

function deleteBtn(e, row){ 

  return ( 
        < div 
            style={{ textAlign: "center",
               cursor: "pointer",
              lineHeight: "normal" }}>
                 <button className='btn btn-danger btn-sm' onClick={()=>openModal(row)}  >
          Delete
        </button>

       
            </div> 

   
); 
} 






      const onDelete = () => {
   
      deleteProduct(productDispatch, modalInfo._id);
      // clearCurrent(productDispatch);
    }; 






  
    return (
     
      
      <Fragment>
        
            {products !== null ? (
        
          <TransitionGroup>
            <BootstrapTable
            condensed
            striped
            hover
            keyField='_id'
            data={ products } 
            columns={ columns } 
            pagination={ paginationFactory() }
           
            filter={ filterFactory() }
           />
              
        
             

          </TransitionGroup> 
          
        ) : (
          <Spinner />
        )} 
        {show ? <ModalContent/> : null}
     </Fragment>
     
     
    );
  };
  
  export default Products;
  