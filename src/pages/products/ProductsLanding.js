import React, { useContext, useEffect, useState } from 'react';
import './ProductsLanding.css'
import { useAuth } from 'context/AuthContext';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CartContext, CartDispatchContext } from 'context/CartContext';
import ProductCard from './ProductCard';
import Menu from 'components/Menu/LandingMenu';
import { useTranslation } from 'react-i18next';
const productsArray = [
  {
    id: 1,
    productName: "Product 1",
    productDescription: "Description for Product 1",
    keySearch: ["keyword1", "keyword2"]
  },
  {
    id: 2,
    productName: "Product 2",
    productDescription: "Description for Product 2",
    keySearch: ["keyword3", "keyword4"]
  },
  {
    id: 3,
    productName: "Product 3",
    productDescription: "Description for Product 3",
    keySearch: ["keyword5", "keyword6"]
  },
  {
    id: 4,
    productName: "Product 4",
    productDescription: "Description for Product 4",
    keySearch: ["keyword7", "keyword8"]
  },
  {
    id: 5,
    productName: "Product 5",
    productDescription: "Description for Product 5",
    keySearch: ["keyword9", "keyword10"]
  },
  {
    id: 6,
    productName: "Product 6",
    productDescription: "Description for Product 6",
    keySearch: ["keyword11", "keyword12"]
  },
  {
    id: 7,
    productName: "Product 7",
    productDescription: "Description for Product 7",
    keySearch: ["keyword13", "keyword14"]
  },
  {
    id: 8,
    productName: "Product 8",
    productDescription: "Description for Product 8",
    keySearch: ["keyword15", "keyword16"]
  },
  {
    id: 9,
    productName: "Product 9",
    productDescription: "Description for Product 9",
    keySearch: ["keyword17", "keyword18"]
  },
  {
    id: 10,
    productName: "Product 10",
    productDescription: "Description for Product 10",
    keySearch: ["keyword19", "keyword20"]
  }
];

function ProductsHomePage() {
  const {t} = useTranslation('common')
  const [products, setProducts] = useState(productsArray)
  const [searchInput, setSearchInput] = useState('');
  const [filterCriteria, setFilterCriteria] = useState(''); 
  const dispatch = useContext(CartDispatchContext)
  const cartContent = useContext(CartContext)
  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle filter criteria change
  const handleFilterCriteriaChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  // Filter products based on search input and filter criteria
  const filteredProducts = products.filter((product) => {
    const productNameMatches = product.productName.toLowerCase().includes(searchInput.toLowerCase());
    // const filterCriteriaMatches = product.keySearch.toLowerCase().includes(filterCriteria.toLowerCase());

    // You can customize your filtering logic here
    return productNameMatches;
  });
  

  // useEffect(() => {
  //   axios.post(`${process.env.REACT_APP_BASE_URL}/ProductAsync/GetDataPagedPublished`, {
  //     headers: {
  //       "Content-Type": "application/json",

  //     },
  //   }).then(res => {

  //     setTimeout(() => {
  //       setProducts(res.data);

  //     }, 1000);
  //   }).catch((err) => console.log(err.message))
  // }, [])

  return (
    <div className=" bg-neutral-50 min-h-screen">
      {/* Menu Bar */}
      <Menu  
        siteName={'AlpinaCommerce'} 
        handleSearchInputChange={handleSearchInputChange} 
        searchInput={searchInput} 
      />

      {/* Header Animation */}
        <div
          className='mt-7 text-center backgroundimage'
        >
          <h1 className=" z-50 text-white absolute left-72 top-32 text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 pt-10 animate-fade-in-header">
            {t('wellcome.title',{framework:process.env.REACT_APP_NAME})}
          </h1>
          <p className=" z-50 text-lg md:text-xl lg:text-2xl text-white absolute  left-72 top-64 mb-8 animate-fade-in-subheader">
            {t('appDescription')}
          </p>
        </div>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mt-8 text-center">
          {t('products')}
        </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8 lg:p-12">
      
        {products.length === 0 ? (
          // Render skeleton loading placeholders when products are empty
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <Skeleton height={200} />
              <Skeleton height={20} width={150} style={{ marginTop: '10px' }} />
              <Skeleton height={16} width={200} style={{ marginTop: '6px' }} />
              <Skeleton height={16} width={120} style={{ marginTop: '6px' }} />
            </div>
          ))
        ) : (
          // Render actual product data when available
          filteredProducts.map((product) => (
            
            <ProductCard
              key={product.id}
              product={product}
              dispatch={dispatch}
              selected={
                cartContent.find((obj)=>obj.id===product.id)
                ??
                false
              }
            />

          ))
        )}
      </div>
     
    </div>
  );
}

export default ProductsHomePage;
