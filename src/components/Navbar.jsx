import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Leaf, Menu, X, User, Home, Boxes } from 'lucide-react';
import { useCart } from '../pages/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setRole(user?.role);
  }, []);

  // Only fetch cart items for vendor
  const { cartItems } = role === 'vendor' ? useCart() : { cartItems: [] };

  useEffect(() => {
    if (role === 'vendor') {
      const total = cartItems.reduce((total, item) => total + item.quantity, 0);
      setTotalCartItems(total);
    }
  }, [cartItems, role]);

  const handleCartClick = () => navigate('/cart');
  const handleOrdersClick = () => navigate('/orders');
  const handleProfileClick = () => navigate('/profile');
  const handleLogout = () => navigate('/');
  const handleHomeClick = () => navigate('/home');
  const handleProductListClick = () => navigate('/productlist');

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div onClick={handleHomeClick} className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-xl">
            <Leaf className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-gray-800">Supply Seva</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4">
          {role === 'vendor' && (
            <>
              <button onClick={handleHomeClick} className="p-3 hover:bg-gray-100 rounded-xl">
                <Home className="text-gray-600" size={20} />
              </button>

              <button onClick={handleCartClick} className="relative p-3 hover:bg-gray-100 rounded-xl">
                <ShoppingCart className="text-gray-600" size={20} />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover border border-gray-200"
              />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <button onClick={handleProfileClick} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                  <User size={16} className="mr-3 text-gray-400" />
                  My Profile
                </button>

                {role === 'vendor' && (
                  <button onClick={handleOrdersClick} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                    <ShoppingCart size={16} className="mr-3 text-gray-400" />
                    My Orders
                  </button>
                )}

                {role === 'supplier' && (
                  <button onClick={handleProductListClick} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                    <Boxes size={16} className="mr-3 text-gray-400" />
                    My Products
                  </button>
                )}

                <hr className="my-2 border-gray-100" />
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-4 space-y-3">
            {role === 'vendor' && (
              <>
                <button onClick={handleHomeClick} className="flex items-center w-full p-3 hover:bg-gray-50 rounded-xl">
                  <Home size={20} className="mr-3" />
                  Home
                </button>

                <button onClick={handleCartClick} className="flex items-center w-full p-3 hover:bg-gray-50 rounded-xl">
                  <ShoppingCart size={20} className="mr-3" />
                  Cart
                  {totalCartItems > 0 && (
                    <span className="ml-auto bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              </>
            )}

            <button onClick={handleProfileClick} className="flex items-center w-full p-3 hover:bg-gray-50 rounded-xl">
              <User size={20} className="mr-3" />
              My Profile
            </button>

            {role === 'vendor' && (
              <button onClick={handleOrdersClick} className="flex items-center w-full p-3 hover:bg-gray-50 rounded-xl">
                <ShoppingCart size={20} className="mr-3" />
                My Orders
              </button>
            )}

            {role === 'supplier' && (
              <button onClick={handleProductListClick} className="flex items-center w-full p-3 hover:bg-gray-50 rounded-xl">
                <Boxes size={20} className="mr-3" />
                My Products
              </button>
            )}

            <button onClick={handleLogout} className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-xl">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}