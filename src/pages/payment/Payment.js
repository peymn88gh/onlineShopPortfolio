import { faCheck, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartSection from "components/Cart/Cart";
import { CartContext, CartDispatchContext } from "context/CartContext";
import ProductCounter from "pages/products/ProductCounter";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment(){
    const dispatch = useContext(CartDispatchContext)
    const cartContent = useContext(CartContext)
    const navigate = useNavigate()
    
    return(
    <>
        <div className=" self-center min-w-[90%] mt-5 flex flex-col md:flex-row  gap-3">
            <div className="flex flex-col order-2 md:order-1 gap-3 md:w-1/2">
                <section id="emailsection" className=" bg-white md:h-36">
                    <header className="p-5">
                        <span className="py-1 px-1.5 rounded-full text-white bg-emerald-600"><FontAwesomeIcon icon={faCheck} className="" /></span>
                        <h1 className="inline ml-3">your email</h1>
                        <p className="font-extralight text-justify m-3">info@tarasystem.ch</p>
                    </header>
                </section>
                <section id="shipping" className=" bg-white md:h-36">
                    <header className="p-5">
                        <span className="py-1 px-1.5  rounded-full text-white bg-emerald-600"><FontAwesomeIcon icon={faCheck} className=""/></span>
                        <h1 className="inline ml-3">shipping</h1>
                        <p className="font-extralight text-justify m-3 whitespace-break-spaces">Informatica Täfernstrasse 4 5405 Dättwil SWITZERLAND</p>
                    </header>
                </section>
            </div>
            <div className="flex flex-col p-2 order-1 bg-white max-h-screen overflow-y-scroll">
               <header className={`flex flex-row justify-between px-5 py-2 border-b-2 border-opacity-30 items-center`}>
                <h1 className=' font-bold text-lg'>your Cart</h1>
                <p className="">## $</p>
                </header>
                <main className=' overflow-y-scroll'>
                    <ul>
                        {cartContent.map((item, i)=>(
                            <li key={item.id} className='flex items-center justify-between even:bg-stone-100'>
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
            </div>
            
        </div>
    </>
    );
}