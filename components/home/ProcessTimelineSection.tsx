"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Microscope,
  Cpu,
  CircuitBoard,
  TestTube,
  Rocket,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const processSteps = [
  {
    id: 0,
    name: "Feasibility",
    icon: Microscope,
    // description:
    //   "Market analysis, feasibility study, and specification definition.",
    description: "",
    duration: "4–6 weeks",
    phase: "Phase 01",
    accentLight: "#3B82F6",
    accentDark: "#1D4ED8",
    bg: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
    details: [
      "Requirements gathering",
      "Technology assessment",
      "Initial architecture",
    ],
  },
  {
    id: 1,
    name: "IP / Product Design",
    icon: Cpu,
    description: "",
    duration: "6–8 weeks",
    phase: "Phase 02",
    accentLight: "#8B5CF6",
    accentDark: "#6D28D9",
    bg: "from-indigo-500/10 to-purple-500/5",
    border: "border-indigo-500/30",
    glow: "shadow-indigo-500/20",
    details: [
      "Architecture",
      "Circuit Design",
      "Layout Design",
      "Package Design",
    ],
  },
  {
    id: 2,
    name: "Fabrication",
    icon: CircuitBoard,
    description: "",
    duration: "12–16 weeks",
    phase: "Phase 03",
    accentLight: "#EC4899",
    accentDark: "#BE185D",
    bg: "from-purple-500/10 to-pink-500/5",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/20",
    details: [
      "Foundry Partnering",
      "Packaging Partnering",

      "Assembly Partnering",
    ],
  },
  {
    id: 3,
    name: "Testing",
    icon: TestTube,
    description: "",
    duration: "4–8 weeks",
    phase: "Phase 04",
    accentLight: "#F97316",
    accentDark: "#C2410C",
    bg: "from-orange-500/10 to-red-500/5",
    border: "border-orange-500/30",
    glow: "shadow-orange-500/20",
    details: [
      "Wafer Sorting",
      "Board Bringup",
      "Bench Level Testing",
      "ATE Testing",
      "Qualification Testing",
    ],
  },
  {
    id: 4,
    name: "Deployment",
    icon: Rocket,
    description: "",
    duration: "4–6 weeks",
    phase: "Phase 05",
    accentLight: "#10B981",
    accentDark: "#047857",
    bg: "from-green-500/10 to-emerald-500/5",
    border: "border-green-500/30",
    glow: "shadow-green-500/20",
    details: [
      "Prototype Production",
      "Volume Production",
      "Quality certification",
      "Field support",
    ],
  },
];

const stats = [
  { label: "Total phases", value: "5" },
  { label: "Avg. duration", value: "32 wks" },
  { label: "Success rate", value: "99.2%" },
  { label: "Products shipped", value: "50+" },
  { label: "Patents filed", value: "25+" },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ─── Sub-components ────────────────────────────────────────── */

function GridPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="rgb(148,163,184)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function CircuitLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[80, 240, 420, 560].map((y, i) => (
        <g key={i}>
          <line
            x1="0"
            y1={y}
            x2="100%"
            y2={y}
            stroke="#60A5FA"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        </g>
      ))}
      {[100, 280, 480, 680].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1="0"
            x2={x}
            y2="100%"
            stroke="#818CF8"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />
        </g>
      ))}
    </svg>
  );
}

interface StepNodeProps {
  step: (typeof processSteps)[0];
  index: number;
  activeStep: number;
  onClick: (i: number) => void;
  inView: boolean;
}

function StepNode({ step, index, activeStep, onClick, inView }: StepNodeProps) {
  const Icon = step.icon;
  const isActive = index === activeStep;
  const isPast = index < activeStep;

  return (
    <button
      onClick={() => onClick(index)}
      className="group relative flex flex-col items-center gap-3 focus:outline-none"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
      }}
    >
      {/* Node circle */}
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500
          ${
            isActive
              ? `border-current shadow-lg ${step.glow}`
              : isPast
                ? "border-slate-500 bg-slate-700/80"
                : "border-slate-600 bg-slate-800/60 group-hover:border-slate-400"
          }
        `}
        style={
          isActive
            ? {
                borderColor: step.accentLight,
                background: `linear-gradient(135deg, ${step.accentDark}33, ${step.accentLight}22)`,
                boxShadow: `0 0 20px ${step.accentLight}40`,
              }
            : {}
        }
      >
        {/* Pulse ring (active only) */}
        {isActive && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${step.accentLight}`,
              animation: "processPulse 2s ease-out infinite",
            }}
          />
        )}

        <Icon
          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
          style={{
            color: isActive ? step.accentLight : isPast ? "#94A3B8" : "#64748B",
          }}
        />

        {/* Past checkmark */}
        {isPast && (
          <CheckCircle className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-slate-900 text-emerald-400" />
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
          style={{ color: isActive ? step.accentLight : "#64748B" }}
        >
          {step.phase}
        </p>
        <p
          className={`text-sm font-medium transition-colors duration-300 ${
            isActive
              ? "text-white"
              : "text-slate-400 group-hover:text-slate-200"
          }`}
        >
          {step.name}
        </p>
      </div>
    </button>
  );
}

