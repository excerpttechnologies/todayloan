"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Sparkles,
  Search,
  TrendingUp,
  Award,
  Zap,
  Cpu,
  BookOpen,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const blogs = [
  {
    id: "future-analog-ai",
    title: "The Future of Analog Design with AI Enhancement",
    excerpt:
      "Exploring how machine learning is revolutionizing analog circuit design and optimization, reducing design cycles by 10x.",
    author: "Dr. Sarah Chen",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    date: "2024-01-15",
    category: "Technology",
    readTime: "8 min",
    featured: true,
    image:
      "https://images.openai.com/static-rsc-4/y0QvmOfbsvaaucvm446hSWp7gwYtbNAcsMmUf8YnkNFXfqW6KswwZmMRxtQIfK_TBB8UCayWkZ7RV-N-Bej1Iq-JFrGGk8f2LXXB5xuC-EGPlxHysaHlZ9iQUzmMGtjoavRK-4IjcpvaAQwNeHk1IkUJLX_m-fOO8z50v-3uwId9fnjrL2qXHtWWiV8vFaJq?purpose=fullsize",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["AI", "Analog Design", "Innovation"],
  },
  {
    id: "serdes-evolution",
    title: "SERDES Technology Evolution: From 56G to 112G",
    excerpt:
      "A comprehensive look at the evolution of serial deserializer technology and future directions in high-speed communication.",
    author: "John Rodriguez",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    date: "2024-01-10",
    category: "Silicon IP",
    readTime: "6 min",
    image:
      "https://images.openai.com/static-rsc-4/YhFaR-9jgSJYGhF9aBioxcs4TbHAhu0W9mchhKgfVJtbZDLaUzzu9iVA9QeroGFT1ohjvJ9scrcJFhu1uVek-K-tTw2tBn3Qd-TTR2UEpVdokvc-z6GwcctOyW_WHkVTtsJ_6UtsU6HpgJZFMl2LOE0Sllq7qUIhURceq49PbpwzTelmFyRm1onbx0dh1SL2?purpose=fullsize",
    tags: ["SERDES", "High-Speed", "IP"],
  },
  {
    id: "signal-integrity",
    title: "Signal Integrity in Modern High-Speed Systems",
    excerpt:
      "Best practices for maintaining signal integrity in next-generation semiconductor applications with practical examples.",
    author: "Emily Watson",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    date: "2024-01-05",
    category: "Engineering",
    readTime: "10 min",
    image:
      "https://images.openai.com/static-rsc-4/mDwet_-qBTeOVlvFqk_uUJbFc74gv0XWyBrDJ4EUKnFoevafPxda-OrFqQVb34Sv_9j4VPlqlytDuc72ReA53TcF06TUt317i7gjdAvz-pe5_B0jJOxQ-JRgRPZc1yUIhVcQd1P1e7ilmm9mKaWP5ExW7bxuwZiFZXowBHNV0-PugDq9HHhG7HgeWKXETnxu?purpose=fullsize",
    gradient: "from-emerald-500 to-teal-500",
    tags: ["Signal Integrity", "Engineering", "Best Practices"],
  },
  {
    id: "pll-design",
    title: "PLL Design Best Practices for Low Jitter Applications",
    excerpt:
      "Deep dive into phase-locked loop design principles for achieving sub-picosecond jitter in advanced nodes.",
    author: "Michael Park",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "2023-12-28",
    category: "Design Guide",
    readTime: "12 min",
    image:
      "https://images.openai.com/static-rsc-4/Q6WbxBApvCMyB5Vg4ZhZEgeCsFJCDupJQnzeFnLI8aPFpkrN53n8cxLHv3HsDrYOEpBCddThYKuhw1uJ7_F1NE5RhjG3u1JktJMWjoDXAnmPLkq9MFwJccNCdNRsq0WrsN3uwFQJ_4L9Bpp0xQYSaR_FQRZnS1glm5tJ82OfSpTtDXMIIcJWS-M_1mssJweU?purpose=fullsize",
    gradient: "from-orange-500 to-red-500",
    tags: ["PLL", "Jitter", "Timing"],
  },
  {
    id: "power-efficiency",
    title: "Power Efficiency Trends in Modern Semiconductors",
    excerpt:
      "How semiconductor manufacturers are achieving unprecedented power efficiency levels through innovative techniques.",
    author: "Lisa Thompson",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    date: "2023-12-20",
    category: "Industry Analysis",
    readTime: "7 min",
    image:
      "https://images.openai.com/static-rsc-4/hCnXnRgJnaq8dfi7lA5ejRUfLpEA0mE0rIDPPaf9kNcTyxOH09sZ-4yzLY0JgFHijWkf_dZ9-giK3UEXqKE6yxWFZpr3VgXQmtE-lReqEgJm2tTrqZY_49Xb-RnkC10M5fvs4KKJcJjjPPLKFpdD0fe_FragiFxiPEk2S4aKVI1trSAw0LYnSZ1fddmG5aKR?purpose=fullsize",
    gradient: "from-indigo-500 to-purple-500",
    tags: ["Power", "Efficiency", "Trends"],
  },
  {
    id: "data-converters",
    title: "Next-Generation Data Converters for 5G and Beyond",
    excerpt:
      "Exploring the latest ADC/DAC technologies enabling 5G, 6G, and next-generation wireless communications.",
    author: "Dr. James Liu",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    date: "2023-12-15",
    category: "Technology",
    readTime: "9 min",
    image:
      "https://images.openai.com/static-rsc-4/DK3KpfSCQW1nm13sVpdImq1J0br-WTL_Cf5IJusKWwTdMJYrcezxlw-wZyPKnoxw5gF8gz8obMTsFCrwkgEUfm0zvEp9d07baWBVrHlD-PRlbS947HKpzKN8aDLg7PcAU0-Lx4TocnUmL2BRbHD1TFdR-hg7YSCjTMvgMaFVM0YSo0T9okb17oOi5GxNwtcx?purpose=fullsize",
    gradient: "from-rose-500 to-pink-500",
    tags: ["ADC", "DAC", "5G"],
  },
];

