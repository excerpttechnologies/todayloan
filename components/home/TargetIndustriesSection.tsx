"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Car,
  Wifi,
  Smartphone,
  Factory,
  Lightbulb,
  Network,
  Target,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const industries = [
  {
    name: "Automotive",
    icon: Car,
    description:
      "EV power management, ADAS, in-vehicle networking, and battery monitoring systems.",
    accent: "#3B82F6",
    accentDim: "#1D4ED8",
    tag: "EV & ADAS",
    marketSize: "$45B",
    growth: "+28%",
    stat: "120+ chips",
  },
  {
    name: "IoT",
    icon: Wifi,
    description:
      "Smart sensors, edge computing, low-power connectivity, and precision data acquisition.",
    accent: "#10B981",
    accentDim: "#047857",
    tag: "Edge AI",
    marketSize: "$32B",
    growth: "+35%",
    stat: "Ultra-low power",
  },
  {
    name: "Consumer Electronics",
    icon: Smartphone,
    description:
      "Audio amplifiers, touch controllers, power management ICs, and display drivers.",
    accent: "#A855F7",
    accentDim: "#7E22CE",
    tag: "High Volume",
    marketSize: "$28B",
    growth: "+18%",
    stat: "50M+ units",
  },
  {
    name: "Industrial",
    icon: Factory,
    description:
      "Factory automation, robotics, precision motor control, and industrial sensors.",
    accent: "#F97316",
    accentDim: "#C2410C",
    tag: "Industry 4.0",
    marketSize: "$38B",
    growth: "+22%",
    stat: "–40 to 125°C",
  },
  {
    name: "Smart Lighting",
    icon: Lightbulb,
    description:
      "LED drivers, dimming controllers, color mixing engines, and smart home controls.",
    accent: "#EAB308",
    accentDim: "#A16207",
    tag: "Energy Saving",
    marketSize: "$12B",
    growth: "+31%",
    stat: "98% efficiency",
  },
  {
    name: "Networking",
    icon: Network,
    description:
      "Ethernet PHYs, signal integrity ICs, high-speed switches, and optical modules.",
    accent: "#6366F1",
    accentDim: "#4338CA",
    tag: "High Speed",
    marketSize: "$26B",
    growth: "+19%",
    stat: "100G ready",
  },
];

const globalStats = [
  { value: "6+", label: "Industries served" },
  { value: "200+", label: "Active products" },
  { value: "500+", label: "Global customers" },
  { value: "98%", label: "Customer satisfaction" },
];

/* ─── Hook ──────────────────────────────────────────────────── */

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useCardInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ─── Animated counter ──────────────────────────────────────── */

function useCounter(target: number, inView: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

/* ─── Card ──────────────────────────────────────────────────── */

interface CardProps {
  industry: (typeof industries)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function IndustryCard({ industry, index, isActive, onClick }: CardProps) {
  const { ref, inView } = useCardInView();
  const Icon = industry.icon;
  const [hovered, setHovered] = useState(false);
  const lit = hovered || isActive;

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer select-none"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(36px) scale(0.96)",
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms`,
      }}
    >
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-all duration-500"
        style={{
          boxShadow: lit ? `0 0 32px ${industry.accent}40` : "none",
          opacity: lit ? 1 : 0,
        }}
      />

      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-2xl border bg-white transition-all duration-500"
        style={{
          borderColor: lit ? `${industry.accent}50` : "#E2E8F0",
          transform: lit ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${industry.accentDim}, ${industry.accent})`,
            opacity: lit ? 1 : 0.3,
          }}
        />

        {/* Subtle bg wash */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at top left, ${industry.accent}08 0%, transparent 70%)`,
            opacity: lit ? 1 : 0,
          }}
        />

        <div className="relative p-6">
          {/* Header row */}
          <div className="mb-5 flex items-start justify-between">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-400"
              style={{
                background: lit
                  ? `linear-gradient(135deg, ${industry.accentDim}, ${industry.accent})`
                  : `${industry.accent}15`,
                boxShadow: lit ? `0 6px 20px ${industry.accent}40` : "none",
                transform: lit ? "scale(1.08)" : "scale(1)",
              }}
            >
              <Icon
                className="h-7 w-7 transition-colors duration-300"
                style={{ color: lit ? "#fff" : industry.accent }}
              />
            </div>

            {/* Tag badge */}
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                background: `${industry.accent}12`,
                color: industry.accentDim,
                border: `1px solid ${industry.accent}25`,
              }}
            >
              {industry.tag}
            </span>
          </div>

          {/* Name */}
          <h3
            className="mb-1.5 text-lg font-bold transition-colors duration-300"
            style={{ color: lit ? industry.accentDim : "#0F172A" }}
          >
            {industry.name}
          </h3>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-slate-500">
            {industry.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-400">Market size</p>
              <p className="text-xl font-bold text-slate-800">
                {industry.marketSize}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <TrendingUp
                  className="h-3.5 w-3.5"
                  style={{ color: "#10B981" }}
                />
                <span className="text-sm font-bold text-emerald-600">
                  {industry.growth}
                </span>
              </div>
              <span
                className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                style={{
                  background: `${industry.accent}10`,
                  color: industry.accentDim,
                }}
              >
                {industry.stat}
              </span>
            </div>
          </div>

          {/* Learn more arrow */}
          <div
            className="mt-4 flex items-center gap-1 text-xs font-semibold transition-all duration-300"
            style={{
              color: industry.accent,
              opacity: lit ? 1 : 0,
              transform: lit ? "translateX(0)" : "translateX(-6px)",
            }}
          >
            Explore solutions
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Stats bar ─────────────────────────────────────────────── */

function StatItem({
  value,
  label,
  inView,
  delay,
}: {
  value: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const counted = useCounter(num, inView, 1200);

  return (
    <div
      className="text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <p className="text-3xl font-bold text-white">
        {inView ? counted : 0}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */

export function TargetIndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, 0.1);
  const statsInView = useInView(statsRef as React.RefObject<HTMLElement>, 0.3);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggle = useCallback(
    (i: number) => setActiveCard((prev) => (prev === i ? null : i)),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-28"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Soft color orbs */}
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Header ── */}
        <div
          className="mb-16 text-center"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
            <Target className="h-3.5 w-3.5" />
            Target industries
            <ChevronRight className="h-3 w-3 text-blue-400" />
          </div>

          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Industries{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              we serve
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Delivering precision analog solutions across diverse sectors,
            enabling innovation and driving efficiency at every node.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <IndustryCard
              key={ind.name}
              industry={ind}
              index={i}
              isActive={activeCard === i}
              onClick={() => toggle(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
