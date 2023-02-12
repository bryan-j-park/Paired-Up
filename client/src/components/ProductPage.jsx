/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useState, useEffect, useContext, Fragment } from 'react'
import axios from 'axios'
import { Disclosure, RadioGroup, Tab, Menu, Transition } from '@headlessui/react'
import { StarIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import ShoeContext from '../context/ShoeContext'

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500', size: '6'},
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    // // More sections...
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductPage = (props) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [item, setItem] = useState({});
  const [sizes, setSizes] = useState([]);
  const [shoeSize, setShoeSize] = useState('');
  const { id } = useParams();
  const itemsInCart = useContext(ShoeContext).itemsInCart;
  const setItemsInCart = useContext(ShoeContext).setItemsInCart;
  const numInCart = useContext(ShoeContext).numInCart;
  const setNumInCart = useContext(ShoeContext).setNumInCart;

  useEffect(() => {
    axios.get('http://localhost:8000/api/shoe/' + id)
      .then(res => {
        console.log(res.data.imgUrls);
        setItem({...res.data, quantity: 1, size: res.data.size[0]});
        setSizes([...res.data.size]);
        setShoeSize(res.data.size[0]);
      })
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = (e) => {
    e.preventDefault();
    let currentProducts = JSON.parse(sessionStorage.getItem('itemsInCart'));

    if(currentProducts !== null){
      for(let i in currentProducts){
        if(Object.values(currentProducts[i]).includes(item._id) && Object.values(currentProducts[i]).includes(item.size)){
          currentProducts[i].quantity++;
          sessionStorage.setItem('itemsInCart', JSON.stringify([...currentProducts]));
          sessionStorage.setItem('numInCart', numInCart + 1);
          const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
          setItemsInCart(updateItemsInCart);
          setNumInCart(sessionStorage.numInCart);
          return;
        }
      }
      sessionStorage.setItem('itemsInCart', JSON.stringify([...currentProducts, item]));
      sessionStorage.setItem('numInCart', numInCart + 1);
      const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
      setItemsInCart(updateItemsInCart);
    } else {
      sessionStorage.setItem('itemsInCart', JSON.stringify([item]));
      sessionStorage.numInCart = 1;
    }
    setNumInCart(sessionStorage.numInCart);
  }

  const sizeHandler = (e) => {
    setShoeSize(e.target.id);
    setItem({...item, size: e.target.id})
  }

  return (
    <div className="bg-white lg:h-screen">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {item.imgUrls?.map((image) => (
                  <Tab
                    key={image}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only"> {image} </span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={image} alt="" className="h-full w-full object-cover object-center" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-green' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))} 
              </Tab.List> 
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {item.imgUrls?.map((image) => (
                <Tab.Panel key={image}>
                  <img
                    src={image}
                    alt={image}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            {item.categories ? <h4 className='text-green tracking-tight'>{item.categories[0]}</h4> : <p></p>}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${item.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>

            <form className="mt-6">
              <div className='flex items-center gap-3'>
                <h2 className='font-medium'>Size:</h2>
                <Menu as="div" className="relative inline-block text-left">
                      <div>
                          <Menu.Button className="group inline-flex justify-center items-center text-md font-medium text-gray-700 hover:text-gray-900">
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

              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-dark-blue py-3 px-8 text-base font-medium text-white hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  onClick={(e) => addToCart(e)}
                >
                  Add to cart
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {product.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(open ? 'text-dark-blue' : 'text-gray-900', 'text-sm font-medium')}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;