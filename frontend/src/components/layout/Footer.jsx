import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#232f3e] text-white mt-0">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-4 text-sm font-medium transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="max-w-[1000px] mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4 text-base">Get to Know Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
            <li><a href="#" className="hover:underline">ShopHub Science</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">Connect with Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">Make Money with Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Sell on ShopHub</a></li>
            <li><a href="#" className="hover:underline">Supply to ShopHub</a></li>
            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
            <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">Let Us Help You</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Returns Centre</a></li>
            <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>
      </div>

      {/* Brand & Language Selection */}
      <div className="border-t border-gray-700 py-8 flex flex-col items-center gap-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold">
            ShopHub<span className="text-[#febd69]">.in</span>
          </Link>
          <div className="flex gap-4">
            <div className="border border-gray-500 rounded px-2 py-1 text-xs cursor-pointer hover:border-white">🌐 English</div>
            <div className="border border-gray-500 rounded px-2 py-1 text-xs cursor-pointer hover:border-white">🇮🇳 India</div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#131a22] py-8">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-300 mb-4">
            <a href="#" className="hover:underline">Conditions of Use & Sale</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
          </div>
          <p className="text-xs text-gray-400">© 2025, ShopHub.in, Inc. or Dhatchana.dev</p>
        </div>
      </div>
    </footer>
  );
}
