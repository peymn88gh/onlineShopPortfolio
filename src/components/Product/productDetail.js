import { faArrowLeft, faBox, faBoxesPacking, faCheck, faCubes, faDollarSign, faMapMarkerAlt, faRulerCombined, faTruck, faWeight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { CartContext, CartDispatchContext } from "context/CartContext";
import Cookies from "js-cookie";
import ProductCounter from "pages/products/ProductCounter";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
    const {productId} = useParams()
    const dispatch = useContext(CartDispatchContext)
    const cartContent = useContext(CartContext)
    console.log(productId);
    useEffect(()=>{
        // axios.get(`${process.env.REACT_APP_BASE_URL}/ProductDetailAsync/GetById?Id=${productId}`,{
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${Cookies.get('token')}`,
        //     }
        // })
    },[])
    
    const product = {
        productId: 1,
        userId: 1,
        title: "Product detail First",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        addressId: 1,
        availableQuantity: 0,
        soldOut: 0,
        price: 22.1,
        length: 10,
        height: 25,
        width: 124,
        weight: 20,
        unit: "Kg",
        orderdetail: [],
        id: 3,
        status: 1,
      };
    return (
        <>
        <div className="m-4">
        <Link
        // to={window.history.back}
          onClick={()=>window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 transition ease-in-out"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 mr-2" />
          Back
        </Link>
      </div>
        <article id="productdetail" className="grid md:grid-cols-3 gap-4 mt-4 p-4">
{/*          
          <section className="md:order-2 grid h-screen">
            <div className="md:col-span-2 text-justify p-1" >
                <h1 className="text-2xl font-bold p-1 mb-3">{product.title}</h1>
                <p className="text-sm">{product.description}</p>
            </div>
            
            <p className="text-lg text-accent">
                Price: <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                {product.price}
            </p>
            <p className="text-sm text-accent">
                <FontAwesomeIcon icon={faWeight} className="mr-2 scale-125" />
                Weight: {product.weight} {product.unit}
            </p>
            <p className="text-sm text-accent">
                <FontAwesomeIcon icon={faTruck} className="mr-2 scale-125" />
                Shipping: {product.shippingServices ?? ' Not Specified'}
            </p>
            <p className="text-sm text-accent">
                <FontAwesomeIcon icon={faBoxesPacking} className="mr-2 scale-125" />
                Return Policy: {product.returnPolicy ?? ' Not Specified'}
            </p>

          </section>
       */}
        <section className="md:order-2 col-span-1 grid md:grid-cols-2  auto-rows-min  md:h-screen md:relative">
            <div className="md:col-span-2 text-justify p-3">
                <h1 className="text-2xl font-bold p-1 mb-3">{product.title}</h1>
                <p className="text-sm">{product.description}</p>
            </div>
            <div className="md:col-span-2 grid md:grid-cols-2 p-3 gap-3">
                <p className="text-lg text-accent">
                    Price: <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                    {product.price}
                </p>
                <p className="text-sm text-accent">
                    <FontAwesomeIcon icon={faWeight} className="mr-2 scale-125" />
                    Weight: {product.weight} {product.unit}
                </p>
                <p className="text-sm text-accent">
                    <FontAwesomeIcon icon={faTruck} className="mr-2 scale-125" />
                    Shipping: {product.shippingServices ?? 'Not Specified'}
                </p>
                <p className="text-sm text-accent">
                    <FontAwesomeIcon icon={faBoxesPacking} className="mr-2 scale-125" />
                    Return Policy: {product.returnPolicy ?? 'Not Specified'}
                </p>

                <p className="text-sm text-accent">
                    <FontAwesomeIcon icon={faCubes} className="mr-2" />
                    Available Quantity: {product.availableQuantity}
                </p>
                <p className="text-sm text-accent">
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Sold Out: {product.soldOut}
                </p>
                <p className="text-sm text-accent md:col-span-2">
                    <FontAwesomeIcon icon={faRulerCombined} className="mr-2" />
                    Dimensions: {product.length} x {product.height} x {product.width} (L x H x W)
                </p>
                <p className="text-sm text-accent">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    Address: {product.addressId}
                </p>
                {cartContent.length === 0 
                ? 
                <button 
                    onClick={()=>dispatch({ type: 'added', payload: {id:productId,name:'sample',count:1} })}
                    className=' md:fixed md:bottom-5 uppercase text-center w-80 h-14 bg-black block text-white'>
                        add to cart
                </button> 
                :
                <div className="md:fixed md:bottom-5 w-[20rem]  bg-slate-200 rounded-lg">
                <ProductCounter
                customClass={'p-5'}
                isProductHovered={true}
                selected={
                    cartContent.find((item)=>item.id===productId)
                    ??
                    false
                } 
                dispatch={dispatch}
                />
                </div>
                }
            </div>
        </section>

          <section className="md:order-1 col-span-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-stretch">
                {/* On medium screens (md), show two pictures side by side */}
                <img src="/bernard-hermant-Zpdb7-owcpw-unsplash.jpg" alt="Product Image 1" />
                <img src="/the-blowup-lqx_D7xIZ2o-unsplash.jpg" alt="Product Image 2" />
                {/* Add more images as needed */}
            </div>
          </section>
        </article>
        </>
      );  
    }   