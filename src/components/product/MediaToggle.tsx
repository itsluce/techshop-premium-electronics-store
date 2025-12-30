'use client';

import { Button } from '@/components/ui/button';
import { Box, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type MediaMode = '3d' | 'gallery';

type MediaToggleProps = {
  mode: MediaMode;
  onToggle: (mode: MediaMode) => void;
};

export function MediaToggle({ mode, onToggle }: MediaToggleProps) {
  return (
    <div className="flex gap-2 p-1 bg-muted/50 rounded-lg backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle('3d')}
        className={`relative flex-1 ${mode === '3d' ? 'text-white hover:text-white' : ''}`}
      >
        {mode === '3d' && (
          <motion.div
            layoutId="active-toggle"
            className="absolute inset-0 gradient-bg-rainbow rounded-md"
            transition={{ duration: 0.2 }}
          />
        )}
        <Box className="w-4 h-4 mr-2 relative z-10" />
        <span className="relative z-10">3D View</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle('gallery')}
        className={`relative flex-1 ${mode === 'gallery' ? 'text-white hover:text-white' : ''}`}
      >
        {mode === 'gallery' && (
          <motion.div
            layoutId="active-toggle"
            className="absolute inset-0 gradient-bg-rainbow rounded-md"
            transition={{ duration: 0.2 }}
          />
        )}
        <ImageIcon className="w-4 h-4 mr-2 relative z-10" />
        <span className="relative z-10">Images</span>
      </Button>
    </div>
  );
}
