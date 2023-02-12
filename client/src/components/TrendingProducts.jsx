// const products = [
//   {
//     id: 1,
//     name: 'Leather Long Wallet',
//     color: 'Natural',
//     price: '$75',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
//     imageAlt: 'Hand stitched, orange leather long wallet.',
//   },
// ]

import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import QuickView from "./QuickView";

const TrendingProduct = (props) => {
  const [hoverIdx, setHoverIdx] = useState([]);
  const [quickViewIdx, setQuickViewIdx] = useState([]);
  const [shoes, setShoes] = useState([]);

  {/* will show the first four shoes in db */}
  
//   useEffect(() => {
//       axios.get('http://localhost:8000/api/shoes')
//           .then(res => {
//               const allShoes = res.data.shoes;
//               setShoes(allShoes);
//           })
//           .catch(err => console.log(err))
//   }, [])

  {/* will show first four products with 'Featured' as one of the catgory names */}

  useEffect(() => {
    axios.get('http://localhost:8000/api/shoes')
        .then(res => {
            console.log(res.data.shoes)
            const hoverArr = [];
            const allShoes = res.data.shoes;
            const filteredShoes = [];
            for(let i = 0; i < res.data.shoes.length; i++) {
                if(allShoes[i].categories.includes("Featured")){
                    filteredShoes.push(allShoes[i])
                    hoverArr.push(false);
                }
            }
            setShoes(filteredShoes);
            setHoverIdx([...hoverArr]);
            setQuickViewIdx([...hoverArr]);
        })
        .catch(err => console.log(err))
  }, [])

  const hover = (i) => {
    hoverIdx[i] = !hoverIdx[i]
    setHoverIdx([...hoverIdx]);
  }

  const quickView = (i) => {
    // e.preventDefault();
    quickViewIdx[i] = !quickViewIdx[i];
    setQuickViewIdx([...quickViewIdx]);
    console.log('is it working?')
    console.log(quickViewIdx);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {shoes.map((product, i) => (
            <div key={i}>
              <div onMouseOver={() => hover(i)} onMouseOut={() => hover(i)} className="relative">
                <Link to={"/product/" + product._id} className="group relative">
                  <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={product.imgUrls[0]}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </Link>
                {hoverIdx[i] === true ? 
                  <button onClick={() => quickView(i)} className=' absolute z-10 bottom-5 left-9 p-3 bg-dark-blue text-white w-3/4 rounded-lg hover:bg-light-blue'>Quick View</button> 
                  : ''}
              </div>
              <Link to={'/product/' + product._id}>
                <h3 className="mt-4 text-sm font-medium text-gray-700">
                    {product.name}
                </h3>
                <p className="mt-1 text-sm text-green">{product.categories[0]}</p>
                <p className="mt-1 text-md font-medium text-dark-blue">${product.price}</p>
              </Link>
              {<QuickView 
                  quickView={quickView}
                  isOpen={quickViewIdx[i] ? quickViewIdx[i] = false : quickViewIdx[i] = true} 
                  idx={i}
                  shoe={product}
                  shoeSizes={product.size}
                  />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendingProduct;