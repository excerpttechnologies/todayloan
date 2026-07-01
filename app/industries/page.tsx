"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Factory,
  Wifi,
  Smartphone,
  Lightbulb,
  Sparkles,
  Search,
  Cpu,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Clock,
  Battery,
  Radio,
  GitBranch,
  Layers,
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

const industries = [
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    description:
      "EV power management, ADAS sensors, and in-vehicle networking solutions for next-generation vehicles.",
    longDescription:
      "Our automotive-grade semiconductor solutions enable electric vehicle powertrains, advanced driver assistance systems (ADAS), and high-speed in-vehicle networks with AEC-Q100 qualification.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    products: ["PMIC", "ADC/DAC", "SERDES", "Embedded Systems"],
    stats: [
      { value: "45%", label: "Market Share" },
      { value: "AEC-Q100", label: "Qualified" },
      { value: "10M+", label: "Units Shipped" },
    ],
    applications: [
      "Electric Vehicle Battery Management",
      "ADAS & Autonomous Driving",
      "In-Vehicle Infotainment",
      "Telematics & Connectivity",
      "Powertrain Control",
      "LED Lighting Systems",
    ],
    solutions: [
      "High-efficiency PMIC for EV power rails",
      "16-bit ADCs for sensor fusion",
      "3.125 Gbps SERDES for camera links",
      "ARM Cortex-M MCUs for body control",
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    description:
      "Factory automation, robotics, and industrial control systems with robust reliability and precision.",
    longDescription:
      "Industrial-grade semiconductor solutions for factory automation, robotics, motor control, and industrial sensors with extended temperature range and long-term availability.",
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    products: ["PMIC", "ADC/DAC", "Embedded Systems", "RF Solutions"],
    stats: [
      { value: "99.99%", label: "Reliability" },
      { value: "-40°C", label: "Temp Range" },
      { value: "15+", label: "Years Support" },
    ],
    applications: [
      "Factory Automation & Robotics",
      "Motor Control Systems",
      "Industrial Sensors & IO-Link",
      "PLC & DCS Systems",
      "Energy Management",
      "Test & Measurement",
    ],
    solutions: [
      "Industrial PMIC with wide input range",
      "Precision ADCs for sensor interfacing",
      "ARM Cortex-M for real-time control",
      "Isolated communication interfaces",
    ],
  },
  {
    id: "iot",
    name: "IoT",
    icon: Wifi,
    description:
      "Low-power connectivity and edge computing solutions for smart devices and sensor networks.",
    longDescription:
      "Ultra-low power semiconductor solutions for Internet of Things devices, enabling battery-operated sensors, edge computing, and secure cloud connectivity.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    products: ["PMIC", "ADC/DAC", "Embedded Systems", "RF Solutions"],
    stats: [
      { value: "<100µA", label: "Power Consumption" },
      { value: "10+", label: "Years Battery" },
      { value: "Secure", label: "By Design" },
    ],
    applications: [
      "Smart Home & Building Automation",
      "Industrial IoT Sensors",
      "Wearable Devices",
      "Asset Tracking",
      "Smart Agriculture",
      "Environmental Monitoring",
    ],
    solutions: [
      "Ultra-low power PMIC for battery operation",
      "Low-power ADCs for sensor acquisition",
      "ARM Cortex-M with TrustZone security",
      "Sub-GHz and 2.4 GHz RF connectivity",
    ],
  },
  {
    id: "consumer-electronics",
    name: "Consumer Electronics",
    icon: Smartphone,
    description:
      "High-performance analog and mixed-signal ICs for smartphones, wearables, and smart devices.",
    longDescription:
      "Cutting-edge semiconductor solutions for consumer devices, delivering high performance, low power, and small form factors for mass-market applications.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    color: "orange",
    products: ["PMIC", "ADC/DAC", "SERDES", "Embedded Systems"],
    stats: [
      { value: "500M+", label: "Devices Powered" },
      { value: "1.8V", label: "Low Voltage" },
      { value: "QFN", label: "Small Package" },
    ],
    applications: [
      "Smartphones & Tablets",
      "Wearables & Smartwatches",
      "Wireless Earbuds & Audio",
      "Gaming Consoles",
      "Digital Cameras",
      "Home Entertainment",
    ],
    solutions: [
      "Compact PMIC with multiple outputs",
      "High-performance audio ADCs/DACs",
      "Low-power SERDES for displays",
      "ARM Cortex-M for sensor hub",
    ],
  },
  {
    id: "smart-lighting",
    name: "Smart Lighting",
    icon: Lightbulb,
    description:
      "Intelligent LED drivers and lighting control ICs for commercial and residential applications.",
    longDescription:
      "Advanced LED driver ICs and lighting control solutions for smart lighting systems, enabling dimming, color control, and wireless connectivity.",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=600&fit=crop",
    gradient: "from-yellow-500 to-amber-500",
    lightGradient: "from-yellow-50 to-amber-50",
    color: "yellow",
    products: ["PMIC", "Embedded Systems", "RF Solutions"],
    stats: [
      { value: "98%", label: "Efficiency" },
      { value: "PWM", label: "Dimming" },
      { value: "BLE", label: "Connectivity" },
    ],
    applications: [
      "Commercial LED Lighting",
      "Residential Smart Lighting",
      "Automotive Lighting",
      "Street Lighting Control",
      "Architectural Lighting",
      "Human Centric Lighting",
    ],
    solutions: [
      "High-efficiency LED drivers",
      "PWM dimming controllers",
      "Wireless connectivity (BLE/Zigbee)",
      "Color mixing and tuning",
    ],
  },
];

const industryIds = [
  "automotive",
  "industrial",
  "iot",
  "consumer-electronics",
  "smart-lighting",
];

export default function IndustriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredIndustries = industries.filter((industry) => {
    const matchesSearch =
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(0.4)",
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [searchTerm]);

  const handleCardHover = (index: number, isEnter: boolean) => {
    setHoveredCard(isEnter ? index : null);
  };

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
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
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center py-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Industries
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Delivering precision analog solutions across diverse sectors,
              enabling innovation and driving efficiency.
            </p>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Search */}
            <div className="flex justify-end mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>
            </div>

            {/* Industries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIndustries.map((industry, index) => {
                const Icon = industry.icon;
                const isHovered = hoveredCard === index;

                return (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.id}`}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el as HTMLDivElement;
                    }}
                    className="group relative block"
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    <Card className="relative overflow-hidden bg-white border-slate-200 hover:shadow-xl transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2 cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={industry.image}
                          alt={industry.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} mix-blend-multiply opacity-40`}
                        />

                        <div
                          className={`absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
                        >
                          <Icon
                            className={`w-6 h-6 transition-colors duration-300`}
                            style={{
                              color: isHovered ? `#0ea5e9` : "#475569",
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {industry.name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {industry.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {industry.stats.slice(0, 2).map((stat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                            >
                              {stat.value} {stat.label}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 ${
                            isHovered ? `text-blue-600 gap-3` : "text-slate-700"
                          }`}
                        >
                          Explore Solutions
                          <ArrowRight
                            className={`w-4 h-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
                          />
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                      >
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${industry.gradient} opacity-20`}
                        />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredIndustries.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  No industries found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search criteria
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
