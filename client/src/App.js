import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderSummary from './components/OrderSummary';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import SideBar from './components/SideBar';
import TrendingProduct from './components/TrendingProducts';
import ShoppingCartPage from './views/ShoppingCartPage';
import ShoeContext from './context/ShoeContext';
import ViewAllShoes from './views/ViewAllShoes';
import Home from './views/Home';
import SlidingCart from './components/SlidingCart';
import CheckoutPage from './views/CheckoutPage';
import { useState, useEffect } from 'react';
import AdminPage from './views/AdminPage';
import ViewProduct from './views/ViewProduct';

import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';

import About from './views/About';




function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [numInCart, setNumInCart] = useState(0);

  const [logged, setLogged] = useState("");
  const [user, setUser] = useState("");

  const [shippingInfo, setShippingInfo] = useState({})


  useEffect(() => {
    const updateNumInCart = JSON.parse(sessionStorage.getItem('numInCart'));
    setNumInCart(updateNumInCart);

    const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
    setItemsInCart(updateItemsInCart);
  }, [numInCart])

  return (
    <div className="App">
      <ShoeContext.Provider value={{itemsInCart, setItemsInCart, numInCart, setNumInCart, shippingInfo, setShippingInfo}}>
        <Routes>
          <Route element={ <Home /> } path="/" />
          <Route element={ <ViewProduct /> } path="/product/:id" />
          <Route element={ <ProductList />} path="/products" />
          <Route element={ <SideBar />} path="/sidebar" />
          <Route element={ <ShoppingCartPage /> } path="/cart" />
          <Route element={ <OrderSummary />} path="/summary" />
          <Route element={ <RegisterPage/> } path="/register"/>
          <Route element={ <LoginPage/> } path="/user/login"/>
          <Route element={ <ViewAllShoes/> } path="/shoe/view-all"/>
          <Route element={ <SlidingCart/> } path="/slide"/>
          <Route element={ <CheckoutPage/> } path="/checkout"/>
          <Route element={ <AdminPage/> } path="/admin"/>
          <Route element={ <About /> } path="/about" />
        </Routes>
      </ShoeContext.Provider>
    </div>
  );
}

export default App;
