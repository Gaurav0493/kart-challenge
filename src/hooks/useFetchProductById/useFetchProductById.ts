import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProductById= (productId: string) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`api/product ${productId ? `/${productId}` : ''}`);
        setProducts(data);
      } catch (err: unknown) {
        setError(true);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return { products, loading, error };
};

export default useFetchProductById;
