# Deployment Guide - SmartScope

Complete guide for deploying SmartScope to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database (MongoDB) set up and tested
- [ ] Email service (SendGrid) configured
- [ ] Admin authentication implemented
- [ ] All tests passing
- [ ] Build successful (`pnpm build`)
- [ ] No console errors or warnings
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags verified
- [ ] Performance metrics acceptable
- [ ] Security review completed

## Deployment Options

### 1. Vercel (Recommended)

#### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
git push origin main
```

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Select your GitHub repository
3. Click "Import"
4. Vercel auto-detects Next.js configuration

#### Step 3: Configure Environment Variables
1. In Vercel dashboard, go to Settings → Environment Variables
2. Add all variables from `.env.local`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SENDGRID_API_KEY=your_sendgrid_api_key
   NEXT_PUBLIC_API_URL=https://yourdomain.com
   ADMIN_SECRET_KEY=your_secret_key
   ```
3. Click "Save"

#### Step 4: Deploy
1. Click "Deploy"
2. Vercel builds and deploys automatically
3. Get your live URL
4. Update environment variables if needed
5. Redeploy if changes made

#### Step 5: Connect Domain
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate

### 2. AWS Deployment

#### Using AWS Amplify
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize in project
amplify init

# Deploy
amplify publish
```

#### Using AWS EC2 + Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin [account].dkr.ecr.[region].amazonaws.com
docker build -t smartscope .
docker tag smartscope [account].dkr.ecr.[region].amazonaws.com/smartscope:latest
docker push [account].dkr.ecr.[region].amazonaws.com/smartscope:latest
```

### 3. DigitalOcean App Platform

1. Fork repository to GitHub
2. Go to DigitalOcean App Platform
3. Click "Create App"
4. Select GitHub repository
5. Configure environment variables
6. Deploy

### 4. Heroku (Legacy)

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create smartscope

# Set environment variables
heroku config:set MONGODB_URI=...
heroku config:set SENDGRID_API_KEY=...

# Deploy
git push heroku main
```

## Environment Variables (Production)

### Required
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartscope?retryWrites=true&w=majority
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### Optional
```bash
ADMIN_SECRET_KEY=your_secret_admin_key
NEXT_PUBLIC_GTAG_ID=google_analytics_id
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_secret_key
```

### Vercel Specific
```bash
# Set in Vercel dashboard
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/cloud
2. Create new project
3. Create cluster
4. Create database user
5. Get connection string
6. Add to environment variables

### MongoDB Local (Development)
```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connection string
mongodb://localhost:27017/smartscope
```

## Post-Deployment

### 1. Verify Deployment
```bash
# Test homepage
curl https://yourdomain.com

# Check API endpoint
curl https://yourdomain.com/api/products

# Check admin dashboard
https://yourdomain.com/admin
```

### 2. Enable Monitoring
- Set up Vercel Analytics
- Configure error tracking (Sentry)
- Enable performance monitoring
- Set up uptime monitoring

### 3. Configure CDN
- Enable Vercel Edge Network (automatic)
- Configure cache rules
- Set up security headers

### 4. Security Setup
```javascript
// next.config.mjs - Add security headers
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  }
];

export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 5. Setup SSL/TLS
- Automatic with Vercel
- AWS Certificate Manager for EC2
- Let's Encrypt for self-hosted

### 6. Configure Email
```bash
# SendGrid
export SENDGRID_API_KEY=SG.xxxxxxxxxxxx

# Or alternative providers
MAILGUN_API_KEY=...
RESEND_API_KEY=...
```

## Continuous Integration

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
      - uses: vercel/actions/deploy-production@v1
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Monitoring & Maintenance

### 1. Error Tracking
```javascript
// Sentry integration
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Performance Monitoring
- Vercel Analytics (built-in)
- Google Analytics
- Datadog
- New Relic

### 3. Uptime Monitoring
- Pingdom
- StatusPage.io
- Better Uptime
- Freshping

### 4. Log Monitoring
- Vercel Logs
- CloudWatch (AWS)
- Stackdriver (Google Cloud)
- ELK Stack

## Backup & Recovery

### Database Backups
```bash
# MongoDB Atlas automatic backups (enabled by default)

# Manual backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/smartscope" \
  --out=backup/$(date +%Y%m%d)

# Restore backup
mongorestore backup/20240115/ --uri="mongodb+srv://..."
```

### Application Backups
```bash
# GitHub is your primary backup
# Ensure all code is committed

# Create tags for releases
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

## Rollback Procedure

### Vercel Rollback
1. Go to Deployments tab
2. Find previous deployment
3. Click "Rollback to this Deployment"
4. Confirm

### Manual Rollback
```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main

# Redeploy
vercel --prod
```

## Performance Optimization

### Enable Caching
```javascript
// next.config.mjs
export default {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};
```

### Image Optimization
- Use Next.js Image component
- Enable automatic optimization
- Configure image formats
- Set up responsive images

### Database Optimization
```javascript
// Add indexes to frequently queried fields
db.products.createIndex({ name: 1 });
db.blogs.createIndex({ slug: 1 });
```

## Scaling Considerations

### Horizontal Scaling
- Vercel handles automatically
- Database replication needed
- Cache strategy important

### Vertical Scaling
- Increase server resources
- Add more memory
- Upgrade database tier

### Content Delivery
- Use CDN for static assets
- Image compression
- Code splitting
- Lazy loading

## Domain & DNS

### DNS Configuration
```
Type  | Name         | Value
------|--------------|------------------
A     | @            | 76.76.19.132
CNAME | www          | cname.vercel.com
CNAME | api          | api.yourdomain.com
TXT   | @            | v=spf1 ...
TXT   | _dmarc       | v=DMARC1 ...
```

### SSL/TLS
- Automatic with Vercel
- Auto-renewal
- HSTS enabled
- Certificate pinning (optional)

## Post-Launch Checklist

- [ ] All pages loading correctly
- [ ] Forms submitting successfully
- [ ] API endpoints responding
- [ ] Admin dashboard accessible
- [ ] Mobile responsive working
- [ ] Email notifications sending
- [ ] Analytics tracking properly
- [ ] Search functionality working
- [ ] Database connected and syncing
- [ ] Backups running
- [ ] Monitoring alerts configured
- [ ] Team notified of live deployment
- [ ] Documentation updated
- [ ] User testing completed

## Support

For deployment issues:
1. Check Vercel logs
2. Review error tracking (Sentry)
3. Check application logs
4. Verify environment variables
5. Test API endpoints
6. Check database connection
7. Review security headers

## Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **SendGrid Documentation**: https://docs.sendgrid.com/
- **AWS Deployment**: https://docs.aws.amazon.com/

---

**Congratulations on deploying SmartScope! 🎉**
