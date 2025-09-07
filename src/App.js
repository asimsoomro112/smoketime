import React, { useState } from 'react';

// ==============================
// 1. DUMMY DATA AND UTILS
// ==============================

// Product data
const PRODUCTS = [
  {
    id: '1',
    title: 'Vintage Levi\'s Jeans',
    brand: 'Levi\'s',
    images: [
      'https://placehold.co/600x600/F5E6E8/B07E88?text=Levi%27s+1',
      'https://placehold.co/600x600/E8D6D6/A87D8D?text=Levi%27s+2',
      'https://placehold.co/600x600/C8B5B5/886A7A?text=Levi%27s+3',
    ],
    price: 45.00,
    condition: 'Excellent',
    size: 'W28 L30',
    measurements: 'Waist: 28", Inseam: 30"',
    description: 'Classic vintage Levi\'s 501 jeans in excellent condition. A timeless wardrobe staple.',
    sku: 'VLJ-001',
    category: 'Bottoms',
    instagramPostId: 'B_t6Z5u2L1n'
  },
  {
    id: '2',
    title: 'Floral Midi Dress',
    brand: 'Zara',
    images: [
      'https://placehold.co/600x600/EAD9FF/AD8ACB?text=Dress+1',
      'https://placehold.co/600x600/D4C3E4/9477B7?text=Dress+2',
      'https://placehold.co/600x600/A890BF/6D558B?text=Dress+3',
    ],
    price: 60.00,
    condition: 'Gently Used',
    size: 'M',
    measurements: 'Bust: 34", Length: 48"',
    description: 'A beautiful floral midi dress from Zara, perfect for spring or summer outings.',
    sku: 'FMD-002',
    category: 'Dresses',
    instagramPostId: 'C_x5Y8k3J2p'
  },
  {
    id: '3',
    title: 'Cashmere Sweater',
    brand: 'J.Crew',
    images: [
      'https://placehold.co/600x600/DDEBF7/B2C8D8?text=Sweater+1',
      'https://placehold.co/600x600/C5D8E6/9EB1C1?text=Sweater+2',
      'https://placehold.co/600x600/ACC7DA/7A94A7?text=Sweater+3',
    ],
    price: 85.00,
    condition: 'Excellent',
    size: 'S',
    measurements: 'Bust: 32", Length: 24"',
    description: 'Luxurious 100% cashmere sweater from J.Crew. Super soft and warm.',
    sku: 'CS-003',
    category: 'Tops',
    instagramPostId: 'D_y8Z7o4P3q'
  },
  {
    id: '4',
    title: 'Leather Biker Jacket',
    brand: 'AllSaints',
    images: [
      'https://placehold.co/600x600/E8E8E8/666666?text=Jacket+1',
      'https://placehold.co/600x600/BDBDBD/4A4A4A?text=Jacket+2',
      'https://placehold.co/600x600/969696/2B2B2B?text=Jacket+3',
    ],
    price: 180.00,
    condition: 'Fair',
    size: 'L',
    measurements: 'Chest: 44", Sleeve: 26"',
    description: 'Authentic AllSaints leather jacket. Shows signs of wear, which adds to its character.',
    sku: 'LBJ-004',
    category: 'Jackets',
    instagramPostId: 'E_z9A9p5Q4r'
  },
  {
    id: '5',
    title: 'Striped T-shirt',
    brand: 'Everlane',
    images: [
      'https://placehold.co/600x600/A8D1A8/5F8B5F?text=T-shirt+1',
      'https://placehold.co/600x600/77A977/4C7C4C?text=T-shirt+2',
      'https://placehold.co/600x600/558655/335433?text=T-shirt+3',
    ],
    price: 20.00,
    condition: 'Excellent',
    size: 'M',
    measurements: 'Chest: 40", Length: 27"',
    description: 'Classic striped t-shirt from Everlane. A versatile piece for any casual look.',
    sku: 'ST-005',
    category: 'Tops',
    instagramPostId: 'F_a0B0c6S5s'
  },
  {
    id: '6',
    title: 'Vintage Denim Skirt',
    brand: 'Gap',
    images: [
      'https://placehold.co/600x600/BDBDBD/4A4A4A?text=Skirt+1',
      'https://placehold.co/600x600/A8A8A8/333333?text=Skirt+2',
      'https://placehold.co/600x600/969696/2B2B2B?text=Skirt+3',
    ],
    price: 35.00,
    condition: 'Gently Used',
    size: '27',
    measurements: 'Waist: 27", Length: 18"',
    description: 'A line denim mini skirt from Gap. Great for summer and can be paired with almost anything!',
    sku: 'VDS-006',
    category: 'Bottoms',
    instagramPostId: 'G_b1C1d7T6t'
  }
];

