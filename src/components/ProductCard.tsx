import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useCart } from '../store/CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { dispatch } = useCart();
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="title">{product.title}</Link>
        <div className="price">R$ {product.price}</div>
        <button onClick={() => dispatch({ type: 'ADD', product })}>Adicionar ao carrinho</button>
      </div>
    </div>
  );
};

export default ProductCard;
