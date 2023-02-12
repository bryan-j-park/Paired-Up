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
import React, { useEffect, useState, useContext } from "react";
import ShoeContext from '../context/ShoeContext';
import { 
  PaymentElement, 
  LinkAuthenticationElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";
import '../App.css';
import { Link } from 'react-router-dom'

const products = [
  {
    id: 1,
    name: 'High Wall Tote',
    href: '#',
    price: '$210.00',
    color: 'White and black',
    size: '15L',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
  },
  // More products...
]

const Checkout = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const itemsInCart = useContext(ShoeContext).itemsInCart;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [residentState, setResidentState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const paymentElementOptions = { layout: 'tabs'};

  useEffect(() => {
    updateCartTotal(itemsInCart);
    if(!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if(!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        switch (paymentIntent.status){
          case "succeeded" :
            setMessage("Payment succeeded!");
            break;
          case "processing" :
            setMessage("Payment processing!");
            break;
          case "requires_payment_method" :
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
              setMessage("Something went wrong.");
              break;
        }
      });
  }, [])

  const updateCartTotal = (products) => {
    let sum = 0;
    for(let item in products){
      sum += products[item].price * products[item].quantity;
    }
    setSubtotal(sum.toFixed(2));

    const taxEstimate = sum * 0.05;
    setTaxes(taxEstimate.toFixed(2));

    const tempTotal = sum + taxEstimate + 5
    setTotal(tempTotal.toFixed(2));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    sessionStorage.setItem('shippingInfo', JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      city: city,
      state: residentState,
      zip: zipCode
    }))

    if(!stripe || !elements){
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements, 
      confirmParams: {
        return_url: "http://localhost:3000/summary",
        receipt_email: email
      }
    });
    
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="fixed top-0 right-0 hidden h-full w-1/2 bg-dark-blue lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-dark-blue py-12 text-white md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <dl>
              <dt className="text-sm font-medium">Amount due</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-white">${total}</dd>
            </dl>

            <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
              {itemsInCart.map((product, idx) => (
                <li key={product.id + idx} className="flex items-start space-x-4 py-6">
                  <img
                    src={product.imgUrls[0]}
                    alt={product.imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{product.name}</h3>
                    <p>{product.colors[0]}</p>
                    <p>Size: {product.size}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                  <p className="flex-none text-base font-medium text-white">${product.price}</p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>${subtotal}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd>$5.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Taxes</dt>
                <dd>${taxes}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${total}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
          </h2>

          <div className="border-b border-gray-200 py-6 text-left max-w-2xl mx-auto mb-6">
                <Link to={"/cart"} className="text-sm font-medium text-dark-blue hover:text-light-blue">
                  <span aria-hidden="true"> &larr; </span>
                  Back to Cart
                </Link>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
              <div>
                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                  Contact information
                </h3>
                <LinkAuthenticationElement
                  id="link-authentication-element"
                  onChange={(e) => setEmail(e.value.email)}
                  className="mt-6"
                />
                <div className="mt-6">
                  <PaymentElement id="payment-element" options={paymentElementOptions}/>
                </div>
              </div>

            <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>

                <div>
                    <label htmlFor="firstName" className="block text-md text-md text-gray-700 font-normal mt-6">
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mt-6 block text-md text-md text-gray-700 font-normal">
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>
                  </div>
                
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-md text-md text-gray-700 font-normal">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-2.5"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-md text-md text-gray-700 font-normal">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-md text-md text-gray-700 font-normal">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="region"
                        name="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                        onChange={(e) => setResidentState(e.target.value)}
                        value={residentState}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-md text-md text-gray-700 font-normal">
                      ZIP
                    </label>
                    <div className="mt-1">
                      <input
                        style={{border: '1px solid #e6e6e6'}}
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md shadow-sm outline-light-blue/50 outline-offset-2 focus:border-green focus:ring-green sm:text-md p-3"
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Billing information</h3>

                <div className="mt-6 flex items-center">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-dark-blue focus:ring-green"
                  />
                  <div className="ml-2">
                    <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                      Same as shipping information
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  id="submit"
                  type="submit"
                  className="rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-gray-50"
                  disabled={isLoading || !stripe || !elements}
                >
                  <span id="button-text">
                    {isLoading ? <div className=" spinner" id=" spinner"></div> : "Pay now"}
                  </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Checkout;