// Helper function to get condition class
const getProductConditionClass = (condition) => {
  switch (condition) {
    case 'Excellent':
      return 'bg-green-100 text-green-800';
    case 'Gently Used':
      return 'bg-yellow-100 text-yellow-800';
    case 'Fair':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// ==============================
// 2. ICONS
// ==============================

// HIRA Logo SVG
const HiraLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-3.235 5.916A2.543 2.543 0 0 1 12 6.5c.895 0 1.76.365 2.378 1.016a3.84 3.84 0 0 0 1.258 2.553 5.483 5.483 0 0 1 1.944 3.111.75.75 0 0 0-.898.636 10.749 10.749 0 0 1-5.787 5.787.75.75 0 0 0-.636.898 5.483 5.483 0 0 1-3.111-1.944A3.84 3.84 0 0 0 6.5 14.378a2.543 2.543 0 0 1-1.666-2.378c0-.895.365-1.76 1.016-2.378a3.84 3.84 0 0 0 2.553-1.258Z"
      clipRule="evenodd"
    />
  </svg>
);

// Shopping Bag SVG
const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-6.497-.305-1.015A1.125 1.125 0 0 0 17.502 3H6.498a1.125 1.125 0 0 0-1.077.708L3.644 6.003V19.5a1.5 1.5 0 0 0 1.5 1.5h14.25a1.5 1.5 0 0 0 1.5-1.5V6.003Z" />
  </svg>
);

// Menu SVG
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

// Search SVG
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

// Heart SVG
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.933 0-3.63 1.104-4.312 2.753-.404.94-.972 1.838-1.745 2.651a1.2 1.2 0 0 1-.892.428h-.001c-.347 0-.687-.137-.939-.389l-2.022-2.022c-1.353-1.352-3.541-1.352-4.894 0-1.352 1.352-1.352 3.54 0 4.892l4.892 4.893c1.352 1.352 3.541 1.352 4.893 0l4.892-4.893c1.352-1.353 1.352-3.541 0-4.893Z" />
  </svg>
);

// Close SVG
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

// Instagram SVG
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2.516a.75.75 0 0 1 .798.02l5.503 3.924A.75.75 0 0 1 18 6.96v6.52a.75.75 0 0 1-.482.695l-5.504 3.925a.75.75 0 0 1-.798-.02l-5.503-3.924A.75.75 0 0 1 6 13.48V6.96a.75.75 0 0 1 .482-.695l5.503-3.924ZM12 4.965V18.99a.75.75 0 0 1-1.5 0V4.965a.75.75 0 0 1 1.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

// ==============================
// 3. PAGE COMPONENTS
// ==============================

