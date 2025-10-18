import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <main className="container catalog">
      <h1>Mostruário</h1>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
};

export default Catalog;