const categories = [
  "All",
  "Technology",
  "Silicon IP",
  "Engineering",
  "Design Guide",
  "Industry Analysis",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find((b) => b.featured);
  const regularBlogs = filteredBlogs.filter((b) => !b.featured);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      // Featured article animation
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(0.4)",
        },
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, searchTerm]);

  const handleCardHover = (index: number, isEnter: boolean) => {
    setHoveredCard(isEnter ? index : null);
  };

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50"
      >
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Insights & Resources
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Blog & Resources
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Insights, technical guides, and industry analysis from our
              semiconductor experts.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {featuredBlog && (
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
              <div ref={featuredRef}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                  <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-2xl transition-all duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Image */}
                      <div className="relative h-64 lg:h-auto overflow-hidden">
                        <Image
                          src={featuredBlog.image}
                          alt={featuredBlog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${featuredBlog.gradient} mix-blend-multiply opacity-40`}
                        />
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg">
                            <span className="text-xs font-bold text-blue-600">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <span
                            className={`px-3 py-1 rounded-full bg-gradient-to-r ${featuredBlog.gradient} text-white text-xs font-semibold`}
                          >
                            {featuredBlog.category}
                          </span>
                          <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{featuredBlog.readTime}</span>
                          </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 line-clamp-2">
                          {featuredBlog.title}
                        </h2>

                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>

                        <div className="flex items-center gap-3 mb-6">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={featuredBlog.authorAvatar}
                              alt={featuredBlog.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {featuredBlog.author}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(featuredBlog.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/blog/${featuredBlog.id}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-semibold w-fit hover:gap-3 transition-all duration-300 group/link"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Section */}
        <section className="py-12 pb-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularBlogs.map((blog, index) => {
                const isHovered = hoveredCard === index;

                return (
                  <div
                    key={blog.id}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="group relative"
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${blog.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${blog.gradient} mix-blend-multiply opacity-40`}
                        />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg">
                            <span className="text-xs font-bold text-slate-800">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(blog.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text transition-all duration-300">
                          {blog.title}
                        </h3>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={blog.authorAvatar}
                                alt={blog.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-700">
                              {blog.author.split(" ")[0]}
                            </span>
                          </div>

                          <Link
                            href={`/blog/${blog.id}`}
                            className={`inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 ${
                              isHovered
                                ? "text-blue-600 gap-2"
                                : "text-slate-500"
                            }`}
                          >
                            Read
                            <ArrowRight
                              className={`w-3 h-3 transition-all duration-300 ${isHovered ? "translate-x-0.5" : ""}`}
                            />
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {regularBlogs.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
