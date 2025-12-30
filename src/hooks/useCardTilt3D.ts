'use client';

import { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';

interface UseCardTilt3DOptions {
  maxTiltX?: number;
  maxTiltY?: number;
  scale?: number;
  glareEffect?: boolean;
  disableOnMobile?: boolean;
}

interface CardTilt3DReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  style: CSSProperties;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  getLayerStyle: (depth: number, speed?: number) => CSSProperties;
  glareStyle: CSSProperties;
}

export function useCardTilt3D(options: UseCardTilt3DOptions = {}): CardTilt3DReturn {
  const {
    maxTiltX = 15,
    maxTiltY = 15,
    scale = 1.05,
    glareEffect = true,
    disableOnMobile = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || (disableOnMobile && isMobile) || prefersReducedMotion) return;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);

        const tiltX = -mouseY * maxTiltX;
        const tiltY = mouseX * maxTiltY;

        setTilt({ x: tiltX, y: tiltY });

        if (glareEffect) {
          const glareX = ((e.clientX - rect.left) / rect.width) * 100;
          const glareY = ((e.clientY - rect.top) / rect.height) * 100;
          setGlarePosition({ x: glareX, y: glareY });
        }
      });
    },
    [maxTiltX, maxTiltY, glareEffect, disableOnMobile, isMobile, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  }, []);

  const style: CSSProperties = {
    transform: isHovered && !isMobile && !prefersReducedMotion
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
    willChange: isHovered ? 'transform' : 'auto',
    transformStyle: 'preserve-3d',
  };

  const getLayerStyle = useCallback(
    (depth: number, speed: number = 1): CSSProperties => {
      if (isMobile || prefersReducedMotion) {
        return {
          transform: `translateZ(0px)`,
        };
      }

      return {
        transform: `translateZ(${depth}px) translateX(${tilt.y * speed * 0.5}px) translateY(${-tilt.x * speed * 0.5}px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      };
    },
    [tilt, isHovered, isMobile, prefersReducedMotion]
  );

  const glareStyle: CSSProperties = glareEffect && isHovered && !isMobile && !prefersReducedMotion
    ? {
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        opacity: 0.6,
        transition: 'opacity 0.2s ease-out',
      }
    : {
        position: 'absolute',
        inset: 0,
        opacity: 0,
        pointerEvents: 'none',
      };

  return {
    ref,
    style,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    getLayerStyle,
    glareStyle,
  };
}
