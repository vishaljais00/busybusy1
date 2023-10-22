import React, { useEffect, useState } from 'react';
import "./Myorder.scss";
import { useValue } from '../Context';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { HashLoader } from 'react-spinners';

export default function Myorder() {
  const {myorder, formatTimestamp, refID, setMyOrder} = useValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true)
    const orderRef = collection(db, "users", refID, "order");
  
    const unsubscribe = onSnapshot(orderRef, (snapshot) => {
      const orderArr = snapshot.docs.map((doc) => {
        const OrderCartRef = collection(db, "users", refID, "order", doc.id, "orderCart");
        return getDocs(OrderCartRef) // Return the promise for the next step
          .then((snapshot) => {
            const orderCartArr = snapshot.docs.map((cartDoc) => {
              return {
                id: cartDoc.id,
                ...cartDoc.data(),
              };
            });
  
            return {
              id: doc.id,
              ...doc.data(),
              cartItem: orderCartArr,
            };
          });
      });
  
      Promise.all(orderArr).then((completedOrderArr) => {
        setMyOrder(completedOrderArr);
      });
      setLoading(false)
    });
  
    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, [refID, setMyOrder]);
  

  return (
    <>
         {loading ? 
      <div className="spinner">
        <HashLoader color="#176ae6" size={80} loading={loading} />
      </div>
     :  
     <div className="myorder">
     <h1>Your Order</h1>
     {myorder.length > 0 ? (
       myorder?.map((obj, j) => (
         <div className="orderdetails" key={j}>
           <h2>Ordered On: {formatTimestamp(obj.date)}</h2>
           <table>
             <thead>
               <tr>
                 <th>Title</th>
                 <th>Price</th>
                 <th>Quantity</th>
                 <th>Total Price</th>
               </tr>
             </thead>
             <tbody>
               {obj?.cartItem?.map((item) => (
                 <tr key={item.id}>
                   <td>{item.title}</td>
                   <td>${item.price}</td>
                   <td>{item.quantity}</td>
                   <td>${item.price * item.quantity}</td>
                 </tr>
               ))}
             </tbody>
             <tfoot className="totalFoot">
               <tr>
                 <td colSpan={3}>Total Amount</td>
                 <td>${obj.totalAmount}</td>
               </tr>
             </tfoot>
           </table>
         </div>
       ))
     ) : (
       <h1 className="noorder">No orders yet 😊😊</h1>
     )}
   </div>
   
      }
    </>
  );
}
