import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PRODUCT,
  FILTER_PRODUCTS,
  CLEAR_PRODUCTS,
  CLEAR_FILTER,
  PRODUCT_ERROR
} from '../types';

// Create a custom hook to use the product context

export const useProducts = () => {
  const { state, dispatch } = useContext(ProductContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux but they remain here for ease of students transitioning

// Get Products
export const getProducts = async (dispatch) => {
    try {
      const res = await axios.get('/api/products');
  
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.msg
      });
    }
  };
  
  // Add Product
export const addProduct = async (dispatch, product) => {
    try {
      const res = await axios.post('/api/products', product);
  
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.msg
      });
    }
  };
  
  // Delete Product
export const deleteProduct = async (dispatch, id) => {
    try {
      await axios.delete(`/api/products/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Product
export const updateProduct = async (dispatch, product) => {
    try {
      const res = await axios.put(`/api/products/${product._id}`, product);
  
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Products
export const clearProducts = (dispatch) => {
    dispatch({ type: CLEAR_PRODUCTS });
  };
  
  // Set Current Product
  export const setCurrent = (dispatch, product) => {
    dispatch({ type: SET_CURRENT, payload: product });
  };
  
  // Clear Current Product
  export const clearCurrent = (dispatch) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Products
export const filterProducts = (dispatch, text) => {
    dispatch({ type: FILTER_PRODUCTS, payload: text });
  };
  
  // Clear Filter
  export const clearFilter = (dispatch) => {
    dispatch({ type: CLEAR_FILTER });
  };
  
  const ProductState = (props) => {
    const initialState = {
      products: null,
      current: null,
      filtered: null,
      error: null
    };
  
    const [state, dispatch] = useReducer(productReducer, initialState);
  
    return (
      <ProductContext.Provider value={{ state: state, dispatch }}>
        {props.children}
      </ProductContext.Provider>
    );
  };
  
  export default ProductState;