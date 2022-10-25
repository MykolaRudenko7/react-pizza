import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Components
import Header from './Components/Header';
// pages
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFoundPage';
import BasketPage from './Pages/BasketPage';
// Style
import './scss/app.scss';


function App() {

  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Basket" element={<BasketPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
