"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Cpu,
  Zap,
  Gauge,
  Microchip,
  Bot,
  Target,
  Sparkles,
  Eye,
} from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: "Boost Converter",
    category: "Voltage Conversion",
    description:
      "Compact boost converter for efficient voltage regulation in battery-operated portable electronics",
    longDescription:
      "A compact Boost converter device for efficient voltage regulation in portable electronics. Optimized for stable performance in space-constrained applications. Used in consumer gadgets and IoT devices for reliable power delivery.",
    icon: Cpu,
    image: "/images/boost.jfif",
    gradient: "from-blue-500 to-cyan-500",
    gradientLight: "from-blue-50 to-cyan-50",
    specs: ["Battery Operated", "Compact", "IoT Ready"],
    color: "blue",
  },
  {
    id: 2,
    name: "Buck Regulator",
    category: "Voltage Conversion",
    description:
      "High input voltage tolerant buck regulator for computing, networking and general electronic systems",
    longDescription:
      "A highly integrated buck regulator aimed at simplifying power conversion in modern electronic systems. Designed to reduce component count and streamline board design. Used in computing (DPA systems), networking, and general-purpose electronic systems.",
    icon: Gauge,
    image: "/images/buck.jfif",
    gradient: "from-purple-500 to-pink-500",
    gradientLight: "from-purple-50 to-pink-50",
    specs: ["High Vin", "Low BOM", "DPA Systems"],
    color: "purple",
  },
  {
    id: 3,
    name: "LDO Regulator",
    category: "Linear Regulators",
    description:
      "Ultra low dropout regulator with high input voltage tolerance for consumer and embedded system designs",
    longDescription:
      "A versatile linear regulator device intended for dependable power control in everyday electronic products. Focuses on ease of use and broad compatibility across applications. Suitable for consumer electronics and embedded system designs.",
    icon: Microchip,
    image: "/images/ldo.jfif",
    gradient: "from-emerald-500 to-teal-500",
    gradientLight: "from-emerald-50 to-teal-50",
    specs: ["Ultra LDO", "High Vin", "Broad Compat."],
    color: "emerald",
  },
  {
    id: 4,
    name: "LED Driver",
    category: "Lighting Solutions",
    description:
      "High input voltage linear LED driver with very low BOM count for commercial and industrial lighting",
    longDescription:
      "A dedicated linear LED driver solution for lighting applications focusing on ease-of-use and very low BOM count. Provides consistent illumination control for energy-efficient lighting designs. Ideal for commercial, industrial, and decorative lighting systems.",
    icon: Zap,
    image: "/images/led.jfif",
    gradient: "from-orange-500 to-amber-500",
    gradientLight: "from-orange-50 to-amber-50",
    specs: ["Low BOM", "High Vin", "Smart Lighting"],
    color: "orange",
  },
  {
    id: 5,
    name: "Ideal Diode Controller",
    category: "Protection & Control",
    description:
      "Robust power handling for battery management systems used in automotive, computing and industrial equipment",
    longDescription:
      "Designed to deliver robust power handling for battery management systems (BMS). Enhances system reliability through efficient load management. Used in applications such as computing infrastructure, automotive, and industrial equipment.",
    icon: Bot,
    image: "/images/ideal.jfif",
    gradient: "from-indigo-500 to-purple-500",
    gradientLight: "from-indigo-50 to-purple-50",
    specs: ["BMS Compatible", "High Input V", "Automotive Ready"],
    color: "indigo",
  },
  {
    id: 6,
    name: "Load Switch",
    category: "Protection & Control",
    description:
      "Single N-Channel load switch for controlled power distribution in USB-powered and portable device applications",
    longDescription:
      "A protection-oriented device that helps safeguard electronic systems during operation. Enables controlled power distribution and improved system safety. Commonly implemented in USB-powered and portable device applications.",
    icon: Target,
    image: "/images/load.jfif",
    gradient: "from-rose-500 to-orange-500",
    gradientLight: "from-rose-50 to-orange-50",
    specs: ["N-Channel", "USB Ready", "System Safety"],
    color: "rose",
  },
];

// Tilt Card Component with hover effects
function TiltProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const IconComponent = product.icon;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const onEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group flex-shrink-0 w-80 md:w-96 overflow-visible"
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      whileHover={{ scale: 1.02, zIndex: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 h-[430px] flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Gradient Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 transition-opacity duration-500 mix-blend-multiply ${isHovered ? "opacity-60" : ""}`}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-700">
                {product.category}
              </span>
            </div>
          </div>

          {/* Icon Overlay */}
          <div
            className={`absolute bottom-4 right-4 z-10 transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          >
            <div
              className={`w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-200`}
            >
              <IconComponent
                className={`w-5 h-5 transition-colors duration-500 ${isHovered ? `text-${product.color}-500` : "text-slate-600"}`}
              />
            </div>
          </div>
        </div>

        {/* Content Section - Hidden by default, shows on hover */}
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl flex flex-col justify-center p-6 transition-all duration-500 z-20 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="text-center mb-2">
            <div
              className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-r ${product.gradient} items-center justify-center mb-3`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {product.name}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {product.longDescription}
            </p>
          </div>

          {/* Specs Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {product.specs.map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
              >
                <Cpu className="w-3 h-3" />
                {spec}
              </span>
            ))}
          </div>

          {/* Learn More Link */}
          {/* <Link
            href={`/products/${product.id}`}
            className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 group/link bg-gradient-to-r ${product.gradient} text-white px-4 py-2 rounded-xl hover:shadow-lg`}
          >
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link> */}
        </div>

        {/* Bottom Content - Visible when not hovered */}
        <div
          className={`p-5 flex-1 flex flex-col transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
        >
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-3 flex-1">
            {product.description}
          </p>

          {/* Minimal Specs */}
          <div className="flex flex-wrap gap-1.5">
            {product.specs.slice(0, 2).map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-xs font-medium text-slate-500"
              >
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                {spec}
              </span>
            ))}
          </div>

          {/* Hover Hint */}
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Eye className="w-3 h-3" />
            <span>Hover to explore</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative font-['Instrument_Sans',sans-serif] py-20  overflow-hidden bg-white"
    >
      {/* White Theme Background */}
      <div className="absolute   inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/10 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container  mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        {/* <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Power Management ICs
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A focused portfolio of high-performance power devices — Boost & Buck
            converters, LDO regulators, LED drivers, and protection & control
            ICs for modern electronic systems.
          </p>
        </div> */}
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative mb-6 overflow-hidden">
        <div
          ref={marqueeRef1}
          className="flex gap-6 animate-marquee"
          style={{ animationDuration: "40s", width: "max-content" }}
        >
          {[...products, ...products].map((product, idx) => (
            <TiltProductCard
              key={`row1-${idx}`}
              product={product}
              index={idx}
            />
          ))}
        </div>

        {/* Edge Fades */}
        <div className="absolute md:block hidden inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute md:block hidden inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative overflow-hidden">
        <div
          ref={marqueeRef2}
          className="flex gap-6 animate-marquee-reverse"
          style={{ animationDuration: "35s", width: "max-content" }}
        >
          {[...products.slice().reverse(), ...products.slice().reverse()].map(
            (product, idx) => (
              <TiltProductCard
                key={`row2-${idx}`}
                product={product}
                index={idx}
              />
            ),
          )}
        </div>

        {/* Edge Fades */}
        <div className="absolute inset-y-0 md:block hidden left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute  md:block hidden  inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Footer Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Explore our complete portfolio of semiconductor solutions
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }

        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
