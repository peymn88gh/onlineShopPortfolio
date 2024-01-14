import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar";
import { sidebarToggle } from "utils/toggler.js";
import BottomNavbar from "components/BottomNavbar/Index";
import { useAuth } from "context/AuthContext";
import Menu from "components/Menu/LandingMenu";
import PSideBar from "components/Sidebar/PSideBar";
import Index from "pages";
import ReactLoading from 'react-loading'
import LoginIndex from "pages/auth/Login";
import { useTranslation } from "react-i18next";

function AuthLayout({ ...props }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const {t} = useTranslation('common')
  const navigate = useNavigate()
  
  const isDesktop = () => document.body.clientWidth > 768;
  const [sidebarStatus, setSidebarStatus] = useState(isDesktop());
  const [sideBarToggleStatus, setSideBarToggleStatus] = useState('close')
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSidebarStatus(isDesktop());
    });
    return () => window.removeEventListener("resize", isDesktop);
  }, []);


  // Determine if the current route matches "/panel"
  const isPanelRoute = location.pathname.endsWith("/panel") ;
// console.log(location.pathname,'ddd');
  return (
    <div className="adminLayout">
      {/* Sidebar */}
      <Menu 
        setSideBarToggleStatus={setSideBarToggleStatus} 
        sideBarToggleStatus={sideBarToggleStatus}
        sidebarStatus={sidebarStatus} 
        siteName={'AlpinaCommerce'}
      />
        
       {
       loading 
       ?
        <div className="h-full w-full bg-slate-200 flex justify-center items-center">
          <p className="inline p-3 text-accent">{t('authentication')} </p>
          <ReactLoading height={50} width={50} color="white" />
        </div> 
       :
       user===null 
       ?

      
       <>
          {
          !location.pathname.includes('/panel/products/') &&
           <PSideBar 
            sidebarStatus={sidebarStatus} 
            sideBarToggleStatus={sideBarToggleStatus}
          />
          }

          <div className="mainWrapper">
            <Outlet  />
          {isPanelRoute && <Index />}

          </div>
        </>
        :
        <Navigate to={'/auth/login'} state={{backto: location.pathname}} replace={true}/>
        
        }
    </div>
  );
}

export default AuthLayout;
