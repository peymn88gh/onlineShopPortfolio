import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext, CartDispatchContext } from "context/CartContext";
import ProductCounter from "pages/products/ProductCounter";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CartSection({setIsCartOpen}) {
    const dispatch = useContext(CartDispatchContext)
    const cartContent = useContext(CartContext)
    const navigate = useNavigate()
    
    function handleCheckout(){
        if(cartContent.length>0) navigate('/panel/payment')
    }
    return(
      <>
        <header className={`flex flex-row-reverse ${!setIsCartOpen ? 'justify-center' : 'justify-between'} p-3 items-center`}>
            {setIsCartOpen && <FontAwesomeIcon className=' text-white p-3 bg-slate-300 hover:bg-slate-500 rounded-lg' icon={faClose} onClick={()=>setIsCartOpen(false)} />}
            <h1 className=' font-bold text-lg'>your Cart</h1>
        </header>
        <main className=' overflow-y-scroll'>
            <ul>
                {cartContent.map((item, i)=>(
                    <li key={item.id} className='flex items-center justify-between'>
                        <div className='flex gap-2 p-5'>
                            <img
                                src='https://via.placeholder.com/300x200'
                                alt={item.name}
                                className=" h-20 w-20 object-cover mb-4 rounded-md"
                            />
                            <div className=''>
                                <p>{item.name}</p>
                                <p>price : ## $</p>
                            </div>
                        </div>
                        <div className=' flex-col text-end'>
                            <FontAwesomeIcon onClick={()=>dispatch({ type: 'deleted', payload: item })} className='p-2 mr-5 cursor-pointer' icon={faTrash} />
                            <ProductCounter
                            customClass={'p-5'}
                            isProductHovered={true}
                            selected={item} 
                            dispatch={dispatch}
                            />
                        </div>
                    </li>
                ))}
                
            </ul>
        </main>
        <div className='invisible h-1/4 w-full md:w-1/3 '></div>
        <footer className=' fixed bottom-0 right-0 w-full md:w-1/3  h-1/4 p-5 border border-t-2 z-50 bg-white'>
            <div className='flex'>
                <p className=' flex-grow font-bold'>Subtotal ({cartContent.length} <p className='inline'>{cartContent.length > 1 ? 'items' : 'item'}</p>)</p>
                <p className=''>## $</p>
            </div>
            <div className='flex items-center justify-center mt-10'>
                <button onClick={()=>handleCheckout()} className=' uppercase text-center w-80 h-14 bg-black block text-white'>checkout</button>
            </div>
        </footer>
      </>
    );
  }