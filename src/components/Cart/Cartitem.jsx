import React from 'react'
import "./Cartitem.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useValue } from '../../Context'; 
;

export default function Cartitem({ title, id, price, image, quantity }) {

  const { handleRemoveToCart, increaseQuantity, decreaseQuantity} = useValue();

  return (
    <>
      <div className="cartitem">
        <img src={image} alt="" />
        <div className="productdetails">
          <p>{title}</p>
          <div className="price">
            <h2>&#8377; {price}</h2>
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png" alt="" onClick={ () => decreaseQuantity(id, quantity)}/>
            <div>{quantity}</div>
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png" alt="" onClick={ () => increaseQuantity({id, price, title , quantity})}/>
          </div>
        </div>
        <button onClick={()=>handleRemoveToCart(id, title)}>Remove From Cart</button>
      </div>
    </>
  );
}
