import React from 'react';
import "./ProductItem.scss";
import { useValue } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, getDocs, query, where, doc, } from 'firebase/firestore';

export default function ProductItem({ item }) {
  const { signIn, refID } = useValue();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (signIn) {
      // check if sub collection exist or not 
      const userCartRef = collection(db, "users", refID, "userCart")
        const userCartRefSNapShot = await getDocs(userCartRef)

        if (!userCartRefSNapShot.empty) {
          // find item in cart 
          const q = await query(userCartRef, where("title", "==", item.title));
          const querySnapshot = await getDocs(q);
          if(querySnapshot.empty){
            // add product in cart
            await addDoc(userCartRef, {
              title: item.title,
              price: item.price,
              image: item.image,
              quantity:  1,
            });
          
            toast.success("Product added in cart")
          }else{
            // if exist update quantity
              querySnapshot.forEach(async(docData) => {
               await updateDoc(doc(userCartRef, docData.id), {
                quantity: docData.data().quantity + 1,
            });
            })
            toast.success(`${item.title.slice(0,20)} quantity updated to cart`)
          }
        } else {

          try {
              await addDoc(userCartRef, {
                title: item.title,
                price: item.price,
                image: item.image,
                quantity:  1,
              });
              toast.success(`${item.title.slice(0,20)} added to cart`);
            } catch (error) {
              console.error('Error adding item to cart:', error);
              toast.error('Failed to add item to cart');
            }
        }

     
    } else {
      navigate('/signin');
    }
  };

  return (
    <>
      <div className="productItem">
        <img src={item.image} alt="productimg" />
        <p>{item.title}</p>
        <h3>&#8377; {item.price}</h3>
        <button className="btn" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </>
  );
}
