import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Landing } from './views/LandingView/Landing';
import { AddRecording } from './views/AddRecording/AddRecording';
import { AllLaptops } from 'views/AllLaptops/AllLaptops';
import { CertainLaptop } from 'views/Laptop/CertainLaptop';
import { SuccessPopup } from 'views/components/SuccessPopup/SuccessPopup';
import { ErrorPage } from 'views/ErrPage/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/addRecording"} element={<AddRecording />} />
        <Route path={"/recordings"} element={<AllLaptops />} />
        <Route path={"/recording/:id"} element={<CertainLaptop />} />
        <Route path={"/addRecording/success"} element={<SuccessPopup />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);