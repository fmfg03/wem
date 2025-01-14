// src/components/ProductDetail.tsx
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Image gallery */}
        <div className="mb-8 lg:mb-0">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-4">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Price */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </h2>
            {product.compareAtPrice && (
              <p className="text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Características</h3>
            <ul className="mt-4 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="ml-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to cart button */}
          <button
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
            className="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};
