import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiOutlineLocationMarker, HiOutlineSearch, HiOutlineShoppingCart, HiOutlineMenu } from 'react-icons/hi';
import useAuthStore from '../../context/authStore';
import useCartStore from '../../context/cartStore';
import useFilterStore from '../../context/filterStore';
import useThemeStore from '../../context/themeStore';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { cart } = useCartStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { filters, setSearch, setCategory } = useFilterStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#131921] text-white py-1">
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-2 h-16">
          
          {/* Logo */}
          <Link to="/" className="border border-transparent hover:border-white p-2 rounded transition-all shrink-0 flex flex-col items-start leading-none">
            <span className="text-2xl font-bold flex items-baseline">
              ShopHub<span className="text-[#febd69] text-lg">.in</span>
            </span>
          </Link>

          {/* Deliver to */}
          <div className="hidden md:flex items-center border border-transparent hover:border-white px-2 py-1.5 rounded cursor-pointer shrink-0 ml-2">
            <HiOutlineLocationMarker className="text-xl mr-1 self-end mb-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="text-[12px] text-gray-300">Deliver to</span>
              <span className="text-[14px] font-bold">India</span>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-grow flex h-[40px] rounded-[4px] overflow-hidden bg-white focus-within:ring-[3px] focus-within:ring-[#febd69] mx-2"
          >
            <div className="bg-gray-100 text-gray-600 px-3 flex items-center text-xs border-r border-gray-300 cursor-pointer hover:bg-gray-200 hover:text-black transition-all">
              <select
                className="bg-transparent outline-none cursor-pointer pr-1 appearance-none"
                value={filters.category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Kitchen</option>
                <option value="books">Books</option>
              </select>
              <span className="ml-1 mt-0.5">▼</span>
            </div>
            <input
              type="text"
              className="flex-grow px-3 text-black outline-none text-base placeholder:text-gray-500"
              placeholder="Search ShopHub.in"
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center transition-all">
              <HiOutlineSearch className="text-black text-2xl" />
            </button>
          </form>

          {/* Right Links */}
          <div className="flex items-center shrink-0">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="hidden lg:flex items-center border border-transparent hover:border-white p-2 rounded mr-1">
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Language Selection */}
            <div className="hidden lg:flex items-center gap-1 border border-transparent hover:border-white p-2 rounded cursor-pointer mr-1">
              <span className="text-xl">🇮🇳</span>
              <span className="text-[14px] font-bold">EN</span>
              <span className="text-[10px] text-gray-400 mt-1">▼</span>
            </div>

            {/* Account */}
            <div className="relative group border border-transparent hover:border-white p-2 rounded cursor-pointer leading-tight">
              <Link to={user ? "/profile" : "/login"}>
                <span className="text-[12px]">Hello, {user ? user.name.split(' ')[0] : 'sign in'}</span>
                <div className="text-[14px] font-extrabold flex items-center gap-1">
                  Account & Lists <span className="text-[10px] text-gray-400 mt-1">▼</span>
                </div>
              </Link>
              
              {/* Dropdown */}
              <div className="absolute top-full right-[-50px] mt-0 w-64 bg-white text-black rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all p-0 z-50 overflow-hidden">
                {!isAuthenticated && (
                  <div className="p-4 text-center border-b border-gray-100 flex flex-col items-center">
                    <Link to="/login" className="w-[80%] bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] py-1 text-sm rounded-[3px] hover:from-[#f5d78e] hover:to-[#eeb933] shadow-sm mb-1 font-medium">
                      Sign in
                    </Link>
                    <span className="text-[11px] text-gray-600">New customer? <Link to="/register" className="text-blue-700 hover:underline hover:text-[#c45500]">Start here.</Link></span>
                  </div>
                )}
                <div className="p-4 grid grid-cols-1 gap-2 text-sm bg-gray-50">
                  <h4 className="font-bold border-b pb-1 mb-1">Your Account</h4>
                  <Link to="/profile" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                  <Link to="/orders" className="hover:text-[#c45500] hover:underline">Your Orders</Link>
                  <Link to="/wishlist" className="hover:text-[#c45500] hover:underline">Your Wishlist</Link>
                  {isAuthenticated && (
                    <button onClick={logout} className="text-left hover:text-[#c45500] hover:underline pt-2 border-t mt-1">Sign Out</button>
                  )}
                </div>
              </div>
            </div>

            {/* Orders */}
            <Link to="/orders" className="hidden sm:flex flex-col border border-transparent hover:border-white p-2 rounded leading-tight shrink-0 mx-1">
              <span className="text-[12px]">Returns</span>
              <span className="text-[14px] font-extrabold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-end border border-transparent hover:border-white px-2 py-1 rounded shrink-0 relative">
              <div className="relative">
                <HiOutlineShoppingCart className="text-white text-[38px]" />
                <span className="absolute top-[-5px] left-[15px] bg-[#131921] text-[#f08804] text-[16px] font-bold px-1 min-w-[20px] text-center">
                  {cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0}
                </span>
              </div>
              <span className="text-[14px] font-extrabold mb-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#232f3e] text-white py-1">
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-4 h-10 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-1 font-bold border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">
            <HiOutlineMenu className="text-2xl" /> All
          </button>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">Amazon miniTV</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">Sell</Link>
          <Link to="/products?sort=-numOfReviews" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">Best Sellers</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">Today's Deals</Link>
          <Link to="/products?sort=-createdAt" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">New Releases</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">Mobiles</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0">Customer Service</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0 hidden md:block">Electronics</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0 hidden lg:block">Home & Kitchen</Link>
          <Link to="/products" className="text-[14px] font-medium border border-transparent hover:border-white px-2 py-1.5 rounded transition-all shrink-0 hidden xl:block">Amazon Pay</Link>
        </div>
      </div>
    </header>
  );
}

