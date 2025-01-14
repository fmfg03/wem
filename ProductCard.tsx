// src/components/ProductCard.tsx
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.compareAtPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            {Math.round((1 - product.price/product.compareAtPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            SKU: {product.sku}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              {feature}
            </div>
          ))}
        </div>
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
