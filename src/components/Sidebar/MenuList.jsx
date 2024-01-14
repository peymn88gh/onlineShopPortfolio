import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { useTranslation } from "react-i18next";
import {faBoxes, faHome, faLock, faMapMarkedAlt, faNotdef, faNoteSticky, faShoppingBasket, faTable, faTachometer, faTruck, faUser, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {faPage4, faWindows} from "@fortawesome/free-brands-svg-icons";



function MenuList({ menus, ...props }) {
    const { t } = useTranslation('common');

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

    var x = t('welcome.title',{framework:'React'});
    return (
        <div className="navWrapper p-4">
            <ul id="menu" className="">
                {menus?.map((menu) =>
                        menu.submenu ? (
                            <SubMenu key={menu.label} menu={menu} props={props} />
                        ) : menu.path ? (
                            <li key={menu.label} className={``} onClick={props.toggle}>
                                <NavLink to={`${menu.path}`} className="link">
                                    {menu.icon && <FontAwesomeIcon icon={iconMapping[menu.icon]} />}
                                    {t((menu.label+ "").toLowerCase())}
                                </NavLink>
                            </li>
                        ) : (
                            <li key={menu.label} className="mt-5 mb-3">
              <span className="text-gray-500 font-medium uppercase text-xs mx-2">
                {menu.label} {menu.role}
              </span>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}

export default MenuList;

