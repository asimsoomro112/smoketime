import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
// Load THREE.js from CDN
const threeCDN = document.createElement('script');
threeCDN.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
document.head.appendChild(threeCDN);
// Load OrbitControls from CDN
const orbitControlsCDN = document.createElement('script');
orbitControlsCDN.src = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";
document.head.appendChild(orbitControlsCDN);
// Load Tailwind CSS from CDN
const tailwindCDN = document.createElement('script');
tailwindCDN.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindCDN);

// Create a context for the shopping cart
const CartContext = createContext();

const initialProducts = [
  { id: 'prod1', name: 'Premium Grinder', price: 29.99, image: 'https://placehold.co/600x400/581c87/ffffff?text=Grinder', category: 'Grinders', description: 'A high-quality, four-piece grinder made from aerospace-grade aluminum. Features a magnetic lid and a fine mesh screen for pollen collection.', stock: 50, rating: 4.8 },
  { id: 'prod2', name: 'Glass Bong', price: 89.50, image: 'https://placehold.co/600x400/581c87/ffffff?text=Bong', category: 'Bongs', description: 'Hand-blown borosilicate glass bong with intricate percolator. Provides smooth hits and is easy to clean.', stock: 20, rating: 4.9 },
  { id: 'prod3', name: 'Rolling Papers (Pack)', price: 4.99, image: 'https://placehold.co/600x400/581c87/ffffff?text=Papers', category: 'Papers', description: 'Organic hemp rolling papers. Slow-burning and unbleached for a natural experience.', stock: 200, rating: 4.5 },
  { id: 'prod4', name: 'Vape Pen Kit', price: 49.99, image: 'https://placehold.co/600x400/581c87/ffffff?text=Vape+Pen', category: 'Vapes', description: 'Compact and discreet vape pen kit. Comes with a rechargeable battery and a USB charger. Compatible with most cartridges.', stock: 35, rating: 4.7 },
  { id: 'prod5', name: 'Ash Catcher', price: 24.99, image: 'https://placehold.co/600x400/581c87/ffffff?text=Ash+Catcher', category: 'Bongs', description: 'A simple yet effective ash catcher to keep your bong clean. Made from durable glass.', stock: 40, rating: 4.2 },
  { id: 'prod6', name: 'Herb Storage Jar', price: 15.00, image: 'https://placehold.co/600x400/581c87/ffffff?text=Jar', category: 'Accessories', description: 'Airtight storage jar to keep your herbs fresh. UV-resistant glass.', stock: 75, rating: 4.6 },
  { id: 'prod7', name: 'Silicone Dab Mat', price: 12.50, image: 'https://placehold.co/600x400/581c87/ffffff?text=Mat', category: 'Accessories', description: 'Heat-resistant and non-stick silicone mat. Perfect for dabbing or as a protective surface.', stock: 90, rating: 4.4 },
  { id: 'prod8', name: 'Digital Scale', price: 25.99, image: 'https://placehold.co/600x400/581c87/ffffff?text=Scale', category: 'Accessories', description: 'Pocket-sized digital scale with high precision. Includes a backlit LCD screen.', stock: 60, rating: 4.7 },
];

// Reusable SVG icons
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.278 3.32 12 4 12h14a1 1 0 000-2h-1.585a1.5 1.5 0 01-1.425-1.127l-3.354-8.736A.999.999 0 008 1H4a1 1 0 000 2h.242l-.242.484V3a1 1 0 000 2v.228l-.332-.332a.999.999 0 00-.071-.05L4.542 3.844.757 2.059a1 1 0 00-.757-.059H3zm13 8a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1zM5 19a2 2 0 11-4 0 2 2 0 014 0zM17 19a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const HomeIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isActive ? 'text-indigo-400' : 'text-gray-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0v-9.5a1 1 0 011-1h4a1 1 0 011 1V21" />
  </svg>
);
const CategoryIconNav = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isActive ? 'text-indigo-400' : 'text-gray-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);
const AboutIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isActive ? 'text-indigo-400' : 'text-gray-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ContactIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isActive ? 'text-indigo-400' : 'text-gray-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
  </svg>
);

