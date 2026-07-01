// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import {
//   Car,
//   Shield,
//   Rocket,
//   Home,
//   Building2,
//   Cpu,
//   Zap,
//   Globe,
//   TrendingUp,
//   ArrowUpRight,
//   CheckCircle,
//   MapPin,
//   Briefcase,
//   BarChart3,
//   LineChart as LineChartIcon,
//   ChevronRight,
//   Activity,
//   Lightbulb,
//   Wrench,
//   Network,
//   Server,
//   Plug,
//   Leaf,
// } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // ─── Data ──────────────────────────────────────────────────────────────────────

// type Tab = "domestic" | "overseas";

// const DOMESTIC = [
//   {
//     name: "Government & Strategic Programs",
//     tag: "Indigenisation",
//     icon: Shield,
//     desc: "",
//     longDesc:
//       "Strategic semiconductor partner for Defence and Space Applications under India's indigenisation drive.",
//     accent: "#DC2626",
//     stat: "Indigenisation",
//     items: [],
//   },
//   {
//     name: "Computing & Networking Systems",
//     tag: "Infrastructure",
//     icon: Server,
//     desc: "",
//     longDesc:
//       "Power management, data conversion, sensing, and interface solutions for computing platforms and networking equipment.",
//     accent: "#2563EB",
//     stat: "Infrastructure",
//     items: [],
//   },
//   {
//     name: "Drop-in Replacement",
//     tag: "Analog IPs",
//     icon: Plug,
//     desc: "",
//     longDesc:
//       "Pin-to-pin compatible replacements for widely used analog semiconductor devices and IPs.",
//     accent: "#7C3AED",
//     stat: "Analog IPs",
//     items: [],
//   },
//   {
//     name: "Consumer & Smart Appliance Manufacturers",
//     tag: "Smart Devices",
//     icon: Home,
//     desc: "",
//     longDesc:
//       "Power and interface solutions for home appliances, consumer electronics, and connected smart devices.",
//     accent: "#059669",
//     stat: "Smart Devices",
//     items: [],
//   },
//   {
//     name: "Automotive OEMs & Tier-1 Suppliers",
//     tag: "Automotive",
//     icon: Car,
//     desc: "",
//     longDesc:
//       "Power management, sensing, protection, and interface solutions for next-generation vehicle platforms.",
//     accent: "#EA580C",
//     stat: "Automotive",
//     items: [],
//   },
//   {
//     name: "EV, Energy & Lighting Industry",
//     tag: "Energy",
//     icon: Leaf,
//     desc: "",
//     longDesc:
//       "Solutions for EV charging, battery management, power conversion, and intelligent lighting applications.",
//     accent: "#0891B2",
//     stat: "Energy",
//     items: [],
//   },
// ];

