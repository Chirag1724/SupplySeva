import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Star,
  LoaderCircle,
  Truck,
  Shield,
  Tag,
  Clock,
  Heart,
  Share2,
  Award,
  Users,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../pages/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const transformProduct = (p) => ({
    ...p,
    image: `http://localhost:5000${p.imageUrl}`,
    price: `₹${p.price}/kg`,
    originalPrice: `₹${Math.round(p.price * 1.2)}/kg`,
    discount: 100 - Math.round((p.price / (p.price * 1.2)) * 100),
    rating: +(Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 200 + 20),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const transformed = transformProduct(res.data);
        setProduct(transformed);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  if (!product) {
    return <div className="p-6 text-center text-red-500">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      image: product.image,
      price: parseFloat(product.price.replace(/[₹\/kg]/g, '')),
      unit: "kg",
      category: "Fruits",
    });
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
          {product.description || "Premium quality product sourced directly from certified farms. Known for its freshness, rich flavor, and excellent nutritional value, perfect for daily use."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• 100% Fresh and Natural</li>
              <li>• High nutritional value</li>
              <li>• No artificial additives</li>
              <li>• Rich in vitamins and minerals</li>
              <li>• Perfect for daily consumption</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Storage Instructions:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Store in a cool, dry place</li>
              <li>• Keep away from direct sunlight</li>
              <li>• Use airtight container after opening</li>
              <li>• Best before 7-10 days from purchase</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    supplier: (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            FS
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Fresh Suppliers Co.</h4>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(4.6, 185)}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Established supplier of fresh produce with years of experience in quality farming 
              and distribution. Committed to providing the freshest products directly from farms.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">5K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-semibold">100+</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
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
            <div className="text-lg font-semibold text-gray-900">45</div>
            <div className="text-sm text-gray-600">Calories</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">11g</div>
            <div className="text-sm text-gray-600">Carbohydrates</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">2.4g</div>
            <div className="text-sm text-gray-600">Dietary Fiber</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">0.9g</div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">0.2g</div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">16mg</div>
            <div className="text-sm text-gray-600">Vitamin C</div>
          </div>
        </div>
      </div>
    ),
    reviews: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Customer Reviews</h4>
          <button className="text-sm text-green-600 hover:text-green-700">Write a Review</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Priya Sharma', rating: 5, date: '1 week ago', review: 'Excellent quality product! Fresh and exactly as described. Will definitely order again.' },
            { name: 'Rajesh Kumar', rating: 4, date: '2 weeks ago', review: 'Good quality and fast delivery. Packaging was also very good.' },
            { name: 'Anita Singh', rating: 5, date: '3 weeks ago', review: 'Very fresh and high quality. Great value for money.' }
          ].map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
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


        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg">
                  {product.description || "Fresh, high-quality product perfect for your daily needs"}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {renderStars(product.rating, product.reviews)}
                  <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">{product.discount}% OFF</span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">In Stock</span>
              </div>

              {/* Quality Badge */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Fresh • High Quality • Farm Direct</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
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
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">Fresh & Quality</div>
                    <div className="text-xs text-gray-500">Farm direct</div>
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
                <span className="font-medium">{product._id?.slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category || 'Fresh Produce'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unit:</span>
                <span className="font-medium">Per kg</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Shelf Life:</span>
                <span className="font-medium">7-10 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-medium">2-3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Origin:</span>
                <span className="font-medium">India</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Storage:</span>
                <span className="font-medium">Cool, dry place</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certification:</span>
                <span className="font-medium">FSSAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quality:</span>
                <span className="font-medium">Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
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
                      ? 'border-green-500 text-green-600'
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
      </div>
    </div>
  );
}