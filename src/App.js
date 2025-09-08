import React, { useState, useEffect, useRef } from 'react';

// Product data with pre-filled image URLs
const productsData = [
  { id: 1, category: 'Pipes', name: 'Nebula Glass Pipe', price: 49.99, description: 'A beautifully handcrafted glass pipe that glows with a faint purple hue. Inspired by cosmic dust clouds.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Glass+Pipe' },
  { id: 2, category: 'Bongs', name: 'Aurora Bong', price: 129.99, description: 'Experience the northern lights with this stunning, pearlescent bong. Features a unique water filtration system for a smooth draw.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Aurora+Bong' },
  { id: 3, category: 'Accessories', name: 'Amethyst Grinder', price: 29.99, description: 'A sleek, durable grinder made from polished amethyst-colored metal. Provides a perfect, consistent grind every time.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Amethyst+Grinder' },
  { id: 4, category: 'Bongs', name: 'Crystalline Dab Rig', price: 179.99, description: 'This dab rig is a true work of art. The glass is cut to refract light, creating a sparkling crystal effect.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Dab+Rig' },
  { id: 5, category: 'Accessories', name: 'Void Ashtray', price: 24.99, description: 'An elegant, matte black ashtray with a subtle, shimmering purple rim. A functional piece of decor for any space.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Void+Ashtray' },
  { id: 6, category: 'Accessories', name: 'Galaxy Rolling Tray', price: 34.99, description: 'A metallic rolling tray with a detailed, holographic galaxy print. Keep your accessories organized in style.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Rolling+Tray' },
  { id: 7, category: 'Pipes', name: 'Cosmic Traveler Pipe', price: 59.99, description: 'Compact and discreet, this pipe features a swirling galaxy pattern within the glass, perfect for on-the-go.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Traveler+Pipe' },
  { id: 8, category: 'Bongs', name: 'Stardust Waterfall Bong', price: 149.99, description: 'A tall bong with multiple percolators, creating a "waterfall" effect filled with shimmering gold flecks.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Waterfall+Bong' },
  { id: 9, category: 'Vapes', name: 'Lunar Pod System', price: 89.99, description: 'A sleek, refillable pod system vape with a long-lasting battery and quick heating technology.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Pod+Vape' },
  { id: 10, category: 'Vapes', name: 'Solaris Desktop Vaporizer', price: 249.99, description: 'A high-end desktop vaporizer with precise temperature control and a massive ceramic heating chamber.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Desktop+Vaporizer' },
  { id: 11, category: 'Pipes', name: 'Comet Chillum', price: 29.99, description: 'A small, powerful chillum with a thick glass body and a carb hole for full control.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Chillum' },
  { id: 12, category: 'Accessories', name: 'Cosmic Cleaner', price: 14.99, description: 'A premium cleaning solution designed to easily remove residue from all your glass pieces.', image: 'https://placehold.co/600x400/312e81/e9d5ff?text=Cleaner' },
];

const categoriesData = [
  { name: 'Pipes', icon: 'pipe' },
  { name: 'Bongs', icon: 'bong' },
  { name: 'Vapes', icon: 'vape' },
  { name: 'Accessories', icon: 'accessories' },
];

// Helper component for the glassy effect
const GlassyCard = ({ children, className }) => (
  <div className={`p-4 rounded-3xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] ${className}`}>
    {children}
  </div>
);

// Reusable Product Card Component
const ProductCard = ({ product, onSelectProduct, onAddToCart }) => (
  <GlassyCard className="flex flex-col items-center justify-between p-4 group">
    <div onClick={() => onSelectProduct(product.id)} className="w-full cursor-pointer hover:scale-105 transition-transform duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto rounded-xl object-cover mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
        onError={(e) => { e.target.src = 'https://placehold.co/600x400/312e81/c7d2fe?text=Image+Error'; }}
      />
      <h3 className="text-lg font-semibold text-fuchsia-200 truncate">{product.name}</h3>
      <p className="text-xl font-bold text-fuchsia-400 mt-2">${product.price.toFixed(2)}</p>
    </div>
    <button
      onClick={() => onAddToCart(product)}
      className="mt-4 w-full py-2 px-4 rounded-xl font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors duration-200"
    >
      Add to Cart
    </button>
  </GlassyCard>
);

