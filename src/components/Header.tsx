import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const total = state.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">COMPREMAIS</Link>
        <nav>
          <Link to="/catalog">Catálogo</Link>
        </nav>
        <div className="cart">
          <Link to="/catalog">Carrinho ({total})</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
