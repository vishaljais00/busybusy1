import { createContext, useContext, useEffect, useState } from "react";
import useUrl from "./customHook/urlHook";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "react-toastify";

const ItemContext = createContext();

function useValue() {
  const value = useContext(ItemContext);
  return value;
}

function CustomItemContext({ children }) {
  const { productData, setProductData, loading, error } = useUrl("https://fakestoreapi.com/products");
  const [signIn, setSignIn] = useState(localStorage.getItem('ref') ? true : false);
  const [email, setEmail] = useState("");
  const [refID, setRefID] = useState(localStorage.getItem('ref') || "");
  const [password, setPassword] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [amt, setAmt] = useState(8000);
  const [myorder, setMyOrder] = useState([])



  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${day} ${month} ${year} : ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return formattedDate;
  }
  
  
  const handleSignin = () => {
    if (signIn) {
      setSignIn(false);
      localStorage.removeItem('ref')
    }
  };

  const increaseQuantity = async(prod) => {
    const userCartRef = collection(db, "users", refID, "userCart")
    await updateDoc(doc(userCartRef, prod.id), {
      quantity: prod.quantity + 1,
    })
    toast.success("quantity added successfully")
  };

  const decreaseQuantity = async (itemId, quantity) => {

    if(quantity <= 1){
      toast.warn(" quantity cannot be less than one")
      return 
    }
    const userCartRef = collection(db, "users", refID, "userCart")
    await updateDoc(doc(userCartRef, itemId), {
      quantity: quantity - 1,
    });
    toast.success("quantity removed one")
  };

  const handleRemoveToCart = async(id, title) => {
    // Filter out the item from the cartItems array
    await deleteDoc(doc(db, "users", refID, "userCart", id));
    toast.success(`${title} remove to cart`);
  };

  const makeOrder = async() =>{
    const orderDate = Date.now()
    const orderRef = collection(db, "users", refID, "order")
    const res = await addDoc(orderRef, {
      date: orderDate,
      totalAmount: totalAmt,
    });
    const orderID = res.id;

    // make orderItems in the list 
    const orderCartRef = collection(db, "users", refID, "order", orderID, "orderCart")
    cartItems.map(async(item)=>{
      await addDoc(orderCartRef, {
        orderID: orderID,
        ...item
      });

      await deleteDoc(doc(db, "users", refID, "userCart", item.id));
    })

    // delete cart item
    toast.success(`ordeed successfully`);
  }

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.quantity * item.price;
      });
      return total;
    }; 

    setTotalAmt(calculateTotalAmount())
  }, [cartItems])
  


  return (
    <ItemContext.Provider
      value={{
        signIn,setSignIn,
        email, setEmail,
        password,setPassword,
        cartItems,setCartItems,
        totalAmt,setTotalAmt,
        amt,setAmt,
        myorder, setMyOrder,
        productData, setProductData, 
        loading, error,
        refID, setRefID,
        // below are function
        handleSignin,
        increaseQuantity,
        decreaseQuantity,
        handleRemoveToCart,
        makeOrder,
        formatTimestamp
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export { useValue, CustomItemContext };
