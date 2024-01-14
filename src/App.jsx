import React , { useEffect }from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import { ToastContainer } from "react-toastify";
import routes from "configs/routeConfig";

function App() {
  const routeResult = useRoutes(routes);

  return (
      <div className="app">
        {routeResult}
        <ToastContainer
          position="bottom-left"
          closeButton
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      </div>
  );
}

export default App;
