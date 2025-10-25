import React from "react";
import { useCart } from "../store/CartContext";
import { X } from "lucide-react";
import "../styles/CartDrawer.scss"; // vamos criar o estilo já já

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { state, dispatch } = useCart();

  const totalValue = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`cart-drawer ${open ? "open" : ""}`}>
      <div className="cart-drawer-header">
        <h2>Seu Carrinho</h2>
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>

      {state.items.length === 0 ? (
        <p className="empty">Seu carrinho está vazio 😢</p>
      ) : (
        <div className="cart-items">
          {state.items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="info">
                <p>{item.title}</p>
                <span>Qtd: {item.quantity}</span>
              </div>
              <button
                onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                className="remove-btn"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <strong>Total: R$ {totalValue.toFixed(2)}</strong>
        <button className="checkout-btn">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default CartDrawer;