// const OVERSEAS = [
//   {
//     name: "Plug-in Replacement for MNC Analog IPs",
//     tag: "Global",
//     icon: Globe,
//     desc: "Drop-in replacements for many MNC Analog IPs and Devices in global markets.",
//     longDesc:
//       "Delivering pin-compatible and performance-matched alternatives to leading MNC analog IPs and devices. Our solutions enable global customers to migrate seamlessly, diversify their supply chain, and reduce component costs without redesign.",
//     accent: "#2563EB",
//     stat: "Global",
//     items: [
//       "Pin-Compatible ICs",
//       "Performance-Matched",
//       "Supply Chain Diversity",
//       "No Redesign Required",
//     ],
//   },
//   {
//     name: "Texas Instruments (TI)",
//     tag: "USA",
//     icon: Cpu,
//     desc: "Compatible alternatives to TI's broad analog and mixed-signal IC portfolio.",
//     longDesc:
//       "Providing drop-in replacements for Texas Instruments' analog, power management, and mixed-signal ICs, ensuring supply chain resilience and competitive pricing for global customers.",
//     accent: "#EA580C",
//     stat: "USA",
//     items: [
//       "Analog ICs",
//       "Power Management",
//       "Mixed-Signal",
//       "Plug-in Replacement",
//     ],
//   },
//   {
//     name: "Analog Devices & Maxim",
//     tag: "USA",
//     icon: Zap,
//     desc: "Precision analog and data conversion IC alternatives for Analog Devices and Maxim.",
//     longDesc:
//       "Offering pin-compatible alternatives to Analog Devices and Maxim precision analog, data conversion, and signal chain ICs, enabling seamless migration and second-source flexibility.",
//     accent: "#DC2626",
//     stat: "USA",
//     items: [
//       "Precision Analog",
//       "Data Conversion",
//       "Signal Chain",
//       "Second Source",
//     ],
//   },
//   {
//     name: "Infineon & MPS",
//     tag: "Germany / USA",
//     icon: Shield,
//     desc: "Power semiconductors and automotive-grade ICs compatible with Infineon and MPS.",
//     longDesc:
//       "Compatible alternatives for Infineon and MPS power management and automotive ICs, providing supply chain resilience and direct drop-in replacements at competitive pricing.",
//     accent: "#059669",
//     stat: "Germany / USA",
//     items: [
//       "Power Semiconductors",
//       "Automotive ICs",
//       "Plug-in Replacement",
//       "Direct Compatible",
//     ],
//   },
//   {
//     name: "Renesas & RichTek",
//     tag: "Japan / Taiwan",
//     icon: Building2,
//     desc: "Microcontroller, embedded processor, and power IC alternatives for Renesas & RichTek.",
//     longDesc:
//       "Compatible alternatives for Renesas and RichTek's microcontroller, embedded processor, and analog IC portfolios, enabling design flexibility and supply chain optimisation.",
//     accent: "#7C3AED",
//     stat: "Japan / Taiwan",
//     items: [
//       "Microcontrollers",
//       "Embedded Processors",
//       "Power ICs",
//       "Drop-in Replacement",
//     ],
//   },
//   {
//     name: "STMicroelectronics",
//     tag: "Switzerland",
//     icon: TrendingUp,
//     desc: "Broad portfolio of industrial and embedded semiconductor alternatives to STMicro.",
//     longDesc:
//       "Pin-compatible alternatives for STMicroelectronics' industrial and embedded semiconductor portfolio, providing reliable second-source options and supply chain diversity for global customers.",
//     accent: "#0891B2",
//     stat: "Switzerland",
//     items: [
//       "Industrial Solutions",
//       "Embedded Systems",
//       "Plug-in Replacement",
//       "Global Support",
//     ],
//   },
// ];

// // ─── Market Card ───────────────────────────────────────────────────────────────

// function MarketCard({
//   item,
//   index,
// }: {
//   item: (typeof DOMESTIC)[0];
//   index: number;
// }) {
//   const [open, setOpen] = useState(false);
//   const Icon = item.icon;
//   const bodyRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = bodyRef.current;
//     if (!el) return;
//     gsap.to(el, {
//       height: open ? el.scrollHeight : 0,
//       opacity: open ? 1 : 0,
//       duration: 0.4,
//       ease: open ? "power3.out" : "power3.in",
//     });
//   }, [open]);

//   return (
//     <div
//       className="market-card group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-white border border-slate-200 shadow-sm hover:shadow-xl"
//       onClick={() => setOpen((v) => !v)}
//     >
//       {/* Top accent border */}
//       <div
//         className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-400"
//         style={{
//           background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
//           opacity: open ? 1 : 0,
//         }}
//       />

//       {/* Header row */}
//       <div className="flex items-center gap-4 p-5">
//         {/* Text */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-0.5">
//             <span className="text-slate-800 font-bold text-base tracking-tight">
//               {item.name}
//             </span>
//             <span
//               className="text-xs font-bold px-2 py-0.5 rounded-full"
//               style={{
//                 background: `${item.accent}15`,
//                 color: item.accent,
//               }}
//             >
//               {item.tag}
//             </span>
//           </div>
//           <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">
//             {item.desc}
//           </p>
//         </div>

//         {/* Arrow */}
//         <ChevronRight
//           size={16}
//           className="flex-shrink-0 text-slate-300 transition-transform duration-300"
//           style={{
//             transform: open ? "rotate(90deg)" : "rotate(0deg)",
//             color: open ? item.accent : undefined,
//           }}
//         />
//       </div>

