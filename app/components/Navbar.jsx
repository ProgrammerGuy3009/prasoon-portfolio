"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
        isDarkMode ? "bg-black/30 border-red-900/30" : "bg-white/30 border-red-200/30"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className={`text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent cursor-pointer`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Prasoon
        </motion.h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item}
              whileHover={{ color: "#ff4444" }}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`transition ${
                isDarkMode ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-600"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"
            }`}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden border-t ${
            isDarkMode ? "bg-black/50 border-red-900/30" : "bg-white/50 border-red-200/30"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`block w-full text-left px-6 py-3 ${
                isDarkMode ? "hover:bg-red-900/20" : "hover:bg-red-100/50"
              }`}
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
