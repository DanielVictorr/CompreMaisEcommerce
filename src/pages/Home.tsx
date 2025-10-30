import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import Catalog from './Catalog';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(err => console.error(err));
  }, []);

  return (
    <main className="home container">
      <section className="hero">
        <div className="hero-left">
          <h1>ENCONTRE ROUPAS QUE COMBINEM COM SEU ESTILO</h1>
          <p>Navegue pela nossa diversificada gama de peças meticulosamente elaboradas.</p>
          
          <Link to={"/catalog"}><button className="shop">COMPRE AGORA</button></Link>
        </div>
        <div className="hero-right">
          <div className="hero-image">  </div>
        </div>
      </section>

      <section className="modelos">
        <h2>Novos Modelos</h2>
        <div className="grid">
          {products.filter(p => p.category === 'New Arrivals').map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="vendidos">
        <h2>Mais Vendidos</h2>
        <div className="grid">
          {products.filter(p => p.category === 'Top Selling').map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
};

export default Home;
