'use client';

import Link from 'next/link';
import { CartButton } from '@/components/cart/CartButton';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import {useTheme} from "@/contexts/ThemeContext";

export function Header() {
  const { theme } = useTheme();
const isDark = theme === 'dark';
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/50 shadow-lg"
    >
      {/* Decorative gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/30 dark:via-blue-500/50 to-transparent" />

      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              {/* Enhanced icon with gradient background */}
              <motion.div
                animate={{
                  boxShadow: isDark
                    ? ['0 0 20px rgba(59, 130, 246, 0.4)', '0 0 30px rgba(139, 92, 246, 0.6)', '0 0 20px rgba(59, 130, 246, 0.4)']
                    : ['0 0 10px rgba(0, 0, 0, 0.2)', '0 0 15px rgba(0, 0, 0, 0.3)', '0 0 10px rgba(0, 0, 0, 0.2)']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="p-2 rounded-xl gradient-bg-rainbow"
              >
                <Package className="h-6 w-6 text-white" strokeWidth={2.5} />
              </motion.div>
            </div>
            <span className="text-2xl md:text-3xl font-bold tracking-tight gradient-text-rainbow">
              TechShop
            </span>
          </motion.div>
        </Link>

        <nav className="flex items-center gap-2 md:gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <ThemeToggle />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <CartButton />
          </motion.div>
        </nav>
      </div>
      <CartSidebar />
    </motion.header>
  );
}
