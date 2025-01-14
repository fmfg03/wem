// src/components/ProductCatalog.tsx
// Add new state for sorting
const [sortBy, setSortBy] = useState('name');

// Modify filteredProducts to include sorting
const filteredProducts = useMemo(() => {
  let filtered = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
}, [activeCategory, searchQuery, sortBy]);
// src/components/ProductCatalog.tsx
// Add new state for price range
const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

// Add to the filter conditions
const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
return matchesCategory && matchesSearch && matchesPrice;

// Add price range component
<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Rango de Precio</h2>
  <div className="flex gap-4">
    <input
      type="number"
      value={priceRange.min}
      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
      className="w-24 px-2 py-1 border rounded"
    />
    <span>-</span>
    <input
      type="number"
      value={priceRange.max}
      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
      className="w-24 px-2 py-1 border rounded"
    />
  </div>
</div>
// src/components/ProductCatalog.tsx
// Add pagination state
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 9;

// Modify filtered products to include pagination
const paginatedProducts = useMemo(() => {
  const startIndex = (currentPage - 1) * productsPerPage;
  return filteredProducts.slice(startIndex, startIndex + productsPerPage);
}, [filteredProducts, currentPage]);

// Add pagination component
const Pagination = () => {
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};


