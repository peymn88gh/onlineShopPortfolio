// routeConfig.js
import Dashboard from "pages/Dashboard";
import Blank from "pages/Blank";
import NotFound from "pages/NotFound";
import UserProfilePage from "pages/Profile/UserProfilePage";
import Index from "pages";
import AuthLayout from "components/Layout/AuthLayout";
import ProductsHomePage from "pages/products/ProductsLanding";
import Products from "pages/products/Products";
import Orders from "pages/orders/Orders";
import Shipping from "pages/shipping/Shipping";
import Address from "pages/addresses/Address";
import Users from "pages/users/Users";
import EmailVerification from "pages/EmailVerification";
import LoginIndex from "pages/auth/Login";
import RegisterIndex from "pages/auth/Register";
import ResetPasswordIndex from "pages/auth/ResetPassword";
import ProductDetail from "components/Product/productDetail";
import Payment from "pages/payment/Payment";

const routes = [
  { path: "/", element: <ProductsHomePage /> },
  { path: "/email-verification", element: <EmailVerification /> },

  {
    path: "/panel",
    element: <AuthLayout />,
    children: [
      // { path: "/", element: <Index /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "blank", element: <Blank /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductDetail /> },
      { path: "shipping", element: <Shipping /> },
      { path: "addresses", element: <Address /> },
      { path: "profile", element: <UserProfilePage /> },
      { path: "users", element: <Users /> },
      { path: "payment", element: <Payment /> },
      // ... define other panel routes ...
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth",
    element: <LoginIndex />,
    children: [
      { path: "login", element: <LoginIndex /> },
      { path: "register", element: <RegisterIndex /> },
      { path: "reset-password", element: <ResetPasswordIndex /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
