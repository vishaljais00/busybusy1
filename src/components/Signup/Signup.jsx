import React, { useState } from 'react';
import '../Signin/Signin.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name with the entered name
      await updateProfile(user, {
        displayName: name
      });

      // Save user information to Firebase Firestore
      await addDoc(collection(db, 'users'), {
        name,
        email,
      });

      // Redirect the user to a different page after successful signup
      navigate('/signin');
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <>
      <div className="signin">
        <form className="signin">
          <h2>Sign Up</h2>
          <input
            type="text"
            className="signininput"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            className="signininput"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="signininput"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="signingbtn" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
