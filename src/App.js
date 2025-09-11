import React, { useState, useEffect, createContext, useContext, useRef } from 'react';

// --- MOCK DATA ---
// In a real app, this would come from an API
const mockProducts = [
  {
    id: 1,
    name: 'Nebula Beaker Bong',
    category: 'Bongs',
    price: 8500,
    image: 'https://placehold.co/400x400/1a1a1a/a855f7?text=Nebula+Bong',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'A 12-inch beaker bong made from high-quality borosilicate glass, featuring a stunning nebula design. Perfect for smooth, filtered hits.',
    options: { Color: ['Cosmic Purple', 'Galaxy Green'], Size: ['12 inch'] }
  },
  {
    id: 2,
    name: 'Quantum Grinder',
    category: 'Grinders',
    price: 4200,
    image: 'https://placehold.co/400x400/1a1a1a/22c55e?text=Quantum+Grinder',
    stockStatus: 'In Stock',
    bestseller: true,
    rating: 4.9,
    description: 'Precision-engineered 4-piece grinder made from aerospace-grade aluminum. Diamond-cut teeth for a fluffy grind every time.',
    options: { Color: ['Matte Black', 'Chrome Silver'] }
  },
  {
    id: 3,
    name: 'Oracle Organic Papers',
    category: 'Rolling Papers',
    price: 550,
    image: 'https://placehold.co/400x400/1a1a1a/f472b6?text=Oracle+Papers',
    stockStatus: 'Limited',
    rating: 4.5,
    description: 'King-size slim rolling papers made from 100% unbleached, organic hemp. Slow-burning for a premium experience.',
    options: { Pack: ['Single', 'Box of 50'] }
  },
  {
    id: 4,
    name: 'Aether Vape Pen',
    category: 'Vapes',
    price: 12500,
    image: 'https://placehold.co/400x400/1a1a1a/38bdf8?text=Aether+Vape',
    stockStatus: 'Sold Out',
    rating: 4.7,
    description: 'A sleek and powerful vape pen with variable voltage settings and a ceramic coil for pure flavor. Long-lasting battery.',
    options: { Color: ['Onyx Black', 'Pearl White'] }
  },
  {
    id: 5,
    name: 'Cyberpunk Stash Jar',
    category: 'Lifestyle',
    price: 3800,
    image: 'https://placehold.co/400x400/1a1a1a/a855f7?text=Stash+Jar',
    stockStatus: 'In Stock',
    rating: 4.6,
    description: 'An airtight, UV-protected glass jar with a futuristic cyberpunk design. Keeps your stash fresh and discreet.',
    options: { Size: ['100ml', '250ml'] }
  },
  {
    id: 6,
    name: 'Vortex Gravity Bong',
    category: 'Bongs',
    price: 25000,
    image: 'https://placehold.co/400x400/1a1a1a/22c55e?text=Gravity+Bong',
    stockStatus: 'In Stock',
    bestseller: true,
    rating: 5.0,
    description: 'Experience the future of smoking with this 360° rotating glass gravity bong. Delivers kinetic motion activation and contactless consumption.',
    options: { Color: ['Black/Gold', 'White/Chrome'] }
  },
  {
    id: 7,
    name: 'Chrono-Grind Electric Grinder',
    category: 'Grinders',
    price: 7800,
    image: 'https://placehold.co/400x400/1a1a1a/f472b6?text=Electric+Grinder',
    stockStatus: 'Limited',
    rating: 4.8,
    description: 'USB-C rechargeable electric grinder. Effortlessly grinds your herbs to the perfect consistency in seconds.',
    options: { Color: ['Gunmetal Grey', 'Rose Gold'] }
  },
  {
    id: 8,
    name: 'Zenith Pre-Rolled Cones',
    category: 'Rolling Papers',
    price: 1200,
    image: 'https://placehold.co/400x400/1a1a1a/38bdf8?text=Zenith+Cones',
    stockStatus: 'In Stock',
    rating: 4.4,
    description: 'Pack of 50 king-size pre-rolled cones. Made from ultra-thin rice paper for a clean, tasteless smoke.',
    options: { Size: ['King Size', '98 Special'] }
  },
  {
    id: 9,
    name: 'Pulsar Dry Herb Vaporizer',
    category: 'Vapes',
    price: 18000,
    image: 'https://placehold.co/400x400/1a1a1a/a855f7?text=Pulsar+Vape',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'A premium convection vaporizer with precise temperature control, a ceramic chamber, and a glass mouthpiece for unparalleled flavor.',
    options: { Color: ['Carbon Fiber', 'Anodized Blue'] }
  },
  {
    id: 10,
    name: 'Glitch Rolling Tray',
    category: 'Lifestyle',
    price: 2500,
    image: 'https://placehold.co/400x400/1a1a1a/22c55e?text=Rolling+Tray',
    stockStatus: 'In Stock',
    bestseller: true,
    rating: 4.7,
    description: 'A durable metal rolling tray with a unique, animated glitch art design. Raised edges keep your herbs contained.',
    options: { Size: ['Small', 'Medium'] }
  },
  {
    id: 11,
    name: 'Matrix Silicone Bong',
    category: 'Bongs',
    price: 6500,
    image: 'https://placehold.co/400x400/1a1a1a/f472b6?text=Matrix+Bong',
    stockStatus: 'In Stock',
    rating: 4.5,
    description: 'An indestructible, food-grade silicone bong with a suction cup base. Perfect for clumsy smokers and travel. Easy to clean.',
    options: { Color: ['Neon Green', 'Hot Pink', 'Black'] }
  },
  {
    id: 12,
    name: 'Stealth-Tech Smell Proof Bag',
    category: 'Lifestyle',
    price: 5500,
    image: 'https://placehold.co/400x400/1a1a1a/38bdf8?text=Smell+Proof+Bag',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'Activated carbon lining and a combo lock make this the ultimate smell-proof bag for secure and discreet storage.',
    options: { Size: ['Medium', 'Large'] }
  }
];

