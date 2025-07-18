import React from "react";
import "./app.css";
import Navbar from "./components/navbar/navbar.jsx";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import PlaceOrder from "./pages/placeorder/placeorder.jsx";
import Cart from "./pages/cart/cart.jsx";


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/placeorder" element={<PlaceOrder/>} />
            <Route path="/cart" element={<Cart/>} />

      </Routes>
        
      
    </div>
  );
};

export default App;