// Function to return an SVG icon based on name
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'pipe':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M569.5 13.9c-4.9-10.8-15-17.7-26.6-18.7c-5.9-.5-11.9.4-17.4 2.8l-18.4 8.1c-14.9 6.6-26.8 17.1-34.5 30.6c-7.7 13.5-11.7 28.9-11.7 44.8v101.4l-118.7 52.3c-23.7 10.4-44.5 26.2-61.6 46.5c-17.1 20.3-30.5 44.2-40.2 70.4l-4.7 12.5c-1.3 3.5-2.8 7-4.5 10.4c-8 15.6-18 30.2-29.8 43.6s-26.3 25-41.6 33c-30.2 16.1-64.6 24.3-99.7 24.3C38.6 512 0 473.4 0 425.9c0-40 27.9-74.8 65.5-84.6l-5.7-1.4c-12.7-3.1-23.8-10.9-31.5-21.7s-11.7-24-11-37.5c.7-13.5 6.2-26.2 15.3-36.8s21.7-19.1 35.8-23.7c18.5-5.9 39.5-2.2 56 10.3c16.5 12.5 28.5 31.7 34.2 52.9c.7 2.7 1.4 5.3 2.1 7.9c1.9 6.8 4.2 13.5 6.7 20.2c.4 1.1.9 2.1 1.4 3.1c9.2 17.5 21.6 33.7 36.8 47.9s32.7 26.3 52.2 34.6c2.9 1.2 5.8 2.3 8.8 3.2c-5.8-22.1-13.8-43.9-23.8-64.8c-10.1-20.9-22-41.1-35.8-60.2l-14.7-20.7c-17.6-24.8-37.4-48.1-59.5-69.8c-22-21.7-46.5-41.2-72.9-57.9L161.4 89.2c-15.1-9.4-23.1-26.9-20.5-44.3c2.6-17.4 15.1-30.7 32-35.9c16.9-5.1 33.7-2.6 47.6 7.4L372 130.6c13.7 8.5 22.1 23.3 22.1 39.3v101.4c.1 12.8 3.5 25.4 10.1 36.5s15.9 20.7 26.6 28.8l105.1 79c8.2 6.1 18.2 9.5 28.5 9.5c.9 0 1.8 0 2.7-.1c18.5-1 34.1-13.3 40.5-31.4c2.8-8.1 3.5-16.7 1.7-25.2c-.3-1.6-1.5-2.8-3-3.7c-7.9-4.7-12.8-13.4-12.8-23.1c0-15.2 12.2-27.7 27.4-28.5c15.2-.8 28.6 11.1 29.4 26.3c.6 11.2-5 21.6-14.7 27.6l-3.3 2c-3.7 2.2-6 6.3-5.5 10.6c.6 4.3 3 8 6.7 10.2c27.5 16.5 60.1 24.3 93 23.4c21.8-.6 42.8-7.9 61.1-21.7s32.2-33.1 40-54.7c15.8-43.8 2.8-93.5-30-125.7z"/>
        </svg>
      );
    case 'bong':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
          <path d="M112 0c-35.3 0-64 28.7-64 64V256c0 53 14.1 103.5 40 148.6c-4.1-1.3-8.2-2.6-12.3-4c-28.3-9.5-56.7-14.2-84.6-14.2C13.1 386.4 0 399.5 0 415.7c0 16.2 13.1 29.3 29.3 29.3c33.3 0 65.6 10.3 92.4 29.2c16.3 11.5 35.3 17.9 55.3 17.9c13.7 0 27.1-3 39.8-8.8l4.4-2.1c8.9-4 17.5-8.8 25.8-14.4c1.9-1.3 3.8-2.6 5.6-4c6.2-4.5 12.1-9.4 17.8-14.6c1.1-1 2.2-2.1 3.2-3.2c5.6-5.4 10.9-11 15.9-16.9c-2.4 1.1-4.7 2.2-7 3.3c-28.3 13.4-56.9 22.8-85.2 27.8c-1.2 .2-2.5 .3-3.7 .5c-11.8 1.9-23.7 2.8-35.6 2.8c-1.3 0-2.6 0-3.9-.1c-1.7-.1-3.4-.2-5-.5c-15.6-2.5-30.8-7.8-45.1-15.8l-1.6-.9c-14.4-8-27.7-18.1-39.6-29.8c-11.9-11.7-22.3-25.2-30.9-40.4L13.8 274.9c-11.5-22.1-17.3-46.6-17.3-71.9c0-50.5 31-93.9 76.5-117.8c-15.3-21.4-24.8-47.5-24.8-75.1C48.2 28.7 76.8 0 112 0h243.6c-17.5-6.7-36.4-10.2-56.1-10.2H112zM272 64h48c8.8 0 16-7.2 16-16V32c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16z"/>
        </svg>
      );
    case 'vape':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M432 0c-44.2 0-80 35.8-80 80V96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H352V304c0 30.2-20.3 55.7-49.3 62.4c-4.4 1-8.7 2.4-12.7 4c-11.8 4.6-23.4 10.5-34.4 17.5c-6.8 4.4-13.3 9.3-19.4 14.6c-1.8 1.6-3.6 3.2-5.3 4.9c-4.7 4.7-9.1 9.7-13.1 15c-1.7 2.3-3.3 4.6-4.9 6.9c-1.8 2.7-3.6 5.3-5.1 8.2c-1.8 3.5-3.3 7-4.5 10.8c-1.3 3.9-2.3 7.8-3.1 11.8c-3.4 18.5-12.7 36.6-27.1 51.1c-14.4 14.4-32.5 23.8-51.1 27.1c-3.9 .7-7.9 1.8-11.8 3.1c-2.9 1.2-5.6 2.4-8.2 4.2c-2.3 1.6-4.6 3.3-6.9 4.9c-5.2 3.6-10.3 7.6-15 13.1c-1.7 1.9-3.4 3.6-4.9 5.3c-4.6 6-9.5 12.5-14.6 19.4c-7.1 11.2-13 22.8-17.5 34.4c-1.6 4-3 8.3-4.1 12.7c-6.8 29.1-32.3 49.3-62.4 49.3H0V432c0-8.8 7.2-16 16-16H32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H48 32c-17.7 0-32-14.3-32-32V432 0z"/>
        </svg>
      );
    case 'accessories':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M495 50.9C499.7 45.4 507.9 45.4 512.6 50.9l57.4 64.4c5.1 5.6 5.8 14.1 1.6 20.5l-63.5 96.6c-3.2 4.9-8.4 8.3-14.1 9.5s-11.7-1.4-15.6-5.2L424.4 179c-3.9-3.9-5.9-9.2-5.9-14.6c0-1.8 .3-3.7 .8-5.5l14.8-51.8c.8-2.9 2-5.6 3.6-8.1zM511.4 285.8c-11.2 11.3-24.3 20.3-38.9 26.6c-1.2 0-2.4 .4-3.6 .4c-1.2 0-2.4 0-3.6-.2c-39.7-7-70.3-39.9-76.3-80.1l-1.3-8.8c-.8-5.7-3.8-11-8.2-14.9L304.5 90.7C300 86.2 293.9 84 287.7 84c-3.1 0-6.2 .9-9.1 2.7l-20.9 13.4L112.1 63.8c-11.8-7.6-26.4-8.8-39.4-3.4c-13 5.4-23.2 15.6-28.6 28.6c-5.4 13-4.2 27.6 3.4 39.4L184.2 256H112c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16h-46.7c-6.8-9.4-11.3-19.9-13.6-31.1c-6.7-32.9 14.8-66.4 46.1-73.4l117.8-26.2c.4-.1 .8-.1 1.2-.2c35.4-8.7 73.1 3.5 96.9 29.5c.3 .3 .7 .6 1 .9c.6 .7 1.3 1.4 1.9 2.1c25.4 26.1 34.6 63.8 25.9 99.2c-1.1 4.5-2.7 8.9-4.8 13.2l-64 128c-3.2 6.3-10.4 10.1-17.7 9.5s-13.8-5.5-16.7-11.6l-50.7-105.1c-1.5-3.2-3.8-5.9-6.7-8.1l-61.9-44.2c-12.7-9.1-26.6-13.7-41-13.7H112c-44.2 0-80 35.8-80 80V416c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V256c0-21.7-5.5-42.3-15.6-60.8l56.8-40.6c11.3-8.1 25.9-5.1 34.1 6.2c8.1 11.3 5.1 25.9-6.2 34.1L458.7 224c-11 7.9-20.4 17.7-27.9 28.7L320 416c-3.1 4.8-5.2 10.1-6.1 15.5c-4.6 27.4 13.5 54.4 40.9 59c27.4 4.6 54.4-13.5 59-40.9c.9-5.6 2.5-11 4.8-16.2L498.4 290.5c1.1-2.4 2.1-4.8 3.2-7.2c.5-1.1 .9-2.2 1.4-3.3c3.4-7.4 5.2-15.1 5.2-23c0-11.7-4.4-22.6-12.3-31.2z"/>
        </svg>
      );
    default:
      return null;
  }
};

