import React from "react";
import NavBar from "../components/NavBar";
import ShoppingCart from "../components/ShoppingCart";
import Footer from "../components/Footer";

const ShoppingCartPage = (props) => {
  return(
    <div>
      <NavBar /> 
      <ShoppingCart />
      <Footer />
    </div>
  );
}

export default ShoppingCartPage;