import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store }  from './store/store';
import { persistor }  from './store/store';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                  <App />
            </PersistGate>
      </Provider>

);


