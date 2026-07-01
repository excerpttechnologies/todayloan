"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowRight,
  Car,
  Factory,
  Wifi,
  Smartphone,
  Lightbulb,
  Sparkles,
  CheckCircle,
  Cpu,
  Zap,
  Shield,
  Battery,
  Radio,
  GitBranch,
  Layers,
  Mail,
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

// Industry data matching navbar dropdown
const industriesData: Record<string, any> = {
  automotive: {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    description:
      "EV power management, ADAS sensors, and in-vehicle networking solutions for next-generation vehicles.",
    longDescription:
      "Our automotive-grade semiconductor solutions enable electric vehicle powertrains, advanced driver assistance systems (ADAS), and high-speed in-vehicle networks. All our automotive products are AEC-Q100 qualified and designed for the harsh automotive environment with extended temperature ranges.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
    gradient: "from-blue-500 to-cyan-500",
    lightGradient: "from-blue-50 to-cyan-50",
    color: "blue",
    products: [
      {
        name: "PMIC",
        href: "/products/pmic",
        description: "Power Management for EV systems",
      },
      {
        name: "ADC/DAC",
        href: "/products/adc-dac",
        description: "Sensor data acquisition",
      },
      {
        name: "SERDES",
        href: "/products/serdes",
        description: "Camera and display interfaces",
      },
      {
        name: "Embedded Systems",
        href: "/products/embedded",
        description: "Body control modules",
      },
    ],
    stats: [
      { value: "45%", label: "Market Share" },
      { value: "AEC-Q100", label: "Qualified" },
      { value: "10M+", label: "Units Shipped" },
      { value: "-40°C", label: "Operating Temp" },
    ],
    applications: [
      "Electric Vehicle Battery Management Systems",
      "Advanced Driver Assistance Systems (ADAS)",
      "In-Vehicle Infotainment (IVI)",
      "Telematics and Connectivity",
      "Powertrain and Engine Control",
      "LED Lighting Systems",
      "Body Control Modules",
      "Autonomous Driving Computers",
    ],
    solutions: [
      "High-efficiency PMIC for EV power rails with 92% efficiency",
      "16-bit ADCs for radar and camera sensor fusion",
      "3.125 Gbps SERDES for high-speed camera links",
      "ARM Cortex-M MCUs with functional safety for body control",
      "AEC-Q100 qualified products for automotive reliability",
    ],
  },
  industrial: {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    description:
      "Factory automation, robotics, and industrial control systems with robust reliability and precision.",
    longDescription:
      "Industrial-grade semiconductor solutions for factory automation, robotics, motor control, and industrial sensors. Our products feature extended temperature range (-40°C to +125°C), long-term availability (15+ years), and high reliability for mission-critical industrial applications.",
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-50 to-teal-50",
    color: "emerald",
    products: [
      {
        name: "PMIC",
        href: "/products/pmic",
        description: "Industrial power management",
      },
      {
        name: "ADC/DAC",
        href: "/products/adc-dac",
        description: "Precision measurement",
      },
      {
        name: "Embedded Systems",
        href: "/products/embedded",
        description: "Real-time control",
      },
      {
        name: "RF Solutions",
        href: "/products/rf",
        description: "Industrial wireless",
      },
    ],
    stats: [
      { value: "99.99%", label: "Reliability" },
      { value: "-40°C", label: "Temp Range" },
      { value: "15+", label: "Years Support" },
      { value: "24/7", label: "Operation" },
    ],
    applications: [
      "Factory Automation and Robotics",
      "Motor Control and Drives",
      "Industrial Sensors and IO-Link",
      "Programmable Logic Controllers (PLC)",
      "Distributed Control Systems (DCS)",
      "Energy Management Systems",
      "Test and Measurement Equipment",
      "Process Automation",
    ],
    solutions: [
      "Industrial PMIC with wide input voltage range (4V-40V)",
      "16-bit precision ADCs for sensor interfacing",
      "ARM Cortex-M MCUs with real-time control capabilities",
      "Isolated communication interfaces for industrial networks",
      "Extended temperature range (-40°C to +125°C)",
    ],
  },
  iot: {
    id: "iot",
    name: "IoT",
    icon: Wifi,
    description:
      "Low-power connectivity and edge computing solutions for smart devices and sensor networks.",
    longDescription:
      "Ultra-low power semiconductor solutions for Internet of Things devices, enabling battery-operated sensors, edge computing, and secure cloud connectivity. Our IoT solutions feature sub-100µA power consumption, enabling 10+ years of battery life.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    gradient: "from-purple-500 to-pink-500",
    lightGradient: "from-purple-50 to-pink-50",
    color: "purple",
    products: [
      {
        name: "PMIC",
        href: "/products/pmic",
        description: "Ultra-low power management",
      },
      {
        name: "ADC/DAC",
        href: "/products/adc-dac",
        description: "Sensor data conversion",
      },
      {
        name: "Embedded Systems",
        href: "/products/embedded",
        description: "Edge processing",
      },
      {
        name: "RF Solutions",
        href: "/products/rf",
        description: "Wireless connectivity",
      },
    ],
    stats: [
      { value: "<100µA", label: "Power Consumption" },
      { value: "10+", label: "Years Battery" },
      { value: "Secure", label: "By Design" },
      { value: "BLE/5G", label: "Connectivity" },
    ],
    applications: [
      "Smart Home and Building Automation",
      "Industrial IoT (IIoT) Sensors",
      "Wearable Health Devices",
      "Asset Tracking and Logistics",
      "Smart Agriculture",
      "Environmental Monitoring",
      "Smart Meters",
      "Connected Medical Devices",
    ],
    solutions: [
      "Ultra-low power PMIC with <100nA quiescent current",
      "Low-power ADCs for continuous sensor monitoring",
      "ARM Cortex-M MCUs with deep sleep modes",
      "Sub-GHz and 2.4 GHz RF with secure connectivity",
      "TrustZone security for IoT device protection",
    ],
  },
  "consumer-electronics": {
    id: "consumer-electronics",
    name: "Consumer Electronics",
    icon: Smartphone,
    description:
      "High-performance analog and mixed-signal ICs for smartphones, wearables, and smart devices.",
    longDescription:
      "Cutting-edge semiconductor solutions for consumer devices, delivering high performance, low power, and small form factors for mass-market applications. Our products have powered over 500 million consumer devices worldwide.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
    gradient: "from-orange-500 to-red-500",
    lightGradient: "from-orange-50 to-red-50",
    color: "orange",
    products: [
      {
        name: "PMIC",
        href: "/products/pmic",
        description: "Compact power management",
      },
      {
        name: "ADC/DAC",
        href: "/products/adc-dac",
        description: "Audio and sensor",
      },
      {
        name: "SERDES",
        href: "/products/serdes",
        description: "Display interfaces",
      },
      {
        name: "Embedded Systems",
        href: "/products/embedded",
        description: "Sensor hubs",
      },
    ],
    stats: [
      { value: "500M+", label: "Devices Powered" },
      { value: "1.8V", label: "Low Voltage" },
      { value: "QFN", label: "Small Package" },
      { value: "<1µA", label: "Standby" },
    ],
    applications: [
      "Smartphones and Tablets",
      "Wireless Earbuds and Audio Devices",
      "Smartwatches and Wearables",
      "Gaming Consoles and Controllers",
      "Digital Cameras",
      "Home Entertainment Systems",
      "VR/AR Headsets",
      "Portable Electronics",
    ],
    solutions: [
      "Compact PMIC with multiple output rails in QFN package",
      "High-performance audio ADCs/DACs for Hi-Fi sound",
      "Low-power SERDES for high-resolution displays",
      "ARM Cortex-M MCUs for sensor fusion hubs",
      "Ultra-low power for extended battery life",
    ],
  },
  "smart-lighting": {
    id: "smart-lighting",
    name: "Smart Lighting",
    icon: Lightbulb,
    description:
      "Intelligent LED drivers and lighting control ICs for commercial and residential applications.",
    longDescription:
      "Advanced LED driver ICs and lighting control solutions for smart lighting systems, enabling dimming, color control, and wireless connectivity. Our solutions achieve up to 98% efficiency for energy-saving lighting applications.",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=600&fit=crop",
    gradient: "from-yellow-500 to-amber-500",
    lightGradient: "from-yellow-50 to-amber-50",
    color: "yellow",
    products: [
      { name: "PMIC", href: "/products/pmic", description: "LED driver ICs" },
      {
        name: "Embedded Systems",
        href: "/products/embedded",
        description: "Lighting control",
      },
      {
        name: "RF Solutions",
        href: "/products/rf",
        description: "Wireless control",
      },
    ],
    stats: [
      { value: "98%", label: "Efficiency" },
      { value: "PWM", label: "Dimming" },
      { value: "BLE/Zigbee", label: "Connectivity" },
      { value: "16-bit", label: "Color Control" },
    ],
    applications: [
      "Commercial LED Lighting Systems",
      "Residential Smart Lighting",
      "Automotive Interior and Exterior Lighting",
      "Smart Street Lighting",
      "Architectural Lighting",
      "Human Centric Lighting (HCL)",
      "Stage and Entertainment Lighting",
      "Horticulture Lighting",
    ],
    solutions: [
      "High-efficiency LED drivers with up to 98% efficiency",
      "PWM dimming controllers with 16-bit resolution",
      "Wireless connectivity (Bluetooth LE, Zigbee, Thread)",
      "RGB color mixing and tuning for smart bulbs",
      "Adaptive lighting control for human centric applications",
    ],
  },
};

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const industry = industriesData[slug];

  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  if (!industry) {
    notFound();
  }

  const Icon = industry.icon;

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

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 20, stagger: 0.1 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        productsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main
        ref={sectionRef}
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
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
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-6">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    Industry Solution
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  {industry.name}
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {industry.description}
                </p>
              </div>

              <div className="flex-shrink-0">
                <div
                  className={`w-32 h-32 rounded-2xl bg-gradient-to-r ${industry.gradient} flex items-center justify-center shadow-xl`}
                >
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Description & Applications */}
              <div ref={contentRef}>
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} mix-blend-multiply opacity-30`}
                  />
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {industry.longDescription}
                  </p>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8">
                  Key Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {industry.applications.map((app: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-600">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Stats & Products */}
              <div>
                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-2 gap-4 mb-8">
                  {industry.stats.map((stat: any, idx: number) => (
                    <div
                      key={idx}
                      className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
                    >
                      <div className="text-2xl font-bold text-slate-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Products */}
                <div ref={productsRef}>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    Featured Products
                  </h2>
                  <div className="space-y-3">
                    {industry.products.map((product: any, idx: number) => (
                      <Link
                        key={idx}
                        href={product.href}
                        className="block p-4 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {product.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Solutions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industry.solutions.map((solution: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${industry.gradient} flex items-center justify-center`}
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{solution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Transform Your {industry.name} Solutions?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Contact our industry experts to discuss how our analog
                  solutions can accelerate your next project
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Contact Industry Experts
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Explore Products
                    <Mail className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
