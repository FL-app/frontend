import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App/App';
import './index.scss';

const rootElement: HTMLDivElement | null = document.querySelector('#root');
if (!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store as Store<unknown>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
