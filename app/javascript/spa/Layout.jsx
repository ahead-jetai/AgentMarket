import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Layout = ({ children }) => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Trigger loading state on route change
    setIsLoading(true);

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

      setIsScrolled(currentY > 8);

      if (currentY < 80) {
        setShowHeader(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY > lastScrollY.current + 4) {
        // Scrolling down – hide
        setShowHeader(false);
      } else if (currentY < lastScrollY.current - 4) {
        // Scrolling up – reveal
        setShowHeader(true);
      }

      lastScrollY.current = currentY;
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Animated spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-12 w-12 rounded-full border-4 border-slate-800 border-t-emerald-400"
              />
              {/* Loading text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-slate-400"
              >
                Loading...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_60%)]">
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
        className={`sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur-xl transform-gpu transition duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "shadow-[0_18px_45px_rgba(15,23,42,0.9)]" : "border-transparent bg-slate-950/30"}`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between">
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
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
