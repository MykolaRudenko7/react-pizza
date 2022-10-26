import React from 'react';
import {  Routes, Route } from 'react-router-dom';
// Components
import Header from './Components/Header';
import Pizza from './Pages/Pizza';
import TopPage from "./Components/TopPage";

// pages
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFoundPage';
import BasketPage from './Pages/BasketPage';
// Style
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopPage />}>

		<Route path="" element={<MainPage />} />
      <Route path="Basket" element={<BasketPage />} />
      <Route path="pizza/:id" element={<Pizza />} />
      <Route path="*" element={<NotFound />} />

		</Route>
    </Routes>
  );
}

export default App;
