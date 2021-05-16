import React from 'react';
import Product from '../component/Product';
import data from '../data';

export default function HomeScreen() {
  return (
    <div className="row center">
    {
      data.product.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))
    }
  </div>  
  );
}
