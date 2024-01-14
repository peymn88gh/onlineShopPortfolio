import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut, faComputer
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import initMenus from "data/menus.json";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.jsx";
import SidebarSearch from "./SidebarSearch.jsx";
import MenuList from "./MenuList.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "context/AuthContext";
import LangBar from "components/LangBar/LangBar";
import Navbar from "components/Navbar/Index";

function Sidebar({ ...props }) {
  const customMenus = props.menu === 'guest' ? initMenus.guestMenu : initMenus.authMenu;
  const navigate = useNavigate();
  const [menus, setMenus] = useState(customMenus);
  const {logout} = useAuth();
  const [scButton, setScButton] = useState(false);
  const search = useRef("");

  const handleChange = (e) => {
    if (e.target.value) {
      setScButton(true);
      setMenus(
          menus.filter((el) => {
            return el.label.toLowerCase().includes(e.target.value.toLowerCase());
          })
      );
    } else {
      setScButton(false);
      setMenus(initMenus);
    }
  };

  const clearSearch = () => {
    search.current.value = "";
    setMenus(initMenus);
    setScButton(false);
  };

  // const logout = () => {
  //   navigate("/auth/login");
  // };
  const [t, i18n] = useTranslation('common');

  return (
      <>
        <aside
            id="sidebar"
            // className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className}`}
            className=""
        >
          {/* Sidebar wrapper */}
          {/* <div className="text-center">
            <button onClick={() => i18n.changeLanguage('de')}>de</button>&nbsp;
            <button onClick={() => i18n.changeLanguage('fr')}>fr</button>&nbsp;
            <button onClick={() => i18n.changeLanguage('it')}>it</button>&nbsp;
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
          </div> */}
          <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">

            {/* Logo */}
            <SidebarLogo toggle={props.toggle} icon={faComputer} text="LeoNet" />
            <LangBar firstLang={i18n.language}/>
            {/* Search Menu */}
            <SidebarSearch
                clearSearch={clearSearch}
                handleChange={handleChange}
                scButton={scButton}
                search={search}
            />

            {/* Menu */}
            <MenuList menus={menus} toggle={props.toggle} />

            {/* Profile */}
            <div className="pt-2 border-t border-gray-300">
              <div className="py-2 px-4">
                {/* Logout Button */}
                <button
                    className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
                    onClick={() => logout()}
                >
                  <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Logout
                </button>
              </div>
            </div>
          </div>
        </aside>

        {props.className === "mobile" && (
            <div
                id="overlaySidebar"
                onClick={props.toggle}
                className="hidden absolute w-full h-screen bg-black z-10 inset-0 opacity-60"
            >
              <div></div>
            </div>
        )}
      {/* <Navbar toggle={props.toggle}/> */}

      </>
  );
}

export default Sidebar;
