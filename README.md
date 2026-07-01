# SmartScope - Premium Semiconductor Company Website

A comprehensive, enterprise-grade Next.js 16 application for a semiconductor company featuring a public-facing website, full-featured admin CMS, advanced animations, and seamless user experience.

## Project Overview

SmartScope is a complete semiconductor company platform with:

- **Public Website**: Premium product showcase, blog, careers, and contact pages
- **Admin Dashboard**: Full CMS for managing products, blogs, jobs, inquiries, and media
- **Product Catalog**: Dynamic product pages with detailed specifications
- **Blog System**: Content management with rich article pages
- **Career Portal**: Job listings and application management
- **Contact Management**: Inquiry handling and analytics
- **API Routes**: Fully functional REST API for all operations
- **Animations**: GSAP scroll triggers, Framer Motion transitions, and smooth interactions
- **Design System**: Premium UI with glass-morphism effects and gradient accents
- **SEO Optimized**: Meta tags, structured data, and dynamic metadata

## Tech Stack

### Frontend
- **Next.js 16** - React meta-framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **GSAP** - Advanced animations and scroll triggers
- **Framer Motion** - Component animations
- **Lenis** - Smooth scrolling library

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Axios** - HTTP client for API calls
- **Nodemailer** - Email notifications
- **Mongoose** - MongoDB ODM (optional, for database integration)

### UI/UX
- **Lucide Icons** - Icon library
- **Recharts** - Data visualization
- **Vercel Analytics** - Performance monitoring

## Project Structure

```
/app
  /(public routes)
    /page.tsx                 # Home page with hero and sections
    /about/page.tsx          # Company information
    /products/page.tsx       # Product catalog
    /products/[slug]/page.tsx # Dynamic product detail pages
    /blog/page.tsx           # Blog listing
    /blog/[slug]/page.tsx    # Dynamic blog articles
    /careers/page.tsx        # Job listings
    /contact/page.tsx        # Contact form
  
  /(admin routes)
    /admin/layout.tsx        # Admin layout with sidebar
    /admin/page.tsx          # Dashboard
    /admin/products/page.tsx # Product management
    /admin/blogs/page.tsx    # Blog management
    /admin/careers/page.tsx  # Job management
    /admin/inquiries/page.tsx # Contact inquiries
    /admin/media/page.tsx    # Media library
    /admin/settings/page.tsx # Site settings
  
  /api
    /contact/route.ts        # Contact form API
    /products/route.ts       # Products API
    /search/route.ts         # Search API

/components
  /layout
    /Navbar.tsx              # Navigation bar
    /Footer.tsx              # Footer component
  /home
    /Hero.tsx                # Hero section with animation
    /ProductShowcase.tsx     # Product grid
    /Features.tsx            # Features section
  /ui
    (shadcn components)

/hooks
  /useScrollTrigger.ts       # GSAP scroll animations
  /useElementReveal.ts       # Staggered element reveal

/lib
  /api.ts                    # API client configuration
  /utils.ts                  # Utility functions

/styles
  /globals.css               # Global styles and design tokens
```

## Key Features

### 1. Public Website

#### Home Page
- **Hero Section**: Eye-catching animated hero with circuit pattern SVG
- **Product Showcase**: Grid of 6 products with hover effects
- **Features Section**: Key differentiators with icons
- **CTA Section**: Call-to-action with gradient background

#### Product Pages
- **Catalog**: Browse all 8+ products with filtering
- **Detail Pages**: Full specifications, features, applications
- **Downloads**: Datasheet downloads (integration ready)
- **Dynamic Routing**: SEO-optimized URLs using Next.js dynamic routes

#### Blog
- **Article Listing**: Featured article + grid of posts
- **Article Pages**: Full-featured with metadata, related posts
- **Reading Time**: Calculated automatically
- **Author Info**: Author bio and social links

#### Company Pages
- **About**: Mission, vision, timeline, and statistics
- **Careers**: Job listings with expandable details
- **Contact**: Multi-channel contact options with inquiry form

### 2. Admin Dashboard

#### Dashboard
- **Analytics Cards**: Key metrics overview
- **Recent Activity**: Latest inquiries and submissions
- **Quick Actions**: Fast access to common tasks

#### Management Modules
- **Products**: CRUD operations with bulk actions
- **Blog Posts**: Rich editor integration ready
- **Job Listings**: Manage positions and applications
- **Inquiries**: Inbox-style management interface
- **Media**: File browser with upload capability
- **Settings**: Site configuration and SEO

### 3. Design & Animations

#### Visual Design
- **Premium Theme**: Light backgrounds with blue/cyan accents
- **Glass-morphism**: Frosted glass effect components
- **Gradient Accents**: Subtle gradient text and buttons
- **Typography**: Clean, readable sans-serif fonts

