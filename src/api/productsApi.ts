import { Product } from '../types';

// Simple API wrapper that reads products.json from /products.json (public folder)
// This simulates a backend. You can replace fetch URL with your real API later.

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/products.json');
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return await res.json();
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  const products = await fetchProducts();
  return products.find(p => p.id === id);
}
