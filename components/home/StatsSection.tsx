"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users,
  FileText,
  GraduationCap,
  Globe,
  TrendingUp,
  Award,
  Building2,
  Clock,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div
      ref={countRef}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
    >
      {count}
      {suffix}
    </div>
  );
};

const statsData = [
  {
    icon: Users,
    label: "Happy Clients",
    value: 100,
    suffix: "+",
    description: "Trusted partners worldwide",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: FileText,
    label: "Patents Filed",
    value: 50,
    suffix: "+",
    description: "Innovation protected",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: GraduationCap,
    label: "Expert Engineers",
    value: 20,
    suffix: "+",
    description: "PhD & Master's degree",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Globe,
    label: "Countries",
    value: 15,
    suffix: "+",
    description: "Global presence",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Award,
    label: "Industry Awards",
    value: 25,
    suffix: "+",
    description: "Recognition for excellence",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Building2,
    label: "Design Centers",
    value: 3,
    suffix: "",
    description: "Global R&D hubs",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Clock,
    label: "Years Combined",
    value: 500,
    suffix: "+",
    description: "Industry experience",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    icon: TrendingUp,
    label: "Annual Growth",
    value: 120,
    suffix: "%",
    description: "Revenue increase",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stats cards staggered animation
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-3xl" />
        </div>
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Our Impact in Numbers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Driving Innovation Forward
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Measurable results that demonstrate our commitment to excellence and
            customer success
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  statsRef.current[index] = el;
                }}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                <div className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Counter */}
                  <Counter end={stat.value} duration={2} suffix={stat.suffix} />

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-slate-800 mt-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 mt-1">
                    {stat.description}
                  </p>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
