import React from "react";
import { Link } from "react-router-dom";
import Navbar from "components/Navbar/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faChartBar, faShoppingCart, faTruck, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function Index() {
  const {t} = useTranslation('common')
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const dataOS = [
    {
      title: "Kredit Konsumer",
      date: "12/Mei/2023",
      os: "23,938",
      gs: "20,900",
      percentage: 200.01,
      color: "cardInfo",
    },
    {
      title: "Kredit Ritel",
      date: "12/Mei/2023",
      os: "3,938",
      gs: "2,900",
      percentage: 190.01,
      color: "cardWarning",
    },
    {
      title: "Kredit KPR & KKB",
      date: "12/Mei/2023",
      os: "190,938",
      gs: "192,900",
      percentage: 99.01,
      color: "cardDanger",
    },
    {
      title: "Kredit UMKM",
      date: "12/Mei/2023",
      os: "2,938",
      gs: "2,900",
      percentage: 100.01,
      color: "cardSuccess",
    },
    {
      title: "Kredit Komersial",
      date: "12/Mei/2023",
      os: "23,938",
      gs: "20,900",
      percentage: 200.01,
      color: "cardLime",
    },
    {
      title: "Kredit BPR & LKM",
      date: "12/Mei/2023",
      os: "3,938",
      gs: "10,900",
      percentage: 210.01,
      color: "cardDanger",
    },
  ];

  // const [sidebarToggle] = useOutletContext();
  return (
    <main className="bg-gradient-to-r from-slate-50 via-cyan-100 to-cyan-200 h-screen flex justify-center items-center">
      <div className=" text-accent text-justify">
        <h1 className="text-4xl font-semibold mb-4">{t('wellcome.title',{framework:process.env.REACT_APP_NAME})}</h1>
        <p className="text-lg mb-8">{t('appDescription')}</p>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Link Card 1 - Dashboard */}
          <Link to="Dashboard" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faChartBar} className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard')}</h2>
          </Link>

          {/* Link Card 2 - Orders */}
          <Link to="orders" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faShoppingCart} className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('orders')}</h2>
          </Link>

          {/* Link Card 3 - Products */}
          <Link to="products" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faChartBar} className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('products')}</h2>
          </Link>

          {/* Link Card 4 - Users */}
          <Link to="users" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faUsers} className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('users')}</h2>
          </Link>

          {/* Link Card 5 - Shipping */}
          <Link to="shipping" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faTruck} className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('shipping')}</h2>
          </Link>

          {/* Link Card 6 - Profile */}
          <Link to="profile" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faUser} className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('profile')}</h2>
          </Link>

          {/* Link Card 7 - Addresses */}
          <Link to="addresses" className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faAddressBook} className="w-12 h-12 mx-auto mb-4 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-800">{t('addresses')}</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Index;
