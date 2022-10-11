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
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage searchValue={searchValue} />} />
            <Route path="/Basket" element={<BasketPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
