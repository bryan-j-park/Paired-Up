import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Navbar from '../components/NavBar'
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';


const ViewAllShoes = () => {

    return(
        <div>
            <Navbar/>
            <SideBar/>
            {/* {loaded && <ProductList allShoes={allShoes}/>} */}
            <Footer />
        </div>
    );
}

export default ViewAllShoes;