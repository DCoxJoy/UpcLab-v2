import React, { Fragment } from 'react';

// import PropTypes from 'prop-types';
import {
  useProducts,
  deleteProduct,
  setCurrent,
  clearCurrent
} from '../../context/product/ProductState';


const ProductItem = ({ product }) => {
  // we just need the product dispatch without state.
   const productDispatch = useProducts()[1];
   

   const { _id, productname, producttype, packgtype, productline, devicetype, devicebrand, upc, innercarton, mastercarton, modelsku, pkgid, specs, status } = product;

   
  // const onDelete = () => {
  //   deleteProduct(productDispatch, _id);
  //   clearCurrent(productDispatch);
  // };



  // return (
  //   <Fragment>
    
  //           <td>
  //           {productname}{' '}
  //         </td>
        
  //     {modelsku && (
  //         <td>
  //           {modelsku}
  //         </td>
  //       )}
  //       {upc && (
  //         <td>
  //           {upc}
  //         </td>
  //       )}
  //       {producttype && (
  //         <td>
  //           {producttype}
  //         </td>
  //       )}
  //       <td>

        
  //       <button
  //         className='btn btn-dark btn-sm'
  //         onClick={() => setCurrent(productDispatch, product)}
  //       >
  //         Edit
  //       </button>
       
  //         Delete
  //       </button> */
  //       </td>
     
  //   </Fragment>
  // );
};

// ProductItem.propTypes = {
//   product: PropTypes.object.isRequired
// };

export default ProductItem;
