import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AnimatePresence } from 'framer-motion';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';

import { store } from './reducers';
import App from './App';
import { Counter } from './pages/counter/Counter';
import Test from './pages/test/Test';
import Children from './pages/children/Children';
import RouteError from './pages/routeerror/RouteError';
import Services from './pages/services/Services';
import Attendance from './pages/attendance/Attendance';
import Report from './pages/reports/Report';
import Invoice from './pages/invoices/Invoices';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Provider store={store}>
          <Routes>

            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

            <Route path='/' element={<App />}>
              {/* <Route index element={<Counter />} /> */}
              <Route path='/test' element={<Test />} />
              <Route path='/children' element={<Children />} />
              <Route path='/services' element={<Services />} />
              <Route index path='/attendance' element={<Attendance />} />
              <Route path='/reports' element={<Report />} />
              <Route path='/invoices' element={<Invoice />} />
              <Route path='*' element={<RouteError />} />
            </Route>
          </Routes>
        </Provider>
      </AnimatePresence>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
