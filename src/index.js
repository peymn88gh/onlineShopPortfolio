import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_de from "locales/de/translate.json";
import common_en from "locales/en/translate.json";
import common_fr from "locales/fr/translate.json";
import common_it from "locales/it/translate.json";
import { AlertProvider } from '../src/utils/alertUtils'
import { AuthProvider } from 'context/AuthContext';
import { CartProvider } from 'context/CartContext';
import ErrorBoundary from 'components/ErrorBoundary';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    de: {
      common: common_de
    },
    fr: {
      common: common_fr
    },
    it: {
      common: common_it
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary><BrowserRouter>
      <I18nextProvider i18n={i18next}>
          <AlertProvider>
            <AuthProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </AuthProvider>
          </AlertProvider>
      </I18nextProvider>
    </BrowserRouter></ErrorBoundary>
  </React.StrictMode>
);
