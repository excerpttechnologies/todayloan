"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Send,
  Clock,
  CheckCircle,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  ArrowRight,
  User,
  Building,
  MessageSquare,
  Github,
  Youtube,
  Navigation,
  Award,
  Cpu,
  Zap,
  Shield,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Map animation
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
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
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50"
      >
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
                Contact Us
              </h1>
            </div>
          </div>
        </section>

        {/* Contact Section with Form, Info, and Map */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div ref={formRef}>
                <Card className="bg-white border-slate-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="px-6 md:px-8">
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#F0B100] mb-2">
                        Send us a Message
                      </h2>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        Fill out the form below and we'll get back to you soon
                      </p>
                    </div>

                    {submitted && (
                      <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <p className="text-green-700 font-medium">
                            Thank you! We'll get back to you soon.
                          </p>
                        </div>
                      </div>
                    )}

                    <form className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Full Name *
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${focusedField === "name" ? "scale-[1.02]" : ""}`}
                          >
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email *
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${focusedField === "email" ? "scale-[1.02]" : ""}`}
                          >
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Phone
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${focusedField === "phone" ? "scale-[1.02]" : ""}`}
                          >
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Company
                          </label>
                          <div
                            className={`relative transition-all duration-300 ${focusedField === "company" ? "scale-[1.02]" : ""}`}
                          >
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("company")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Message *
                        </label>
                        <div
                          className={`relative transition-all duration-300 ${focusedField === "message" ? "scale-[1.02]" : ""}`}
                        >
                          <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            rows={5}
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                            required
                          />
                        </div>
                      </div>
                      {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                          <p className="text-red-700 font-medium">{error}</p>
                        </div>
                      )}

                      <Button
                        onClick={handleSubmit}
                        type="button"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg duration-300 transform hover:-translate-y-0.5 group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </>
                          )}
                        </span>
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

              {/* Contact Info & Map */}
              <div>
                {/* Address Card */}
                <div ref={infoRef} className="mb-6">
                  <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="px-6">
                      <h3 className="text-2xl flex it md:text-3xl font-bold text-[#F0B100] mb-2 gap-x-2">
                        {/* <Building className="w-5 h-5 text-blue-600" /> */}
                        Registered Office
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 group mt-5">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className=" text-slate-800 font-bold mb-1">
                              Address
                            </p>
                            <p className="text-slate-800 font-medium leading-relaxed">
                              No. 197, 7th A Main,
                              <br />
                              Kalyan HBCS, Hampinagar,
                              <br />
                              Bengaluru – 560104,
                              <br />
                              Karnataka, India
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Phone className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-slate-800 font-bold mb-1">
                              Phone
                            </p>
                            <a
                              href="tel:+91 9113074387"
                              className="text-slate-800 font-medium hover:text-blue-600 transition-colors"
                            >
                              +91 9113074387
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-slate-800 font-bold mb-1">
                              Email
                            </p>
                            <a
                              href="mailto:sales@analog-chips.com"
                              className="text-slate-800 font-medium hover:text-blue-600 transition-colors break-all"
                            >
                              sales@analog-chips.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Globe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-slate-800 font-bold mb-1">
                              Website
                            </p>
                            <a
                              href="https://www.analog-chips.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-800 font-medium hover:text-blue-600 transition-colors"
                            >
                              www.analog-chips.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Map Card */}
                <div ref={mapRef}>
                  <Card className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#F0B100] mb-4 flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-[#F0B100]" />
                        Find Us Here
                      </h3>
                      <div className="relative w-full h-64 md:h-72 rounded-xl overflow-hidden bg-slate-100">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.876789456789!2d77.556789!3d12.978789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167c5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sHampinagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                          title="AnalogChips Office Location"
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Mon-Fri: 9:00 AM - 6:00 PM IST
                        </span>
                        <button
                          onClick={() =>
                            window.open(
                              "https://maps.google.com/?q=Hampinagar+Bengaluru",
                              "_blank",
                            )
                          }
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                          Get Directions
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        {/* <section className="py-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-center gap-4">
              {[
                {
                  icon: Linkedin,
                  href: "#",
                  color: "bg-blue-600",
                  label: "LinkedIn",
                },
                {
                  icon: Twitter,
                  href: "#",
                  color: "bg-sky-500",
                  label: "Twitter",
                },
                {
                  icon: Facebook,
                  href: "#",
                  color: "bg-blue-700",
                  label: "Facebook",
                },
                {
                  icon: Github,
                  href: "#",
                  color: "bg-gray-800",
                  label: "GitHub",
                },
                {
                  icon: Youtube,
                  href: "#",
                  color: "bg-red-600",
                  label: "YouTube",
                },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* CTA Section - Get In Touch */}
        {/* <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div ref={ctaRef}>
              <Card className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative p-8 md:p-12 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">
                      Let's Collaborate
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Ready to Innovate Together?
                  </h2>

                  <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                    Whether you need custom analog IP, semiconductor solutions,
                    or technical consultation, our team of experts is ready to
                    help bring your vision to life.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() =>
                        document
                          .querySelector("form")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    >
                      Get In Touch
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = "mailto:sales@analog-chips.com")
                      }
                      className="px-8 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email Us Directly
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>Industry Expertise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Trusted Partner</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
