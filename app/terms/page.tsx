"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  ShoppingCart,
  Shield,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Scale,
  Clock,
  DollarSign,
  HardDrive,
  Lock,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TermsOfServicePage() {
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
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing or using our website and services, you agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our website or services",
        "We reserve the right to update or modify these terms at any time without prior notice",
        "Continued use of the site after changes constitutes acceptance of the modified terms",
        "These terms apply to all users, including customers, partners, and visitors",
      ],
    },
    {
      title: "Products and Services",
      icon: Cpu,
      content: [
        "We provide analog and power management semiconductor solutions including Boost Converters, Buck Regulators, LDO Regulators, LED Drivers, Ideal Diode Controllers, and Load Switches",
        "Product specifications and descriptions are subject to change without notice",
        "We reserve the right to discontinue any product at any time",
        "All products are subject to availability",
        "Custom semiconductor solutions require separate agreements and NDA",
      ],
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        "All content on this website, including text, graphics, logos, and software, is our intellectual property",
        "Our semiconductor designs, IP cores, and technical documentation are protected by copyright and patent laws",
        "You may not reproduce, distribute, or create derivative works without our written permission",
        "Licensing agreements are required for commercial use of our semiconductor IP",
        "Reverse engineering of our products is strictly prohibited",
      ],
    },
    {
      title: "User Obligations",
      icon: Users,
      content: [
        "You agree to provide accurate and complete information when using our services",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You agree not to misuse our website or services",
        "You must comply with all applicable laws and regulations",
        "You will not interfere with or disrupt our services or servers",
        "You will not attempt to gain unauthorized access to any systems or networks",
      ],
    },
    {
      title: "Orders and Payments",
      icon: ShoppingCart,
      content: [
        "All orders are subject to acceptance and availability",
        "Pricing is subject to change without notice",
        "Payment terms are specified in the quotation or purchase agreement",
        "We reserve the right to refuse or cancel any order",
        "Taxes and shipping costs are additional unless stated otherwise",
        "Bulk orders and custom designs require separate quotations",
      ],
    },
    {
      title: "Shipping and Delivery",
      icon: Clock,
      content: [
        "Delivery timelines are estimates and not guaranteed",
        "Risk of loss transfers to customer upon shipment",
        "International shipments may be subject to customs duties and taxes",
        "Customers are responsible for providing accurate shipping information",
        "Shipping delays due to customs, weather, or carrier issues are not our responsibility",
      ],
    },
    {
      title: "Returns and Refunds",
      icon: DollarSign,
      content: [
        "Defective products may be returned within 30 days of delivery",
        "Custom or modified products are not eligible for return",
        "Refunds are issued after inspection and verification",
        "Shipping costs are non-refundable unless the return is due to our error",
        "Please contact our support team for return authorization",
      ],
    },
    {
      title: "Warranty and Disclaimer",
      icon: HardDrive,
      content: [
        "Our products are warranted to conform to published specifications",
        "The warranty period is specified in the product documentation",
        "We are not liable for damages resulting from misuse or unauthorized modifications",
        "Our liability is limited to the purchase price of the product",
        "All products are provided 'as is' without warranties beyond those stated",
        "We do not warrant that our products will meet your specific requirements",
      ],
    },
    {
      title: "Limitation of Liability",
      icon: AlertCircle,
      content: [
        "We are not liable for indirect, incidental, or consequential damages",
        "Our maximum liability is limited to the amount paid for the product or service",
        "We are not responsible for lost profits, data, or business interruption",
        "Some jurisdictions do not allow limitations of liability, so this may not apply to you",
        "This limitation applies to all claims, whether based on warranty, contract, or tort",
      ],
    },
    {
      title: "Export Controls",
      icon: Globe,
      content: [
        "Our products may be subject to export control laws and regulations",
        "You agree to comply with all applicable export and import laws",
        "You will not export or re-export our products to prohibited countries or entities",
        "You are responsible for obtaining any required export licenses",
        "Semiconductor products may be restricted for certain end uses",
      ],
    },
    {
      title: "Confidential Information",
      icon: Lock,
      content: [
        "Technical data, specifications, and design information are considered confidential",
        "You agree to maintain the confidentiality of any non-public information",
        "Confidential information may not be disclosed to third parties without consent",
        "This obligation survives termination of our business relationship",
        "NDA agreements may apply for specific projects",
      ],
    },
    {
      title: "Governing Law",
      icon: Scale,
      content: [
        "These terms are governed by the laws of India",
        "Any disputes shall be resolved in the courts of Bengaluru, Karnataka",
        "We make no representation that our products are appropriate for use in other locations",
        "International users are responsible for compliance with local laws",
      ],
    },
  ];

  const effectiveDate = "January 1, 2024";

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
              <FileText className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-xs font-medium text-cyan-700">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600">
              Effective Date: {effectiveDate}
            </p>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Please read these terms carefully before using our website or
              purchasing our semiconductor products.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            {/* Introduction */}
            <div className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Agreement Overview
              </h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms of Service constitute a legally binding agreement
                between you ("User," "Customer," "You") and AnalogChips
                Technologies ("Company," "We," "Us," "Our") governing your
                access to and use of our website, products, and services. By
                using our website or purchasing our products, you acknowledge
                that you have read, understood, and agree to be bound by these
                terms.
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
                Contact Information
              </h2>
              <p className="text-slate-600 mb-4">
                For questions about these Terms of Service or to report
                violations, please contact us:
              </p>
              <div className="space-y-2 text-slate-600">
                <p>📧 Email: legal@analog-chips.com</p>
                <p>📞 Phone: +91 XXXXX XXXXX</p>
                <p>
                  📍 Address: No. 197, 7th A Main, Kalyan HBCS, Hampinagar,
                  Bengaluru – 560104
                </p>
              </div>
            </div>

            {/* Severability Notice */}
            <div className="mt-8 text-center text-sm text-slate-500 border-t border-slate-200 pt-8">
              <p>
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision shall be limited or eliminated to the
                minimum extent necessary so that these Terms shall otherwise
                remain in full force and effect and enforceable.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
