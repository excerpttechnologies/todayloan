"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Phone,
  User,
  Building,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
  Zap,
  Cpu,
  Shield,
  Battery,
  Thermometer,
  TrendingUp,
  Award,
  Clock,
  Globe,
  Users,
  FileText,
  ChevronRight,
  Sparkles,
  Microchip,
  Server,
  Database,
  Layout,
  Smartphone,
  Star,
  Quote,
  Sun,
  Moon,
  Monitor,
  Laptop,
  Tablet,
  Car,
  Rocket,
  Satellite,
  Drone,
  Brain,
  HeartPulse,
  Factory,
  Box,
  Package,
  Layers,
  Grid,
  List,
  Plus,
  Minus,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Activity,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  projectRequirements: z
    .string()
    .min(10, "Please provide project requirements"),
});

type FormData = z.infer<typeof formSchema>;

// Analog IP Data
const analogIPs = [
  {
    id: 1,
    name: "DC-DC Converters",
    description:
      "High-efficiency step-down and step-up converters for power management applications.",
    performance: "Up to 95% Efficiency",
    icon: Battery,
    tags: ["Buck", "Boost", "Buck-Boost", "95% Efficiency"],
    features: [
      "Wide input voltage range",
      "High switching frequency",
      "Current mode control",
    ],
  },
  {
    id: 2,
    name: "Low Dropout Regulators",
    description:
      "Ultra-low noise LDOs with high PSRR for sensitive analog and RF circuits.",
    performance: "10µV RMS Noise",
    icon: Zap,
    tags: ["LDO", "Low Noise", "High PSRR"],
    features: [
      "Dropout voltage < 100mV",
      "Output current up to 1A",
      "Thermal protection",
    ],
  },
  {
    id: 3,
    name: "SAR ADC",
    description:
      "High-speed successive approximation ADCs with excellent linearity and low power.",
    performance: "16-bit, 10MSPS",
    icon: Activity,
    tags: ["16-bit", "10MSPS", "Low Power"],
    features: ["No missing codes", "Internal reference", "SPI interface"],
  },
  {
    id: 4,
    name: "Band-Gap References",
    description:
      "Precision voltage references with low temperature drift and high initial accuracy.",
    performance: "±0.05% Accuracy",
    icon: Thermometer,
    tags: ["±0.05%", "5ppm/°C", "Low Noise"],
    features: [
      "Wide supply range",
      "Low power consumption",
      "Multiple output voltages",
    ],
  },
  {
    id: 5,
    name: "Temperature Sensors",
    description:
      "Integrated temperature sensing solutions with digital output for thermal monitoring.",
    performance: "±0.5°C Accuracy",
    icon: Thermometer,
    tags: ["±0.5°C", "Digital Output", "Low Power"],
    features: ["I2C/SMBus interface", "Programmable limits", "Shutdown mode"],
  },
];

// Why Choose Us Data
const whyChooseUs = [
  {
    title: "Silicon Proven",
    description:
      "IPs verified across multiple process nodes and wafer fabs with production success.",
    icon: CheckCircle,
  },
  {
    title: "Faster Time-to-Market",
    description:
      "Pre-verified IP blocks reduce integration time and accelerate product development.",
    icon: Rocket,
  },
  {
    title: "Multi-Node Support",
    description:
      "Support for 180nm to 3nm process technologies across leading foundries.",
    icon: Microchip,
  },
  {
    title: "Low Power Optimized",
    description:
      "Designed for power-sensitive applications with advanced power management features.",
    icon: Battery,
  },
  {
    title: "Scalable Architecture",
    description:
      "Configurable IP blocks that scale with your design requirements.",
    icon: Layers,
  },
  {
    title: "Expert Engineering Team",
    description: "Dedicated support from experienced analog design engineers.",
    icon: Users,
  },
];

