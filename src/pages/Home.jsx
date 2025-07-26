import React, { useState, useEffect } from 'react';
import { Search, Star, ChevronRight, Heart, ShoppingCart, Clock, Shield, Truck, Tag } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Product arrays with more details
const featuredProducts = [
  { id: 1, name: 'Fresh Onions', price: '₹25/kg', originalPrice: '₹30/kg', image: 'https://plus.unsplash.com/premium_photo-1723708958105-09e29205e551?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, reviews: 128, isFavorite: false, discount: 17, stock: 15, supplier: 'Local Farms', category: 'Vegetables' },
  { id: 2, name: 'Ripe Tomatoes', price: '₹30/kg', originalPrice: '₹35/kg', image: 'https://plus.unsplash.com/premium_photo-1723874531848-a1e5786e096d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJpcGUlMjB0b21hdG98ZW58MHx8MHx8fDA%3D', rating: 4.2, reviews: 95, isFavorite: false, discount: 14, stock: 8, supplier: 'Local Farms', category: 'Vegetables' },
  { id: 3, name: 'Garlic Bulbs', price: '₹150/kg', originalPrice: '₹180/kg', image: 'https://plus.unsplash.com/premium_photo-1675864033916-88ba6dde849f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnVsYnN8ZW58MHx8MHx8fDA%3D', rating: 4.7, reviews: 210, isFavorite: false, discount: 17, stock: 20, supplier: 'Organic Suppliers', category: 'Vegetables' },
  { id: 4, name: 'Ginger Root', price: '₹100/kg', originalPrice: '₹120/kg', image: 'https://images.unsplash.com/photo-1635008388183-04ea0313c5d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2luZ2VyJTIwcm9vdHxlbnwwfHwwfHx8MA%3D%3D', rating: 4.3, reviews: 156, isFavorite: false, discount: 17, stock: 12, supplier: 'Organic Suppliers', category: 'Vegetables' },
  { id: 5, name: 'Potatoes', price: '₹20/kg', originalPrice: '₹25/kg', image: 'https://images.unsplash.com/photo-1635774855536-9728f2610245?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG90YXRvZXN8ZW58MHx8MHx8fDA%3D', rating: 4.0, reviews: 89, isFavorite: false, discount: 20, stock: 25, supplier: 'Vegetable Hub', category: 'Vegetables' },
];

const vegetables = [
  { id: 6, name: 'Green Peppers', price: '₹40/kg', originalPrice: '₹45/kg', image: 'https://images.unsplash.com/photo-1585159079680-8dec029b76ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBwZXBwZXJzfGVufDB8fDB8fHww', rating: 4.1, reviews: 72, isFavorite: false, discount: 11, stock: 10, supplier: 'Vegetable Hub', category: 'Vegetables' },
  { id: 7, name: 'Carrots', price: '₹35/kg', originalPrice: '₹40/kg', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2Fycm90c3xlbnwwfHwwfHx8MA%3D%3D', rating: 4.4, reviews: 103, isFavorite: false, discount: 13, stock: 18, supplier: 'Local Farms', category: 'Vegetables' },
  { id: 8, name: 'Cauliflower', price: '₹28/kg', originalPrice: '₹32/kg', image: 'https://media.istockphoto.com/id/182240577/photo/bin-of-cauliflower-heads.webp?a=1&b=1&s=612x612&w=0&k=20&c=LsO82lZblJqimkOLmrcHpaAa2QgNgKbZ-UfTAcpzAdQ=', rating: 3.9, reviews: 64, isFavorite: false, discount: 13, stock: 7, supplier: 'Organic Suppliers', category: 'Vegetables' },
  { id: 9, name: 'Spinach', price: '₹15/bunch', originalPrice: '₹18/bunch', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D', rating: 4.6, reviews: 142, isFavorite: false, discount: 17, stock: 22, supplier: 'Local Farms', category: 'Vegetables' },
  { id: 10, name: 'Cabbage', price: '₹18/kg', originalPrice: '₹22/kg', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D', rating: 4.0, reviews: 87, isFavorite: false, discount: 18, stock: 14, supplier: 'Vegetable Hub', category: 'Vegetables' },
];

const spices = [
  { id: 11, name: 'Cumin Seeds', price: '₹200/kg', originalPrice: '₹240/kg', image: 'https://plus.unsplash.com/premium_photo-1722686499744-59e1bcf902a6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.8, reviews: 185, isFavorite: false, discount: 17, stock: 9, supplier: 'Premium Spice Co', category: 'Spices' },
  { id: 12, name: 'Turmeric Powder', price: '₹180/kg', originalPrice: '₹210/kg', image: 'https://plus.unsplash.com/premium_photo-1723867311354-e170658fd619?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHVybWVyaWN8ZW58MHx8MHx8fDA%3D', rating: 4.5, reviews: 132, isFavorite: false, discount: 14, stock: 11, supplier: 'Premium Spice Co', category: 'Spices' },
  { id: 13, name: 'Red Chili Powder', price: '₹220/kg', originalPrice: '₹250/kg', image: 'https://images.unsplash.com/photo-1702041295471-01b73fd39907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwY2hpbGxpJTIwcG93ZGVyfGVufDB8fDB8fHww', rating: 4.3, reviews: 98, isFavorite: false, discount: 12, stock: 6, supplier: 'Premium Spice Co', category: 'Spices' },
  { id: 14, name: 'Coriander Seeds', price: '₹160/kg', originalPrice: '₹190/kg', image: 'https://images.unsplash.com/photo-1508748169069-82590c9f26e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29yaWFuZGVyJTIwc2VlZHN8ZW58MHx8MHx8fDA%3D', rating: 4.7, reviews: 167, isFavorite: false, discount: 16, stock: 13, supplier: 'Premium Spice Co', category: 'Spices' },
  { id: 15, name: 'Black Pepper', price: '₹500/kg', originalPrice: '₹600/kg', image: 'https://plus.unsplash.com/premium_photo-1726072357017-0af7b90a463d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.9, reviews: 231, isFavorite: false, discount: 17, stock: 5, supplier: 'Premium Spice Co', category: 'Spices' },
];

export default function Home() {
  const [allProducts] = useState({
    featured: [...featuredProducts],
    vegetables: [...vegetables],
    spices: [...spices]
  });
  
  const [cartCount, setCartCount] = useState(0);
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

  // Apply all filters to products
  const applyFilters = (products) => {
    return products.filter(product => {
      // Convert price string to number (₹25/kg -> 25)
      const priceNum = parseInt(product.price.replace(/[^0-9]/g, ''));
      
      // Check category filter
      const categoryMatch = filters.categories.length === 0 || 
                           filters.categories.includes(product.category);
      
      // Check price range filter
      const priceMatch = priceNum >= filters.priceRange[0] && 
                         priceNum <= filters.priceRange[1];
      
      // Check availability filter
      const availabilityMatch = filters.availability === 'all' || 
                               (filters.availability === 'in-stock' && product.stock > 0) || 
                               (filters.availability === 'out-of-stock' && product.stock <= 0);
      
      // Check supplier filter
      const supplierMatch = filters.suppliers.length === 0 || 
                           filters.suppliers.includes(product.supplier);
      
      // Check discount filter
      const discountMatch = !filters.onlyDiscount || product.discount > 0;
      
      // Check search query
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && priceMatch && availabilityMatch && 
             supplierMatch && discountMatch && searchMatch;
    });
  };

  const filteredProducts = {
    featured: applyFilters(allProducts.featured),
    vegetables: applyFilters(allProducts.vegetables),
    spices: applyFilters(allProducts.spices)
  };

  // Toggle favorite status
  const toggleFavorite = (category, id) => {
    // Implementation if needed
  };

  // Add to cart function
  const addToCart = (product) => {
    setCartCount(prev => prev + 1);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  // Search function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes from Sidebar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Deal timer countdown
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
      <Sidebar onFilterChange={handleFilterChange} cartCount={cartCount} />
      
      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          Item added to cart!
        </div>
      )}

      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search raw materials..."
            className="w-full border border-gray-300 rounded-full pl-6 pr-12 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition">
            <Search size={20} />
          </button>
        </div>

        {/* Hero Section with Deal Timer */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-green-800 px-3 py-1 text-sm font-bold rounded-bl-lg">
            Limited Time Offer
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Farm Fresh Raw Materials</h1>
          <p className="mb-4 max-w-lg">Direct from farm to your kitchen. High quality, organic produce at affordable prices.</p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition flex items-center">
              Shop Now <ChevronRight className="ml-1" size={18} />
            </button>
            
            <div className="bg-black/20 rounded-lg px-3 py-2 flex items-center">
              <Clock className="mr-2" size={16} />
              <span className="font-mono">{formatTime(timer)}</span>
              <span className="ml-2">left for today's deal</span>
            </div>
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

        {/* Featured Products */}
        <Section 
          title="Featured Products" 
          products={filteredProducts.featured} 
          onFavoriteToggle={toggleFavorite} 
          onAddToCart={addToCart} 
          category="featured"
        />

        {/* Vegetables */}
        <Section 
          title="Fresh Vegetables" 
          products={filteredProducts.vegetables} 
          onFavoriteToggle={toggleFavorite} 
          onAddToCart={addToCart} 
          category="vegetables"
        />

        {/* Spices */}
        <Section 
          title="Premium Spices" 
          products={filteredProducts.spices} 
          onFavoriteToggle={toggleFavorite} 
          onAddToCart={addToCart} 
          category="spices"
        />

        {/* Discount Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 my-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 bg-yellow-600/20 w-32 h-32 rounded-full"></div>
          <div className="absolute -right-5 -bottom-5 bg-yellow-600/20 w-20 h-20 rounded-full"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Special Weekend Discount!</h2>
            <p className="text-gray-700 mb-4">Get extra 10% off on all orders above ₹1000. Use code <span className="font-bold">WEEKEND10</span></p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
              Shop Now
            </button>
          </div>
        </div>

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

function Section({ title, products, onFavoriteToggle, onAddToCart, category }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
          View all <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              {...item} 
              onFavoriteToggle={() => onFavoriteToggle(category, item.id)}
              onAddToCart={() => onAddToCart(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductCard({ 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  isFavorite, 
  discount,
  stock,
  onFavoriteToggle,
  onAddToCart
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}
      
      {/* Favorite Button */}
      <button 
        className={`absolute top-2 right-2 p-2 rounded-full transition ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
        onClick={onFavoriteToggle}
      >
        <Heart className={isFavorite ? 'fill-current' : ''} size={20} />
      </button>
      
      {/* Product Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{name}</h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-600 font-medium">{price}</span>
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">{originalPrice}</span>
          )}
        </div>
        
        {/* Rating and Reviews */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`} 
                size={14} 
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({reviews})</span>
        </div>
        
        {/* Stock Indicator */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
          <div 
            className="bg-green-500 h-1.5 rounded-full" 
            style={{ width: `${Math.min(100, (stock / 25) * 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">{stock} left in stock</p>
        
        {/* Add to Cart Button */}
        <button 
          className="mt-3 w-full bg-green-50 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-100 transition flex items-center justify-center"
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2" size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}