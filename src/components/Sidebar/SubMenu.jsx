import { faAngleRight, faBoxes, faMapMarkedAlt, faTruck, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {faHome, faLock, faNotdef, faNoteSticky, faTable, faTachometer, faUser, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {faPage4, faWindows} from "@fortawesome/free-brands-svg-icons";
function SubMenu({ menu, ...props }) {
  console.log(menu,'menu');
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
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(pathname.includes(menu.path));
  return (
    <div className={``} key={menu.label}>
      <li
        key={menu.label}
        className={`link ${pathname.includes(menu.path) ? "active" : ""} `}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {menu.icon && <FontAwesomeIcon icon={iconMapping[menu.icon]} />}
        <p className="flex-1">{menu.label}</p>
        <FontAwesomeIcon
          icon={faAngleRight}
          className={`${subMenuOpen && "rotate-90"} duration-200 w-4 h-4`}
        ></FontAwesomeIcon>
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex flex-col pl-[39px] text-[0.7rem] h-0 overflow-hidden"
      >
        {menu.submenu.map((sm) => (
          <li key={sm.label} onClick={props.props.toggle}>
            <NavLink to={`${menu.path}/${sm.path}`} className="link">
        {sm.icon && <FontAwesomeIcon icon={iconMapping[sm.icon]} />}
              {sm.label}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export default SubMenu;
