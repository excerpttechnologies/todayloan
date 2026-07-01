"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Users,
  Car,
  Wifi,
  Factory,
  Cpu,
  Zap,
  Microchip,
  Server,
  Brain,
  Layers,
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Category = "automotive" | "iot" | "industrial";

const CATEGORIES: {
  key: Category;
  label: string;
  Icon: React.ElementType;
  color: string;
}[] = [
  { key: "automotive", label: "Automotive", Icon: Car, color: "#FF3B00" },
  { key: "iot", label: "IoT", Icon: Wifi, color: "#0057FF" },
  { key: "industrial", label: "Industrial", Icon: Factory, color: "#00A36C" },
];

const CLIENTS: Record<
  Category,
  { name: string; short: string; year: string }[]
> = {
  automotive: [
    { name: "Tesla", short: "TSL", year: "Since '19" },
    { name: "Bosch", short: "BSH", year: "Since '17" },
    { name: "Mercedes-Benz", short: "MBZ", year: "Since '20" },
    { name: "BMW Group", short: "BMW", year: "Since '18" },
    { name: "Ford Motor", short: "FRD", year: "Since '21" },
    { name: "Toyota", short: "TYT", year: "Since '16" },
  ],
  iot: [
    { name: "Amazon AWS", short: "AWS", year: "Since '18" },
    { name: "Microsoft Azure", short: "AZR", year: "Since '19" },
    { name: "Google Cloud", short: "GCP", year: "Since '20" },
    { name: "Siemens", short: "SIE", year: "Since '17" },
    { name: "Honeywell", short: "HNW", year: "Since '16" },
    { name: "Schneider", short: "SCH", year: "Since '21" },
  ],
  industrial: [
    { name: "General Electric", short: "GE", year: "Since '15" },
    { name: "Siemens AG", short: "SIE", year: "Since '17" },
    { name: "ABB Ltd", short: "ABB", year: "Since '18" },
    { name: "Rockwell Auto.", short: "ROK", year: "Since '19" },
    { name: "Honeywell Intl.", short: "HNW", year: "Since '16" },
    { name: "Mitsubishi Electric", short: "MTE", year: "Since '20" },
  ],
};

const TECH = [
  {
    id: "01",
    name: "PMIC",
    full: "Power Management ICs",
    Icon: Zap,
    desc: "High-efficiency power management for automotive & industrial grade systems.",
    specs: ["92% Efficiency", "Buck/Boost", "Battery Mgmt", "LDO Reg."],
    accent: "#FF3B00",
  },
  {
    id: "02",
    name: "ADC/DAC",
    full: "Data Converters",
    Icon: Microchip,
    desc: "Precision analog-digital converters with ultra-low noise floor.",
    specs: ["16-bit Res.", "1MSPS Rate", "Low Noise", "Low Power"],
    accent: "#0057FF",
  },
  {
    id: "03",
    name: "SERDES",
    full: "Serializer / Deserializer",
    Icon: Server,
    desc: "3.125 Gbps serial interface for high-bandwidth video & data.",
    specs: ["3.125 Gbps", "SSC Support", "Cable EQ", "Low EMI"],
    accent: "#00A36C",
  },
  {
    id: "04",
    name: "Embedded",
    full: "Embedded Processors",
    Icon: Layers,
    desc: "ARM Cortex-M edge controllers with hardware TrustZone security.",
    specs: ["Cortex-M", "TrustZone", "DSP Ext.", "Ultra-LP"],
    accent: "#FF6B00",
  },
  {
    id: "05",
    name: "AI Edge",
    full: "AI Processing Units",
    Icon: Brain,
    desc: "2 TOPS neural accelerators for real-time on-device ML inference.",
    specs: ["2 TOPS", "CNN Accel.", "Quantize", "Edge AI"],
    accent: "#7B2FBE",
  },
];

const STATS = [
  { value: 200, suffix: "+", label: "Partners" },
  { value: 40, suffix: "+", label: "Countries" },
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 18, suffix: "yr", label: "Experience" },
];

