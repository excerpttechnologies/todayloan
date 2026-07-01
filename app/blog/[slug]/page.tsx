import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Calendar, User, Clock, Share2 } from 'lucide-react';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

// Mock blog data
const blogData: Record<string, any> = {
  'future-analog-ai': {
    title: 'The Future of Analog Design with AI Enhancement',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Technology',
    image: 'https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2025/08/Innovation_starts_with_culture_7_ways_leaders_can_enable_it.jpg',
    content: `
# The Future of Analog Design with AI Enhancement

Analog circuit design has long been considered an art form, requiring deep expertise and years of experience. However, the advent of artificial intelligence and machine learning is revolutionizing this field, making it more accessible and efficient than ever before.

## The Traditional Challenges

Analog designers have always faced unique challenges:
- Complex optimization of multiple parameters
- Long simulation times for verification
- Trade-offs between performance metrics
- Process variation handling

## AI-Powered Solutions

AI and machine learning are transforming analog design through:

### Automated Parameter Optimization
Machine learning algorithms can explore design spaces exponentially faster than traditional methods, finding optimal parameters that would take humans weeks to discover.

### Predictive Modeling
AI models can predict circuit behavior with remarkable accuracy, reducing simulation time from hours to seconds.

### Process Variation Mitigation
Deep learning can help designers understand and compensate for process variations, improving yield and reliability.

## Real-World Impact

Companies are already seeing significant benefits:
- 10x reduction in design cycle time
- 15% improvement in power efficiency
- Better handling of corner cases
- Faster time-to-market

## Looking Forward

The future of analog design lies in the collaboration between human expertise and artificial intelligence. Designers will focus on high-level specifications while AI handles the detailed optimization, creating a synergistic partnership that drives innovation.

## Conclusion

AI enhancement in analog design is not about replacing engineers—it's about empowering them with tools that amplify their creativity and efficiency. As we move forward, we can expect to see more sophisticated AI-assisted design flows that push the boundaries of what's possible in semiconductor innovation.
    `,
  },
};

export async function generateMetadata(
  { params }: BlogDetailPageProps
): Promise<Metadata> {
  const blog = blogData[params.slug];

  return {
    title: blog ? `${blog.title} - SmartScope Blog` : 'Blog - SmartScope',
    description: blog?.subtitle || 'Read our latest insights on semiconductor technology',
  };
}

export function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({
    slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
   const { slug } = await params;
  const blog = blogData[slug];

  if (!blog) {
    return (
      <>
        <Navbar />
        <main>
          <section className="min-h-[50vh] flex items-center justify-center">
            <div className="container-max text-center">
              <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
              <p className="text-foreground/70">The article you are looking for does not exist.</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
          <div className="container-max max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                <span className="text-xs font-semibold text-blue-700">{blog.category}</span>
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-foreground/70">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{blog.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12">
          <div className="container-max max-w-4xl">
            <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-12">
              <div className="text-5xl font-bold gradient-text text-center"><img className='w-full h-full' src={blog.image}/></div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section-padding">
          <div className="container-max max-w-3xl">
            <article className="prose prose-lg max-w-none mb-12">
              <div className="space-y-6 text-foreground/80">
                {blog.content.split('\n\n').map((paragraph: string, idx: number) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s/, '');
                    const sizeClasses = {
                      1: 'text-4xl',
                      2: 'text-3xl',
                      3: 'text-2xl',
                    };
                    return (
                      <h2
                        key={idx}
                        className={`${sizeClasses[level as keyof typeof sizeClasses] || 'text-xl'} font-bold mt-8 mb-4`}
                      >
                        {text}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-2 mb-4">
                        {paragraph
                          .split('\n')
                          .map((item, i) => (
                            <li key={i}>{item.replace(/^[-•]\s/, '')}</li>
                          ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </article>

            {/* Author Bio */}
            <Card className="tech-card mb-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500" />
                <div>
                  <h3 className="font-bold text-lg">{blog.author}</h3>
                  <p className="text-foreground/70 text-sm mb-2">
                    Senior engineer and thought leader in semiconductor technology
                  </p>
                  <a href="#" className="text-accent text-sm font-medium hover:text-accent/80">
                    View Profile
                  </a>
                </div>
              </div>
            </Card>

            {/* Share Buttons */}
            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm font-semibold mb-4">Share this article</p>
              <div className="flex gap-4">
                {[
                  { name: 'Twitter', icon: '𝕏' },
                  { name: 'LinkedIn', icon: '💼' },
                  { name: 'Facebook', icon: '👍' },
                  { name: 'Copy Link', icon: '🔗' },
                ].map((social) => (
                  <button
                    key={social.name}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <span>{social.icon}</span>
                    <span className="text-sm font-medium">{social.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="section-padding bg-gradient-to-b from-white to-slate-50">
          <div className="container-max">
            <h2 className="text-4xl font-bold mb-12">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="tech-card group hover:shadow-lg hover:-translate-y-2">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-4" />
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">Related Article {i}</h3>
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                    Related content description
                  </p>
                  <a href="#" className="text-accent font-medium text-sm group-hover:gap-2">
                    Read More →
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
