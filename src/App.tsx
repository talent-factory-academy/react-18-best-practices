import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './core/NavBar';
import PerformanceDemoPage from './pages/cms/performance-demo/PerformanceDemoPage';

const HomePage  = lazy(() => import('./pages/home/HomePage'));
const CMSPage  = lazy(() => import('./pages/cms/CMSPage'));
const NewsPage  = lazy(() => import('./pages/cms/news/NewsPage'));
const NewsPageSimple  = lazy(() => import('./pages/cms/news/NewsPageSimple'));
const ProductsPage  = lazy(() => import('./pages/cms/products/ProductsPage'));

const UseTransitionDemo = lazy(() => import('./pages/cms/performance-demo/defer_and_transition/UseTransitionDemo')) ;
const UseDeferredValueDemo = lazy(() => import('./pages/cms/performance-demo/defer_and_transition/UseDeferredValueDemo')) ;
const ReactMemoHelloDemo = lazy(() => import('./pages/cms/performance-demo/renders/ReactMemoHelloDemo')) ;
const ReactMemoDemo = lazy(() => import('./pages/cms/performance-demo/renders/ReactMemoDemo')) ;

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

          {/*performance*/}
          <Route path="performance-demo" element={
            <Suspense fallback={<div>Loading...</div>}>
              <PerformanceDemoPage />
            </Suspense>
          }>
            <Route path="useTransition" element={<UseTransitionDemo />} />
            <Route path="useDeferredValue" element={<UseDeferredValueDemo />} />
            <Route path="memo-and-usecallback-1" element={<ReactMemoHelloDemo />} />
            <Route path="memo-and-usecallback-2" element={<ReactMemoDemo />} />
            <Route index element={<Navigate to="useTransition" /> } />
          </Route>

          {/*CMS*/}
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

          {/*default route*/}
          <Route index element={<Navigate to="cms" /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