const MARQUEE_ITEMS = [
  "Power Management",
  "Data Converters",
  "SERDES",
  "Embedded Systems",
  "AI Edge",
  "Analog Semiconductors",
  "PMIC",
  "ADC / DAC",
  "ARM Cortex",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── StatBlock ────────────────────────────────────────────────────────────────

function StatBlock({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="group relative overflow-hidden cursor-default border-r-2 border-[#111] last:border-r-0 p-[30px_28px] bg-white">
      <div className="absolute inset-0 bg-[#111] translate-y-full group-hover:translate-y-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <div className="relative z-10">
        <div className="font-['Bebas_Neue',sans-serif] text-[54px] leading-none text-[#111] group-hover:text-white transition-colors duration-300">
          {count}
          {suffix}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#aaa] group-hover:text-white transition-colors duration-300 mt-[6px]">
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── ClientCard ───────────────────────────────────────────────────────────────

function ClientCard({
  client,
  accent,
  index,
}: {
  client: { name: string; short: string; year: string };
  accent: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    gsap.to(el, {
      rotateY: dx * 14,
      rotateX: -dy * 14,
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 700,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (cardRef.current)
      gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1,.45)",
      });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className="border-r-2 border-b-2 border-[#111] p-[28px_24px] min-h-[140px] flex flex-col justify-between bg-white hover:bg-[#fafafa] transition-colors duration-250 relative"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div className="text-[10px] text-[#ccc] font-bold tracking-[0.06em] mb-2">
        /{String(index + 1).padStart(2, "0")}
      </div>
      <div
        className="font-['Bebas_Neue',sans-serif] text-[42px] leading-none tracking-[0.02em] transition-colors duration-220"
        style={{ color: hovered ? accent : "#111" }}
      >
        {client.short}
      </div>
      <div className="text-[11px] font-semibold text-[#444] mt-1">
        {client.name}
      </div>
      <div className="text-[10px] text-[#bbb] italic mt-0.5">{client.year}</div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left transition-transform duration-380 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: accent,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}

// ─── TechRow ──────────────────────────────────────────────────────────────────

function TechRow({ tech }: { tech: (typeof TECH)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { Icon } = tech;

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    gsap.to(el, {
      height: open ? el.scrollHeight : 0,
      opacity: open ? 1 : 0,
      duration: 0.42,
      ease: open ? "power3.out" : "power3.in",
    });
  }, [open]);

  return (
    <div
      className={`border-b border-[#e8e8e8] last:border-b-0 ${open ? "bg-[#fafafa]" : "bg-white"}`}
    >
      <button
        className="w-full flex items-center gap-[18px] p-[22px_28px] bg-transparent border-none text-left cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-['Bebas_Neue',sans-serif] text-[18px] text-[#ccc] min-w-[28px] tracking-[0.04em]">
          {tech.id}
        </span>
        <span
          className="w-[42px] h-[42px] rounded-[10px] flex-shrink-0 flex items-center justify-center transition-colors duration-300"
          style={{ background: open ? tech.accent : "#f4f4f4" }}
        >
          <Icon size={18} color={open ? "#fff" : tech.accent} />
        </span>
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="font-['Bebas_Neue',sans-serif] text-[30px] tracking-[0.02em] text-[#111] leading-none">
            {tech.name}
          </span>
          <span className="text-[11px] text-[#aaa] font-medium">
            {tech.full}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-280"
          style={{ background: open ? tech.accent : "#111" }}
        >
          {open ? (
            <Minus size={13} color="#fff" />
          ) : (
            <Plus size={13} color="#fff" />
          )}
        </div>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="p-[0_28px_24px_88px] bg-inherit">
          <p className="text-[14px] text-[#555] leading-relaxed mb-3.5">
            {tech.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {tech.specs.map((s) => (
              <span
                key={s}
                className="text-[10px] font-bold uppercase tracking-[0.1em] py-1 px-3 border-[1.5px] rounded-sm bg-white"
                style={{ borderColor: tech.accent, color: tech.accent }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-[width] duration-550 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ background: tech.accent, width: open ? "100%" : "0%" }}
      />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function TrustedClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("automotive");
  const [statsStarted, setStatsStarted] = useState(false);
  const activeCat = CATEGORIES.find((c) => c.key === activeCategory)!;

  // ── Mount animations ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title: mask-reveal word by word
      const titleEl = document.querySelector<HTMLElement>(".tcs-hero-title");
      if (titleEl) {
        const words = (titleEl.textContent || "").split(" ");
        titleEl.innerHTML = words
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block bg-white">${w}</span></span>`,
          )
          .join(" ");

        const innerSpans = titleEl.querySelectorAll("span > span");
        gsap.fromTo(
          innerSpans,
          { y: "108%", skewY: 6, opacity: 0 },
          {
            y: "0%",
            skewY: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: ".tcs-hero-title", start: "top 88%" },
          },
        );
      }

      // Sub text fade
      gsap.fromTo(
        ".tcs-hero-sub",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tcs-hero-sub", start: "top 90%" },
        },
      );

      // Stats count trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => setStatsStarted(true),
      });

      // Divider draw
      gsap.fromTo(
        ".tcs-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          transformOrigin: "left",
          scrollTrigger: { trigger: ".tcs-divider", start: "top 92%" },
        },
      );

      // Tech rows
      gsap.fromTo(
        ".tcs-tech-row",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: ".tcs-tech-list", start: "top 85%" },
        },
      );

      // Marquee reveal
      gsap.fromTo(
        ".tcs-marquee",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tcs-marquee", start: "top 90%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Category switch → re-animate client cards
  useEffect(() => {
    gsap.fromTo(
      ".tcs-client-card",
      { y: 36, opacity: 0, scale: 0.93 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power4.out",
      },
    );
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      className="font-['Instrument_Sans',sans-serif] bg-white w-full min-h-screen relative z-10"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="pt-24 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="w-[7px] h-[7px] rounded-full bg-[#FF3B00] shadow-[0_0_0_0_#FF3B00] animate-[tcs-ping_2s_ease-out_infinite]" />
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#888]">
                  Trusted Clients & Technology
                </span>
              </div>
              <h2 className="tcs-hero-title font-['Bebas_Neue',sans-serif] text-[clamp(60px,9vw,128px)] leading-[0.92] text-[#111] tracking-[-0.01em]">
                Trusted By Industry Leaders
              </h2>
            </div>
            <p className="tcs-hero-sub text-[15px] leading-relaxed text-[#666] italic max-w-[340px]">
              Join 200+ innovative companies across automotive, IoT &amp;
              industrial sectors that rely on our analog semiconductor
              solutions.
            </p>
          </div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-8">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 border-2 border-[#111] mb-16"
        >
          {STATS.map((s) => (
            <StatBlock key={s.label} {...s} started={statsStarted} />
          ))}
        </div>
      </div>

      <div className="tcs-divider h-px bg-[#e5e5e5] mx-8 mb-16 origin-left" />

      {/* ── CLIENTS ───────────────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-7">
          <h3 className="font-['Bebas_Neue',sans-serif] text-[clamp(32px,4vw,44px)] text-[#111] tracking-[-0.01em]">
            Our Partners
          </h3>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`px-5 py-2 border-2 text-[11px] font-bold uppercase tracking-[0.09em] cursor-pointer transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "border-transparent text-white"
                    : "border-[#ddd] bg-white text-[#888] hover:border-[#111] hover:text-[#111]"
                }`}
                style={
                  activeCategory === cat.key ? { background: cat.color } : {}
                }
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 border-2 border-[#111] mb-18">
          {CLIENTS[activeCategory].map((c, i) => (
            <div key={`${activeCategory}-${i}`} className="tcs-client-card">
              <ClientCard client={c} accent={activeCat.color} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ───────────────────────────────────────────────────── */}
      <div className="tcs-marquee overflow-hidden border-y-2 border-[#111] py-4 mb-18 bg-[#111]">
        <div className="flex w-max animate-[tcs-scroll_22s_linear_infinite]">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-[18px] px-8 whitespace-nowrap font-['Bebas_Neue',sans-serif] text-[20px] tracking-[0.07em] text-white/60"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-[#FF3B00] flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── TECH STACK ────────────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-7">
          <h3 className="font-['Bebas_Neue',sans-serif] text-[clamp(32px,4vw,44px)] text-[#111] tracking-[-0.01em]">
            Core Technologies
          </h3>
          <span className="text-xs text-[#aaa] italic">Tap row to expand</span>
        </div>
        <div className="tcs-tech-list border-2 border-[#111] mb-18 relative bg-white">
          {TECH.map((tech, i) => (
            <div key={tech.id} className="tcs-tech-row relative">
              <TechRow tech={tech} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-8 pb-24">
        <div className="relative border-2 border-[#111] p-[52px_48px] flex items-center justify-between gap-8 flex-wrap overflow-hidden group bg-white">
          <div className="absolute inset-0 bg-[#111] -translate-x-full group-hover:translate-x-0 transition-transform duration-550 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
          <span className="absolute right-[220px] top-1/2 -translate-y-1/2 font-['Bebas_Neue',sans-serif] text-[110px] leading-[0.85] text-[#f0f0f0] tracking-[-0.02em] pointer-events-none select-none group-hover:text-[#1c1c1c] transition-colors duration-500 z-0">
            200+
          </span>
          <div className="relative z-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#999] group-hover:text-white/50 transition-colors duration-300 mb-2">
              Partnership Program
            </div>
            <div className="font-['Bebas_Neue',sans-serif] text-[52px] leading-none tracking-[-0.01em] text-[#111] group-hover:text-white transition-colors duration-300">
              Join Our Team
            </div>
            <div className="text-sm text-[#777] group-hover:text-white/55 transition-colors duration-300 mt-1.5">
              200+ companies already trust our solutions globally
            </div>
          </div>
          <Link
            href={"/contact"}
            className="relative z-10 inline-flex items-center gap-2.5 px-[34px] py-4 bg-[#111] text-white border-2 border-[#111] text-xs font-bold uppercase tracking-[0.1em] cursor-pointer group/btn transition-all duration-250 hover:bg-white hover:text-[#111] hover:border-white"
          >
            contact us
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Custom Keyframes for Animations */}
      <style jsx global>{`
        @keyframes tcs-ping {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 59, 0, 0.5);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 59, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 59, 0, 0);
          }
        }

        @keyframes tcs-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .tcs-client-card:nth-child(3n) {
          border-right: none;
        }

        .tcs-client-card:nth-last-child(-n + 3) {
          border-bottom: none;
        }

        @media (max-width: 600px) {
          .tcs-client-card:nth-child(2n) {
            border-right: none;
          }
          .tcs-client-card:nth-last-child(-n + 2) {
            border-bottom: none;
          }
        }

        .tcs-tech-row {
          transition: background 0.2s ease;
        }

        .tcs-cta-btn {
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }

        .tcs-cta-btn:hover {
          transform: translate(3px, -3px);
          box-shadow: -4px 4px 0 #ff3b00;
        }

        /* Force all containers to have white background */
        .tcs-client-card,
        .tcs-stat-block,
        .tcs-tech-list,
        .tcs-tech-row,
        .tcs-tech-row > div,
        .tcs-tr-spec,
        .tcs-hero-title span span {
          background-color: #ffffff;
        }

        /* Ensure the body and html have white background */
        html,
        body {
          background-color: #ffffff;
        }

        /* Fix for marquee */
        .tcs-marquee {
          background-color: #111111;
        }
      `}</style>
    </section>
  );
}
