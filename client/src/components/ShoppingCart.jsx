/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ShoeContext from '../context/ShoeContext';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Dialog, RadioGroup, Transition, Menu } from '@headlessui/react'
import { StarIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const ShoppingCart = (props) => {
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const products = useContext(ShoeContext).itemsInCart;
  const numInCart = useContext(ShoeContext).numInCart;
  const setNumInCart = useContext(ShoeContext).setNumInCart;
  const itemsInCart = useContext(ShoeContext).itemsInCart;
  const setItemsInCart = useContext(ShoeContext).setItemsInCart;
  const [animate] = useAutoAnimate();
  const [shoeQuantity, setShoeQuantity] = useState('');

  const quantity = [1,2,3,4,5,6,7,8]

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem('itemsInCart'))
    updateCartTotal(cart);
  }, [])

  const updateCartTotal = (arr) => {
    let sum = 0;
    for(let item in arr){
      sum += arr[item].price * arr[item].quantity;
    }
    setSubtotal(sum.toFixed(2));

    const taxEstimate = sum * 0.05;
    setTaxes(taxEstimate.toFixed(2));

    const tempTotal = sum + taxEstimate + 5
    setTotal(tempTotal.toFixed(2));
  }

  const onChangeCartSelect = (e, idx) => {
    const oldQuantity = products[idx].quantity;
    const newQuantity = e.target.id;
    products[idx].quantity = newQuantity;

    sessionStorage.setItem('itemsInCart', JSON.stringify([...products]));
    if(newQuantity >= oldQuantity){
      sessionStorage.setItem('numInCart', numInCart + (newQuantity - oldQuantity));
      setNumInCart(numInCart + newQuantity - 1);
    } else {
      sessionStorage.setItem('numInCart', numInCart - (oldQuantity - newQuantity));
      setNumInCart(numInCart - (oldQuantity - newQuantity));
    }
    updateCartTotal(itemsInCart);
  }

  const removeFromCart = (e, idx) => {
    e.preventDefault();
    const quantity = itemsInCart[idx].quantity;
    itemsInCart.splice(idx, 1);
    setItemsInCart([...itemsInCart]);
    sessionStorage.setItem('itemsInCart', JSON.stringify([...itemsInCart]));
    sessionStorage.setItem('numInCart', numInCart - quantity);
    setNumInCart(numInCart - quantity);
    updateCartTotal(itemsInCart);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
  } 

  return (
    <div className="bg-white h-screen">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-dark-blue sm:text-4xl">Shopping Cart</h1>
        <form onSubmit={onSubmitHandler} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul ref={animate} role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imgUrls[0]}
                      alt={product.name + productIdx}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={'/product/' + product.id} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.colors[0]}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Size: {product.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>

                        <Menu as="div" className="relative inline-block text-left">
                                  <div>
                                      <Menu.Button className="group inline-flex justify-center text-md items-center font-medium text-gray-700 hover:text-gray-900">
                                          {product.quantity}
                                          <ChevronDownIcon
                                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-green"
                                              aria-hidden="true"
                                          />
                                      </Menu.Button>
                                  </div>

                                  <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                  >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <div className="py-1">
                                            {quantity?.map((quantity, quantityIdx) => (
                                              <Menu.Item key={quantity + quantityIdx} id={quantity}>
                                                  <p onClick={(e) => onChangeCartSelect(e, productIdx)} className='block px-4 py-2 text-sm cursor-pointer hover:bg-light-blue hover:text-white'>{quantity}</p>
                                              </Menu.Item>
                                            ))}
                                          </div>
                                      </Menu.Items>
                                  </Transition>
                              </Menu>

                        <div className="absolute top-0 right-0">
                          <button type="button" onClick={(e) => removeFromCart(e, productIdx)} className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600  ">
                  <span>Tax estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${ taxes }</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${ total }</dd>
              </div>
            </dl>

            <div className="mt-6">
                <Link to='/checkout'>
                <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-dark-blue py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-gray-50"
                >Checkout</button>
                </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default ShoppingCart;