#### Animations
- **Hero Entrance**: Staggered animations on home page load
- **Scroll Triggers**: Elements reveal as user scrolls
- **Hover Effects**: Cards lift and glow on interaction
- **Smooth Transitions**: Page transitions and button interactions
- **Lenis Scroll**: Smooth, physics-based scrolling

### 4. SEO & Performance

- **Dynamic Metadata**: Each page has custom meta tags
- **Structured Data**: JSON-LD for products and articles
- **Image Optimization**: Next.js Image component
- **Mobile Responsive**: Mobile-first design approach
- **Accessibility**: ARIA labels and semantic HTML

## Getting Started

### Prerequisites
- Node.js 18+ with pnpm (or npm/yarn)
- MongoDB URI (optional, for database integration)
- SendGrid API key (optional, for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd smartscope
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Development Workflow

#### Adding a New Product
1. Go to `/admin/products`
2. Click "Add Product" button
3. Fill in product details
4. Create corresponding detail page in `/app/products/[slug]/page.tsx`

#### Publishing a Blog Post
1. Navigate to `/admin/blogs`
2. Click "New Article"
3. Write content using the editor
4. Add metadata (author, date, tags)
5. Publish and view at `/blog/[slug]`

#### Managing Job Listings
1. Visit `/admin/careers`
2. Post new jobs with details
3. Track applications
4. Update application status

## API Reference

### Contact Form
```typescript
POST /api/contact
{
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}
```

### Products
```typescript
GET /api/products?category=Silicon%20IP
GET /api/products/:id
POST /api/products (admin)
PUT /api/products/:id (admin)
DELETE /api/products/:id (admin)
```

### Search
```typescript
GET /api/search?q=serdes
// Returns matching products and blog posts
```

## Customization Guide

### Colors & Branding
Edit `/app/globals.css` color tokens:
```css
:root {
  --primary: oklch(0.45 0.18 265);      /* Blue */
  --accent: oklch(0.52 0.22 240);       /* Cyan */
  --background: oklch(0.98 0.001 250);  /* Off-white */
}
```

### Typography
Modify fonts in `/app/layout.tsx`:
```typescript
const geist = Geist({ subsets: ["latin"] });
```

### Component Styles
All components use Tailwind CSS with design tokens. Modify using utility classes:
```tsx
<div className="px-4 py-2 bg-primary text-white rounded-lg">
  Styled Component
</div>
```

## Database Integration

The project is ready for MongoDB integration:

1. **Install Mongoose** (already included)
2. **Create connection** in `/lib/db.ts`
3. **Define schemas** for Products, Blogs, etc.
4. **Update API routes** to use database instead of mock data

Example schema:
```typescript
const ProductSchema = new Schema({
  name: String,
  category: String,
  description: String,
  specifications: [String],
  createdAt: { type: Date, default: Date.now }
});
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in project settings
4. Deploy automatically on push

### Other Platforms
The project works with any Node.js hosting:
```bash
pnpm build
pnpm start
```

## Performance Optimization

### Image Optimization
- Use Next.js `<Image>` component
- Enable automatic optimization
- Lazy load below-fold images

### Code Splitting
- Dynamic imports for components
- Automatic route code splitting
- Bundle analysis available

### Animation Performance
- GSAP uses GPU acceleration
- will-change CSS applied to animated elements
- Reduced animations on mobile

## Security Considerations

### For Production
1. **Environment Variables**: Keep secrets in `.env.local` (never commit)
2. **CORS**: Configure for your domain
3. **Authentication**: Add admin auth (suggested: Auth.js or custom JWT)
4. **Input Validation**: Validate all form inputs
5. **Rate Limiting**: Add rate limiting to API routes

Example admin auth protection:
```typescript
const authMiddleware = async (request: NextRequest) => {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
};
```

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Build Fails
```bash
# Check for TypeScript errors
pnpm tsc --noEmit

# Run build to see detailed errors
pnpm build
```

### Animations Not Working
- Check browser console for errors
- Ensure GSAP plugin is registered
- Verify element selectors match DOM

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT License - feel free to use for your projects

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **GSAP**: https://gsap.com
- **shadcn/ui**: https://ui.shadcn.com

## Next Steps

To extend this project:

1. **Add MongoDB Database** - Replace mock data with real database
2. **Implement Authentication** - Add admin login system
3. **Email Notifications** - Configure SendGrid for form submissions
4. **Image Uploads** - Integrate Cloudinary or Vercel Blob
5. **Analytics** - Enable Vercel Analytics and Google Analytics
6. **Search Optimization** - Implement full-text search with Elasticsearch
7. **Performance** - Add caching and CDN optimization

---

**Built with Next.js 16, React 19, and TypeScript for premium web experiences.**
