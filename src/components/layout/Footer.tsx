'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart, Package } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border/50 mt-auto overflow-hidden">
      {/* Gradient background - hidden in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/2 via-muted-foreground/2 to-foreground/2 pointer-events-none dark:hidden" />

      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 dark:via-blue-500/30 to-transparent" />

      <div className="container relative mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg gradient-bg-rainbow">
                <Package className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold gradient-text-rainbow">
                TechShop
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your destination for premium electronics and cutting-edge technology. Curated selection, exceptional quality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Products', 'Support', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4 }}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-block"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect With Us</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-muted text-muted-foreground hover:text-white transition-all duration-300 relative overflow-hidden group/social"
                >
                  <div className="absolute inset-0 gradient-bg-rainbow opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                  <Icon className="h-4 w-4 relative z-10" strokeWidth={2} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              &copy; {currentYear} TechShop. Built with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.span>
              using Next.js & Tailwind CSS
            </p>
            <div className="flex gap-6 text-xs">
              <motion.a
                href="#"
                whileHover={{ y: -1 }}
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -1 }}
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
