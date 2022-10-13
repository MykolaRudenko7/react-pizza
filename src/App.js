import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Components
import Header from './Components/Header';
// pages
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFoundPage';
import BasketPage from './Pages/BasketPage';
//  redux

// Style
import './scss/app.scss';
//
export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState();

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;
