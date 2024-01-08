import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const sortedProducts = Object.values(response.data.products).sort((a, b) => b.popularity - a.popularity);
        setProducts(sortedProducts);
        setLoading(false); // Set loading to false once products are fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {loading ? (
        <div className="loading-spinner">
          <HashLoader color={'#36D7B7'} loading={loading} size={50} />
        </div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.title}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Popularity: {product.popularity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
