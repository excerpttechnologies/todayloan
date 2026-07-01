"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Zap,
  ShieldCheck,
  CircuitBoard,
  Gauge,
  Microchip,
  Workflow,
  Layers3,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    icon: <CircuitBoard size={32} />,
    title: "Analog IC Design",
    description:
      "High-performance analog integrated circuit solutions optimized for efficiency, stability, and scalability across semiconductor applications.",
  },
  {
    icon: <Zap size={32} />,
    title: "Power Management",
    description:
      "Advanced power management technologies including Boost Converters, Buck Regulators, LDOs, and intelligent LED Drivers.",
  },
  {
    icon: <Cpu size={32} />,
    title: "Semiconductor Innovation",
    description:
      "Cutting-edge semiconductor architectures designed for IoT, automotive electronics, industrial systems, and next-generation devices.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Reliable Architecture",
    description:
      "Robust and reliable circuit architectures ensuring long-term durability, thermal efficiency, and protection mechanisms.",
  },
  {
    icon: <Gauge size={32} />,
    title: "Performance Optimization",
    description:
      "Optimized designs focused on low power consumption, high-speed operation, and superior signal integrity.",
  },
  {
    icon: <Microchip size={32} />,
    title: "Embedded Technologies",
    description:
      "Integration of smart embedded systems and intelligent controller solutions for modern electronic ecosystems.",
  },
  {
    icon: <Workflow size={32} />,
    title: "Scalable Solutions",
    description:
      "Flexible semiconductor solutions tailored for startups, enterprises, and large-scale industrial deployments.",
  },
  {
    icon: <Layers3 size={32} />,
    title: "Future-Ready Systems",
    description:
      "Engineering next-generation technologies aligned with AI, automation, sustainable electronics, and digital transformation.",
  },
];

const Page = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Card animations with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(0.4)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      // Floating background elements animation
      gsap.to(".floating-bg-1", {
        y: -30,
        x: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-bg-2", {
        y: 40,
        x: -25,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-bg-3", {
        y: -20,
        x: -15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-black min-h-screen overflow-hidden">
        {/* Hero Section */}
        <div ref={heroRef} className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="floating-bg-1 absolute top-20 left-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="floating-bg-2 absolute bottom-20 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="floating-bg-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-100/20 rounded-full blur-3xl" />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Animated gradient orbs */}
            <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-semibold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent uppercase tracking-wider">
                Advanced Semiconductor Technology
              </span>
            </div>

            <p
              ref={subtitleRef}
              className="text-cyan-600 uppercase tracking-[0.3em] mb-4 text-sm font-semibold opacity-0"
            >
              Innovation at the Core
            </p>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900 opacity-0"
            >
              Powering The Future With
              <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Semiconductor Innovation
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              ACT develops advanced analog IC and semiconductor technologies
              focused on power management, IoT systems, automotive electronics,
              and modern infrastructure solutions.
            </p>
          </div>
        </div>

        {/* Technology Cards */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Icon container */}
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-cyan-600 mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                  {tech.icon}
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-cyan-700 transition-colors duration-300">
                  {tech.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {tech.description}
                </p>

                {/* Learn more link */}
                {/* <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-cyan-600 inline-flex items-center gap-1">
                    Learn more
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div> */}
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  30+
                </div>
                <p className="text-sm text-gray-500">Patents Filed</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  200+
                </div>
                <p className="text-sm text-gray-500">Global Clients</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  15+
                </div>
                <p className="text-sm text-gray-500">Years of Excellence</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  100+
                </div>
                <p className="text-sm text-gray-500">Products Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Page;
