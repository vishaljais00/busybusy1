import React from 'react';
import "./Navbar.scss";
import { NavLink, Outlet } from 'react-router-dom';
import { useValue } from '../../Context';



export default function Navbar() {
    const { signIn,  handleSignin } = useValue();
    return (
        <>
            <div className="nav">
                <h3>BusyBusy Vishal</h3>
                <div className="right">
                    <img src="https://cdn-icons-png.flaticon.com/128/5856/5856840.png" alt="home" className='icon-style' />
                    <NavLink to="/" style={({ isActive }) => isActive ? { color: "blue" } : { color: "black" }}>
                        <span>Home</span>
                    </NavLink>

                    {signIn && (
                        <>
                            <img src="https://cdn-icons-png.flaticon.com/128/5643/5643764.png" alt="cart" className='icon-style' />
                            <NavLink to="/myorder" style={({ isActive }) => isActive ? { color: "blue" } : { color: "black" }}>
                                <span>Myorder</span>
                            </NavLink>
                        </>
                    )}

                    {signIn && (
                        <>
                            <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png" alt="cart" className='icon-style' />
                            <NavLink to="/cart" style={({ isActive }) => isActive ? { color: "blue" } : { color: "black" }}>
                                <span>Cart</span>
                            </NavLink>
                        </>
                    )}

                    <img src="https://cdn-icons-png.flaticon.com/128/9655/9655865.png" alt="signin" className='icon-style' />
                    <NavLink to="/signin" style={({ isActive }) => isActive ? { color: "blue" } : { color: "black" }}>
                        <span onClick={handleSignin}>{signIn ? "Log Out" : "Sign In"}</span>
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </>
    );
}
