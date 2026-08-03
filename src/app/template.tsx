'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        duration: 0.8 
      }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}
