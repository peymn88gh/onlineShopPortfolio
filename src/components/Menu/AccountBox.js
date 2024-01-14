import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner, faUser} from '@fortawesome/free-solid-svg-icons';
import { FloatingFocusManager, autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { useAuth } from 'context/AuthContext';
import Modal from 'components/Modal/Modal';
import LoginIndex from 'pages/auth/Login';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AccountBox(){
    const { user, loading, logout, login } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [isAccountBoxOpen, setIsAccountBoxOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen]= useState(false)
    const {refs, floatingStyles, context} = useFloating({
        open: isAccountBoxOpen,
        onOpenChange: setIsAccountBoxOpen,
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });
    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    
    // Merge all the interactions into prop getters
    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
        dismiss,
        role,
    ]);


  
    useEffect(() => {
      if (user) {
        setUserInfo(user)
        setIsLoggedIn(true)
        setIsLoginModalOpen(false)
      }
      else setIsLoggedIn(false)
    }, [user])
    return (
        <>
        <div ref={refs.setReference} {...getReferenceProps()} className=" bg-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100">
            <FontAwesomeIcon icon={faUser} className="  text-gray-600" />
        </div>
          {isAccountBoxOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className=' z-50 min-h-[200px] min-w-[150px] bg-white rounded-lg drop-shadow-lg'
              >
                { loading && (
                    <FontAwesomeIcon className=' text-slate-500 scale-150' icon={faSpinner} spin />
                )}
                { !loading && isLoggedIn && (
                    <AuthUserPopover logout={logout} firstName={userInfo.firstName} lastName={userInfo.lastName} />
                )}
                { !loading && !isLoggedIn && (
                    <GuestUserPopover login={login} setIsLoginModalOpen={setIsLoginModalOpen}/>
                )}
              </div>
            </FloatingFocusManager>
          )}
          <LoInForm isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen}/>
        </>
      );
}
function GuestUserPopover({login, setIsLoginModalOpen}){
  const {t} = useTranslation('common')
  return( 
    <div className=' text-black p-5 flex-col text-justify'>
      <div className='p-2 font-thin text-sm'>
        <p>{t('wellcome.title',{framework:process.env.REACT_APP_NAME})}</p>
      </div>
      <div className='p-2 hover:font-semibold'>
        <button onClick={()=>setIsLoginModalOpen(true)}>{t('logIn')}</button>
      </div>
      <div className='p-2 hover:font-semibold'>
        <button >{t('register')}</button>
      </div>
    </div>
  );
}
function AuthUserPopover({firstName, lastName, logout}){
  const {t} = useTranslation('common')
  const navigate = useNavigate()
  return(
    <div className='text-black p-5 flex-col text-justify'>
      <div className='p-2 font-thin text-sm'>
        <p>{firstName} {lastName}</p>
      </div>
      <div className='p-2 hover:font-semibold'>
        <button onClick={()=>navigate('/panel')}>{t('userPanel')}</button>
      </div>
      {/* <div className='p-2 hover:font-semibold'>
        <button>Orders & Shipping</button>
      </div> */}
      <div className='p-2 hover:font-semibold'>
        <button onClick={logout}>{t('logout')}</button>
      </div>
    </div>
  );
}
function LoInForm({isLoginModalOpen, setIsLoginModalOpen}){
  return(
    <Modal isOpen={isLoginModalOpen}>
      <div className='bg-white md:min-w-[75vw] max-md:min-w-[100vw] relative'>
        <div  onClick={()=>setIsLoginModalOpen(false)} className=' bg-slate-200  cursor-pointer absolute right-7 top-7 rounded-full'>
          <FontAwesomeIcon className='p-3 scale-125' icon={faClose} />
        </div>
       <LoginIndex />
      </div>
    </Modal>
  );
}