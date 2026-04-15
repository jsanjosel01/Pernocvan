import React from 'react';


interface ProductProps {
  name: string;
  genre: string;
}

const ProductCard = ({ name, genre }: ProductProps) => (
  <div className="product-card">
    <div className="poster-placeholder">🎬</div>
    <h3>{name}</h3>
    <p>{genre}</p>
  </div>
);

export default ProductCard;