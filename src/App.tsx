import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './store/CartContext';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
