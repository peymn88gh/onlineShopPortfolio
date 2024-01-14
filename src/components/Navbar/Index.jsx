import React, { useState } from 'react';
import { faBars, faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal/Modal';

function Index({ toggle }) {
  const [notificationCount, setNotificationCount] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  const [t, i18n] = useTranslation('common');
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";


  return (
    <>
      <header className="">
        <div className="shadow-sm">
          <div className="relative bg-white flex w-full items-center px-5 py-2.5">
            <div className="flex-1">
              <p className="block md:hidden cursor-pointer">
                <FontAwesomeIcon icon={faBars} onClick={toggle} />
              </p>
            </div>
            <div className="">
              <ul className="flex flex-row gap-4 items-center">
                {/* <li>
                  <span className="h-9 w-9 cursor-pointer text-gray-600">
                    <FontAwesomeIcon className='h-9 w-9' icon={faMessage} />
                  </span>
                </li> */}
                <li>
                  <span className="relative">
                    <span
                      className="cursor-pointer text-gray-600"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <FontAwesomeIcon className='h-9 w-9' icon={faBell} />
                    </span>
                    {notificationCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white font-bold rounded-full h-5 w-5 text-xs flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </span>
                </li>
                <li>
                  <span className=''>
                    <img
                      className="rounded-full h-11 w-11 border cursor-pointer"
                      src={avatar}
                      alt="Avatar"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* {showNotifications && ( */}
      <Modal
      isOpen={showNotifications}
      onClose={()=>setShowNotifications(false)}
      >
        <div className="absolute top-0 right-0 mt-12 mr-5 bg-white border shadow-lg p-6 rounded-lg">
          {/* Example notification content */}
          <p>Notification 1: Lorem ipsum dolor sit amet.</p>
          <p>Notification 2: Consectetur adipiscing elit.</p>
          {/* Add more notifications here */}
        </div>
      </Modal>
      {/* )} */}
    </>
  );
}

export default Index;
