import React, { useEffect, useState } from 'react'
import Cartitem from './Cartitem'
import "./Cart.scss";
import { useValue } from '../../Context';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { HashLoader } from 'react-spinners';


export default function Cart() {
  const { cartItems, setCartItems, totalAmt, refID, makeOrder } = useValue();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlepurchase = ()=>{
    makeOrder()
    navigate('/myorder');
  }


  useEffect(() => {
    setLoading(true)
    const userCartRef = collection(db, "users", refID, "userCart")
    onSnapshot(userCartRef, (snapshot)=>{
      const cartItemArr = snapshot.docs.map((doc)=>{
          return{
              id: doc.id,
              ...doc.data()
          }
      })

      setCartItems(cartItemArr)
      setLoading(false)
  })
  }, [refID, setCartItems])
  
  
  return (
    <>
         {loading ? 
      <div className="spinner">
        <HashLoader color="#176ae6" size={80} loading={loading} />
      </div>
     : 
    <>  
    {cartItems.length >0 ? (
      <div className="cartaside">
        <h3>TotalPrice &#8377; {totalAmt}/-</h3>
        <Link to="/myorder">
        <button className="purchasebtn"onClick={handlepurchase} >Purchase</button>
        </Link>
      </div>
      ):""}
      <div className="cart">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Cartitem key={item.id} title={item.title} image={item.image} price={item.price} id={item.id} quantity={item.quantity} />
          ))
        ) : (
          <p className='empty'>Your cart is empty😊😊</p>
        )}
      </div>
    </>
    }
    </>
 
  )
}