// Use Cases Data
const useCases = [
  {
    title: "Automotive",
    description: "ADAS, infotainment, and powertrain control systems.",
    icon: Car,
  },
  {
    title: "IoT Devices",
    description: "Smart sensors, wearables, and connected edge devices.",
    icon: Smartphone,
  },
  {
    title: "AI Accelerators",
    description: "High-performance computing for machine learning workloads.",
    icon: Brain,
  },
  {
    title: "Data Centers",
    description:
      "Power management and high-speed interconnects for server infrastructure.",
    icon: Server,
  },
  {
    title: "Consumer Electronics",
    description: "Smartphones, tablets, and home entertainment systems.",
    icon: Layout,
  },
  {
    title: "Industrial Systems",
    description: "Factory automation, robotics, and control systems.",
    icon: Factory,
  },
];

// Technical Specs Data
const technicalSpecs = [
  {
    label: "Process Nodes",
    value: "180nm - 3nm",
    metric: "Multi-node support",
    progress: 100,
  },
  {
    label: "Power Efficiency",
    value: ">90%",
    metric: "Peak efficiency",
    progress: 90,
  },
  {
    label: "Noise Performance",
    value: "<10µV",
    metric: "RMS noise",
    progress: 85,
  },
  {
    label: "Temperature Range",
    value: "-40°C to 125°C",
    metric: "Industrial grade",
    progress: 95,
  },
  {
    label: "Area Optimization",
    value: "Up to 30% smaller",
    metric: "Area reduction",
    progress: 70,
  },
  {
    label: "Speed Metrics",
    value: "10MSPS",
    metric: "ADC sampling rate",
    progress: 80,
  },
];

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "VP of Engineering, TechCorp",
    content:
      "Fermionic's analog IP solutions significantly accelerated our product development cycle. The quality and support have been exceptional.",
    rating: 5,
    company: "TechCorp",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO, Innovate Semiconductor",
    content:
      "The precision and reliability of their IP blocks are outstanding. We've successfully taped out multiple chips using their solutions.",
    rating: 5,
    company: "Innovate Semiconductor",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Director of Hardware, AI Systems Inc",
    content:
      "Excellent documentation and support. Their analog IPs integrated seamlessly into our AI accelerator design.",
    rating: 5,
    company: "AI Systems Inc",
  },
];

// Technology Tags for Marquee
const technologies = [
  "SERDES",
  "PLL",
  "ADC",
  "DAC",
  "RF",
  "ASIC",
  "SoC",
  "PHY",
  "SMPS",
  "LDO",
  "PMIC",
  "Clock Gen",
  "Temp Sensor",
  "Bandgap",
  "Amplifier",
  "Filter",
];

// Document Downloads
const documents = [
  { name: "Analog_IP_Datasheet.pdf", size: "2.4 MB", icon: FileText },
  { name: "SERDES_Specification.pdf", size: "3.1 MB", icon: FileText },
  { name: "Power_Management_Brief.pdf", size: "1.8 MB", icon: FileText },
];

