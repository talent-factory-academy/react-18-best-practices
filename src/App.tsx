import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './core/NavBar';

const HomePage  = lazy(() => import('./pages/home/HomePage'));
const CMSPage  = lazy(() => import('./pages/cms/CMSPage'));
const NewsPage  = lazy(() => import('./pages/cms/news/NewsPage'));
const NewsPageSimple  = lazy(() => import('./pages/cms/news/NewsPageSimple'));
const ProductsPage  = lazy(() => import('./pages/cms/products/ProductsPage'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route index element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          } />
          <Route path="cms" element={
            <Suspense fallback={<div>Loading...</div>}>
              <CMSPage />
            </Suspense>
          }>
            <Route path="products" element={<ProductsPage />} />
            <Route path="news-simple" element={<NewsPageSimple />} />
            <Route path="news" element={<NewsPage />} />
            <Route index element={<Navigate to="news" /> } />
          </Route>
          <Route index element={<Navigate to="cms" /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
