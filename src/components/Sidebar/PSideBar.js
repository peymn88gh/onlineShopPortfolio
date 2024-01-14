import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import data from 'data/menus.json';
import {faBoxes, faHome, faLock, faMapMarkedAlt, faNotdef, faNoteSticky, faShoppingBasket, faTable, faTachometer, faTruck, faUser, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {faPage4, faWindows} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LangBar from "components/LangBar/LangBar";
import { useTranslation } from "react-i18next";

export default function PSideBar({sidebarStatus, menuList, sideBarToggleStatus}){

    const asideClass = sidebarStatus ? 'min-w-1/3 bg-neutral-50 h-full z-40 pt-[65px] flex-col'
                                     :
                       sideBarToggleStatus==='close'
                                     ? 'hidden'
                                     : 'fixed left-0  bg-neutral-50 z-40 drop-shadow-2xl h-full pt-[65px] flex-col';
    const iconMapping={
        "faHome": faHome,
        "faTachometer": faTachometer,
        "faPage4": faPage4,
        "faNotdef": faNotdef,
        "faWindows": faWindows,
        "faTable": faTable,
        "faLock": faLock,
        "faNoteSticky": faNoteSticky,
        "faUser" : faUser,
        "faBoxes" : faBoxes,
        "faShoppingBasket" : faShoppingBasket,
        "faUserFriends" : faUserFriends,
        "faTruck" : faTruck,
        "faMapMarkedAlt" : faMapMarkedAlt,
    }
    const location = useLocation();
    const [t, i18n] = useTranslation('common');
    return(
        <aside className={asideClass}>
            <div className="flex items-center justify-center pt-5 "><LangBar  firstLang={i18n.language}/></div>
            
            <ul className="p-5">    
               { data.authMenu.map((item, e)=>(
                <li key={e} className={location.pathname === `/panel${item.path}` ? 'bg-primary p-2 rounded-md' : 'p-2'}>
                    <NavLink to={`/panel${item.path}`} className={'p-2'}>
                        {<FontAwesomeIcon icon={iconMapping[item.icon]} className="mr-2" />}{t(item.label)}
                    </NavLink>
                </li>
                ))}      
            </ul>
        </aside>
    );
}