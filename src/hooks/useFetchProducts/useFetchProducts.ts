import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductType } from '../../common/types';

const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const options = { method: 'GET', headers: {api_key: 'apitest', Accept: '*' }, url: 'https://orderfoodonline.deno.dev/api/product' };
      try {
        const { data } = await axios.request(options);
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