const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'Grinders': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-400"><circle cx="12" cy="12" r="10"></circle><path d="M16 12L8 12M12 16L12 8"></path></svg>;
    case 'Bongs': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-400"><path d="M12 2L12 10M12 10C16 10 20 6 20 6L12 10M12 10C8 10 4 6 4 6L12 10V22"></path></svg>;
    case 'Papers': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-400"><path d="M14 2L20 8L20 22L4 22L4 2L14 2Z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 10L12 18M16 14L8 14"></path></svg>;
    case 'Vapes': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-400"><path d="M16 20V14C16 11.2386 13.7614 9 11 9H10V4C10 2.89543 9.10457 2 8 2C6.89543 2 6 2.89543 6 4V9H5C2.23858 9 0 11.2386 0 14V20C0 21.1046 0.89543 22 2 22H14C15.1046 22 16 21.1046 16 20Z"></path></svg>;
    case 'Accessories': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-400"><circle cx="12" cy="12" r="3"></circle><path d="M19 12L22 12M12 19L12 22M12 5L12 2M5 12L2 12"></path><path d="M19.0711 19.0711L21.1924 21.1924M2.8076 2.8076L4.9289 4.9289M19.0711 4.9289L21.1924 2.8076M2.8076 21.1924L4.9289 19.0711"></path></svg>;
    default: return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.6"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
  }
};


// 3D Logo Component using Three.js
const ThreeDLogo = ({ onClick }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Wait for THREE.js and OrbitControls to be available
    const waitForLibs = setInterval(() => {
      if (typeof window.THREE !== 'undefined' && typeof window.THREE.OrbitControls !== 'undefined') {
        clearInterval(waitForLibs);
        initThreeD();
      }
    }, 100);

    const initThreeD = () => {
      if (!mountRef.current) return;

      const scene = new window.THREE.Scene();
      const camera = new window.THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Create a 3D torus knot
      const geometry = new window.THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
      const material = new window.THREE.MeshStandardMaterial({
        color: 0x8a2be2,
        metalness: 0.8,
        roughness: 0.1,
        transparent: true,
        opacity: 0.8,
        emissive: 0x4b0082,
        emissiveIntensity: 0.5,
      });
      const torusKnot = new window.THREE.Mesh(geometry, material);
      scene.add(torusKnot);

      // Add lights
      const pointLight1 = new window.THREE.PointLight(0xffffff, 1);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);
      const pointLight2 = new window.THREE.PointLight(0x8a2be2, 1);
      pointLight2.position.set(-5, -5, 5);
      scene.add(pointLight2);
      const ambientLight = new window.THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      camera.position.z = 5;

      const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };

      // Animation loop
      const animate = () => {
        if (!mountRef.current) return;
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.008;
        renderer.render(scene, camera);
      };
      
      const controls = new window.THREE.OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      
      window.addEventListener('resize', handleResize);
      animate();

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose();
        geometry.dispose();
        material.dispose();
      };
    };

    // Initial check
    if (typeof window.THREE !== 'undefined' && typeof window.THREE.OrbitControls !== 'undefined') {
      initThreeD();
    }
  }, []);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
    />
  );
};

// Global state provider for the cart
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

