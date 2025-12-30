# TechShop - Next.js E-Commerce Application

A modern, minimal e-commerce application built with Next.js 15, featuring advanced filtering, interactive 3D product visualization, and a seamless shopping experience.

## Features

- 🛍️ **Product Browsing**: Responsive grid layout with 15 curated electronics products
- 🔍 **Advanced Filtering**: Real-time search with debouncing, category filtering, and price range slider
- 🛒 **Shopping Cart**: Full-featured cart with localStorage persistence and quantity management
- 🎨 **3D Product Viewer**: Interactive Three.js-powered 3D visualization on product detail pages
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop viewports
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, and focus management
- ⚡ **Performance Optimized**: SSG for product pages, optimized images, and minimal bundle size
- 🔗 **URL State Persistence**: Shareable URLs with filter and search parameters

## Tech Stack

### Core Framework
- **Next.js 15** (App Router) - React framework with SSR/SSG capabilities
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Inter Font** - Clean, modern typography

### State Management
- **React Context API** - Cart and filter state management
- **localStorage** - Cart persistence across sessions
- **URL Search Params** - Filter state in URL for shareability

### 3D Graphics
- **Three.js** - 3D rendering library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper utilities for R3F

### Testing
- **Playwright** - End-to-end testing framework
- 4 comprehensive test suites covering all major features

## Project Structure

```
tech shop premium electronics store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── favicon.ico        # App favicon
│   │   ├── globals.css        # Global Tailwind CSS styles
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page (server component)
│   │   └── products/[id]/     # Product detail pages (SSG)
│   │       ├── page.tsx       # Product detail page
│   │       └── not-found.tsx  # Custom 404 page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (7 files)
│   │   ├── background/        # Animated background component
│   │   ├── cart/              # Cart sidebar, items, button
│   │   ├── filters/           # Search, category, price filters
│   │   ├── home/              # Hero section component
│   │   ├── layout/            # Header, Footer, ThemeToggle
│   │   ├── loading/           # Image skeleton loaders
│   │   ├── product/           # Product cards, grid, 3D viewer (8 files)
│   │   ├── providers/         # Context providers wrapper
│   │   ├── reviews/           # Review cards and star ratings
│   │   └── transitions/       # Page transition animations
│   ├── contexts/
│   │   ├── CartContext.tsx    # Shopping cart state
│   │   ├── FilterContext.tsx  # Filter state with URL sync
│   │   └── ThemeContext.tsx   # Dark/light theme state
│   ├── hooks/
│   │   ├── useCardTilt3D.ts   # 3D tilt effect hook
│   │   └── useDebounce.ts     # Debounce hook (300ms)
│   ├── lib/
│   │   ├── products.ts        # Product data utilities
│   │   ├── utils.ts           # Shared utilities
│   │   └── webgl-manager.ts   # WebGL/3D management
│   ├── types/
│   │   ├── product.ts         # Product types
│   │   ├── cart.ts            # Cart types
│   │   └── filter.ts          # Filter types
│   └── data/
│       ├── products.json      # Product database
│       └── reviews.json       # Product reviews data
├── tests/
│   └── e2e/                   # Playwright E2E tests (4 suites)
│       ├── home.spec.ts
│       ├── filters.spec.ts
│       ├── cart.spec.ts
│       └── product-detail.spec.ts
├── public/
│   └── models/                # 3D model files (7 .glb files)
│       ├── airpods.glb
│       ├── asus_laptop.glb
│       ├── camera.glb
│       ├── headphones.glb
│       ├── iphone.glb
│       ├── laptop.glb
│       └── samsung_phone.glb
└── playwright.config.ts       # Playwright configuration
```

## Technical Decisions

### State Management: React Context API

**Why?**
- Sufficient for small-medium scale applications
- No external dependencies required
- Built-in React solution
- No Need to use Redux since the state too small
- Provides clean separation between cart and filter concerns

**Alternative considered:** Zustand - Would reduce boilerplate but adds dependency

### Styling: Tailwind CSS + shadcn/ui

**Why?**
- Rapid development with utility classes
- Consistent design system out of the box
- shadcn/ui provides accessible, customizable and downloadable only used components

### Data Loading: Static JSON + SSG

**Why?**
- Products are relatively static in nature
- Enables optimal performance with generateStaticParams
- Simple, version-controlled data source
- Fast page loads and excellent SEO
- No database infrastructure required

**Alternative considered:** Database + SSR - Overkill for this scope

### 3D Visualization: React Three Fiber

**Why?**
- Declarative React API instead of imperative Three.js
- Automatic cleanup and memory management
- Better TypeScript support
- No performance overhead vs vanilla Three.js
- Excellent documentation and ecosystem

**Alternative considered:** Vanilla Three.js - More verbose, manual cleanup

### Cart Persistence: localStorage

**Why?**
- Larger storage capacity (5-10MB) than cookies
- Client-side only (cart doesn't need server-side rendering)
- Simple API, no security concerns for cart data
- Persists across sessions

**Alternative considered:** Cookies - Limited size, unnecessary complexity

## Component Architecture

### Server Components (Default)
- `app/page.tsx` - Home page
- `app/products/[id]/page.tsx` - Product detail pages
- Layout components

### Client Components ('use client')
- All interactive components (cart, filters, 3D viewer)
- Context providers
- Components using hooks

This separation ensures optimal performance with React Server Components.

## Testing

The application includes comprehensive E2E tests using Playwright:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run specific test file
npx playwright test tests/e2e/cart.spec.ts
```

### Test Coverage

- **Home Page** (8 tests): Grid rendering, navigation, responsiveness
- **Filters** (8 tests): Search debouncing, category filtering, URL sync
- **Cart** (12 tests): Add/remove items, quantity, localStorage persistence
- **Product Detail** (13 tests): SSG, 3D viewer, accessibility, out-of-stock

## Performance Optimizations

- **Static Generation**: Product pages pre-rendered at build time
- **Image Optimization**: Next.js Image component with placeholder images
- **Code Splitting**: Dynamic imports for 3D viewer (client-side only)
- **Debouncing**: Search input debounced to reduce re-renders
- **Memoization**: useMemo for filtered products
- **Lazy Loading**: 3D viewer loads on-demand

## License

This project was created by Mouhanad Dandashli.

---
