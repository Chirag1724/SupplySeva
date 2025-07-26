import React, { useState } from 'react';
import { Star, ShoppingCart, Truck, Shield, Award, Users, Package, Clock, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HaldiProductDetails() {
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImages = [
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1608684049623-be4b37c68b0d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3"
  ];

  const relatedProducts = [
    { 
      name: 'Premium Cloves', 
      price: '₹320/kg', 
      originalPrice: '₹380/kg',
      img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.6,
      reviews: 89
    },
    { 
      name: 'Green Cardamom Pods', 
      price: '₹1,250/kg', 
      originalPrice: '₹1,400/kg',
      img: 'https://images.unsplash.com/photo-1596636484349-e37f3d3ad1c7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.8,
      reviews: 156
    },
    { 
      name: 'Cinnamon Sticks', 
      price: '₹150/kg', 
      originalPrice: '₹180/kg',
      img: 'https://images.unsplash.com/photo-1599040194857-eaa48bd94087?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.7,
      reviews: 203
    },
    { 
      name: 'Black Peppercorns', 
      price: '₹450/kg', 
      originalPrice: '₹520/kg',
      img: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.5,
      reviews: 67
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      alert('Please select a quantity first');
      return;
    }
    alert(`Added ${selectedQuantity} of Organic Haldi Powder to cart!`);
  };

  const handleOrderNow = () => {
    if (!selectedQuantity) {
      alert('Please select a quantity first');
      return;
    }
    alert(`Proceeding to checkout for ${selectedQuantity} of Organic Haldi Powder`);
  };

  const renderStars = (rating, reviews) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({reviews})</span>
    </div>
  );

  const tabContent = {
    description: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Our premium organic haldi (turmeric) powder is sourced directly from certified organic farms in India. 
          Known for its vibrant golden color, earthy aroma, and powerful anti-inflammatory properties, this haldi 
          is perfect for culinary, medicinal, and cosmetic uses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• 100% Pure Organic Haldi</li>
              <li>• High curcumin content (3-5%)</li>
              <li>• No artificial colors or additives</li>
              <li>• Rich in antioxidants and anti-inflammatory compounds</li>
              <li>• Perfect for cooking, golden milk, and face masks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Storage Instructions:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Store in a cool, dry place</li>
              <li>• Keep away from direct sunlight</li>
              <li>• Use airtight container after opening</li>
              <li>• Best before 18 months from packaging</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    supplier: (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            GS
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Golden Spices Co.</h4>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(4.7, 285)}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Established in 1988, Golden Spices Co. has been a premier supplier of authentic Indian spices 
              with specialization in turmeric cultivation and processing. With over 35 years of experience in organic farming.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">35+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">15K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">200+</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">FSSAI</div>
            <div className="text-sm text-gray-600">Certified</div>
          </div>
        </div>
      </div>
    ),
    nutrition: (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Nutritional Information (per 100g)</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">354</div>
            <div className="text-sm text-gray-600">Calories</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">64.9g</div>
            <div className="text-sm text-gray-600">Carbohydrates</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">21g</div>
            <div className="text-sm text-gray-600">Dietary Fiber</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">7.8g</div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">9.9g</div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">183mg</div>
            <div className="text-sm text-gray-600">Calcium</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">3-5%</div>
            <div className="text-sm text-gray-600">Curcumin</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">41.4mg</div>
            <div className="text-sm text-gray-600">Iron</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">1267mg</div>
            <div className="text-sm text-gray-600">Potassium</div>
          </div>
        </div>
      </div>
    ),
    reviews: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Customer Reviews</h4>
          <button className="text-sm text-orange-600 hover:text-orange-700">Write a Review</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Anjali Gupta', rating: 5, date: '1 week ago', review: 'Best quality haldi I have ever used! The color is so vibrant and the aroma is amazing. Perfect for my daily golden milk.' },
            { name: 'Ramesh Patel', rating: 5, date: '2 weeks ago', review: 'Excellent organic turmeric powder. My family has been using it for cooking and it adds such a rich flavor and color to our dishes.' },
            { name: 'Sunita Sharma', rating: 4, date: '3 weeks ago', review: 'Very good quality haldi. Fast delivery and well packaged. Will definitely order again.' },
            { name: 'Vikash Kumar', rating: 5, date: '1 month ago', review: 'Pure and authentic turmeric powder. Great for both cooking and home remedies. Highly recommended!' }
          ].map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">{review.name}</span>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(review.rating, 0)}
              </div>
              <p className="text-gray-700 text-sm">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span className="hover:text-gray-700 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-gray-700 cursor-pointer">Spices</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Haldi Powder</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={productImages[currentImageIndex]}
                  alt="Premium Organic Haldi Powder"
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {productImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
                
                {/* Image indicators */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 ${
                        currentImageIndex === index 
                          ? 'border-orange-500 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Haldi powder view ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Organic Haldi Powder</h1>
                <p className="text-gray-600 text-lg">Pure turmeric powder with high curcumin content, perfect for cooking, health, and beauty</p>
                <div className="flex items-center gap-3 mt-3">
                  {renderStars(4.9, 342)}
                  <span className="text-sm text-gray-500">342 reviews</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">₹180</span>
                  <span className="text-lg text-gray-500">/kg</span>
                  <span className="text-lg text-gray-400 line-through">₹220/kg</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm font-medium">18% OFF</span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">In Stock (750 kg available)</span>
              </div>

              {/* Quality Badge */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-orange-700">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Certified Organic • High Curcumin Content • Lab Tested</span>
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Quantity</label>
                <select 
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Choose quantity</option>
                  <option value="500g">500g - ₹90</option>
                  <option value="1kg">1 kg - ₹180</option>
                  <option value="5kg">5 kg - ₹850 (Save ₹50)</option>
                  <option value="10kg">10 kg - ₹1,650 (Save ₹150)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button 
                  onClick={handleOrderNow}
                  className="flex-1 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Order Now
                </button>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Fast Delivery</div>
                    <div className="text-xs text-gray-500">2-3 business days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-sm font-medium">100% Organic</div>
                    <div className="text-xs text-gray-500">Certified pure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Product ID:</span>
                <span className="font-medium">HAL-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pack Sizes:</span>
                <span className="font-medium">500g, 1kg, 5kg, 10kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Origin:</span>
                <span className="font-medium">India (Karnataka)</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Shelf Life:</span>
                <span className="font-medium">18 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-medium">2-3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">Jan 20, 2024</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">Ground Spices</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certification:</span>
                <span className="font-medium">Organic, FSSAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Curcumin Content:</span>
                <span className="font-medium">3-5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {[
                { key: 'description', label: 'Description' },
                { key: 'supplier', label: 'Supplier Info' },
                { key: 'nutrition', label: 'Nutritional Info' },
                { key: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-8">
            {tabContent[activeTab]}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={index} className="group cursor-pointer bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Best Seller
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    {renderStars(product.rating, product.reviews)}
                    <span className="text-xs text-gray-500">{product.reviews} reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional product showcase */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">More from Spice Collection</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                { name: 'Red Chili Powder', img: 'https://images.unsplash.com/photo-1583032015850-f8ca993da0b4?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3' },
                { name: 'Coriander Powder', img: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3' },
                { name: 'Garam Masala', img: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3' },
                { name: 'Cumin Powder', img: 'https://images.unsplash.com/photo-1596636484349-e37f3d3ad1c7?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3' },
                { name: 'Mustard Powder', img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3' }
              ].map((spice, index) => (
                <div key={index} className="flex-shrink-0 w-24 text-center group cursor-pointer">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition-colors mb-2">
                    <img 
                      src={spice.img} 
                      alt={spice.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3';
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-orange-600 transition-colors font-medium">{spice.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health Benefits Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Health Benefits of Haldi</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Anti-inflammatory</h5>
                <p className="text-sm text-gray-600">Rich in curcumin, which has powerful anti-inflammatory properties that may help reduce inflammation in the body.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Antioxidant Rich</h5>
                <p className="text-sm text-gray-600">Contains powerful antioxidants that help protect cells from damage caused by free radicals.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Immunity Boost</h5>
                <p className="text-sm text-gray-600">Regular consumption may help boost immune system and support overall health and wellness.</p>
              </div>
            </div>
          </div>

          {/* Usage Ideas */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Ways to Use Haldi</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer">
                <div className="text-2xl mb-2">🥛</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600">Golden Milk</div>
                <div className="text-xs text-gray-500 mt-1">Warm milk with haldi</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer">
                <div className="text-2xl mb-2">🍛</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600">Cooking</div>
                <div className="text-xs text-gray-500 mt-1">Curries and dal</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer">
                <div className="text-2xl mb-2">✨</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600">Face Mask</div>
                <div className="text-xs text-gray-500 mt-1">Natural skincare</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer">
                <div className="text-2xl mb-2">☕</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600">Turmeric Tea</div>
                <div className="text-xs text-gray-500 mt-1">Healthy beverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}