import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Outlet, RouterProvider } from 'react-router-dom'; // Ensure correct import
import router from '../src/router/router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);
