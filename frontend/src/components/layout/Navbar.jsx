import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../../context/authStore';
import useCartStore from '../../context/cartStore';
import useFilterStore from '../../context/filterStore';
import useThemeStore from '../../context/themeStore';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-4 h-14">
          {/* Logo */}
          <Link to="/" className="border border-transparent hover:border-white p-2 rounded transition-all shrink-0">
            <span className="text-2xl font-bold flex items-center">
              ShopHub<span className="text-[#febd69]">.in</span>
            </span>
          </Link>

          {/* Deliver to */}
          <div className="hidden lg:flex flex-col border border-transparent hover:border-white p-2 rounded cursor-pointer leading-tight shrink-0">
            <span className="text-xs text-gray-300">Deliver to</span>
            <span className="text-sm font-bold flex items-center gap-1">
              📍 India
            </span>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-grow flex h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#febd69]"
          >
            <select
              className="bg-gray-100 text-gray-700 px-3 text-sm border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-200"
              value={filters.category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="books">Books</option>
            </select>
            <input
              type="text"
              className="flex-grow px-4 text-black outline-none text-base"
              placeholder="Search ShopHub"
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#febd69] hover:bg-[#f3a847] px-5 flex items-center justify-center transition-all">
              <span className="text-black text-xl text-bold">🔍</span>
            </button>
          </form>

          {/* Right Links */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="nav-link-amazon hidden sm:block">
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Account */}
            <div className="relative group border border-transparent hover:border-white p-2 rounded cursor-pointer leading-tight">
              <Link to={user ? "/profile" : "/login"}>
                <span className="text-xs">Hello, {user ? user.name.split(' ')[0] : 'sign in'}</span>
                <div className="text-sm font-bold flex items-center gap-1">
                  Account & Lists ▾
                </div>
              </Link>
              <div className="absolute top-full right-0 mt-0 w-56 bg-white dark:bg-gray-800 text-black dark:text-white rounded-sm shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all p-4 z-50">
                {!isAuthenticated && (
                  <div className="text-center mb-4 pb-4 border-b">
                    <Link to="/login" className="block w-full bg-[#f0c14b] border border-[#a88734] py-1 text-sm rounded-sm hover:bg-[#eeb933] mb-1">
                      Sign in
                    </Link>
                    <span className="text-[10px]">New customer? <Link to="/register" className="text-blue-600 hover:underline">Start here.</Link></span>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {isAuthenticated && (
                    <>
                      <Link to="/profile" className="hover:text-[#e47911] hover:underline">Your Account</Link>
                      <Link to="/orders" className="hover:text-[#e47911] hover:underline">Your Orders</Link>
                      <Link to="/wishlist" className="hover:text-[#e47911] hover:underline">Your Wishlist</Link>
                      <button onClick={logout} className="text-left hover:text-[#e47911] hover:underline pt-2 border-t">Sign Out</button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Orders */}
            <Link to="/orders" className="hidden sm:flex flex-col border border-transparent hover:border-white p-2 rounded leading-tight shrink-0">
              <span className="text-xs">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-center border border-transparent hover:border-white p-2 rounded shrink-0 relative">
              <div className="text-orange-400 text-3xl">🛒</div>
              <div className="flex flex-col leading-none">
                <span className="absolute top-1 left-6 bg-[#131921] text-[#f08804] text-sm font-bold px-1 rounded-full">
                  {cart?.items?.length || 0}
                </span>
                <span className="text-sm font-bold mt-2">Cart</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#232f3e] text-white py-1">
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-6 h-10">
          <button className="nav-link-amazon flex items-center gap-1">
            ☰ All
          </button>
          <Link to="/products" className="nav-link-amazon">Best Sellers</Link>
          <Link to="/products?category=electronics" className="nav-link-amazon">Electronics</Link>
          <Link to="/products?category=fashion" className="nav-link-amazon">Fashion</Link>
          <Link to="/products?category=home" className="nav-link-amazon">Home & Kitchen</Link>
          <Link to="/products" className="nav-link-amazon hidden md:block">Customer Service</Link>
          <Link to="/products" className="nav-link-amazon hidden lg:block">Amazon Pay</Link>
        </div>
      </div>
    </header>
  );
}
