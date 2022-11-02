import { Route, Routes } from 'react-router-dom';
// Components
import TopPage from './Components/TopPage';
import Pizza from './Pages/Pizza';
// pages
import BasketPage from './Pages/BasketPage';
import MainPage from './Pages/MainPage';
import NotFound from './Pages/NotFoundPage';
// Style
import './scss/app.scss';
//
//
//
//
//
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
