import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";

const Header: React.FC = () => {
  const { state } = useCart();
  const total = state.items.reduce((s, i) => s + i.quantity, 0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">COMPREMAIS</Link>
        <nav>
          <Link to="/catalog">Catálogo</Link>
        </nav>
        <div className="cart">
          <button onClick={() => setDrawerOpen(true)} className="cart-link">
            <ShoppingCart size={22} />
            <span className="cart-count">{total}</span>
          </button>
        </div>
      </div>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
};

export default Header;
