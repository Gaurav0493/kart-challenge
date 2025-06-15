import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductType } from '../../common/types';

const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api/product' 
  : 'https://orderfoodonline.deno.dev/api/product';

const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setProducts(data);
      } catch (err: unknown) {
        setError(true);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;





