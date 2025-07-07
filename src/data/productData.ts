
// Define product types
export const PRODUCT_TYPES = [
  { id: 'bolsa-natural', name: 'Bolsa Natural' },
  { id: 'bolsa-basura', name: 'Bolsa Basura' },
  { id: 'bolsa-en-rollo', name: 'Bolsa en Rollo' },
  { id: 'bolsa-biodegradable', name: 'Bolsa Biodegradable' },
  { id: 'rollo-polietileno', name: 'Rollo Polietileno' },
  { id: 'rollo-vinil', name: 'Rollo Vinil' },
  { id: 'rollo-pvc', name: 'Rollo PVC' }
];

// Define product variants
export const PRODUCT_VARIANTS = {
  // Variants for bolsas
  bolsas: {
    medidas: [
      '15x25', '18x25', '20x30', '25x35', '30x40', '30x50', 
      '40x60', '50x70', '60x90', '70x90', '90x120'
    ],
    colores: [
      'Natural', 'Negra', 'Blanca', 'Verde', 'Azul', 'Gris',
      'Roja', 'Naranja', 'Amarilla', 'Caramelo'
    ],
    calibres: ['125', '150', '200', '300', '400', '600'],
    calidades: ['1a', '2a', '3a'],
    impresiones: [
      'Sin impresión', 
      '3 tintas un lado', 
      '3 tintas dos lados', 
      '6 tintas'
    ]
  },
  
  // Variants for rollos
  rollos: {
    tipos: ['PVC', 'Polietileno', 'Vinil'],
    formatos: ['Doble', 'Sencillo'],
    medidas: [
      '1m x 50m', '1.2m x 50m', '1.5m x 50m', '2m x 50m'
    ],
    colores: [
      'Transparente', 'Negro', 'Blanco', 'Azul', 'Verde'
    ]
  },
  
  // Variants for materiales
  materiales: {
    tipos: ['Playo', 'Foam', 'Poliburbuja'],
    medidas: [
      '1m x 10m', '1.2m x 10m', '1.5m x 10m'
    ]
  }
};

// Sample products - simplified version matching the product types
export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Bolsa Natural 30x40',
    description: 'Bolsa de polietileno natural resistente para uso general.',
    image: 'https://placehold.co/600x400/fff/000?text=Bolsa+Natural',
    category: 'Bolsa Natural',
    price: 15.99,
    stock: 200,
    featured: true,
    slug: 'bolsa-natural-30x40',
    specifications: {
      medida: '30x40',
      color: 'Natural',
      calibre: '200',
      calidad: '1a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false
    }
  },
  {
    id: '2',
    name: 'Bolsa Basura 90x120',
    description: 'Bolsa resistente para basura industrial.',
    image: 'https://placehold.co/600x400/000/fff?text=Bolsa+Basura',
    category: 'Bolsa Basura',
    price: 25.99,
    stock: 150,
    featured: true,
    slug: 'bolsa-basura-90x120',
    specifications: {
      medida: '90x120',
      color: 'Negra',
      calibre: '300',
      calidad: '1a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: true,
      polipapel: false,
      compostable: false
    }
  },
  {
    id: '3',
    name: 'Bolsa en Rollo 25x35',
    description: 'Bolsas en formato de rollo para dispensadores.',
    image: 'https://placehold.co/600x400/f5f5f5/333?text=Bolsa+en+Rollo',
    category: 'Bolsa en Rollo',
    price: 18.50,
    stock: 100,
    featured: false,
    slug: 'bolsa-en-rollo-25x35',
    specifications: {
      medida: '25x35',
      color: 'Natural',
      calibre: '150',
      calidad: '2a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false
    }
  },
  {
    id: '7',
    name: 'Bolsa Biodegradable 20x30',
    description: 'Bolsa biodegradable amigable con el medio ambiente.',
    image: 'https://placehold.co/600x400/e7f6e7/333?text=Bolsa+Biodegradable',
    category: 'Bolsa Biodegradable',
    price: 22.50,
    stock: 200,
    featured: true,
    slug: 'bolsa-biodegradable-20x30',
    specifications: {
      medida: '20x30',
      color: 'Verde',
      calibre: '200',
      calidad: '1a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: true
    }
  },
  {
    id: '4',
    name: 'Rollo Polietileno 1.5m',
    description: 'Rollo de polietileno para embalaje industrial.',
    image: 'https://placehold.co/600x400/fff/555?text=Rollo+Polietileno',
    category: 'Rollo Polietileno',
    price: 45.99,
    stock: 50,
    featured: true,
    slug: 'rollo-polietileno-1-5m',
    specifications: {
      medida: '1.5m x 50m',
      color: 'Transparente',
      calibre: '400',
      calidad: '1a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false
    }
  },
  {
    id: '5',
    name: 'Rollo Vinil 1m',
    description: 'Rollo de vinil para aplicaciones especiales.',
    image: 'https://placehold.co/600x400/d3d3d3/333?text=Rollo+Vinil',
    category: 'Rollo Vinil',
    price: 65.75,
    stock: 30,
    featured: false,
    slug: 'rollo-vinil-1m',
    specifications: {
      medida: '1m x 50m',
      color: 'Blanco',
      calibre: 'N/A',
      calidad: '1a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false
    }
  },
  {
    id: '6',
    name: 'Rollo PVC 2m',
    description: 'Rollo de PVC para uso industrial y comercial.',
    image: 'https://placehold.co/600x400/b0c4de/333?text=Rollo+PVC',
    category: 'Rollo PVC',
    price: 55.99,
    stock: 40,
    featured: false,
    slug: 'rollo-pvc-2m',
    specifications: {
      medida: '2m x 50m',
      color: 'Transparente',
      calibre: 'N/A',
      calidad: '1a'
    },
    technical: {
      tipoCamiseta: false,
      suajeReforzado: false,
      polipapel: false,
      compostable: false
    }
  }
];

// Define color options for filters that match our product data
export const COLOR_OPTIONS = [
  { value: 'Natural', label: 'Natural' },
  { value: 'Negra', label: 'Negra' },
  { value: 'Blanca', label: 'Blanca' },
  { value: 'Verde', label: 'Verde' },
  { value: 'Azul', label: 'Azul' },
  { value: 'Gris', label: 'Gris' },
  { value: 'Roja', label: 'Roja' },
  { value: 'Naranja', label: 'Naranja' },
  { value: 'Amarilla', label: 'Amarilla' },
  { value: 'Caramelo', label: 'Caramelo' },
  { value: 'Transparente', label: 'Transparente' }
];

// Define calibre options for filters
export const CALIBRE_OPTIONS = [
  { value: '125', label: '125' },
  { value: '150', label: '150' },
  { value: '200', label: '200' },
  { value: '300', label: '300' },
  { value: '400', label: '400' },
  { value: '600', label: '600' },
  { value: 'N/A', label: 'No Aplica' }
];

// Define calidad options for filters
export const CALIDAD_OPTIONS = [
  { value: '1a', label: '1a' },
  { value: '2a', label: '2a' },
  { value: '3a', label: '3a' }
];
