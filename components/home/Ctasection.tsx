"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const floatingIconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main content animation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Button hover animation (GSAP powered)
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(buttonRef.current.querySelector(".button-icon"), {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        buttonRef.current.addEventListener("mouseleave", () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(buttonRef.current.querySelector(".button-icon"), {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }

      // Floating icons animation
      floatingIconsRef.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.to(icon, {
          y: -20,
          x: index % 2 === 0 ? 15 : -15,
          rotation: 360,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });

      // Background pulse animation
      gsap.to(".bg-pulse", {
        scale: 1.1,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
        {/* Animated pulse effect */}
        <div className="bg-pulse absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${3 + Math.random() * 5}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { icon: Sparkles, top: "10%", left: "10%", size: 40 },
          { icon: Rocket, top: "20%", right: "15%", size: 35 },
          { icon: Zap, bottom: "25%", left: "15%", size: 45 },
          { icon: Shield, bottom: "15%", right: "10%", size: 38 },
          { icon: TrendingUp, top: "70%", left: "20%", size: 30 },
          { icon: Sparkles, top: "80%", right: "20%", size: 32 },
        ].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              ref={(el) => {
                floatingIconsRef.current[idx] = el;
              }}
              className="absolute text-white/10"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }}
            >
              <IconComponent size={item.size} />
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center relative z-10"
      >
        {/* Pre-title badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-semibold text-white tracking-wide">
            Make in India · Design in India
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Power{" "}
          <span className="relative inline-block">
            Your Next Design?
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="8"
              viewBox="0 0 300 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5C100 8.5 200 8.5 299 5.5"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Partner with us for high-performance power management ICs — Boost,
          Buck, LDO, LED Drivers, and Protection solutions built for modern
          electronic systems.
        </p>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">6</p>
            <p className="text-sm text-white/80">Product Families</p>
          </div>
          <div className="w-px h-12 bg-white/30 hidden md:block" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">ISM</p>
            <p className="text-sm text-white/80">Mission Aligned</p>
          </div>
          <div className="w-px h-12 bg-white/30 hidden md:block" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">India</p>
            <p className="text-sm text-white/80">Owned Analog IPs</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={"/products"}
            // ref={buttonRef}
            className="group relative px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Products
              <ArrowRight className="button-icon w-5 h-5 transition-transform duration-300" />
            </span>

            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Contact Sales
            <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Fabless Semiconductor</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Indian Owned Analog IPs</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>ISM Mission Aligned</span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(0px) translateX(30px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(30px) translateX(15px);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
