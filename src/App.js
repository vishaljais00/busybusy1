import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import { useValue } from "./Context";
import Myorder from "./Myorder/Myorder";

function App() {
  const { signIn } = useValue();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signin"
            element={!signIn ? <Signin /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!signIn ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<Myorder />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
