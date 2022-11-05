import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// Components
import { Loading, TopPage } from './Components';
// pages
import MainPage from './Pages/MainPage';
// Style
import './scss/components/app.scss';
// pages lazy load
const BasketPage = React.lazy(
  () => import(/* webpackaChunkName: "BasketPage" */ './Pages/BasketPage'),
);
const Pizza = React.lazy(() => import(/* webpackaChunkName: "PizzaPage" */ './Pages/Pizza/Pizza'));
const NotFound = React.lazy(
  () => import(/* webpackaChunkName: "NotFoundPage" */ './Pages/NotFoundPage'),
);
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
        <Route
          path="Basket"
          element={
            <Suspense fallback={<Loading />}>
              <BasketPage />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Pizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
