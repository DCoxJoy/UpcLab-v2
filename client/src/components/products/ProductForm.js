import React, { useState, useEffect } from 'react';
import {
  addProduct,
  useProducts,
  updateProduct,
  clearCurrent
} from '../../context/product/ProductState';

const initialProduct = {
  productname: '',
  producttype: '',
  productline: '',
  devicetype: '',
  devicebrand: '',
  upc: '',
  innercarton: '',
  mastercarton: '',
  deliveryid: '',
  modelsku: '',
  pkgid: '',
  specs: '',
  status: '',
  type: 'active'
};

const ProductForm = () => {
  const [productState, productDispatch] = useProducts();

  const { current } = productState;

  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
    } else {
      setProduct(initialProduct);
    }
  }, [current]);

  const { productname, producttype, productline, devicetype, devicebrand, upc, innercarton, mastercarton, modelsku, pkgid, specs, status  } = product;

  const onChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addProduct(productDispatch, product).then(() =>
        setProduct(initialProduct)
      );
    } else {
      updateProduct(productDispatch, product);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(productDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Product' : 'Add Product'}
      </h2>
      <div className="row">
     <div className="form-group col-md-12">
      <input
        type='text'
        placeholder='Product Name'
        name='productname'
        value={productname}
        onChange={onChange}
        required
      />
      </div>
      </div>
      <div className="row">
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Product Type'
        name='producttype'
        value={producttype}
        onChange={onChange}
      />
      </div>
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Product Line'
        name='productline'
        value={productline}
        onChange={onChange}
      />
      </div>
      </div>
      <div className="row">
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Device Type'
        name='devicetype'
        value={devicetype}
        onChange={onChange}
      />
      </div>
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Device Brand'
        name='devicebrand'
        value={devicebrand}
        onChange={onChange}
      />
      </div>
      </div>
      <div className="row">
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='UPC Code'
        name='upc'
        value={upc}
        onChange={onChange}
        required
      />
      </div>
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Inner Carton'
        name='innercarton'
        value={innercarton}
        onChange={onChange}
      />
      </div>
      </div>
      <div className="row">
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Master Carton'
        name='mastercarton'
        value={mastercarton}
        onChange={onChange}
      />
      </div>
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='ModelSKU Number'
        name='modelsku'
        value={modelsku}
        onChange={onChange}
        required
      />
      </div>
      </div>
      <div className="row">
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Package Number'
        name='pkgid'
        value={pkgid}
        onChange={onChange}
      />
      </div>
      <div className="form-group col-md-6">
      <input
        type='text'
        placeholder='Size and Specs'
        name='specs'
        value={specs}
        onChange={onChange}
      />
      </div>
      </div>
      <h5>Product Status</h5>
      <input
        type='radio'
        name='status'
        value='active'
        checked={status === 'active'}
        onChange={onChange}
      />{' '}
      Active{' '}
      <input
        type='radio'
        name='status'
        value='eol'
        checked={status === 'eol'}
        onChange={onChange}
      />{' '}
      EOL
      <input
        type='radio'
        name='status'
        value='closed'
        checked={status === 'closed'}
        onChange={onChange}
      />{' '}
      Closed
      <div>
        <input
          type='submit'
          value={current ? 'Update Product' : 'Add Product'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ProductForm;