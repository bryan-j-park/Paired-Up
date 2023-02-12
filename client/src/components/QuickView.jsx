/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, RadioGroup, Transition, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import ShoeContext from '../context/ShoeContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const QuickView = (props) => {
  const [open, setOpen] = useState(false)

  const [sizes, setSizes] = useState(props.shoeSizes);
  const [shoeSize, setShoeSize] = useState('');
  const [shoe, setShoe] = useState(props.shoe);

  const setItemsInCart = useContext(ShoeContext).setItemsInCart;
  const numInCart = useContext(ShoeContext).numInCart;
  const setNumInCart = useContext(ShoeContext).setNumInCart;

  useEffect(() => {
    setOpen(props.isOpen);
    setShoeSize(shoe.size[0]);
    setShoe({...shoe, quantity: 1, size: sizes[0]});
  }, [props.isOpen])

  const sizeHandler = (e) => {
    setShoeSize(e.target.id);
    setShoe({...shoe, size: e.target.id})
  }

  const addToCart = (e) => {
    e.preventDefault();
    let currentProducts = JSON.parse(sessionStorage.getItem('itemsInCart'));

    if(currentProducts !== null){
      for(let i in currentProducts){
        if(Object.values(currentProducts[i]).includes(shoe._id) && Object.values(currentProducts[i]).includes(shoe.size)){
          currentProducts[i].quantity++;
          sessionStorage.setItem('itemsInCart', JSON.stringify([...currentProducts]));
          sessionStorage.setItem('numInCart', numInCart + 1);
          const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
          setItemsInCart(updateItemsInCart);
          setNumInCart(sessionStorage.numInCart);
          return;
        }
      }
      sessionStorage.setItem('itemsInCart', JSON.stringify([...currentProducts, shoe]));
      sessionStorage.setItem('numInCart', numInCart + 1);
      const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
      setItemsInCart(updateItemsInCart);
    } else {
      sessionStorage.setItem('itemsInCart', JSON.stringify([shoe]));
      sessionStorage.numInCart = 1;
    }
    setNumInCart(sessionStorage.numInCart);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => props.quickView(props.idx)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img src={shoe.imgUrls[0]} alt={shoe.name} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                    <p className=" text-green">{shoe.categories[0]}</p>
                      <h2 className="text-xl font-medium text-gray-900 sm:pr-12">{shoe.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-1">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="font-medium text-gray-900">${shoe.price}</p>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-8">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>

                          {/* Size picker */}
                          <div className='flex items-center gap-3'>
                            <h2 className='font-medium'>Size:</h2>
                            <Menu as="div" className="relative inline-block text-left">
                                  <div>
                                      <Menu.Button className="group inline-flex justify-center text-md items-center font-medium text-gray-700 hover:text-gray-900">
                                          {shoeSize}
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
                                            {sizes?.map((size, sizeIdx) => (
                                              <Menu.Item key={size + sizeIdx} id={size}>
                                                  <p onClick={(e) => sizeHandler(e)} className='block px-4 py-2 text-sm cursor-pointer hover:bg-light-blue hover:text-white'>{size}</p>
                                              </Menu.Item>
                                            ))}
                                          </div>
                                      </Menu.Items>
                                  </Transition>
                              </Menu>
                          </div>

                          <button
                            type="submit"
                            className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-dark-blue py-3 px-8 text-base font-medium text-white hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={(e) => addToCart(e)}
                          >
                            Add to cart
                          </button>

                          <p className="absolute top-4 left-4 text-center sm:static sm:mt-8">
                            <a href={'/product/' + shoe._id} className="font-medium text-dark-blue hover:text-light-blue">
                              View full details
                            </a>
                          </p>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default QuickView;