import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Layout = ({ children }) => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Trigger loading state on route change
    setIsLoading(true);

    // Check login status
    setIsLoggedIn(!!localStorage.getItem("agentmarket_user_email"));

    // Simulate minimum loading time for smooth transition
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        const count = Array.isArray(data.items)
          ? data.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
          : 0;
        setCartCount(count);
      })
      .catch(() => {
        // Fail silently; nav cart count is non-critical UI.
        setCartCount(0);
      });

    return () => clearTimeout(loadingTimer);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      setIsScrolled(currentY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Animated spinner with breathing effect */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="h-16 w-16 rounded-full border-4 border-slate-800 border-t-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                />
                {/* Pulse ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                />
              </div>
              {/* Loading text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-slate-400 font-light tracking-wide"
              >
                Loading...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden">
      {/* Loading Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] z-50 origin-left"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border-slate-800/80 bg-slate-950/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(15,23,42,0.8)] py-3"
            : "border-transparent bg-transparent py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-300 to-sky-400 shadow-[0_0_24px_rgba(16,185,129,0.8)]" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight text-sm md:text-base">AgentMarket</span>
              <span className="text-[11px] text-slate-400 tracking-tight">AI Agents Marketplace</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-xs md:text-sm">
            <Link to="/" className="text-slate-300 hover:text-emerald-300 transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-slate-300 hover:text-emerald-300 transition-colors">
              Shop
            </Link>
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-300 transition-colors"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex h-4 min-w-[1.1rem] -translate-y-px items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold leading-none text-slate-950 shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard" className="text-slate-300 hover:text-emerald-300 transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-slate-300 hover:text-emerald-300 transition-colors">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full px-4 md:px-8 lg:px-12 pt-4 md:pt-6 lg:pt-8 pb-10 md:pb-14 lg:pb-16"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="border-t border-slate-800/80 mt-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-6 md:py-8 text-[11px] md:text-xs text-slate-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>Built with Rails, React &amp; Tailwind · Prototype AI Agent marketplace</span>
          <span className="text-[10px] md:text-[11px] text-slate-600">
            © {new Date().getFullYear()} AgentMarket. All product names are placeholders.
          </span>
        </div>
      </footer>
    </div>
  </>
  );
};
