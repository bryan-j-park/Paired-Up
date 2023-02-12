import { Fragment, useEffect, useState, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import ShoeContext from '../context/ShoeContext'
import { useAutoAnimate } from '@formkit/auto-animate/react'


const SlidingCart = (props) => {
  const [open, setOpen] = useState(props.loaded)
  const [subtotal, setSubtotal] = useState(0);

  const openCart = props.openCart;
  const itemsInCart = useContext(ShoeContext).itemsInCart;
  const setItemsInCart = useContext(ShoeContext).setItemsInCart;
  const numInCart = useContext(ShoeContext).numInCart;
  const setNumInCart = useContext(ShoeContext).setNumInCart;

  useEffect(() => {
    setOpen(props.loaded)
    let sum = 0;
    for(let i in itemsInCart){
      sum += itemsInCart[i].price * itemsInCart[i].quantity;
    }
    setSubtotal(sum);
  }, [props, itemsInCart])

  const closeCart = () => {
    setOpen(!open);
    openCart(false);
  }

  const removeFromCart = (e, idx) => {
    e.preventDefault();
    const quantity = itemsInCart[idx].quantity;
    itemsInCart.splice(idx, 1);
    setItemsInCart([...itemsInCart]);
    sessionStorage.setItem('itemsInCart', JSON.stringify([...itemsInCart]));
    sessionStorage.setItem('numInCart', numInCart - quantity);
    setNumInCart(numInCart - quantity);
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping Cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-green"
                            onClick={() => {
                                setOpen(!open)
                                openCart(false)
                            }}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {itemsInCart?.map((product, productIdx) => (
                              <li key={product._id + productIdx} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imgUrls[0]}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={`/product/${product._id}`}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.colors[0]}</p>
                                    <p className="mt-1 text-sm text-gray-500">Size: {product.size}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty: {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-dark-blue hover:text-light-blue"
                                        onClick={(e) => removeFromCart(e, productIdx)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          to="/cart"
                          className="flex items-center justify-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-light-blue"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          
                          <button
                            type="button"
                            className="font-medium text-dark-blue hover:text-light-blue"
                            onClick={() => {
                                setOpen(!open)
                                openCart(false)
                            }}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SlidingCart;