// Feature Card Component
function FeatureCard({
  ip,
  index,
}: {
  ip: (typeof analogIPs)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = ip.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="relative bg-white border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group-hover:border-[#0082C6]/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#0082C6]/5 to-transparent rounded-bl-3xl" />

        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0082C6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-[#0082C6]" />
          </div>
          <div className="px-2 py-1 rounded-full bg-[#0082C6]/5 text-[#0082C6] text-xs font-semibold">
            {ip.performance}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{ip.name}</h3>
        <p className="text-slate-600 text-sm mb-4">{ip.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {ip.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  Key Features:
                </p>
                <ul className="space-y-1">
                  {ip.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-3 h-3 text-[#0082C6]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-[#0082C6] text-sm font-medium hover:gap-2 transition-all duration-300"
        >
          {isExpanded ? "Show Less" : "Learn More"}
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
          />
        </button>
      </Card>
    </motion.div>
  );
}

// Why Choose Us Card
function WhyChooseUsCard({
  item,
  index,
}: {
  item: (typeof whyChooseUs)[0];
  index: number;
}) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group"
    >
      <div className="w-10 h-10 rounded-lg bg-[#0082C6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-[#0082C6]" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
        <p className="text-sm text-slate-600">{item.description}</p>
      </div>
    </motion.div>
  );
}

// Use Case Card
function UseCaseCard({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0];
  index: number;
}) {
  const Icon = useCase.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="bg-white border-slate-200 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:border-[#0082C6]/30">
        <div className="w-16 h-16 rounded-xl bg-[#0082C6]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-[#0082C6]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {useCase.title}
        </h3>
        <p className="text-sm text-slate-600">{useCase.description}</p>
      </Card>
    </motion.div>
  );
}

// Testimonial Card
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-full md:w-[calc(33.33%-1rem)]"
    >
      <Card className="bg-white border-slate-200 rounded-xl p-6 h-full hover:shadow-xl transition-all duration-300">
        <Quote className="w-8 h-8 text-[#0082C6]/30 mb-4" />
        <p className="text-slate-600 mb-4 line-clamp-4">
          {testimonial.content}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0082C6]/20 to-[#0082C6]/10 flex items-center justify-center">
            <span className="text-[#0082C6] font-bold">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">
              {testimonial.name}
            </p>
            <p className="text-xs text-slate-500">{testimonial.role}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Sticky Contact Form Component
function StickyContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSuccess(false);
      reset();
      setIsCaptchaChecked(false);
    }, 3000);
  };

  const handleDownload = (fileName: string) => {
    setDownloadingFile(fileName);
    setTimeout(() => {
      setDownloadingFile(null);
      alert(`Downloading ${fileName}`);
    }, 1000);
  };

  return (
    <div className="sticky top-24">
      <Card className="bg-white border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative header */}
        <div className="h-1 bg-gradient-to-r from-[#0082C6] to-[#0082C6]/60" />

        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Get The Documents
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            We will send you the documents by email.
          </p>

          {/* Download Section */}
          <div className="mb-6 space-y-2">
            {documents.map((doc, idx) => {
              const Icon = doc.icon;
              const isDownloading = downloadingFile === doc.name;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ x: 5 }}
                  onClick={() => handleDownload(doc.name)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#0082C6]/30 hover:bg-[#0082C6]/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0082C6]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0082C6]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-700 group-hover:text-[#0082C6] transition-colors">
                      {doc.name}
                    </p>
                    <p className="text-xs text-slate-400">{doc.size}</p>
                  </div>
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 text-[#0082C6] animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-[#0082C6] transition-colors" />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="h-px bg-slate-200 my-6" />

          {/* Form */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Request Sent!
                </h4>
                <p className="text-green-600 text-sm">
                  We'll send the documents to your email shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("fullName")}
                      placeholder="John Doe"
                      className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-slate-200 focus:border-[#0082C6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#0082C6]/20 transition-all`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                        errors.email
                          ? "border-red-500"
                          : "border-slate-200 focus:border-[#0082C6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#0082C6]/20 transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("phone")}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                        errors.phone
                          ? "border-red-500"
                          : "border-slate-200 focus:border-[#0082C6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#0082C6]/20 transition-all`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register("company")}
                      placeholder="Your Company"
                      className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                        errors.company
                          ? "border-red-500"
                          : "border-slate-200 focus:border-[#0082C6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#0082C6]/20 transition-all`}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Project Requirements <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      {...register("projectRequirements")}
                      placeholder="Tell us about your project..."
                      rows={3}
                      className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                        errors.projectRequirements
                          ? "border-red-500"
                          : "border-slate-200 focus:border-[#0082C6]"
                      } focus:outline-none focus:ring-2 focus:ring-[#0082C6]/20 transition-all resize-none`}
                    />
                  </div>
                  {errors.projectRequirements && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.projectRequirements.message}
                    </p>
                  )}
                </div>

                {/* Captcha */}
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        isCaptchaChecked
                          ? "bg-[#0082C6] border-[#0082C6]"
                          : "border-slate-400 hover:border-[#0082C6]"
                      }`}
                    >
                      {isCaptchaChecked && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </button>
                    <span className="text-sm text-slate-700">
                      I'm not a robot
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#0082C6] rounded flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">
                            g
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          reCAPTCHA
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Privacy - Terms
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isCaptchaChecked}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    isSubmitting || !isCaptchaChecked
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-[#0082C6] hover:bg-[#0065A0] hover:shadow-lg hover:shadow-[#0082C6]/25 hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Contact Us
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  No spam guaranteed. We respect your privacy.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}

// Main Page Component
export default function AnalogIPSolutionsPage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" },
      );

      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(
        (prev) => (prev + 1) % Math.ceil(testimonials.length / 3),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#0082C6]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0082C6]/5 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0082C6]/5 rounded-full blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h30M0 30h30v30' stroke='%230082C6' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0082C6]/10 border border-[#0082C6]/20 mb-6"
              >
                <Microchip className="w-4 h-4 text-[#0082C6]" />
                <span className="text-sm font-semibold text-[#0082C6]">
                  Analog IP Solutions
                </span>
              </motion.div>

              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                Analog IP Solutions
              </h1>

              <p className="hero-subtitle text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed mb-8">
                Silicon-proven high-performance Analog, CLK-System, SMPS, and
                SERDES IP solutions engineered for next-generation semiconductor
                applications.
              </p>
            </div>
          </div>
        </section>

        {/* Main Two-Column Layout */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content - 2/3 width */}
            <div className="lg:col-span-2 space-y-16">
              {/* Analog IP Content Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Advanced Analog IP Portfolio
                  </h2>
                  <div className="w-20 h-1 bg-[#0082C6] rounded-full mb-6" />
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Fermionic Design delivers silicon-proven high-performance
                    Analog, CLK-System, SMPS and SERDES IPs across multiple
                    process nodes and wafer fabs. Our comprehensive design
                    collateral, verification flows, and silicon-calibrated
                    models enable rapid SoC integration and production-ready
                    deployment.
                  </p>
                </motion.div>

                {/* Analog IP List */}
                <div className="space-y-6 mt-8">
                  {analogIPs.map((ip, index) => (
                    <FeatureCard key={ip.id} ip={ip} index={index} />
                  ))}
                </div>
              </section>

              {/* Technical Specifications Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Technical Specifications
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Industry-leading performance metrics across key parameters
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {technicalSpecs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 rounded-xl p-5"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-900">
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-[#0082C6]">
                          {spec.value}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#0082C6] to-[#0082C6]/60 rounded-full"
                          style={{ width: `${spec.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500">{spec.metric}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Why Choose Us Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Why Choose Us
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Trusted by leading semiconductor companies worldwide
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
                  {whyChooseUs.map((item, index) => (
                    <WhyChooseUsCard key={index} item={item} index={index} />
                  ))}
                </div>
              </section>

              {/* Use Cases Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Applications
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Powering innovation across diverse industries
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {useCases.map((useCase, index) => (
                    <UseCaseCard key={index} useCase={useCase} index={index} />
                  ))}
                </div>
              </section>

              {/* Testimonials Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    What Our Clients Say
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Trusted by industry leaders worldwide
                  </p>
                </motion.div>

                <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar - Sticky Form */}
            <div className="lg:col-span-1">
              <StickyContactForm />
            </div>
          </div>
        </div>

        {/* Technology Marquee */}
        <section className="py-8 bg-slate-100 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-transparent to-slate-100 z-10" />
            <motion.div
              animate={{ x: [0, -1500] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap py-4"
            >
              {[...technologies, ...technologies].map((tech, i) => (
                <span
                  key={i}
                  className="text-slate-600 font-medium px-4 py-2 bg-white rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Integrate Our IP?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact our technical sales team for licensing, custom
                implementations, and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#0082C6] hover:bg-[#0065A0] text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group">
                  <span className="flex items-center gap-2">
                    Contact Sales
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
