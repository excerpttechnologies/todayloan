"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Server,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Cpu,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPolicyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
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
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal identification information (name, email address, phone number, company name)",
        "Technical information (IP address, browser type, device information)",
        "Usage data (pages visited, time spent, features accessed)",
        "Communication preferences and feedback",
        "Semiconductor design specifications and requirements (when provided by clients)",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "To provide and maintain our semiconductor products and services",
        "To process inquiries, technical support requests, and product quotations",
        "To improve our product portfolio and develop new semiconductor solutions",
        "To comply with legal obligations and industry regulations",
        "To protect against fraudulent or unauthorized transactions",
        "To send technical updates, security alerts, and support messages",
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      icon: Shield,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with trusted partners who assist in our operations (NDA protected)",
        "We may disclose information when required by law or to protect our rights",
        "Business transfers (merger, acquisition, or asset sale) include appropriate data protection",
        "With your explicit consent for specific purposes",
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption protocols for data transmission (TLS/SSL)",
        "Regular security assessments and vulnerability scanning",
        "Access controls and authentication mechanisms for internal systems",
        "Secure data centers with physical and logical security measures",
        "Regular backup procedures and disaster recovery planning",
        "Employee training on data protection and privacy practices",
      ],
    },
    {
      title: "Data Retention",
      icon: Server,
      content: [
        "Personal data retained as long as necessary for legitimate business purposes",
        "Customer information retained for the duration of our business relationship",
        "Technical data retained for compliance with semiconductor industry regulations",
        "You may request deletion of your personal data (subject to legal obligations)",
        "Anonymized data may be retained for analytical purposes",
      ],
    },
    {
      title: "Your Rights",
      icon: CheckCircle,
      content: [
        "Right to access your personal information",
        "Right to correct inaccurate or incomplete data",
        "Right to request deletion of your data (subject to legal requirements)",
        "Right to object to certain data processing activities",
        "Right to data portability where applicable",
        "Right to withdraw consent at any time",
      ],
    },
    {
      title: "Cookies and Tracking Technologies",
      icon: Eye,
      content: [
        "We use essential cookies for website functionality and security",
        "Analytics cookies help us understand how visitors use our site",
        "Preference cookies remember your settings and choices",
        "You can control cookie preferences through your browser settings",
        "Disabling cookies may affect certain website features",
      ],
    },
    {
      title: "International Data Transfers",
      icon: Globe,
      content: [
        "Your information may be transferred to and processed in countries with different data protection laws",
        "We implement standard contractual clauses and other safeguards",
        "Data transfers comply with applicable legal requirements",
        "We ensure adequate protection for cross-border data flows",
      ],
    },
  ];

  const lastUpdated = "January 1, 2024";

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
              <Shield className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-xs font-medium text-cyan-700">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              At AnalogChips, we are committed to protecting your privacy and
              ensuring the security of your personal information.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            {/* Introduction */}
            <div className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Introduction
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                AnalogChips Technologies ("we," "our," or "us") respects your
                privacy and is committed to protecting your personal data. This
                privacy policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website, use our
                services, or interact with us.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                site or use our services.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <div key={idx} className="group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-cyan-600" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                    </div>
                    <div className="ml-14">
                      <ul className="space-y-2">
                        {section.content.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2 text-slate-600"
                          >
                            <CheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-600" />
                Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-slate-600">
                <p>📧 Email: privacy@analog-chips.com</p>
                <p>📞 Phone: +91 XXXXX XXXXX</p>
                <p>
                  📍 Address: No. 197, 7th A Main, Kalyan HBCS, Hampinagar,
                  Bengaluru – 560104
                </p>
              </div>
            </div>

            {/* Update Notice */}
            <div className="mt-8 text-center text-sm text-slate-500 border-t border-slate-200 pt-8">
              <p>
                This Privacy Policy may be updated periodically. Please review
                this page for any changes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
