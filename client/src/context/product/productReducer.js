import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_PRODUCT,
    FILTER_PRODUCTS,
    CLEAR_FILTER,
    PRODUCT_ERROR,
    CLEAR_PRODUCTS
  } from '../types';
  
  const productReducer = (state, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          products: action.payload
        };
      case ADD_PRODUCT:
        return {
          ...state,
          products: [action.payload, ...state.products]
        };
      case UPDATE_PRODUCT:
        return {
          ...state,
          products: state.products.map((product) =>
            product._id === action.payload._id ? action.payload : product
          )
        };
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(
            (product) => product._id !== action.payload
          )
        };
      case CLEAR_PRODUCTS:
        return {
          ...state,
          products: null,
          filtered: null,
          error: null,
          current: null
        };
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null
        };
      case FILTER_PRODUCTS:
        return {
          ...state,
          filtered: state.products.filter(({ upc, producttype, modelsku, devicetype }) => {
            const testString = `${upc}${producttype}${modelsku}${devicetype}`.toLowerCase();
            return testString.includes(action.payload.toLowerCase());
          })
        };
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null
        };
      case PRODUCT_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        throw new Error(`Unsupported type of: ${action.type}`);
    }
  };
  
  export default productReducer;
  