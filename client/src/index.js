import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/user.context';
import { ApplicationProvider } from './context/applications.context';
import { UIProvider } from './context/ui.controler.context';
import { AlertProvider } from './context/alert.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <UIProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </UIProvider>
    </AlertProvider>
  </React.StrictMode>
);

