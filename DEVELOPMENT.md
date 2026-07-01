# Development Guide - SmartScope

Complete guide for developers working on the SmartScope project.

## Development Environment Setup

### 1. Initial Setup
```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.local.example .env.local

# Start dev server with hot reload
pnpm dev
```

### 2. VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense
- PostCSS Language Support
- Thunder Client or REST Client

### 3. Browser DevTools
- React Developer Tools
- Redux DevTools (if using Redux)
- Chrome DevTools for performance profiling

## Code Structure & Conventions

### File Organization
```
Component files:     PascalCase.tsx
Hook files:         useFeatureName.ts
Utility files:      featureName.ts
Type definitions:   types.ts or interfaces.ts
CSS modules:        component.module.css
```

### Component Patterns

#### Functional Component with Hooks
```typescript
'use client';

import { useState, useEffect } from 'react';

interface ComponentProps {
  title: string;
  onAction?: (value: string) => void;
}

export function MyComponent({ title, onAction }: ComponentProps) {
  const [state, setState] = useState('');

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      {/* Component content */}
    </div>
  );
}
```

#### Server Component with Async Data
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

export default async function Page() {
  const data = await fetchData();
  
  return (
    <main>
      {/* Content */}
    </main>
  );
}
```

## Styling Guide

### Design Tokens
Use predefined design tokens in `/app/globals.css`:
```css
--primary: oklch(0.45 0.18 265);    /* Blue */
--accent: oklch(0.52 0.22 240);     /* Cyan */
--background: oklch(0.98 0.001 250);/* Off-white */
```

### Tailwind CSS Best Practices
```tsx
// Good - Use Tailwind utilities
<div className="flex items-center gap-4 px-6 py-4 rounded-lg bg-white">

// Avoid - Inline styles
<div style={{display: 'flex', gap: '16px'}}>

// Good - Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Avoid - Fixed widths without responsive breakpoints
<div className="w-500">
```

### Component Styling with Design System
```tsx
// Use semantic design tokens
<div className="bg-background text-foreground border border-border">
  <button className="bg-accent text-accent-foreground">
    Click me
  </button>
</div>
```

## Animation Implementation

### GSAP Scroll Triggers
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedComponent() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return <div ref={ref}>Animated content</div>;
}
```

### Framer Motion
```tsx
import { motion } from 'framer-motion';

export function MotionComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      Animated content
    </motion.div>
  );
}
```

## API Development

### Creating API Routes
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const param = searchParams.get('param');
    
    // Process request
    const data = { message: 'Success' };
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate input
    if (!body.required_field) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }
    // Process and return
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

### Using API Client
```typescript
import { apiClient, productsAPI } from '@/lib/api';

// Fetch data
const { data: products } = await productsAPI.getAll();

// With error handling
try {
  const response = await apiClient.post('/api/contact', formData);
  console.log('Success:', response.data);
} catch (error) {
  console.error('Error:', error);
}
```

## Form Handling

### Controlled Component Form
```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </Button>
      {submitted && <p>Thank you!</p>}
    </form>
  );
}
```

## Data Fetching

### Server-Side Fetching (Preferred)
```typescript
// page.tsx or components in app directory

async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export default async function ProductsPage() {
  const { data: products } = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

### Client-Side Fetching with SWR
```typescript
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function ProductList() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div>
      {data.data?.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

## Testing

### Unit Testing with Jest (Setup Example)
```typescript
// __tests__/utils.test.ts
import { formatPrice } from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(100)).toBe('$100.00');
  });

  it('should handle decimals', () => {
    expect(formatPrice(99.99)).toBe('$99.99');
  });
});
```

### E2E Testing with Playwright (Setup Example)
```typescript
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test('should submit contact form', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Thank you')).toBeVisible();
});
```

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image';

// Good - optimized with Next.js
<Image
  src="/hero.jpg"
  alt="Hero banner"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Avoid - unoptimized
<img src="/hero.jpg" />
```

### Code Splitting
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});

export default function Page() {
  return (
    <main>
      <HeavyComponent />
    </main>
  );
}
```

### Bundle Analysis
```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

## Debugging

### Console Logging
```typescript
// Use prefixed logs for clarity
console.log('[ProductPage] Loading products...');
console.error('[API] Error fetching data:', error);
console.warn('[Performance] Slow query detected');
```

### React DevTools
1. Install React Developer Tools extension
2. Open DevTools and go to "Components" tab
3. Inspect component tree and props
4. Use the profiler to track render performance

### Network Tab
1. Open DevTools → Network tab
2. Reload page to see all requests
3. Check response times and sizes
4. Identify slow API endpoints

## Git Workflow

### Branch Naming
```bash
feature/product-detail-page
bugfix/contact-form-validation
chore/update-dependencies
```

### Commit Messages
```
feat: add product detail page
fix: resolve contact form validation error
docs: update installation instructions
chore: update dependencies
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Push and create pull request
4. Request review from team members
5. Address feedback and merge

## Environment Variables

### Required Variables
```bash
# None required for development (defaults work)
```

### Optional Variables
```bash
MONGODB_URI=           # Database connection
SENDGRID_API_KEY=      # Email service
NEXT_PUBLIC_API_URL=   # API base URL
```

## Deployment Checklist

- [ ] All tests pass
- [ ] No console errors/warnings
- [ ] Environment variables set
- [ ] Build successful (`pnpm build`)
- [ ] Performance metrics acceptable
- [ ] SEO meta tags correct
- [ ] Mobile responsive verified
- [ ] Accessibility checked (axe-core)
- [ ] Code reviewed
- [ ] Documentation updated

## Common Issues & Solutions

### Issue: Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### Issue: Module Not Found
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Slow Build Time
```bash
# Use SWC minifier
# Already default in Next.js 13+

# Check for large dependencies
pnpm audit
```

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Patterns**: https://reactpatterns.com/
- **Web.dev**: https://web.dev/performance/

## Support

For questions or issues:
1. Check project documentation
2. Search GitHub issues
3. Create detailed issue with reproduction steps
4. Contact team lead
