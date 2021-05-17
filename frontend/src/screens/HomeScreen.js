import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../component/Product';
import MessageBox from '../component/MessageBox';
import LoadingBox from '../component/LoadingBox';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      } catch(err) {
        setError(err.message);
        setLoading(false);
      }
      
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading? (
        <LoadingBox></LoadingBox>
      ) : error? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <div className="row center">
        {
          products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))
        }
      </div>
      )}
      
  </div> 
  );
}
