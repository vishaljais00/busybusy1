import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import './Product.scss';
import Aside from '../Aside/Aside';
import { useValue } from '../../Context';
import { ClockLoader,  } from 'react-spinners';


export default function Product() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { amt, productData, loading } = useValue();
  

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
  }

  return (
    <>
      <div className="home">
        <input
          type="text"
          className="searchinput"
          placeholder="Search By Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="product">
        <Aside applyFilters={applyFilters} />
        {loading ? ( 
          <div className="spinner">
          <ClockLoader  color="#176ae6" size={80} loading={loading} />
          </div>
        ) : (
          productData
            .filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                item.price <= amt &&
                (selectedFilters.length === 0 ||
                  selectedFilters.includes(item.category))
            )
            .map((item) => <ProductItem item={item} key={item.id} />)
        )}
      </div>
    </>
  );
}
