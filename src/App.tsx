import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppContext, Theme } from './core/app.store';
import { NavBar } from './core/NavBar';
import NoOptimizedExample from './pages/performance-demo/defer_and_transition/NoOptimizedExample';
import PerformanceDemoPage from './pages/performance-demo/PerformanceDemoPage';

const HomePage  = lazy(() => import('./pages/home/HomePage'));
const CMSPage  = lazy(() => import('./pages/cms/CMSPage'));
const NewsPage  = lazy(() => import('./pages/cms/news/NewsPage'));
const NewsPageSimple  = lazy(() => import('./pages/cms/news/NewsPageSimple'));
const ProductsPage  = lazy(() => import('./pages/cms/products/ProductsPage'));

const UseTransitionDemo = lazy(() => import('./pages/performance-demo/defer_and_transition/UseTransitionDemo')) ;
const UseDeferredValueDemo = lazy(() => import('./pages/performance-demo/defer_and_transition/UseDeferredValueDemo')) ;
const ReactMemoHelloDemo = lazy(() => import('./pages/performance-demo/renders/ReactMemoHelloDemo')) ;
const ReactMemoDemo = lazy(() => import('./pages/performance-demo/renders/ReactUseCallback')) ;

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <AppContext.Provider value={{ theme }}>
      <BrowserRouter>
        <NavBar onChangeTheme={(theme) => setTheme(theme)} />
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
              <Route path="noOptimized" element={<NoOptimizedExample />} />
              <Route path="useTransition" element={<UseTransitionDemo />} />
              <Route path="useDeferredValue" element={<UseDeferredValueDemo />} />
              <Route path="react-memo" element={<ReactMemoHelloDemo />} />
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
    </AppContext.Provider>
  );
}

export default App;
