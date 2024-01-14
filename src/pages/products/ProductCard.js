import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faCartShopping, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ProductCounter from './ProductCounter';

export default function ProductCard({product, dispatch, cartContent, selected}) {
    const [isProductHovered, setIsProductHovered] = useState(false)
    return(
        <div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          onMouseEnter={()=>setIsProductHovered(true)}
          onMouseLeave={()=>setIsProductHovered(false)}
        >
          {/* Product Image */}
          <div className='relative'>
            <img
              src='https://via.placeholder.com/300x200'
              alt={product.productName}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            {
                !selected && 
                <button onClick={()=>dispatch({ type: 'added', payload: { id:product.id, count:1, name:product.productName } })} className={!isProductHovered ? 'hidden' : ' bg-white absolute bottom-5 left-16 text-center px-5 py-2 rounded-lg'}>
                    add to cart <FontAwesomeIcon icon={faCartShopping} className='ml-1' />
                </button>
            }
            {
                selected && 
                <ProductCounter
                    isProductHovered={isProductHovered} 
                    selected={selected} 
                    dispatch={dispatch}
                />
            }
          </div>
          {/* Product Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.productName}
          </h2>
          {/* Product Description */}
          <p className=" mb-3 text-sm text-gray-600">{product.productDescription}</p>
          {product.keySearch.map((word, index) => (
            <span
              key={index}
              className="rounded-full py-1 px-3 text-xs font-semibold bg-slate-500 text-slate-50 m-1"
            >
              <FontAwesomeIcon icon={faTags} />{' '}
              {word}
            </span>
          ))}
        </div>
    );
  }
// give me an array contains 10 objects looks like this:
// {
    // id : number
    // productName : ""
    // productDescription : ""
    // keySearch : ["",""]
    // productName : ""
    // productName : ""
// }