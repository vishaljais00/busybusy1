import React, { useState } from 'react';
import "./Aside.scss";
import { useValue } from '../../Context';

export default function Aside({ applyFilters }) {
  const { amt, setAmt} = useValue();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setAmt(newPrice);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedFilters(prevFilters => [...prevFilters, name]);
    } else {
      setSelectedFilters(prevFilters => prevFilters.filter(filter => filter !== name));
    }
  };

  // Call applyFilters function whenever filters change
  React.useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters, applyFilters]);

  return (
    <>
      <div className="aside">
        <h2>Filter</h2>
        <form action="">
          <label htmlFor="price">
            Price: {amt}
          </label>
          <input
            type="range"
            className="filter"
            name="price"
            min={1}
            max={100000}
            step={100}
            value={amt}
            onChange={handlePriceChange}
          />
          <h2>Category</h2>
          <div className="category">
            <div>
              <input
                type="checkbox"
                name="men's clothing"
                checked={selectedFilters.includes("men's clothing")}
                onChange={handleFilterChange}
              />
              <label htmlFor="mensFashion">Mens Clothing</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="women's clothing"
                checked={selectedFilters.includes("women's clothing")}
                onChange={handleFilterChange}
              />
              <label htmlFor="womensFashion">Women's Clothing</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="jewelery"
                checked={selectedFilters.includes("jewelery")}
                onChange={handleFilterChange}
              />
              <label htmlFor="jewelery">Jewelry</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="electronics"
                checked={selectedFilters.includes("electronics")}
                onChange={handleFilterChange}
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
