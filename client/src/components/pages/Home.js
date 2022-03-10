import React,{useState} from 'react';


import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import ProductFilter from '../products/ProductFilter';

const Home = () => {
    const [show, setShow] = useState(false);

  return (   
    <div>
      <div>
      <button onClick={() => setShow(prev => !prev)}>Show Form</button>
        {show && <div>
          
          <ol>
          <li>To add a product to the upc tracker fill in the form with information and click add product button.</li>
          <li>To edit an existing upc product select the edit button from the list of products  on the right and that will populate 
          the form with the information you selected. </li>
          <li>Make necessary edits and press update product button to save changes.</li>
        </ol>
       <hr></hr>
        <ProductForm />
          
          </div>}

      </div>
      <div>
       {/* <ProductFilter/> */}
        <Products />
      </div>

    


    </div>
  );
};

export default Home;
