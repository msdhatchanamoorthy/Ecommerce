import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaXTwitter, FaInstagram, FaThreads } from 'react-icons/fa6';

export default function Footer() {
  const footerLinks = {
    shop: [
      { label: 'Products', href: '/products' },
      { label: 'New Arrivals', href: '/products?sort=newest' },
      { label: 'Best Deals', href: '/products?sort=price-low' },
    ],
    support: [
      { label: 'Contact Us', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-orange-500">🛍️ ShopHub</h3>
            <p className="text-gray-400 text-sm">
              Your trusted online shopping destination with premium products at unbeatable prices.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://x.com/Dhatchana_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://www.threads.net/@dhatchana.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaThreads size={18} />
              </a>
              <a
                href="https://www.instagram.com/dhatchana.dev?igsh=MTJzeXIybGFtMWF0OA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </motion.div>

          {/* Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-gray-400 hover:text-orange-500 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-500 transition text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-500 transition text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-bold mb-4">Newsletter</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition" type="button">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '🚚', text: 'Free Shipping' },
                { icon: '💰', text: 'Best Prices' },
                { icon: '🛡️', text: 'Secure' },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-1">{feature.icon}</div>
                  <p className="text-xs text-gray-400">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Policies */}
            <div className="flex justify-end gap-6 text-sm">
              {footerLinks.legal.map((link, i) => (
                <a key={i} href={link.href} className="text-gray-400 hover:text-orange-500 transition">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 ShopHub. All rights reserved. | Built with ❤️ by Dhatchana.dev</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
