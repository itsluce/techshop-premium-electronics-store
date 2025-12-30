 'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Award } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

export function HeroSection() {
  return (
    <div className="relative mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative space-y-8"
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center md:justify-start"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 dark:bg-blue-500/10 border border-foreground/10 dark:border-blue-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-foreground dark:text-blue-500" />
            <span className="text-sm font-medium gradient-text-rainbow">
              Premium Collection 2025
            </span>
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-center md:text-left"
        >
          <span className="block gradient-text-rainbow mb-2">
            Discover Premium Electronics
          </span>
        </motion.h1>

        {/* Dynamic Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-4xl font-semibold mb-8 h-12 md:h-16 text-center md:text-left"
        >
          <TypeAnimation
            sequence={[
              'Phones',
              2000,
              'Laptops',
              2000,
              'Cameras',
              2000,
              'Headphones',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text-rainbow"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: 'easeOut'
          }}
          className="space-y-6"
        >
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl text-center md:text-left leading-relaxed">
            Browse our curated collection of the latest tech products with cutting-edge features and stunning design
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-blue-500">Fast Shipping</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 rounded-lg bg-foreground/5 dark:bg-blue-500/10 border border-foreground/10 dark:border-blue-500/20">
                <Award className="w-4 h-4 text-foreground dark:text-blue-500" />
              </div>
              <span className="text-sm font-medium">Premium Quality</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                <Sparkles className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-orange-500">Curated Selection</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
