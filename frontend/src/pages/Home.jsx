import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ChevronRight, Heart, ShoppingCart, Clock, Shield, Truck, Tag } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useCart } from '../pages/CartContext'; // ✅ Import useCart hook
import Searchbar from '../components/SearchBar';

export default function Home() {
  const [allProducts, setAllProducts] = useState({
    featured: [],
    vegetables: [],
    spices: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [timer, setTimer] = useState(3600);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    availability: 'all',
    suppliers: [],
    onlyDiscount: false
  });

  const navigate = useNavigate();
  
  // ✅ Use CartContext instead of local state
  const { cartItems, cartCount, addToCart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        const all = res.data.map(p => ({
          ...p,
          id: p._id, // ✅ Ensure consistent ID format
          image: `${import.meta.env.VITE_API_BASE_URL}${p.imageUrl}`,
          price: p.price, // ✅ Keep as number for calculations
          priceDisplay: `₹${p.price}/kg`, // ✅ Separate display format
          originalPrice: `₹${Math.round(p.price * 1.2)}/kg`,
          discount: 100 - Math.round((p.price / (p.price * 1.2)) * 100),
          reviews: Math.floor(Math.random() * 200 + 20),
          rating: +(Math.random() * 1.5 + 3.5).toFixed(1),
          isFavorite: false,
          unit: "kg", // ✅ Add unit for cart
        }));

        const featured = all.slice(0, 5);
        const vegetables = all.filter(p => p.category === "Vegetables");
        const spices = all.filter(p => p.category === "Spices");

        setAllProducts({ featured, vegetables, spices });
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    fetchData();
  }, []);

  const applyFilters = (products) => {
    return products.filter(product => {
      const priceNum = product.price; // ✅ Already a number
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
      const priceMatch = priceNum >= filters.priceRange[0] && priceNum <= filters.priceRange[1];
      const availabilityMatch = filters.availability === 'all' ||
        (filters.availability === 'in-stock' && product.stock > 0) ||
        (filters.availability === 'out-of-stock' && product.stock <= 0);
      const supplierMatch = filters.suppliers.length === 0 || filters.suppliers.includes(product.supplier);
      const discountMatch = !filters.onlyDiscount || product.discount > 0;
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && availabilityMatch && supplierMatch && discountMatch && searchMatch;
    });
  };

  const filteredProducts = {
    featured: applyFilters(allProducts.featured),
    vegetables: applyFilters(allProducts.vegetables),
    spices: applyFilters(allProducts.spices)
  };

  const toggleFavorite = (category, id) => {
    setAllProducts(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].map(p =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      );
      return updated;
    });
  };

  // ✅ Enhanced addToCart handler that matches ProductDetail logic
  const handleAddToCart = (product) => {
    console.log('Adding product to cart:', product);
    
    // ✅ Create cart-compatible product object (same format as ProductDetail)
    const cartProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price, // ✅ Already a number
      unit: product.unit || "kg",
      category: product.category,
    };

    addToCart(cartProduct);
    
    // Show notification
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Parent received search query:", query);
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        onFilterChange={handleFilterChange} 
        cartCount={cartCount}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateCartItemQuantity}
        onClearCart={clearCart}
      />

      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          Item added to cart!
        </div>
      )}

      <main className="flex-1 p-6">
        <Searchbar onSearch={handleSearch} />
        {/* Search Bar */}
        

        {/* Hero Section with Deal Timer */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-green-800 px-3 py-1 text-sm font-bold rounded-bl-lg">
            Limited Time Offer
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Farm Fresh Raw Materials</h1>
          <p className="mb-4 max-w-lg">Direct from farm to your kitchen. High quality, organic produce at affordable prices.</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Truck className="text-green-500 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-500">Delivery</p>
              <p className="font-medium">Free above ₹500</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Shield className="text-green-500 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-500">Quality</p>
              <p className="font-medium">100% Organic</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Tag className="text-green-500 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-500">Offers</p>
              <p className="font-medium">Daily Discounts</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Clock className="text-green-500 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-500">Support</p>
              <p className="font-medium">24/7 Available</p>
            </div>
          </div>
        </div>

        {/* Product Sections */}
        <Section title="Featured Products" products={filteredProducts.featured} onFavoriteToggle={toggleFavorite} onAddToCart={handleAddToCart} category="featured" navigate={navigate} />
        <Section title="Fresh Vegetables" products={filteredProducts.vegetables} onFavoriteToggle={toggleFavorite} onAddToCart={handleAddToCart} category="vegetables" navigate={navigate} />
        <Section title="Premium Spices" products={filteredProducts.spices} onFavoriteToggle={toggleFavorite} onAddToCart={handleAddToCart} category="spices" navigate={navigate} />

        {/* CTA Banner */}
        <div className="bg-green-50 rounded-xl p-6 my-8 flex flex-col md:flex-row items-center justify-between border border-green-100">
          <div>
            <h2 className="text-xl font-bold text-green-800 mb-2">Need bulk quantities?</h2>
            <p className="text-green-600">Special wholesale prices for restaurants and businesses</p>
          </div>
          <button className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center">
            Contact Us <ChevronRight className="ml-1" size={18} />
          </button>
        </div>

      </main>
    </div>
  );
}

function Section({ title, products, onFavoriteToggle, onAddToCart, category, navigate }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
          View all <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No products found matching your filters.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              onFavoriteToggle={() => onFavoriteToggle(category, item.id)}
              onAddToCart={() => onAddToCart(item)}
              onClick={() => navigate(`/product/${item.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductCard({
  name,
  priceDisplay,
  originalPrice,
  image,
  rating,
  reviews,
  isFavorite,
  discount,
  stock,
  onFavoriteToggle,
  onAddToCart,
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</div>
      )}
      <button
        className={`absolute top-2 right-2 p-2 rounded-full transition ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
        onClick={(e) => { e.stopPropagation(); onFavoriteToggle(); }}
      >
        <Heart className={isFavorite ? 'fill-current' : ''} size={20} />
      </button>
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-600 font-medium">{priceDisplay}</span>
          {originalPrice && <span className="text-gray-400 text-sm line-through">{originalPrice}</span>}
        </div>
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`} size={14} />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({reviews})</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (stock / 25) * 100)}%` }}></div>
        </div>
        <p className="text-xs text-gray-500">{stock} left in stock</p>
        <button
          className="mt-3 w-full bg-green-50 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-100 transition flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
        >
          <ShoppingCart className="mr-2" size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}