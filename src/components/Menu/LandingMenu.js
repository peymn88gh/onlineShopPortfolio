import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faClose, faCartShopping, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import '../../pages/products/ProductsLanding.css'
import { AnimatePresence, motion } from 'framer-motion';
import Modal from 'components/Modal/Modal';
import ProductCounter from 'pages/products/ProductCounter';
import AccountBox from './AccountBox';
import { CartContext, CartDispatchContext } from 'context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartSection from 'components/Cart/Cart';

export default function Menu({ siteName, searchInput, handleSearchInputChange, sidebarStatus, setSideBarToggleStatus, sideBarToggleStatus}) {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false)
    const dispatch = useContext(CartDispatchContext)
    const cartContent = useContext(CartContext)
    const navigate = useNavigate()
    const toggleSearchBar = () => {
      setSearchVisible(!isSearchVisible);
    };
  
   
    return (
      <>
        <div className=" fixed top-0 z-50 w-full bg-neutral-50 drop-shadow-md py-2 flex justify-between items-center min-h-[65px]">
          
          <div className="flex space-x-2 pl-4 items-center">
            {!sidebarStatus && sideBarToggleStatus==='close' && <FontAwesomeIcon onClick={()=>setSideBarToggleStatus('open')} icon={faBars} className=' cursor-pointer p-1'/>}
            {!sidebarStatus && sideBarToggleStatus==='open' && <FontAwesomeIcon onClick={()=>setSideBarToggleStatus('close')} icon={faClose} className=' cursor-pointer p-1'/>}
            {/* Company Name */}
            <span className="font-semibold text-slate-600 text-lg self-center cursor-pointer" onClick={()=>navigate('/')}>{siteName}</span>
            
          </div>
          <div className="flex items-center space-x-4 pr-4">
            {/* Avatar */}
            <div className='flex gap-4'>
            <div className="relative">
                <AnimatePresence>
                  {isSearchVisible && 
                  <>
                    <motion.input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={handleSearchInputChange}
                      className="border text-black border-gray-300 p-2 rounded-md mr-4"
                      initial={{ width: 0 }}
                      animate={{ width: '200px' }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3 }}
                    /> 
                    <FontAwesomeIcon icon={faClose}  onClick={toggleSearchBar} className='text-gray-600 p-1 hover:scale-110 hover:bg-slate-100 rounded-full cursor-pointer '/>
                </>
                  }
                  {!isSearchVisible && (
                  <motion.div
                    className="search-icon cursor-pointer pt-1"
                    onClick={toggleSearchBar}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FontAwesomeIcon icon={faSearch} className='text-gray-600'/>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
              {/* <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center"> */}
                {/* <FontAwesomeIcon icon={faUser} className="text-emerald-500" /> */}
                <AccountBox />
              {/* </div> */}
              <div onClick={()=>setIsCartOpen(true)} className="relative bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100">
                <FontAwesomeIcon icon={faCartShopping} className=" text-gray-600" />
                {cartContent.length > 0 &&   <span className="absolute translate-x-2 -translate-y-2 top-0 right-0 bg-red-500 bg-opacity-75 text-white font-bold rounded-full h-5 w-5 text-xs flex items-center justify-center">{cartContent.length}</span>}
              </div>
            </div>
            {/* {isLoggedIn && (
              <div className="text-sm text-white">
                {firstName} {lastName}
              </div>
            )} */}
          </div>
          <Modal  isOpen={isCartOpen} onClose={()=>setIsCartOpen(false)}>
              <div className="w-full md:w-1/3 absolute right-0 top-0  overflow-y-scroll h-full bg-white">
                <div>
                  <CartSection setIsCartOpen={setIsCartOpen} />
                </div>
              </div>
          </Modal>
        </div>
      </>
    );
  }
  