/* ─── Main Component ────────────────────────────────────────── */

export function ProcessTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.15);
  const [activeStep, setActiveStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const step = processSteps[activeStep];
  const Icon = step.icon;

  const goTo = useCallback((i: number) => {
    setActiveStep(i);
    setAnimKey((k) => k + 1);
  }, []);

  const prev = () => goTo(Math.max(0, activeStep - 1));
  const next = () => goTo(Math.min(processSteps.length - 1, activeStep + 1));

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeStep]);

  /* Progress bar width */
  const progressPct = (activeStep / (processSteps.length - 1)) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative font-['Instrument_Sans',sans-serif] rounded-xl overflow-hidden bg-slate-950 py-20"
    >
      {/* ── Background ── */}
      <GridPattern />
      <CircuitLines />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl transition-all duration-700"
          style={{ background: step.accentLight }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full opacity-8 blur-3xl transition-all duration-700"
          style={{ background: step.accentDark }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Section header */}
        <div
          className="mb-20 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {/* Semiconductor{" "} */}
            Development Timeline
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            From concept to silicon — a meticulously engineered process ensuring
            excellence at every stage of the journey.
          </p>
        </div>

        {/* ── Timeline track ── */}
        <div className="relative mb-16 px-6">
          {/* Rail */}
          <div className="absolute left-0 right-0 top-7 h-[2px] bg-slate-800" />

          {/* Progress fill */}
          <div
            className="absolute left-0 top-7 h-[2px] transition-all duration-700 ease-in-out"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${processSteps[0].accentLight}, ${step.accentLight})`,
            }}
          />

          {/* Step nodes */}
          <div className="relative flex items-start justify-between">
            {processSteps.map((s, i) => (
              <StepNode
                key={s.id}
                step={s}
                index={i}
                activeStep={activeStep}
                onClick={goTo}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* ── Detail card ── */}
        <div
          key={animKey}
          className={`rounded-2xl border bg-gradient-to-br ${step.bg} ${step.border} p-8 backdrop-blur-sm`}
          style={{
            animation: "cardReveal 0.4s cubic-bezier(0.4,0,0.2,1)",
            borderColor: `${step.accentLight}30`,
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* Icon block */}
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${step.accentDark}60, ${step.accentLight}40)`,
                border: `1px solid ${step.accentLight}40`,
                boxShadow: `0 8px 32px ${step.accentLight}20`,
              }}
            >
              <Icon className="h-10 w-10" style={{ color: step.accentLight }} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: step.accentLight }}
                >
                  {step.phase}
                </span>
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                {step.name}
              </h3>
              <p className="mb-5 leading-relaxed text-slate-300">
                {step.description}
              </p>

              {/* Detail chips */}
              <div className="flex flex-wrap gap-2">
                {step.details.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#CBD5E1",
                    }}
                  >
                    <CheckCircle
                      className="h-3.5 w-3.5"
                      style={{ color: step.accentLight }}
                    />
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <button
              onClick={prev}
              disabled={activeStep === 0}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Previous
            </button>

            {/* Dot indicators */}
            <div
              className="flex items-center gap-2"
              aria-label="Step indicator"
            >
              {processSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeStep ? "24px" : "8px",
                    background: i === activeStep ? step.accentLight : "#334155",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={activeStep === processSteps.length - 1}
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30"
              style={{
                background: `linear-gradient(135deg, ${step.accentDark}, ${step.accentLight})`,
                boxShadow: `0 4px 16px ${step.accentLight}30`,
              }}
            >
              Next
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-center transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
            >
              <p
                className="text-2xl font-bold"
                style={{ color: step.accentLight }}
              >
                {s.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes processPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(12px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </section>
  );
}