// Header Component
const Header = ({ onNavigate, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white p-4 shadow-sm fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <MenuIcon />
          </button>
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
            <HiraLogo />
            <span className="font-playfair text-xl md:text-2xl font-bold text-gray-800">HIRA</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-gray-600 font-inter">
          <button className="hover:text-gray-900 transition-colors" onClick={() => onNavigate('home')}>Home</button>
          <button className="hover:text-gray-900 transition-colors" onClick={() => onNavigate('shop')}>Shop</button>
          <button className="hover:text-gray-900 transition-colors" onClick={() => onNavigate('contact')}>About</button>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => onNavigate('cart')} className="relative">
            <ShoppingBagIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-40 transition-transform transform md:hidden">
          <div className="p-6 flex justify-between items-center border-b">
            <span className="font-playfair text-2xl font-bold">HIRA</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col items-center mt-8 space-y-6 text-xl font-inter">
            <button className="hover:text-gray-900 transition-colors" onClick={() => handleMenuClick('home')}>Home</button>
            <button className="hover:text-gray-900 transition-colors" onClick={() => handleMenuClick('shop')}>Shop</button>
            <button className="hover:text-gray-900 transition-colors" onClick={() => handleMenuClick('contact')}>About</button>
            <button className="hover:text-gray-900 transition-colors" onClick={() => handleMenuClick('cart')}>Cart ({cartCount})</button>
          </nav>
        </div>
      )}
    </header>
  );
};

// Footer Component
const Footer = ({ onNavigate }) => (
  <footer className="bg-gray-100 py-8 mt-12">
    <div className="container mx-auto px-4 text-center text-gray-600">
      <div className="flex justify-center space-x-6 mb-4">
        <button onClick={() => onNavigate('home')} className="hover:text-gray-800">Home</button>
        <button onClick={() => onNavigate('shop')} className="hover:text-gray-800">Shop</button>
        <button onClick={() => onNavigate('contact')} className="hover:text-gray-800">About</button>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
          <InstagramIcon />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} HIRA. All Rights Reserved.</p>
    </div>
  </footer>
);

// Product Card Component
const ProductCard = ({ product, onNavigate }) => (
  <div onClick={() => onNavigate('product', product.id)} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300">
    <div className="w-full h-64 overflow-hidden">
      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 flex flex-col items-center text-center">
      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getProductConditionClass(product.condition)}`}>
        {product.condition}
      </span>
      <h3 className="text-lg font-semibold mt-2 text-gray-800">{product.title}</h3>
      <p className="text-gray-500 font-inter text-sm">{product.brand}</p>
      <p className="text-gray-900 text-xl font-bold mt-1">${product.price.toFixed(2)}</p>
    </div>
  </div>
);

// Home Page Component
const HomePage = ({ onNavigate }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="relative overflow-hidden rounded-xl shadow-lg mb-12">
      <img
        src="https://placehold.co/1200x600/E8D6D6/A87D8D?text=Hero+Banner"
        alt="Hero Banner"
        className="w-full h-96 object-cover"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-40 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white drop-shadow-lg">Discover Your Next Gem</h1>
        <p className="mt-4 text-lg md:text-xl text-white max-w-xl">
          Shop our curated collection of preloved clothing—unique pieces with a story.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </button>
      </div>
    </div>

    <h2 className="text-3xl font-playfair font-semibold text-center mb-8 text-gray-800">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {PRODUCTS.slice(0, 4).map(product => (
        <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
      ))}
    </div>
  </div>
);

// Shop Page Component
const ShopPage = ({ onNavigate, onAddToCart }) => {
  const [filters, setFilters] = useState({ condition: 'All', sortBy: 'low-to-high' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProducts = PRODUCTS
    .filter(product => {
      // Filter by condition
      const conditionMatch = filters.condition === 'All' || product.condition === filters.condition;
      // Filter by search term
      const searchMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return conditionMatch && searchMatch;
    })
    .sort((a, b) => {
      // Sort by price
      if (filters.sortBy === 'low-to-high') {
        return a.price - b.price;
      } else if (filters.sortBy === 'high-to-low') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-playfair font-bold text-center mb-4 text-gray-800">Shop All</h1>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search by title or brand"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <label htmlFor="condition" className="sr-only">Filter by Condition</label>
            <select
              id="condition"
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="All">All Conditions</option>
              <option value="Excellent">Excellent</option>
              <option value="Gently Used">Gently Used</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortBy" className="sr-only">Sort by Price</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = ({ onNavigate, productId, onAddToCart }) => {
  const product = PRODUCTS.find(p => p.id === productId);
  const [mainImage, setMainImage] = useState(product.images[0]);
  
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:space-x-8">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg mb-4">
            <img src={mainImage} alt={product.title} className="w-full h-auto object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800">{product.title}</h1>
          <p className="text-xl text-gray-500 mt-2">{product.brand}</p>
          <p className="text-4xl font-bold text-gray-900 mt-4">${product.price.toFixed(2)}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getProductConditionClass(product.condition)}`}>
              Condition: {product.condition}
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
              Size: {product.size}
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
              SKU: {product.sku}
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
          <p className="mt-2 text-gray-600 leading-relaxed">
            <span className="font-semibold">Measurements:</span> {product.measurements}
          </p>
          
          <button
            onClick={() => onAddToCart(product)}
            className="mt-8 w-full md:w-auto px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition-colors transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Page Component
