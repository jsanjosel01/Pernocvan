import ProductCard from './ProductCard';

const ProductList = () => {
  const products = [
    { id: 1, name: "Breaking Bad", genre: "Drama" },
    { id: 2, name: "The Bear", genre: "Drama" },
    { id: 3, name: "Peaky Blinders", genre: "Crimen" },
    { id: 4, name: "The Great", genre: "Drama" },
    { id: 5, name: "Black Mirror", genre: "Ciencia Ficción" }
  ];

  return (
    <div className="product-container">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          name={product.name} 
          genre={product.genre} 
        />
      ))}
    </div>
  );
};

export default ProductList;