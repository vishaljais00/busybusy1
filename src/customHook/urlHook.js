// useUrl.js
import { useState, useEffect } from 'react';

const useUrl = (url) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setProductData(jsonData.map((item)=>{
          item.price = Math.floor(item.price*80) 
          return item
        }));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { productData, setProductData, loading, error };
};

export default useUrl;
