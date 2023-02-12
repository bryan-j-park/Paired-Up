import {useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import ShoeContext from '../context/ShoeContext';
import summary from '../images/summary3.jpg';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$36.00',
    color: 'Charcoal',
    size: 'L',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg',
    imageAlt: "Model wearing men's charcoal basic tee in large.",
  },
  // More products...
]

const OrderSummary = (props) => {
  const [itemsInOrder, setItemsInOrder] = useState([]);
  const [taxes, setTaxes] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({})

  const itemsInCart = useContext(ShoeContext).itemsInCart;
  const setItemsInCart = useContext(ShoeContext).setItemsInCart;
  const setNumInCart = useContext(ShoeContext).setNumInCart;
  const sessionShippingInfo = JSON.parse(sessionStorage.getItem('shippingInfo'))
  const sessionItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'))

  useEffect(() => {
    orderTotal(sessionItemsInCart);
    setItemsInOrder([...sessionItemsInCart])
    setShippingInfo({...sessionShippingInfo})
    sessionStorage.clear();
  }, [])

  const orderTotal = (products) => {
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

  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src={summary}
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-green">Payment successful!</h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering!</p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order! Hang tight while we process it and we’ll send you a confirmation
                very soon!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Tracking number</dt>
                <dd className="mt-2 text-green">51547878755545848512</dd>
              </dl>

              <ul
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                {itemsInOrder.map((product, idx) => (
                  <li key={product.id + idx} className="flex space-x-6 py-6">
                    <img
                      src={product.imgUrls[0]}
                      alt={product.imageAlt}
                      className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <a href={'/product/' + product.id}>{product.name}</a>
                      </h3>
                      <p>{product.colors[0]}</p>
                      <p>Size: {product.size}</p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">${product.price}</p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">${subtotal}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">$5.00</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">${taxes}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">${total}</dd>
                </div>
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">Shipping Address</dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">{`${shippingInfo.firstName} ${shippingInfo.lastName}`}</span>
                      <span className="block">{shippingInfo.address}</span>
                      <span className="block">{`${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`}</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Payment Information</dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                    <div className="flex-none">
                      <svg
                        aria-hidden="true"
                        width={36}
                        height={24}
                        viewBox="0 0 36 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-auto"
                      >
                        <rect width={36} height={24} rx={4} fill="#224DBA" />
                        <path
                          d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                          fill="#fff"
                        />
                      </svg>
                      <p className="sr-only">Visa</p>
                    </div>
                    <div className="flex-auto">
                      <p className="text-gray-900">Ending with 4242</p>
                      <p>Expires 12 / 23</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link to={"/"} className="text-sm font-medium text-dark-blue hover:text-light-blue">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default OrderSummary;