// Reusable Category Card Component
const CategoryCard = ({ category, onNavigate }) => (
  <div
    onClick={() => onNavigate('shop', category.name)}
    className="relative overflow-hidden rounded-3xl aspect-square cursor-pointer transition-transform duration-300 hover:scale-105 bg-gray-800 flex flex-col items-center justify-center p-4"
  >
    <div className="text-4xl sm:text-5xl text-fuchsia-400 mb-2">
      {getCategoryIcon(category.icon)}
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-white font-curly">{category.name}</h3>
  </div>
);

// Confirmation Modal Component
const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-violet-950 p-8 rounded-3xl shadow-2xl border border-fuchsia-400/20 max-w-sm w-full text-center">
      <h3 className="text-2xl font-bold text-fuchsia-200 mb-4 font-curly">{title}</h3>
      <p className="text-fuchsia-100 mb-6">{message}</p>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-xl text-fuchsia-200 border border-fuchsia-400/50 hover:bg-white/10 transition-colors duration-200"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-xl text-white font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors duration-200"
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

// App Component (Main)
const App = () => {
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageModal, setMessageModal] = useState({ visible: false, title: '', message: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [products, setProducts] = useState(productsData);
  const [categories, setCategories] = useState(categoriesData);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    } catch (error) {
      console.error("Failed to parse cart data from localStorage:", error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart data to localStorage:", error);
    }
  }, [cart]);

  const onSelectProduct = (id) => {
    setSelectedProductId(id);
    setPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onAddToCart = (product) => {
    setMessageModal({ visible: true, title: 'Success!', message: `${product.name} added to cart!` });
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const onRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      onRemoveFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const onClearCart = () => {
    setCart([]);
    setMessageModal({ visible: true, title: 'Order Placed!', message: 'Thank you for your purchase. Your order has been placed successfully!' });
    setShowConfirmModal(false);
    onNavigate('home');
  };

  const onNavigate = (targetPage, category = '') => {
    setPage(targetPage);
    setCategoryFilter(category);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Main Page Router
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ProductListingPage searchTerm={searchTerm} categoryFilter={categoryFilter} />;
      case 'details':
        const product = products.find(p => p.id === selectedProductId);
        return <ProductDetailsPage product={product} />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'categories':
        return <CategoriesPage />;
      default:
        return <HomePage />;
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Home Page
  const HomePage = () => (
    <>
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center p-4 text-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900 to-fuchsia-900 opacity-90 blur-3xl rounded-full scale-150 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-indigo-800 opacity-70 blur-3xl rounded-full scale-125 animate-pulse-fast"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl font-curly">
            Ignite Your Senses
          </h1>
          <p className="text-lg sm:text-xl text-fuchsia-200 drop-shadow-lg max-w-lg mx-auto mb-6">
            Explore our curated collection of artisanal glass and premium accessories.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="py-3 px-8 rounded-full text-lg font-semibold bg-fuchsia-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-200 mb-6 text-center font-curly">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-200 mb-6 text-center font-curly">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="p-8 rounded-3xl text-center bg-gradient-to-r from-purple-800 to-fuchsia-600 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-2 font-curly">20% Off Your First Order</h2>
          <p className="text-fuchsia-200 mb-6">Sign up for our newsletter to receive exclusive deals and updates.</p>
          <button
            onClick={() => onNavigate('shop')}
            className="py-3 px-8 rounded-full font-semibold bg-white text-fuchsia-700 transition-all duration-300 hover:scale-105"
          >
            Get the Deal
          </button>
        </div>
      </section>
    </>
  );

  // Product Listing Page
  const ProductListingPage = ({ searchTerm, categoryFilter }) => {
    const filteredProducts = products.filter(product =>
      (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
      (categoryFilter ? product.category === categoryFilter : true)
    );

    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-200 mb-6 text-center font-curly">
          {categoryFilter ? categoryFilter : 'Our Collection'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-fuchsia-200 text-lg">No products found.</div>
          )}
        </div>
      </div>
    );
  };

  // Categories Page
  const CategoriesPage = () => (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-200 mb-6 text-center font-curly">All Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );

  // Product Details Page
  const ProductDetailsPage = ({ product }) => {
    // Note: The review section has been removed as it requires a database.
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-white/10 bg-white/5 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-2xl object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/312e81/c7d2fe?text=Image+Error'; }}
              />
            </div>
            <GlassyCard className="p-6">
              <h1 className="text-3xl font-bold text-fuchsia-200 mb-2 font-curly">{product.name}</h1>
              <p className="text-4xl font-extrabold text-fuchsia-400 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-fuchsia-100 mb-6 leading-relaxed">{product.description}</p>
              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2" size={20}><path d="M11 15a4 4 0 0 0-3.34-4" /><path d="M14.5 13.5l-2.45-2.43 1.94-1.8 2.05 2.05-1.9 1.92Z" /><path d="M17.5 11.5 22 7l-5-5-5 5" /><path d="M19 15l-2-2" /><path d="M2 13c0-2.2.8-4.2 2.1-5.6L10 2l4.6 4.4c.7.9 1.4 1.9 1.5 3.1" /><path d="M12 22s-2-2-3.5-5.5a2.5 2.5 0 0 1 5 0C14.5 20 12 22 12 22Z" /></svg> Add to Cart
              </button>
            </GlassyCard>
          </div>
        ) : (
          <div className="text-center text-fuchsia-200">Product not found.</div>
        )}
      </div>
    );
  };

  // Cart Page
  const CartPage = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-200 mb-6 text-center font-curly">Your Cart</h2>
        <GlassyCard className="mb-8">
          {cart.length === 0 ? (
            <p className="text-center text-fuchsia-200 text-lg">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.id} className="flex items-center space-x-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" onError={(e) => { e.target.src = 'https://placehold.co/600x400/312e81/c7d2fe?text=Image+Error'; }} />
                  <div className="flex-1">
                    <p className="font-semibold text-fuchsia-100">{item.name}</p>
                    <p className="text-fuchsia-300 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-fuchsia-200 bg-white/10 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >-</button>
                    <span className="text-fuchsia-100 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-fuchsia-200 bg-white/10 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(item.id)} className="text-fuchsia-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x" size={20}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </GlassyCard>
        {cart.length > 0 && (
          <GlassyCard className="p-6 text-right">
            <h3 className="text-2xl font-bold text-fuchsia-100">Subtotal: <span className="text-fuchsia-400">${subtotal.toFixed(2)}</span></h3>
            <button
              onClick={() => onNavigate('checkout')}
              className="mt-6 w-full py-3 px-6 rounded-xl font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </GlassyCard>
        )}
      </div>
    );
  };

  // Checkout Page
  const CheckoutPage = () => (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-200 mb-6 text-center font-curly">Checkout</h2>
      <GlassyCard className="max-w-xl mx-auto p-6">
        <form className="space-y-4 text-fuchsia-100">
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input type="text" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input type="text" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input type="tel" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors" />
          </div>
          <div className="py-4 text-center text-lg font-bold text-fuchsia-400 border-t border-white/20">
            Placeholder Payment Section
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 transition-colors duration-200"
          >
            Place Order
          </button>
        </form>
      </GlassyCard>
    </div>
  );

  // Header Component
  const Header = () => (
    <header className="sticky top-0 z-50 py-4 px-6 sm:px-8 border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer mb-4 sm:mb-0" onClick={() => onNavigate('home')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf w-8 h-8 text-fuchsia-400"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 18.5 4.5c.7.1 1.4.2 2.1.3a2 2 0 0 0 1.5-2.4c-.1-.7-.8-1.3-1.5-1.4C16.1.7 15.1 2 11 8c-.8.5-1.5 1-2.2 1.5a6 6 0 0 0 3 9.5c.3.2.6.3 1 .5c.2-.2.4-.3.7-.6c-.2-.2-.5-.4-.7-.6-.3-.3-.6-.5-.9-.8z"/></svg>
          <span className="text-xl font-bold text-fuchsia-100 font-curly">Smoke Time</span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm sm:max-w-xs md:max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 pl-10 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors text-fuchsia-100 placeholder-fuchsia-300/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigate('shop');
              }
            }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-300" size={20}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0">
          <a onClick={() => onNavigate('home')} className="flex items-center text-fuchsia-100 hover:text-fuchsia-400 transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" size={20}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
          </a>
          <a onClick={() => onNavigate('shop')} className="flex items-center text-fuchsia-100 hover:text-fuchsia-400 transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" size={20}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 18.5 4.5c.7.1 1.4.2 2.1.3a2 2 0 0 0 1.5-2.4c-.1-.7-.8-1.3-1.5-1.4C16.1.7 15.1 2 11 8c-.8.5-1.5 1-2.2 1.5a6 6 0 0 0 3 9.5c.3.2.6.3 1 .5c.2-.2.4-.3.7-.6c-.2-.2-.5-.4-.7-.6-.3-.3-.6-.5-.9-.8z"/></svg>Shop
          </a>
          <a onClick={() => onNavigate('categories')} className="flex items-center text-fuchsia-100 hover:text-fuchsia-400 transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" size={20}><path d="M2.5 17a6 6 0 0 0 4.25-10.3A6 6 0 0 0 11.5 4c.3 0 .7.1 1 .2A6 6 0 0 1 20 5a6 6 0 0 1 0 12c-2.4 0-5.1-.9-7.1-2.9A6 6 0 0 0 2.5 17Z"/><path d="M14.5 9c-.8.8-2 .8-2.8 0"/><path d="m17 12-2-2"/><path d="m14 14-2-2"/><path d="m11 11-2-2"/></svg>
            Categories
          </a>
        </nav>

        {/* Icons and Mobile Menu Button */}
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="relative cursor-pointer" onClick={() => onNavigate('cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart text-fuchsia-200 hover:text-fuchsia-400 transition-colors duration-200" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-fuchsia-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
            )}
          </div>
          <div className="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-fuchsia-200 hover:text-fuchsia-400 transition-colors duration-200" ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-fuchsia-200 sm:hidden transition-transform duration-200"
          >
            {isMenuOpen ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x" size={28}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu" size={28}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
        <div className="absolute top-0 right-0 h-full w-3/4 bg-violet-950 p-6 flex flex-col items-start space-y-6 shadow-lg">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end text-fuchsia-200 hover:text-fuchsia-400 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x" size={28}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <a onClick={() => onNavigate('home')} className="flex items-center text-fuchsia-100 text-lg font-semibold hover:text-fuchsia-400 transition-colors duration-200 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home mr-3" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Home
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-auto" ><path d="m9 18 6-6-6-6"/></svg>
          </a>
          <a onClick={() => onNavigate('shop')} className="flex items-center text-fuchsia-100 text-lg font-semibold hover:text-fuchsia-400 transition-colors duration-200 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf mr-3" ><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 18.5 4.5c.7.1 1.4.2 2.1.3a2 2 0 0 0 1.5-2.4c-.1-.7-.8-1.3-1.5-1.4C16.1.7 15.1 2 11 8c-.8.5-1.5 1-2.2 1.5a6 6 0 0 0 3 9.5c.3.2.6.3 1 .5c.2-.2.4-.3.7-.6c-.2-.2-.5-.4-.7-.6-.3-.3-.6-.5-.9-.8z"/></svg> Shop
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-auto" ><path d="m9 18 6-6-6-6"/></svg>
          </a>
          <a onClick={() => onNavigate('categories')} className="flex items-center text-fuchsia-100 text-lg font-semibold hover:text-fuchsia-400 transition-colors duration-200 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles mr-3" ><path d="M2.5 17a6 6 0 0 0 4.25-10.3A6 6 0 0 0 11.5 4c.3 0 .7.1 1 .2A6 6 0 0 1 20 5a6 6 0 0 1 0 12c-2.4 0-5.1-.9-7.1-2.9A6 6 0 0 0 2.5 17Z"/><path d="M14.5 9c-.8.8-2 .8-2.8 0"/><path d="m17 12-2-2"/><path d="m14 14-2-2"/><path d="m11 11-2-2"/></svg> Categories
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-auto" ><path d="m9 18 6-6-6-6"/></svg>
          </a>
          <a onClick={() => onNavigate('cart')} className="flex items-center text-fuchsia-100 text-lg font-semibold hover:text-fuchsia-400 transition-colors duration-200 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart mr-3" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> Cart ({totalItems})
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-chevron-right ml-auto" ><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
      </div>
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="p-8 border-t border-white/10 backdrop-blur-sm bg-white/5 text-fuchsia-200">
      <div className="container mx-auto text-center space-y-6">
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-fuchsia-400 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram" ><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg></a>
          <a href="#" className="hover:text-fuchsia-400 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter" ><path d="M22 4s-.7 2.1-2 3.4c-.6.8-1.5 1.5-2.4 1.7a2 2 0 0 1-2.9-.6c-1.2-1.2-2.3-2.3-3.6-2.9-2.2-.8-4.1-.3-5.3.8-1.1.9-1.5 2.1-1.2 3.6.4 1.7 2.2 3.2 4.1 4.2 1.9 1 3.8 1.5 5.7 1.2s3.6-.8 4.9-2.1c.9-.9 1.7-2.1 2.3-3.4.6-1.3.8-2.6.4-4-1.1-3.6-4.5-5.9-8.4-5.9-2.3 0-4.5.7-6.3 2.1-1.8 1.4-3.1 3.2-3.8 5.2-.7 2-.5 4.1.3 6.1s2 3.8 3.6 5.3c1.6 1.5 3.5 2.7 5.7 3.3 2.2.6 4.5.3 6.5-.9 2-.9 3.6-2.4 4.8-4.4a8 8 0 0 0 .9-3.7V9a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.7c-.1-.1-.3-.2-.5-.3a5 5 0 0 0-5.3-.8c-1.3.6-2.5 1.7-3.6 2.9-1.1 1.2-1.5 2.4-1.2 3.6s2.2 3.2 4.1 4.2c1.9 1 3.8 1.5 5.7 1.2s3.6-.8 4.9-2.1c.9-.9 1.7-2.1 2.3-3.4.6-1.3.8-2.6.4-4-1.1-3.6-4.5-5.9-8.4-5.9z"/></svg></a>
          <a href="#" className="hover:text-fuchsia-400 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook" ><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 font-curly">Join Our Newsletter</h3>
          <p className="text-sm mb-4">Stay up-to-date with our latest drops and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-64 p-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-fuchsia-400 transition-colors text-fuchsia-100"
            />
            <button
              className="w-full sm:w-auto py-2 px-6 rounded-xl font-semibold bg-fuchsia-600 text-white hover:bg-fuchsia-500 transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
        <p className="text-sm opacity-50">&copy; 2024 Smoke Time. All rights reserved.</p>
      </div>
    </footer>
  );

  return (
    <div className="font-poppins text-white min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-purple-900 overflow-x-hidden">
      {/* Google Fonts Link */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

        .font-curly {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      {/* Message Modal */}
      {messageModal.visible && (
        <ConfirmationModal
          title={messageModal.title}
          message={messageModal.message}
          onConfirm={() => setMessageModal({ visible: false })}
          confirmText="OK"
        />
      )}
      {/* Checkout Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          title="Confirm Your Order"
          message="Are you sure you want to place this order?"
          onConfirm={onClearCart}
          onCancel={() => setShowConfirmModal(false)}
          confirmText="Place Order"
        />
      )}
    </div>
  );
};

export default App;