//       {/* Expandable body */}
//       <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
//         <div className="px-5 pb-5 border-t border-slate-100">
//           <p className="text-xs text-slate-500 mt-4 mb-4 leading-relaxed italic">
//             {item.longDesc}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {item.items.map((it) => (
//               <span
//                 key={it}
//                 className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700"
//               >
//                 <CheckCircle size={10} color={item.accent} />
//                 {it}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom accent bar */}
//       <div
//         className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
//         style={{
//           background: item.accent,
//           width: open ? "100%" : "0%",
//         }}
//       />
//     </div>
//   );
// }

// // ─── Main Section ──────────────────────────────────────────────────────────────

// export function MarketOpportunitiesSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const [tab, setTab] = useState<Tab>("domestic");

//   const markets = tab === "domestic" ? DOMESTIC : OVERSEAS;

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header reveal
//       gsap.fromTo(
//         ".mos-title-word",
//         { y: "110%", opacity: 0 },
//         {
//           y: "0%",
//           opacity: 1,
//           duration: 0.9,
//           stagger: 0.1,
//           ease: "expo.out",
//           scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
//         },
//       );
//       gsap.fromTo(
//         ".mos-sub",
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.7,
//           delay: 0.5,
//           ease: "power2.out",
//           scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
//         },
//       );

//       // Divider draw
//       gsap.fromTo(
//         ".mos-divider",
//         { scaleX: 0 },
//         {
//           scaleX: 1,
//           duration: 1.2,
//           ease: "expo.out",
//           transformOrigin: "left",
//           scrollTrigger: { trigger: ".mos-divider", start: "top 90%" },
//         },
//       );
//     }, sectionRef);
//     return () => ctx.revert();
//   }, []);

//   // Re-animate market cards on tab switch
//   useEffect(() => {
//     gsap.fromTo(
//       ".market-card",
//       { opacity: 0, y: 28, scale: 0.96 },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 0.5,
//         stagger: 0.07,
//         ease: "power4.out",
//       },
//     );
//   }, [tab]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-24 font-['Instrument_Sans',sans-serif] md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
//         {/* ── HEADER ─────────────────────────────────────────────────────── */}
//         <div ref={headerRef} className="mb-10">
//           {/* Title */}
//           <h2 className="overflow-hidden leading-tight">
//             <span className="inline-block overflow-hidden align-bottom mr-4">
//               <span
//                 className="mos-title-word inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
//                 style={{
//                   color: "#0F172A",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Market
//               </span>
//             </span>
//             <span className="inline-block overflow-hidden align-bottom">
//               <span
//                 className="mos-title-word inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
//                 style={{
//                   color: "#2563EB",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Opportunities
//               </span>
//             </span>
//           </h2>
//         </div>

//         {/* ── Market Opportunity Description ────────────────────────────────── */}
//         <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
//           <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
//             The rapid growth of intelligent systems, connectivity and sensing is
//             driving increased demand for efficient Analog IPs and semiconductor
//             products. Modern electronic products require higher power
//             efficiency, improved performance, compact form factors, enhanced
//             reliability, and shorter development cycles. These evolving
//             requirements continue to create significant opportunities across a
//             wide range of applications and industries.
//           </p>
//           <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
//             Meeting these challenges require continuous innovation, design
//             optimization and deep analog expertise to overcome the Technology
//             challenges of Power, Performance, Area, and Market challenges of
//             Cost & Time-to-market.
//           </p>
//           <p className="text-slate-700 text-base md:text-lg leading-relaxed">
//             AnalogChips is focused on addressing these needs through robust
//             design methodologies and the development of efficient, scalable, and
//             reliable semiconductor products and IP solutions.
//           </p>
//         </div>

