import React, { useEffect, useState } from 'react';
import "./Home.scss";
import Product from '../Products/Product';
import {  HashLoader } from "react-spinners";



export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  return (
    <>
    {loading ? (
        <div className="spinner">
          <HashLoader color="#176ae6" size={80} loading={loading} />
        </div>
      ) : (
    <div className="home">
       
        {/* <Aside /> */}
        <Product/>
    </div>
      )}
    </>
  )
}
