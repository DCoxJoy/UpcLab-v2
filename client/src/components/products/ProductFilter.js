import React from 'react';
import {
  useProducts,
  filterProducts,
  clearFilter
} from '../../context/product/ProductState';

const ProductFilter = () => {
  // we just need the product dispatch without state.
  const productDispatch = useProducts()[1];

  const onChange = (e) => {
    if (e.target.value !== '') {
      filterProducts(productDispatch, e.target.value);
    } else {
      clearFilter(productDispatch);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type='text' placeholder='Filter Products...' onChange={onChange} />
    </form>
  );
};

export default ProductFilter;