//         {/* ── TABS + MARKET CARDS ────────────────────────────────────────── */}
//         <div className="mb-14">
//           {/* Tabs */}
//           <div className="flex gap-2 mb-8 border-b border-slate-200">
//             <button
//               onClick={() => setTab("domestic")}
//               className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
//                 tab === "domestic"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               Domestic Markets
//             </button>
//             {/* <button
//               onClick={() => setTab("overseas")}
//               className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
//                 tab === "overseas"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               Overseas Markets
//             </button> */}
//           </div>

//           {/* Grid of accordion cards — 2 cols on md+ */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {markets.map((m: any, i) => (
//               <MarketCard key={`${tab}-${i}`} item={m} index={i} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

export function MarketOpportunitiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const marketSegments = [
    {
      title: "Government & Strategic Programs",
      description:
        "Strategic semiconductor partner for Defence and Space Applications under India's indigenisation drive",
    },
    {
      title: "Computing & Networking Systems",
      description:
        "Power management, data conversion, sensing, and interface solutions for computing platforms and networking equipment.",
    },
    {
      title: "Drop-in Replacement",
      description:
        "Pin-to-pin compatible replacements for widely used analog semiconductor devices and IPs.",
    },
    {
      title: "Consumer & Smart Appliance Manufacturers",
      description:
        "Power and interface solutions for home appliances, consumer electronics, and connected smart devices.",
    },
    {
      title: "Automotive OEMs & Tier-1 Suppliers",
      description:
        "Power management, sensing, protection, and interface solutions for next-generation vehicle platforms.",
    },
    {
      title: "EV, Energy & Lighting Industry",
      description:
        "Solutions for EV charging, battery management, power conversion, and intelligent lighting applications.",
    },
  ];

  return (
    <section ref={sectionRef} className="pb-20 bg-white">
      <section className="relative bg-gradient-to-br from-[#0F2747] via-[#1a3a5e] to-[#0F2747] overflow-hidden">
        {/* Geometric Abstract Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B5F8A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3B5F8A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B5F8A]/5 rounded-full blur-3xl" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Circuit Lines Decoration */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
            <line
              x1="10%"
              y1="20%"
              x2="30%"
              y2="40%"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="30%"
              y1="40%"
              x2="50%"
              y2="35%"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="50%"
              y1="35%"
              x2="70%"
              y2="50%"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="70%"
              y1="50%"
              x2="90%"
              y2="30%"
              stroke="white"
              strokeWidth="1"
            />
            <circle cx="10%" cy="20%" r="3" fill="white" opacity="0.3" />
            <circle cx="30%" cy="40%" r="3" fill="white" opacity="0.3" />
            <circle cx="50%" cy="35%" r="3" fill="white" opacity="0.3" />
            <circle cx="70%" cy="50%" r="3" fill="white" opacity="0.3" />
            <circle cx="90%" cy="30%" r="3" fill="white" opacity="0.3" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="py-12  text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Markets
            </h1>
          </div>
        </div>
      </section>
      <br />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Market Opportunities Description */}
        <div
          className={`space-y-6 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[16px] leading-[1.8] text-[#555555]">
            The rapid growth of intelligent systems, connectivity and sensing is
            driving increased demand for efficient Analog IPs and semiconductor
            products. Modern electronic products require higher power
            efficiency, improved performance, compact form factors, enhanced
            reliability, and shorter development cycles. These evolving
            requirements continue to create significant opportunities across a
            wide range of applications and industries.
          </p>
          <p className="text-[16px] leading-[1.8] text-[#555555]">
            Meeting these challenges require continuous innovation, design
            optimization and deep analog expertise to overcome the Technology
            challenges of Power, Performance, Area, and Market challenges of
            Cost & Time-to-market.
          </p>
          <p className="text-[16px] leading-[1.8] text-[#555555]">
            AnalogChips is focused on addressing these needs through robust
            design methodologies and the development of efficient, scalable, and
            reliable semiconductor products and IP solutions.
          </p>
        </div>

        {/* Market Segments Grid */}
        <div
          className={`mt-6 transition-all duration-1000 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketSegments.map((segment, index) => (
              <div
                key={index}
                className="group bg-[#F8FAFC] rounded-xl p-5 border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-[#0F2747]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0F2747] mb-2">
                      {segment.title}
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[#555555]">
                      {segment.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