const Header = ({ currentPage, setCurrentPage, toggleCartModal, cartItemCount }) => {
  const pages = [
    { name: 'Home', id: 'home', icon: HomeIcon },
    { name: 'Categories', id: 'categories', icon: CategoryIconNav },
    { name: 'About', id: 'about', icon: AboutIcon },
    { name: 'Contact', id: 'contact', icon: ContactIcon },
    { name: 'Cart', id: 'cart', icon: CartIcon },
  ];

  return (
    <header>
      {/* Desktop Header */}
      <div className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-purple-950/70 backdrop-blur-md shadow-lg rounded-b-3xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ThreeDLogo onClick={() => setCurrentPage('home')} />
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-wider">Smoke Time</h1>
          </div>
          <nav className="flex space-x-8 text-lg font-medium">
            {pages.map(page => (
              <a
                key={page.id}
                onClick={() => {
                  if (page.id === 'cart') {
                    toggleCartModal();
                  } else {
                    setCurrentPage(page.id);
                  }
                }}
                className={`cursor-pointer transition-colors duration-300 relative group
                  ${currentPage === page.id ? 'text-purple-500' : 'text-gray-200 hover:text-purple-400'}
                `}
              >
                {page.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
                  ${currentPage === page.id ? 'scale-x-100' : ''}`}
                ></span>
              </a>
            ))}
            <div className="relative">
              <button onClick={toggleCartModal} className="relative p-2 rounded-full hover:bg-purple-600/50 transition-colors duration-300">
                <CartIcon className="text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Mobile Header (Bottom Fixed) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-2xl rounded-t-3xl border-t border-purple-500/30">
        <nav>
          <ul className="flex justify-around items-center text-gray-600 py-2">
            {pages.map(page => (
              <li key={page.id} className="flex flex-col items-center space-y-1 nav-link">
                <div
                  onClick={() => {
                    if (page.id === 'cart') {
                      toggleCartModal();
                    } else {
                      setCurrentPage(page.id);
                    }
                  }}
                  className={`
                    flex flex-col items-center space-y-1 transition-all duration-300
                    cursor-pointer hover:text-purple-400
                  `}
                >
                  <div className={`
                    icon-container flex items-center justify-center p-2 rounded-full transition-all duration-300
                    ${currentPage === page.id ? 'bg-purple-600/30' : ''}
                    hover:bg-purple-600/30
                  `}>
                    {page.id === 'cart' ? (
                      <div className="relative">
                        <CartIcon className={`w-6 h-6 ${currentPage === page.id ? 'text-indigo-400' : 'text-gray-200'}`} />
                        {cartItemCount > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {cartItemCount}
                          </span>
                        )}
                      </div>
                    ) : (
                      <page.icon isActive={currentPage === page.id} />
                    )}
                  </div>
                  <span className={`
                    text-xs font-medium transition-colors duration-300
                    ${currentPage === page.id ? 'text-indigo-400' : 'text-gray-300'}
                  `}>
                    {page.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-purple-950/50 text-white py-8 mt-12 rounded-t-3xl backdrop-blur-md">
    <div className="container mx-auto px-4 text-center">
      <p className="text-lg font-bold mb-2">Smoke Time</p>
      <p className="text-sm text-gray-400">© 2024 All rights reserved.</p>
    </div>
  </footer>
);

const ProductCard = ({ product, setCurrentPage, setSelectedProduct }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="relative group bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-purple-500/30 transition-all duration-500 hover:shadow-2xl overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-2xl cursor-pointer"
        onClick={() => {
          setSelectedProduct(product);
          setCurrentPage('product');
        }}
      />
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{product.name}</h3>
        <p className="text-sm text-gray-300 capitalize">{product.category}</p>
        <div className="flex justify-between items-center mt-3 md:mt-4">
          <p className="text-lg md:text-xl font-bold text-purple-400">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-purple-600 text-white text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-purple-500 transition-colors duration-300 flex items-center space-x-1 md:space-x-2"
          >
            <CartIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CartModal = ({ isOpen, toggleCartModal, setCurrentPage }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
      <div className="bg-white/10 backdrop-blur-lg w-full md:w-1/3 p-4 md:p-8 shadow-2xl overflow-y-auto transform transition-transform duration-300 translate-x-0 border-l border-purple-500/50 rounded-l-3xl">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-white">Shopping Cart</h2>
          <button onClick={toggleCartModal} className="text-gray-300 hover:text-white transition-colors duration-300">
            <XIcon className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-center text-gray-400 text-sm md:text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4 md:space-y-6">
              {cart.map(item => (
                <li key={item.id} className="flex items-center space-x-2 md:space-x-4 border-b border-white/20 pb-4 md:pb-6">
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm md:text-lg">{item.name}</h3>
                    <p className="text-xs md:text-sm text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/10 rounded-full p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full text-white hover:bg-white/20 transition-colors">
                      <MinusIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <span className="font-bold text-white text-sm md:text-base">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full text-white hover:bg-white/20 transition-colors">
                      <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <XIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 md:mt-8 border-t border-white/20 pt-4 md:pt-6">
              <div className="flex justify-between items-center text-xl md:text-2xl font-bold text-white">
                <span>Total:</span>
                <span className="text-purple-400">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('checkout');
                  toggleCartModal();
                }}
                className="mt-4 md:mt-6 w-full bg-purple-600 text-white font-bold py-3 md:py-4 rounded-full hover:bg-purple-500 transition-colors duration-300 shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const featuredProducts = initialProducts.slice(0, 4);
  const categories = [...new Set(initialProducts.map(p => p.category))];

  return (
    <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-white/10 backdrop-blur-sm text-white rounded-3xl shadow-lg border border-purple-500/30 p-6 md:p-16 text-center">
        <h2 className="text-2xl md:text-5xl font-extrabold mb-2 md:mb-4 leading-tight">Your Portal to Premium Smoke Accessories</h2>
        <p className="text-sm md:text-xl mb-6 md:mb-8 opacity-80">Discover a curated collection of high-quality, innovative accessories for a superior experience.</p>
        <button
          onClick={() => setCurrentPage('categories')}
          className="relative group bg-purple-600 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-lg shadow-lg overflow-hidden
          transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center space-x-1 md:space-x-2 mx-auto">
            <CartIcon className="w-5 h-5 md:w-6 md:h-6" />
            <span>Shop by Category</span>
          </span>
          <span className="absolute inset-0 bg-purple-500/50 transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </button>
      </section>

      {/* Featured Products */}
      <section className="mt-12 md:mt-20">
        <h3 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-white">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              setCurrentPage={setCurrentPage}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

const CategoriesPage = ({ setCurrentPage, setSelectedCategory }) => {
  const categories = [...new Set(initialProducts.map(p => p.category))];
  return (
    <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32 min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-white">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage('shop');
            }}
            className="flex flex-col items-center justify-center p-6 md:p-8 bg-white/10 backdrop-blur-sm text-purple-400 rounded-3xl shadow-lg border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <CategoryIcon category={category} />
            <span className="mt-2 md:mt-4 text-lg md:text-xl font-bold capitalize text-white">{category}</span>
          </button>
        ))}
      </div>
    </main>
  );
};

const ShopPage = ({ setCurrentPage, setSelectedProduct, selectedCategory }) => {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({ category: selectedCategory, sort: 'popularity' });
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...new Set(initialProducts.map(p => p.category))];

  useEffect(() => {
    let filtered = initialProducts;

    if (filters.category !== 'All' && filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'popularity') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filtered);
  }, [filters, searchTerm, selectedCategory]);

  return (
    <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-white">{selectedCategory} Products</h2>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-500/30">
        <div className="flex-1 w-full md:w-auto mb-4 md:mb-0 md:mr-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white/20 bg-white/10 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap space-x-2 md:space-x-4 items-center text-gray-300">
          <label htmlFor="category-filter" className="font-medium hidden md:block">Category:</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-1 text-sm md:px-4 md:py-2 border border-white/20 bg-white/10 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label htmlFor="sort-filter" className="font-medium hidden md:block">Sort by:</label>
          <select
            id="sort-filter"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-3 py-1 text-sm md:px-4 md:py-2 border border-white/20 bg-white/10 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              setCurrentPage={setCurrentPage}
              setSelectedProduct={setSelectedProduct}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </main>
  );
};

const ProductDetailPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  if (!product) {
    return (
      <div className="container mx-auto px-4 pb-20 pt-24 md:pt-32 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Product not found.</h2>
        <button onClick={() => setCurrentPage('categories')} className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-500 transition-colors text-sm">
          Back to Categories
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setMessage(`${quantity} ${product.name}(s) added to cart!`);
    setQuantity(1);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32">
      <button onClick={() => setCurrentPage('shop')} className="text-purple-400 font-bold mb-6 md:mb-8 flex items-center transition-colors hover:text-purple-500 text-sm md:text-base">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-purple-500/30">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20">
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>

        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 text-white">{product.name}</h2>
          <p className="text-lg md:text-xl font-bold text-purple-400 mb-2 md:mb-4">${product.price.toFixed(2)}</p>
          <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">{product.description}</p>
          
          <div className="flex flex-wrap items-center mb-2 md:mb-4">
            <span className="text-xs md:text-sm font-semibold text-gray-400 mr-2">Category:</span>
            <span className="capitalize bg-purple-600 text-white text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full">{product.category}</span>
          </div>

          <div className="flex items-center mb-4 md:mb-6">
            <span className="text-xs md:text-sm font-semibold text-gray-400 mr-2">Stock:</span>
            <span className={`font-bold text-xs md:text-sm ${product.stock > 10 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 mb-4 md:mb-8">
            <div className="flex items-center border border-white/20 bg-white/10 rounded-full px-2 py-0.5 md:px-3 md:py-1 text-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-0.5 md:p-1 rounded-full hover:bg-white/20"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="px-2 md:px-4 text-base md:text-lg font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-0.5 md:p-1 rounded-full hover:bg-white/20"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 font-bold py-2 md:py-3 rounded-full text-white transition-colors duration-300 text-sm md:text-base ${
                product.stock === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <CartIcon className="w-5 h-5 md:w-6 md:h-6" />
                <span>Add to Cart</span>
              </div>
            </button>
          </div>
          {message && (
            <div className="bg-green-700/50 text-white p-2 md:p-3 rounded-md text-center mt-2 md:mt-4 border border-green-500/50 text-sm">
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const CheckoutPage = ({ setCurrentPage }) => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (Math.random() > 0.1) {
        setIsSuccess(true);
        clearCart();
      } else {
        setIsError(true);
      }
    }, 2000);
  };
  
  const total = cartTotal;

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 pb-20 pt-24 md:pt-32 text-center min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white/10 backdrop-blur-sm text-white p-6 md:p-8 rounded-3xl shadow-lg border border-purple-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24 mx-auto mb-2 md:mb-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Order Confirmed!</h2>
          <p className="text-sm md:text-lg text-gray-300">Thank you for your purchase. A confirmation email has been sent.</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-4 md:mt-6 bg-purple-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full hover:bg-purple-500 transition-colors text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 pb-20 pt-24 md:pt-32 text-center min-h-screen flex flex-col justify-center items-center">
        <div className="bg-red-900/50 backdrop-blur-sm text-white p-6 md:p-8 rounded-3xl shadow-lg border border-red-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24 mx-auto mb-2 md:mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Payment Failed</h2>
          <p className="text-sm md:text-lg text-gray-300">Please try again or use a different payment method.</p>
          <button
            onClick={() => { setIsError(false); setIsProcessing(false); }}
            className="mt-4 md:mt-6 bg-red-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full hover:bg-red-700 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32 min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-white">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        <div className="p-4 md:p-6 rounded-3xl shadow-lg bg-white/10 backdrop-blur-sm border border-purple-500/30 order-last lg:order-first">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300 text-sm">{item.name} x {item.quantity}</span>
                  <span className="font-semibold text-white text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center font-bold text-lg mt-4 pt-4 border-t-2 border-white/30 text-white">
                <span>Total:</span>
                <span className="text-purple-400">${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 md:p-6 rounded-3xl shadow-lg bg-white/10 backdrop-blur-sm border border-purple-500/30">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Customer & Payment Details</h3>
          <form onSubmit={handlePayment} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input type="text" id="name" required className="w-full px-3 py-2 text-sm border border-white/20 bg-white/10 text-white rounded-md focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" id="email" required className="w-full px-3 py-2 text-sm border border-white/20 bg-white/10 text-white rounded-md focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Shipping Address</label>
              <input type="text" id="address" required className="w-full px-3 py-2 text-sm border border-white/20 bg-white/10 text-white rounded-md focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <label htmlFor="card" className="block text-sm font-medium text-gray-300 mb-1">Credit Card Number</label>
              <input type="text" id="card" required className="w-full px-3 py-2 text-sm border border-white/20 bg-white/10 text-white rounded-md focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <button
              type="submit"
              disabled={isProcessing || cart.length === 0}
              className={`w-full font-bold py-2 md:py-3 rounded-full text-white text-sm md:text-base transition-colors duration-300 ${
                isProcessing || cart.length === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Contact form submitted!');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32 min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">Contact Us</h2>
      <div className="max-w-xl mx-auto p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-purple-500/30">
        {isSubmitted ? (
          <div className="text-center text-sm md:text-lg text-purple-400 font-semibold">
            Thank you for your message! We will get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" required className="mt-1 block w-full rounded-md border-white/20 bg-white/10 text-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" required className="mt-1 block w-full rounded-md border-white/20 bg-white/10 text-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" rows="4" required className="mt-1 block w-full rounded-md border-white/20 bg-white/10 text-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-sm"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 md:py-3 rounded-full hover:bg-purple-500 transition-colors text-sm md:text-base"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

const AboutPage = () => (
  <main className="container mx-auto px-4 pb-20 pt-24 md:pt-32 min-h-screen">
    <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">About Us</h2>
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-purple-500/30 text-sm md:text-lg space-y-4 md:space-y-6 text-gray-300 leading-relaxed">
      <p>
        At <span className="font-bold text-purple-400">Smoke Time</span>, we are passionate about providing the highest quality weed accessories for enthusiasts and connoisseurs alike. Our journey began with a simple idea: to create a one-stop shop where customers can find a curated selection of products that are not only functional but also beautifully designed and durable.
      </p>
      <p>
        We believe in quality over quantity. That's why every product in our store is carefully chosen and tested to meet our strict standards. From precision-engineered grinders to elegant, hand-blown glass pieces, we ensure that every item enhances your experience.
      </p>
      <p>
        Customer satisfaction is our top priority. We are committed to providing an exceptional shopping experience, from our user-friendly website to our dedicated customer support. Thank you for choosing us to be a part of your journey.
      </p>
    </div>
  </main>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart } = useContext(CartContext);

  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  let PageComponent;
  switch (currentPage) {
    case 'home':
      PageComponent = <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      break;
    case 'categories':
      PageComponent = <CategoriesPage setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />;
      break;
    case 'shop':
      PageComponent = <ShopPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} selectedCategory={selectedCategory} />;
      break;
    case 'product':
      PageComponent = <ProductDetailPage product={selectedProduct} setCurrentPage={setCurrentPage} />;
      break;
    case 'checkout':
      PageComponent = <CheckoutPage setCurrentPage={setCurrentPage} />;
      break;
    case 'about':
      PageComponent = <AboutPage />;
      break;
    case 'contact':
      PageComponent = <ContactPage />;
      break;
    default:
      PageComponent = <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
  }

  return (
    <div className="font-sans bg-gray-950 text-white min-h-screen flex flex-col antialiased">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        toggleCartModal={toggleCartModal}
        cartItemCount={cartItemCount}
      />
      <div className="flex-grow">
        {PageComponent}
      </div>
      <CartModal
        isOpen={isCartModalOpen}
        toggleCartModal={toggleCartModal}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
};

// Main component wrapped with the CartProvider
const Root = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default Root;
