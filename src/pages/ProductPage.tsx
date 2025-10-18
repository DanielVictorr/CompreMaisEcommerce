import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productsApi';
import { Product } from '../types';
import { useCart } from '../store/CartContext';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { dispatch } = useCart();

  useEffect(() => {
    if (!id) return;
    fetchProductById(Number(id)).then(p => setProduct(p || null));
  }, [id]);

  if (!product) return <div className="container">Produto não encontrado</div>;

  return (
    <main className="container product-page">
      <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div className="info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="price">R$ {product.price}</div>
          <button onClick={() => dispatch({ type: 'ADD', product })}>Adicionar ao carrinho</button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
