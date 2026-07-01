// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import { Linkedin, Mail, ArrowUp, Cpu, MapPin, Phone } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register ScrollTrigger
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export function Footer() {
//   const currentYear = new Date().getFullYear();
//   const footerRef = useRef<HTMLElement>(null);
//   const linksRef = useRef<(HTMLDivElement | null)[]>([]);

//   const footerLinks = {
//     Products: [
//       { label: "Boost Converter", href: "/products/boost-converter" },
//       { label: "Buck Regulator", href: "/products/buck-regulator" },
//       { label: "LDO Regulator", href: "/products/ldo-regulator" },
//       { label: "LED Driver", href: "/products/led-driver" },
//       {
//         label: "Ideal Diode Controller",
//         href: "/products/ideal-diode-controller",
//       },
//       { label: "Load Switch", href: "/products/load-switch" },
//     ],
//     Company: [
//       { label: "About Us", href: "/about" },
//       { label: "Leadership", href: "/leadership" },
//       { label: "Contact", href: "/contact" },
//     ],
//     Legal: [
//       { label: "Privacy Policy", href: "/privacy" },
//       { label: "Terms of Service", href: "/terms" },
//     ],
//   };

//   // Scroll animations
//   useEffect(() => {
//     if (!footerRef.current) return;

//     const ctx = gsap.context(() => {
//       // Links staggered animation
//       linksRef.current.forEach((linkGroup, index) => {
//         if (!linkGroup) return;

//         gsap.fromTo(
//           linkGroup,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             delay: index * 0.1,
//             ease: "back.out(0.4)",
//             scrollTrigger: {
//               trigger: linkGroup,
//               start: "top 90%",
//               toggleActions: "play none none reverse",
//             },
//           },
//         );
//       });

//       // Copyright animation
//       gsap.fromTo(
//         ".copyright",
//         { opacity: 0 },
//         {
//           opacity: 1,
//           duration: 0.8,
//           delay: 0.5,
//           scrollTrigger: {
//             trigger: ".copyright",
//             start: "top 95%",
//             toggleActions: "play none none reverse",
//           },
//         },
//       );
//     }, footerRef);

//     return () => ctx.revert();
//   }, []);

//   // Back to top button
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Hover animation for links
//   const handleLinkHover = (element: HTMLElement, isEnter: boolean) => {
//     if (isEnter) {
//       gsap.to(element, {
//         x: 5,
//         duration: 0.2,
//         ease: "power2.out",
//       });
//     } else {
//       gsap.to(element, {
//         x: 0,
//         duration: 0.2,
//         ease: "power2.out",
//       });
//     }
//   };

//   return (
//     <footer
//       ref={footerRef}
//       className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />

//         {/* Circuit Pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h30M0 30h30v30' stroke='%2300ffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
//             backgroundSize: "30px 30px",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
//         {/* Footer Links Grid - Now with 4 columns including map */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
//           {/* Products Column */}
//           <div
//             ref={(el) => {
//               linksRef.current[0] = el;
//             }}
//             className="space-y-4"
//           >
//             <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
//               Products
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.Products.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     href={link.href}
//                     className="group flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-all duration-300"
//                     onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
//                     onMouseLeave={(e) =>
//                       handleLinkHover(e.currentTarget, false)
//                     }
//                   >
//                     <span className="text-sm">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company Column */}
//           <div
//             ref={(el) => {
//               linksRef.current[1] = el;
//             }}
//             className="space-y-4"
//           >
//             <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
//               Company
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.Company.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     href={link.href}
//                     className="group flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-all duration-300"
//                     onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
//                     onMouseLeave={(e) =>
//                       handleLinkHover(e.currentTarget, false)
//                     }
//                   >
//                     <span className="text-sm">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal Column */}
//           <div
//             ref={(el) => {
//               linksRef.current[2] = el;
//             }}
//             className="space-y-4"
//           >
//             <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
//               Legal
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.Legal.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     href={link.href}
//                     className="group flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-all duration-300"
//                     onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
//                     onMouseLeave={(e) =>
//                       handleLinkHover(e.currentTarget, false)
//                     }
//                   >
//                     <span className="text-sm">{link.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             {/* Contact Info */}
//             <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
//               <div className="flex items-start gap-2 text-sm text-slate-400">
//                 <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
//                 <span>123 Tech Park, Electronic City, Bengaluru - 560100</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-slate-400">
//                 <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//                 <span>+91 80 1234 5678</span>
//               </div>
//             </div>
//           </div>

//           {/* Google Map Column */}
//           <div
//             ref={(el) => {
//               linksRef.current[3] = el;
//             }}
//             className="space-y-4"
//           >
//             <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
//               Find Us
//             </h4>
//             <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg shadow-cyan-500/10">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.042971956466!2d77.68990587478278!3d12.956140587367145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13f0b1d6e5b3%3A0x5e1c8b5c5f5e5d5d!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
//                 width="100%"
//                 height="200"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="w-full h-[200px] md:h-[220px]"
//                 title="Company Location Map"
//               />
//             </div>
//             <p className="text-xs text-slate-400 text-center">
//               Visit our office in Electronic City
//             </p>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="copyright flex items-center gap-2 text-sm text-slate-400">
//             <Cpu className="w-4 h-4 text-cyan-400" />
//             <span>
//               &copy; {currentYear} AnalogChips Technologies. All rights
//               reserved.
//             </span>
//           </div>

//           <div className="flex items-center gap-6">
//             <a
//               href="mailto:sales@analog-chips.com"
//               className="group flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-all duration-300"
//             >
//               <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
//               <span>sales@analog-chips.com</span>
//             </a>

//             <a
//               href="https://linkedin.com/company/analogchips"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-all duration-300"
//             >
//               <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
//               <span>LinkedIn</span>
//             </a>

//             <button
//               onClick={scrollToTop}
//               className="group w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center"
//               aria-label="Back to top"
//             >
//               <ArrowUp className="w-5 h-5 text-slate-300 group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Linkedin, Mail, ArrowUp, Cpu, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const footerLinks = {
    Products: [
      { label: "Boost Converter", href: "/products/boost-converter" },
      { label: "Buck Regulator", href: "/products/buck-regulator" },
      { label: "LDO Regulator", href: "/products/ldo-regulator" },
      { label: "LED Driver", href: "/products/led-driver" },
      {
        label: "Ideal Diode Controller",
        href: "/products/ideal-diode-controller",
      },
      { label: "Load Switch", href: "/products/load-switch" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="bg-[#0B1A2E] text-white reletive">
      <div className="container reletive mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:py-10">
          {/* Brand Section */}
          <div className="sm:ml-0 -ml-8">
            <div className="flex items-center   gap-2">
              <img
                src="/images/act-final2.webp"
                alt=""
                className="h-14 md:ml-0 m-8 lg:absolute lg:top-1 lg:left-4"
              />
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Useful Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms */}
          {/* <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Terms
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href="mailto:careers@analog-chips.com"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                sales@analog-chips.com
              </a>
              <p className="text-gray-200">Address :</p>
              <p className="text-sm flex flex-col gap-y-1 text-gray-300">
                <span>No. 197, 7th A Main, Kalyan HBCS, Hampinagar,</span>
                <span>Bengaluru - 560104, Karnataka, India</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} AnalogChips Technologies Private Limited. All Rights
            Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