const CartPage = ({ cart, onUpdateQuantity, onRemoveFromCart, onNavigate }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-playfair font-bold text-center mb-8 text-gray-800">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <button onClick={() => onNavigate('shop')} className="mt-4 text-pink-500 hover:underline">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center space-x-4 bg-white rounded-lg shadow p-4">
                <img src={item.product.images[0]} alt={item.product.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.product.title}</h3>
                  <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Size: {item.product.size}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="md:col-span-1 bg-gray-100 p-6 rounded-lg shadow mt-8 md:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={() => onNavigate('checkout')}
              className="mt-6 w-full py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Checkout Page Component
const CheckoutPage = ({ cart, onNavigate }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    console.log('Order Placed!', formData);
    setIsOrderPlaced(true);
    // In a real app, you would clear the cart here
  };

  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg md:text-xl text-gray-700">Your order has been placed successfully.</p>
        <button onClick={() => onNavigate('home')} className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-playfair font-bold text-center mb-8 text-gray-800">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-6 rounded-lg shadow mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium text-gray-800">{item.product.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-6 pt-6">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Order Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-playfair font-bold text-center mb-8 text-gray-800">About HIRA</h1>
    <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 space-y-6">
      <p>
        At **HIRA**, we believe that every piece of clothing has a story. Our mission is to give beautiful, preloved garments a second chance, helping to build a more sustainable and conscious fashion community. We carefully curate each item, ensuring that it meets our high standards for quality and style.
      </p>
      <p>
        HIRA was born from a passion for unique finds and a commitment to reducing textile waste. What started as a small personal collection has grown into a space where you can discover hidden gems and express your personal style in a way that's kind to the planet. Thank you for joining us on this journey!
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Contact Us</h2>
      <p className="text-center">
        For inquiries, please feel free to reach out.
      </p>
      <p className="text-center">
        **Email:** <a href="mailto:info@hira.com" className="text-pink-500 hover:underline">info@hira.com</a>
      </p>
      <p className="text-center">
        **Instagram:** <a href="https://www.instagram.com/hira.store" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">@hira.store</a>
      </p>
    </div>
  </div>
);

// ==============================
// 4. MAIN APP COMPONENT
// ==============================

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleNavigate = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(
        cart.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ShopPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
      case 'product':
        return <ProductDetailPage onNavigate={handleNavigate} productId={selectedProductId} onAddToCart={handleAddToCart} />;
      case 'cart':
        return <CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage cart={cart} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* Global CSS for body and fonts */}
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          color: #333;
          background-color: #f8f8f8;
        }
      `}</style>
      <div className="flex flex-col min-h-screen">
        <Header onNavigate={handleNavigate} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <main className="flex-grow mt-20">
          {renderPage()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
};

export default App;
