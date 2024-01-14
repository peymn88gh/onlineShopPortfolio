import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_de from "locales/de/translate.json";
import common_en from "locales/en/translate.json";
import common_fr from "locales/fr/translate.json";
import common_it from "locales/it/translate.json";
import { AlertProvider } from '../src/utils/alertUtils'
import { AuthProvider } from 'context/AuthContext';
import { createRoot } from 'react-dom/client';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: common_en
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Router>
      <I18nextProvider i18n={i18next}>
        <AlertProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AlertProvider>
      </I18nextProvider>
    </Router>
  );
});
