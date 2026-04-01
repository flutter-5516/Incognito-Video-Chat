"use client";
import React from "react";
import { motion } from "motion/react";
import { Sparkle } from "lucide-react";
const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="fixed top-0 left-0 right-0 z-30 bg-black/50 backdrop-blur border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
        <span>
          <Sparkle size={18} color="white" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-white">
          Incognito
        </span>
      </div>
      <div>
        
      </div>
    </motion.div>
  );
};

export default Navbar;
