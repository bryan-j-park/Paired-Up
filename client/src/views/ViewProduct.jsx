import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ProductPage from "../components/ProductPage";

const ViewProduct = (props) => {

  return(
    <>
      <NavBar/>
      <ProductPage/>
      <Footer/>
    </>
  );
}

export default ViewProduct;