const categories = [
    { name: 'Bongs', icon: '🔥' },
    { name: 'Grinders', icon: '⚙️' },
    { name: 'Rolling Papers', icon: '📜' },
    { name: 'Vapes', icon: '💨' },
    { name: 'Lifestyle', icon: '✨' },
];

const testimonials = [
  { name: 'Hassan Ali', city: 'Karachi', review: 'Finally, a store in Pakistan that gets it! The quality is insane and the designs are next-level. My Quantum Grinder is a beast.', avatar: '👨‍💻' },
  { name: 'Fatima Khan', city: 'Lahore', review: 'Absolutely in love with the vibe of this site. The checkout was smooth, and my order arrived in 2 days. The Nebula Bong is a work of art!', avatar: '👩‍🎨' },
  { name: 'Zain Ahmed', city: 'Islamabad', review: '10/10 customer service. Had a question and they replied on WhatsApp instantly. This is my go-to store from now on.', avatar: '🧑‍🚀' },
];

// --- ICONS ---
// Using simple SVG strings to avoid external dependencies
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const HeartIcon = ({ filled }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const Trash2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const Share2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;
const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;


// --- WISHLIST CONTEXT ---
const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = localStorage.getItem('smokeTimeWishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    const toggleWishlist = (productId) => {
        setWishlist(prev => {
            const newWishlist = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];
            localStorage.setItem('smokeTimeWishlist', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const isInWishlist = (productId) => wishlist.includes(productId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

const useWishlist = () => useContext(WishlistContext);

// --- HELPER COMPONENTS ---
const GlitchText = ({ children, className }) => {
    return (
        <span className={`glitch ${className}`} data-text={children}>
            {children}
        </span>
    );
};

const AnimatedButton = ({ children, onClick, className = '', secondary = false }) => {
    const baseClasses = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold transition-all duration-300 ease-out rounded-lg shadow-lg group";
    const primaryClasses = "bg-gradient-to-r from-purple-600 to-pink-600 text-white";
    const secondaryClasses = "bg-transparent border-2 border-purple-500 text-purple-400 hover:text-white";

    return (
        <button onClick={onClick} className={`${baseClasses} ${secondary ? secondaryClasses : primaryClasses} ${className}`}>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-green-400"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-600 to-pink-600"></span>
            <span className="absolute w-full h-full transition-all duration-300 ease-out transform scale-x-0 -translate-x-1/2 bg-white opacity-20 group-hover:scale-x-100 group-hover:translate-x-0"></span>
            <span className="relative">{children}</span>
        </button>
    );
};

// --- CORE COMPONENTS ---

const Navbar = ({ onCartClick, onWishlistClick, cartCount, wishlistCount, onSearch, theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navLinks = ['Home', 'Shop', 'Deals', 'About'];

    return (
        <>
            <nav className="sticky top-0 z-50 px-4 py-3 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 shadow-purple-500/10 shadow-lg">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="#/" className="text-2xl font-orbitron font-bold text-white">
                        <GlitchText>SMOKE TIME ⚡</GlitchText>
                    </a>
                    <div className="hidden lg:flex items-center space-x-6 text-slate-300 font-semibold">
                        {navLinks.map(link => (
                            <a key={link} href="#/" className="hover:text-purple-400 transition-colors duration-300 relative group">
                                {link}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block relative">
                            <input
                                type="text"
                                placeholder="Search gear..."
                                onChange={(e) => onSearch(e.target.value)}
                                className="bg-slate-800 border border-slate-700 text-white text-sm rounded-full w-40 md:w-56 pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                            />
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500">
                                <SearchIcon />
                            </div>
                        </div>
                        <button onClick={toggleTheme} className="text-slate-400 hover:text-purple-400 transition-colors">
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button onClick={onWishlistClick} className="relative text-slate-400 hover:text-purple-400 transition-colors">
                            <HeartIcon filled={false} />
                            {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">{wishlistCount}</span>}
                        </button>
                        <button onClick={onCartClick} className="relative text-slate-400 hover:text-purple-400 transition-colors">
                            <ShoppingCartIcon />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">{cartCount}</span>}
                        </button>
                        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-slate-400 hover:text-purple-400">
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-xl transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
                <div className="flex justify-end p-6">
                    <button onClick={() => setIsMenuOpen(false)} className="text-white">
                        <XIcon />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map(link => (
                         <a key={link} href="#/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-orbitron text-white hover:text-purple-400 transition-colors">
                            <GlitchText>{link}</GlitchText>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

const Hero = () => {
    return (
        <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-slate-900 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                    poster="https://placehold.co/1920x1080/1a1a1a/1a1a1a?text=+"
                >
                    {/* In a real scenario, you'd host a cool background video */}
                    {/* <source src="/path/to/video.mp4" type="video/mp4" /> */}
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            </div>
            <div className="relative z-10 px-4">
                <h1 className="text-4xl md:text-6xl font-orbitron font-extrabold text-white mb-4 animate-fade-in-down">
                    Premium Accessories. <br/> <GlitchText>Next-Level Style.</GlitchText>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 animate-fade-in-up">
                    Engineered for the modern enthusiast. Discover top-tier gear, designed for performance and aesthetics, delivered nationwide in Pakistan.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
                    <AnimatedButton className="w-full sm:w-auto">Shop Now</AnimatedButton>
                    <AnimatedButton className="w-full sm:w-auto" secondary>Best Sellers</AnimatedButton>
                </div>
            </div>
        </div>
    );
};

const CategoriesSection = ({ onSelectCategory }) => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">Browse By Category</h2>
            <p className="text-slate-400 mb-10">Find exactly what you're looking for.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        onClick={() => onSelectCategory(cat.name)}
                        className="group relative bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{cat.icon}</div>
                            <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isSoldOut = product.stockStatus === 'Sold Out';

    return (
        <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:border-purple-600">
            <div className="absolute top-3 left-3 z-10">
                {product.bestseller && (
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">Best Seller</span>
                )}
            </div>
            <div className="absolute top-3 right-3 z-10">
                 <button onClick={() => toggleWishlist(product.id)} className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${isInWishlist(product.id) ? 'bg-pink-500/80 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-pink-500/50'}`}>
                    <HeartIcon filled={isInWishlist(product.id)} />
                </button>
            </div>
            <div className="relative h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isSoldOut ? 'bg-black/70 opacity-100' : 'bg-black/50 opacity-0 group-hover:opacity-100'}`}>
                    {isSoldOut ? (
                        <span className="text-white font-bold text-lg border-2 border-red-500 px-4 py-2 rounded-lg">SOLD OUT</span>
                    ) : (
                        <div className="space-x-2">
                             <button onClick={() => onQuickView(product)} className="bg-slate-100 text-slate-900 font-bold px-4 py-2 rounded-md hover:bg-purple-400 hover:text-white transition-all">Quick View</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4">
                <p className="text-sm text-purple-400 font-semibold">{product.category}</p>
                <h3 className="text-lg font-bold text-white truncate mt-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-xl font-orbitron text-green-400">Rs. {product.price.toLocaleString()}</p>
                     <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.stockStatus === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                        product.stockStatus === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                    }`}>{product.stockStatus}</span>
                </div>
                <button
                    disabled={isSoldOut}
                    onClick={() => onAddToCart(product, 1)}
                    className="w-full mt-4 bg-slate-700 text-slate-200 font-bold py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                   {isSoldOut ? 'Unavailable' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

const ProductsGrid = ({ products, onAddToCart, onQuickView }) => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-10 text-center">
                <GlitchText>Our Arsenal</GlitchText>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {products.map(p => (
                    <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onQuickView={onQuickView} />
                ))}
            </div>
        </div>
    );
};

const BestsellersSection = ({ products, onAddToCart, onQuickView }) => {
    const bestsellers = products.filter(p => p.bestseller);
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.offsetWidth * 0.8;
            current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-16 bg-slate-900/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-10 text-center">
                    Player Favorites
                </h2>
                <div className="relative">
                     <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/50 hover:bg-purple-500/50 transition-colors rounded-full p-2 hidden md:block"><ChevronLeft/></button>
                     <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 -mb-4">
                        {bestsellers.map(p => (
                           <div key={p.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <ProductCard product={p} onAddToCart={onAddToCart} onQuickView={onQuickView} />
                           </div>
                        ))}
                    </div>
                     <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/50 hover:bg-purple-500/50 transition-colors rounded-full p-2 hidden md:block"><ChevronRight/></button>
                </div>
            </div>
        </div>
    );
};

const BundlesSection = () => (
    <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-10 text-center">
            Bundles & Offers
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-slate-800/50 border border-slate-700 rounded-xl p-8 overflow-hidden hover:border-green-500 transition-all">
                <div className="absolute -top-10 -right-10 text-green-500/10 text-9xl font-bold z-0 transition-transform duration-300 group-hover:scale-110">🔥</div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white font-orbitron">The Starter Kit</h3>
                    <p className="text-slate-400 mt-2">Everything you need to get started. Includes a bong, grinder, and papers.</p>
                    <p className="text-2xl font-bold text-green-400 mt-4">Save Rs. 1,500+</p>
                    <AnimatedButton className="mt-6">View Bundle</AnimatedButton>
                </div>
            </div>
            <div className="group relative bg-slate-800/50 border border-slate-700 rounded-xl p-8 overflow-hidden hover:border-purple-500 transition-all">
                 <div className="absolute -bottom-10 -left-10 text-purple-500/10 text-9xl font-bold z-0 transition-transform duration-300 group-hover:scale-110">💨</div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white font-orbitron">The Vape Pro Pack</h3>
                    <p className="text-slate-400 mt-2">Upgrade your vape game. Pulsar Vaporizer + Electric Grinder.</p>
                    <p className="text-2xl font-bold text-purple-400 mt-4">Save Rs. 2,000+</p>
                    <AnimatedButton className="mt-6">View Bundle</AnimatedButton>
                </div>
            </div>
        </div>
    </div>
);

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-slate-900/50 py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-12">
                    What Our Crew Says
                </h2>
                <div className="relative h-48 md:h-36">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                           <div className="flex flex-col items-center">
                                <p className="text-lg text-slate-300 max-w-3xl mx-auto italic">"{testimonial.review}"</p>
                                <p className="text-white font-bold mt-4">{testimonial.name}, <span className="text-purple-400">{testimonial.city}</span> {testimonial.avatar}</p>
                           </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-2 mt-8">
                     {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-purple-500' : 'bg-slate-600 hover:bg-slate-500'}`}></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AboutSection = () => (
    <div className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/1a1a1a/22c55e?text=About+BG')" }}>
         <div className="absolute inset-0 bg-slate-900/80"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-orbitron font-bold">Our Story</h2>
            <p className="max-w-2xl mx-auto mt-6 text-slate-300">
                Smoke Time was born from a passion for premium gear and a frustration with the lack of quality options in Pakistan. We're gamers, enthusiasts, and connoisseurs on a mission to bring world-class smoking accessories to our community. No compromises, just the best.
            </p>
        </div>
    </div>
);

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && /\S+@\S+\.\S+/.test(email)) {
            let emails = JSON.parse(localStorage.getItem('smokeTimeEmails') || '[]');
            if (!emails.includes(email)) {
                emails.push(email);
                localStorage.setItem('smokeTimeEmails', JSON.stringify(emails));
                setMessage('Thanks for subscribing! Stay tuned for epic drops.');
            } else {
                 setMessage('You are already subscribed!');
            }
            setEmail('');
        } else {
            setMessage('Please enter a valid email address.');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">Join The Inner Circle</h2>
            <p className="text-slate-400 mb-8">Get exclusive deals, new drop alerts, and more.</p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="flex-grow bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
                <AnimatedButton type="submit">Subscribe</AnimatedButton>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
    );
};


const Footer = () => (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-orbitron font-bold text-white mb-4"><GlitchText>SMOKE TIME ⚡</GlitchText></h3>
                    <p className="text-sm">Premium accessories, next-level style. Delivered across Pakistan.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#/" className="hover:text-purple-400">New Arrivals</a></li>
                        <li><a href="#/" className="hover:text-purple-400">Best Sellers</a></li>
                        <li><a href="#/" className="hover:text-purple-400">All Products</a></li>
                        <li><a href="#/" className="hover:text-purple-400">Deals</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#/" className="hover:text-purple-400">Contact Us</a></li>
                        <li><a href="#/" className="hover:text-purple-400">FAQs</a></li>
                        <li><a href="#/" className="hover:text-purple-400">Shipping Policy</a></li>
                        <li><a href="#/" className="hover:text-purple-400">Returns</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-white mb-4">Connect</h4>
                     <div className="flex space-x-4">
                        <a href="#/" className="hover:text-purple-400">IG</a>
                        <a href="#/" className="hover:text-purple-400">WA</a>
                        <a href="#/" className="hover:text-purple-400">TT</a>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
                <p className="font-bold text-yellow-500 mb-2">Disclaimer:</p>
                <p className="max-w-2xl mx-auto">
                    Smoke Time sells legal smoking accessories only. No controlled substances are sold. Please check your local laws before purchasing. You must be of legal smoking age in your jurisdiction to buy from this site.
                </p>
                <p className="mt-4">&copy; {new Date().getFullYear()} Smoke Time. All Rights Reserved. Built for Pakistan 🇵🇰.</p>
            </div>
        </div>
    </footer>
);

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, setPage }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        onClose();
        setPage('checkout');
    };

    return (
        <div className={`fixed inset-0 z-50 transition-all duration-500 ${isOpen ? 'bg-black/60' : 'bg-transparent pointer-events-none'}`}>
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 shadow-2xl shadow-purple-900/50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-slate-800">
                        <h2 className="text-2xl font-orbitron text-white">Your Cart</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white"><XIcon /></button>
                    </div>
                    {cart.length === 0 ? (
                         <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                            <ShoppingCartIcon className="h-16 w-16 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white">Your cart is empty</h3>
                            <p className="text-slate-400 mt-2">Looks like you haven't added anything yet.</p>
                            <AnimatedButton onClick={onClose} className="mt-6">Start Shopping</AnimatedButton>
                         </div>
                    ) : (
                        <>
                            <div className="flex-grow p-6 overflow-y-auto space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                                        <div className="flex-grow">
                                            <p className="font-bold text-white">{item.name}</p>
                                            <p className="text-sm text-slate-400">Rs. {item.price.toLocaleString()}</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600"><MinusIcon /></button>
                                                <span className="w-10 text-center font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600"><PlusIcon /></button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-white">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 text-sm mt-2"><Trash2Icon className="inline-block mr-1" /> Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 border-t border-slate-800">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-slate-300">Subtotal:</span>
                                    <span className="font-bold text-green-400 font-orbitron">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Shipping & taxes calculated at checkout.</p>
                                <AnimatedButton onClick={handleCheckout} className="w-full mt-4">Proceed to Checkout</AnimatedButton>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProductModal = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        if(product && product.options){
            const initialOptions = {};
            Object.keys(product.options).forEach(key => {
                initialOptions[key] = product.options[key][0];
            });
            setSelectedOptions(initialOptions);
        }
    }, [product]);

    if (!product) return null;

    const handleOptionChange = (optionName, value) => {
        setSelectedOptions(prev => ({...prev, [optionName]: value}));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-slate-800 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-20"><XIcon/></button>
                <div className="w-full md:w-1/2 p-4">
                     <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                    <p className="text-purple-400 font-semibold">{product.category}</p>
                    <h2 className="text-3xl font-bold font-orbitron text-white mt-2">{product.name}</h2>
                    <p className="text-3xl text-green-400 font-orbitron my-4">Rs. {product.price.toLocaleString()}</p>
                    <p className="text-slate-300 leading-relaxed">{product.description}</p>
                    
                    {product.options && Object.keys(product.options).map(optionName => (
                        <div key={optionName} className="mt-6">
                            <label className="text-white font-semibold">{optionName}</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.options[optionName].map(value => (
                                    <button
                                        key={value}
                                        onClick={() => handleOptionChange(optionName, value)}
                                        className={`px-4 py-2 text-sm rounded-full border transition-colors ${selectedOptions[optionName] === value ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-slate-600 text-slate-300 hover:border-purple-500'}`}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center mt-6">
                        <p className="text-white font-semibold mr-4">Quantity</p>
                        <div className="flex items-center border border-slate-600 rounded-full">
                           <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-white"><MinusIcon/></button>
                           <span className="w-12 text-center text-white font-bold">{quantity}</span>
                           <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-white"><PlusIcon/></button>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                         <AnimatedButton onClick={() => { onAddToCart(product, quantity); onClose(); }} className="w-full">Add to Cart</AnimatedButton>
                         <AnimatedButton secondary className="w-full">Buy Now</AnimatedButton>
                    </div>
                    <button className="flex items-center justify-center gap-2 text-slate-400 hover:text-white mt-6"><Share2Icon/> Share</button>
                </div>
            </div>
        </div>
    );
};


const CheckoutPage = ({ cart, onBack, onOrderPlaced }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 250;
    const total = subtotal + shipping;
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: 'Karachi',
        cnic: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if(formData.name && formData.phone && formData.address && formData.city) {
            console.log('Order placed:', formData);
            onOrderPlaced();
        } else {
            alert('Please fill all required fields.');
        }
    };


    return (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"><ChevronLeft/> Back to Shop</button>
            <h1 className="text-4xl font-orbitron text-white text-center mb-12"><GlitchText>Checkout</GlitchText></h1>
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Shipping Form */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-300 block mb-2">Full Name *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-300 block mb-2">Phone Number *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="03xx-xxxxxxx" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                         <div>
                            <label className="text-sm font-semibold text-slate-300 block mb-2">Full Address *</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                         <div>
                            <label className="text-sm font-semibold text-slate-300 block mb-2">City *</label>
                            <select name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500">
                                <option>Karachi</option>
                                <option>Lahore</option>
                                <option>Islamabad</option>
                                <option>Rawalpindi</option>
                                <option>Faisalabad</option>
                                <option>Other</option>
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-semibold text-slate-300 block mb-2">CNIC (Optional)</label>
                            <input type="text" name="cnic" value={formData.cnic} onChange={handleInputChange} placeholder="xxxxx-xxxxxxx-x" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div className="pt-4">
                            <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                            <div className="border border-purple-500 rounded-lg p-4 bg-slate-900">
                                <p className="font-semibold text-white">Cash on Delivery (COD)</p>
                                <p className="text-sm text-slate-400 mt-1">Pay with cash when your order is delivered.</p>
                            </div>
                        </div>
                        <div className="pt-6">
                            <AnimatedButton type="submit" className="w-full">Place Order</AnimatedButton>
                        </div>
                    </form>
                </div>
                {/* Order Summary */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 h-fit">
                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <p className="font-semibold text-white">{item.name}</p>
                                        <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold text-white">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-700 mt-6 pt-6 space-y-2">
                        <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                        <div className="flex justify-between text-slate-300"><span>Shipping</span><span>Rs. {shipping.toLocaleString()}</span></div>
                        <div className="flex justify-between text-white font-bold text-xl pt-2"><span>Total</span><span className="text-green-400">Rs. {total.toLocaleString()}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderSuccessPage = ({ onBack }) => (
    <div className="container mx-auto px-4 py-32 text-center animate-fade-in flex flex-col items-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-orbitron text-white">Order Placed!</h1>
        <p className="text-slate-300 mt-4 max-w-md">
            Thank you for your purchase! Your order is being processed and will be on its way to you soon. You'll receive a confirmation call from our team shortly.
        </p>
        <AnimatedButton onClick={onBack} className="mt-8">Continue Shopping</AnimatedButton>
    </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    // App State
    const [theme, setTheme] = useState('dark');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState('home'); // home, checkout, success

    // Theme Toggle
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // Cart Logic
    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        setIsCartOpen(true); // Open cart on add
    };

    const updateCartQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Product Filtering
    const filteredProducts = mockProducts.filter(product => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(prev => prev === category ? null : category);
    };

    const handleOrderPlaced = () => {
        setCart([]);
        setPage('success');
    };

    return (
        <WishlistProvider>
            <div className={`bg-slate-900 text-slate-300 font-inter min-h-screen transition-colors duration-500 ${theme === 'light' ? 'dark:bg-gray-100 dark:text-slate-800' : ''}`}>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;600;700&display=swap');
                        .font-orbitron { font-family: 'Orbitron', sans-serif; }
                        .font-inter { font-family: 'Inter', sans-serif; }
                        
                        .glitch {
                            position: relative;
                            text-shadow: 0.05em 0 0 rgba(168, 85, 247, 0.75), -0.025em -0.05em 0 rgba(34, 197, 94, 0.75), 0.025em 0.05em 0 rgba(236, 72, 153, 0.75);
                            animation: glitch 500ms infinite;
                        }

                        .glitch span { position: absolute; top: 0; left: 0; }
                        .glitch span:first-child { animation: glitch 650ms infinite; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(-0.025em, -0.0125em); opacity: 0.8; }
                        .glitch span:last-child { animation: glitch 375ms infinite; clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(0.0125em, 0.025em); opacity: 0.8; }

                        @keyframes glitch {
                          0% { text-shadow: 0.05em 0 0 rgba(168, 85, 247, 0.75), -0.05em -0.025em 0 rgba(34, 197, 94, 0.75), -0.025em 0.05em 0 rgba(236, 72, 153, 0.75); }
                          14% { text-shadow: 0.05em 0 0 rgba(168, 85, 247, 0.75), -0.05em -0.025em 0 rgba(34, 197, 94, 0.75), -0.025em 0.05em 0 rgba(236, 72, 153, 0.75); }
                          15% { text-shadow: -0.05em -0.025em 0 rgba(168, 85, 247, 0.75), 0.025em 0.025em 0 rgba(34, 197, 94, 0.75), -0.05em -0.05em 0 rgba(236, 72, 153, 0.75); }
                          49% { text-shadow: -0.05em -0.025em 0 rgba(168, 85, 247, 0.75), 0.025em 0.025em 0 rgba(34, 197, 94, 0.75), -0.05em -0.05em 0 rgba(236, 72, 153, 0.75); }
                          50% { text-shadow: 0.025em 0.05em 0 rgba(168, 85, 247, 0.75), 0.05em 0 0 rgba(34, 197, 94, 0.75), 0 -0.05em 0 rgba(236, 72, 153, 0.75); }
                          99% { text-shadow: 0.025em 0.05em 0 rgba(168, 85, 247, 0.75), 0.05em 0 0 rgba(34, 197, 94, 0.75), 0 -0.05em 0 rgba(236, 72, 153, 0.75); }
                          100% { text-shadow: -0.025em 0 0 rgba(168, 85, 247, 0.75), -0.025em -0.025em 0 rgba(34, 197, 94, 0.75), -0.025em -0.05em 0 rgba(236, 72, 153, 0.75); }
                        }
                        
                        .scrollbar-hide::-webkit-scrollbar { display: none; }
                        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                        
                        .animation-delay-300 { animation-delay: 300ms; }
                        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                        @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
                        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
                        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }

                    `}
                </style>
                <WishlistContext.Consumer>
                    {({ wishlist }) => (
                        <Navbar
                            onCartClick={() => setIsCartOpen(true)}
                            onWishlistClick={() => alert('Wishlist feature coming soon!')}
                            cartCount={cartCount}
                            wishlistCount={wishlist.length}
                            onSearch={setSearchQuery}
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    )}
                </WishlistContext.Consumer>

                <main>
                    {page === 'home' && (
                        <>
                            <Hero />
                            <CategoriesSection onSelectCategory={handleCategorySelect} />
                            <ProductsGrid products={filteredProducts} onAddToCart={addToCart} onQuickView={setSelectedProduct} />
                            <BestsellersSection products={mockProducts} onAddToCart={addToCart} onQuickView={setSelectedProduct} />
                            <BundlesSection />
                            <TestimonialsSection />
                            <AboutSection />
                            <NewsletterSection />
                        </>
                    )}
                    {page === 'checkout' && (
                        <CheckoutPage cart={cart} onBack={() => setPage('home')} onOrderPlaced={handleOrderPlaced} />
                    )}
                     {page === 'success' && (
                        <OrderSuccessPage onBack={() => setPage('home')} />
                    )}
                </main>
                
                <Footer />

                <CartDrawer
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    updateQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                    setPage={setPage}
                />

                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={addToCart}
                />
            </div>
        </WishlistProvider>
    );
}


