// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import Lenis from "lenis";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   Sparkles,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   LogIn,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Users,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";

// // Types
// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
// }

// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
// }

// // Navigation Data
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Product",
//     icon: Package,
//     subitems: [
//       {
//         label: "RF Beamformers",
//         href: "/products/rf-beamformers",
//         description: "Advanced phased array solutions",
//         icon: Radio,
//       },
//       {
//         label: "RF Front End Modules",
//         href: "/products/rf-front-end",
//         description: "Integrated RF solutions",
//         icon: Zap,
//       },
//       {
//         label: "Power & Clock Management",
//         href: "/products/power-management",
//         description: "Efficient power solutions",
//         icon: Battery,
//       },
//       {
//         label: "Microcontrollers",
//         href: "/products/microcontrollers",
//         description: "High-performance MCUs",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Silicon IP",
//     icon: Microchip,
//     subitems: [
//       {
//         label: "Multi-Protocol SERDES",
//         href: "/silicon-ip/serdes",
//         description: "112G PAM4 SerDes",
//         icon: Zap,
//       },
//       {
//         label: "Phase Locked Loop",
//         href: "/silicon-ip/pll",
//         description: "Ultra-low jitter PLL",
//         icon: Clock,
//       },
//       {
//         label: "Analog IPs",
//         href: "/silicon-ip/analog",
//         description: "Precision analog circuits",
//         icon: Shield,
//       },
//       {
//         label: "Digital IPs",
//         href: "/silicon-ip/digital",
//         description: "DSP and compute cores",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Company",
//     icon: Building,
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//       },
//       {
//         label: "Career",
//         href: "/careers",
//         description: "Join our team",
//         icon: Briefcase,
//       },
//     ],
//   },
//   { label: "Blogs", href: "/blog", icon: FileText },
//   { label: "Contact Us", href: "/contact", icon: Mail },
// ];

// // Dropdown Component - Opens on both hover and click
// function Dropdown({
//   item,
//   isActive,
//   index,
// }: {
//   item: NavItem;
//   isActive: boolean;
//   index: number;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Handle hover enter
//   const handleMouseEnter = () => {
//     if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
//     setIsOpen(true);
//   };

//   // Handle hover leave
//   const handleMouseLeave = () => {
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 150);
//   };

//   // Handle click toggle
//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className="relative"
//       ref={dropdownRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <button
//         onClick={handleClick}
//         className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
//           isActive ? "text-orange-500" : "text-slate-600 hover:text-slate-900"
//         }`}
//         aria-expanded={isOpen}
//       >
//         <item.icon
//           className={`w-4 h-4 transition-all duration-300 ${
//             isActive
//               ? "text-orange-500"
//               : "text-slate-400 group-hover:text-orange-500"
//           }`}
//         />
//         {item.label}
//         <ChevronDown
//           className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
//           >
//             <div className="p-2">
//               {item.subitems?.map((subitem, idx) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 group"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
//                     <subitem.icon className="w-4 h-4 text-slate-500 group-hover:text-orange-500" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-700 group-hover:text-orange-500">
//                       {subitem.label}
//                     </p>
//                     <p className="text-xs text-slate-400 mt-0.5">
//                       {subitem.description}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Mobile Accordion Component
// function MobileAccordion({
//   item,
//   isActive,
//   index,
//   openAccordion,
//   setOpenAccordion,
// }: any) {
//   const isOpen = openAccordion === index;

//   return (
//     <div className="border-b border-slate-100 last:border-0">
//       <button
//         onClick={() => setOpenAccordion(isOpen ? null : index)}
//         className="w-full flex items-center justify-between px-4 py-4 text-left"
//       >
//         <div className="flex items-center gap-3">
//           <item.icon
//             className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-slate-500"}`}
//           />
//           <span
//             className={`text-sm font-medium ${isActive ? "text-orange-500" : "text-slate-700"}`}
//           >
//             {item.label}
//           </span>
//         </div>
//         <ChevronDown
//           className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && item.subitems && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             <div className="pb-4 pl-12 space-y-2">
//               {item.subitems.map((subitem: any, idx: number) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   className="block py-2 text-sm text-slate-600 hover:text-orange-500 transition-colors"
//                   onClick={() => setOpenAccordion(null)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <subitem.icon className="w-3.5 h-3.5" />
//                     {subitem.label}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Main Navbar Component
// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState<number | null>(null);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navbarRef = useRef<HTMLElement>(null);
//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   // Initialize Lenis smooth scrolling
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // GSAP animation for navbar on load
//     gsap.fromTo(
//       navbarRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
//     );

//     // Stagger animation for nav items
//     gsap.fromTo(
//       ".nav-item-desktop",
//       { opacity: 0, y: -20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         stagger: 0.05,
//         delay: 0.3,
//         ease: "power2.out",
//       },
//     );

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isOpen && mobileMenuRef.current) {
//       gsap.fromTo(
//         mobileMenuRef.current,
//         { opacity: 0, x: 50 },
//         { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
//       );
//     }
//   }, [isOpen]);

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === href;
//     return pathname.startsWith(href);
//   };

//   const isParentActive = (item: NavItem) => {
//     if (item.subitems) {
//       return item.subitems.some((sub) => pathname.startsWith(sub.href));
//     }
//     return false;
//   };

//   const logoSrc =
//     "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   return (
//     <div className="pt-16">
//       <nav
//         ref={navbarRef}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg"
//             : "bg-white/80 backdrop-blur-sm"
//         }`}
//       >
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[93vw]">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo with Image */}
//             <Link
//               href="/"
//               className="group flex items-center gap-2.5 font-bold text-xl lg:text-2xl"
//               onMouseEnter={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1.02,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//               onMouseLeave={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0  rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden  bg-white flex items-center justify-center">
//                   {!logoError ? (
//                     <Image
//                       src={logoSrc}
//                       alt="Analog Company Logo"
//                       width={48}
//                       height={48}
//                       className="object-contain p-1"
//                       onError={() => setLogoError(true)}
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
//                       <Sparkles className="w-5 h-5 text-white" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <span className="hidden sm:inline bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Analog
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-2">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-item-desktop">
//                       <Dropdown item={item} isActive={active} index={index} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className={`nav-item-desktop flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
//                       active
//                         ? "text-orange-500"
//                         : "text-slate-600 hover:text-slate-900"
//                     }`}
//                   >
//                     <item.icon
//                       className={`w-4 h-4 transition-all duration-300 ${
//                         active
//                           ? "text-orange-500"
//                           : "text-slate-400 group-hover:text-orange-500"
//                       }`}
//                     />
//                     {item.label}
//                     {active && (
//                       <motion.div
//                         layoutId="activeNav"
//                         className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3 }}
//                       />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//             <button></button>

//             {/* CTA Button */}
//             {/* <Link href={"/admin"} className="hidden md:flex items-center gap-4">
//               <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group text-sm">
//                 <span className="relative z-10 flex items-center gap-2">
//                   Login
//                   <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </Button>
//             </Link>*/}

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden relative w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle menu"
//               aria-expanded={isOpen}
//             >
//               <motion.div
//                 animate={{ rotate: isOpen ? 90 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {isOpen ? (
//                   <X className="w-5 h-5 text-slate-700" />
//                 ) : (
//                   <Menu className="w-5 h-5 text-slate-700" />
//                 )}
//               </motion.div>
//             </button>
//           </div>
//         </div>

//         {/* Animated background gradient */}
//         <div className="absolute inset-0 -z-10 pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
//         </div>
//       </nav>

//       {/* Mobile Navigation Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40 md:hidden"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Sidebar Menu */}
//             <motion.div
//               ref={mobileMenuRef}
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-slate-200">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
//                     {!logoError ? (
//                       <Image
//                         src={logoSrc}
//                         alt="Analog Company Logo"
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                         onError={() => setLogoError(true)}
//                         unoptimized
//                       />
//                     ) : (
//                       <Sparkles className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                   <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Menu
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
//                 >
//                   <X className="w-5 h-5 text-slate-600" />
//                 </button>
//               </div>

//               {/* Navigation Items */}
//               <div className="flex-1 overflow-y-auto py-4">
//                 {navigationData.map((item, index) => {
//                   const active = item.href
//                     ? isActive(item.href)
//                     : isParentActive(item);

//                   if (item.subitems) {
//                     return (
//                       <MobileAccordion
//                         key={index}
//                         item={item}
//                         isActive={active}
//                         index={index}
//                         openAccordion={openAccordion}
//                         setOpenAccordion={setOpenAccordion}
//                       />
//                     );
//                   }

//                   return (
//                     <Link
//                       key={index}
//                       href={item.href!}
//                       className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-300 ${
//                         active
//                           ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-500 border-r-4 border-orange-500"
//                           : "text-slate-700 hover:bg-slate-50"
//                       }`}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <item.icon
//                         className={`w-5 h-5 ${active ? "text-orange-500" : "text-slate-400"}`}
//                       />
//                       {item.label}
//                     </Link>
//                   );
//                 })}
//               </div>

//               {/* Footer */}
//               {/* <Link href={"/admin"} className="p-4 border-t border-slate-200">
//                 <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded shadow-lg text-sm">
//                   <span className="flex items-center justify-center gap-2">
//                     Login
//                     <LogIn className="w-4 h-4" />
//                   </span>
//                 </Button>
//               </Link> */}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import {
//   Menu,
//   X,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   LogIn,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
//   ArrowUpRight,
//   Sparkles,
//   MoveRight,
//   ChevronRight,
//   Car,
//   Wifi,
//   Factory,
//   Smartphone,
//   Lightbulb,
//   Users,
//   Eye,
//   Target,
//   Server,
//   Layers,
//   GitBranch,
//   Network,
// } from "lucide-react";
// import gsap from "gsap";

// /* ───────────────────────────
//    TYPES
// ─────────────────────────── */
// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
//   tag?: string;
//   color?: string;
//   bgColor?: string;
// }
// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
// }

// /* ───────────────────────────
//    DATA - REQUIRED NAVBAR ITEMS
// ─────────────────────────── */
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Products",
//     icon: Package,
//     subitems: [
//       {
//         label: "PMIC",
//         href: "/products/pmic",
//         description: "Power Management ICs",
//         icon: Battery,
//         tag: "Popular",
//         color: "#2563eb",
//         bgColor: "#eff6ff",
//       },
//       {
//         label: "ADC/DAC",
//         href: "/products/adc-dac",
//         description: "Data Converters",
//         icon: Radio,
//         color: "#d97706",
//         bgColor: "#fffbeb",
//       },
//       {
//         label: "SERDES",
//         href: "/products/serdes",
//         description: "Serializer/Deserializer",
//         icon: GitBranch,
//         color: "#16a34a",
//         bgColor: "#f0fdf4",
//       },
//       {
//         label: "Embedded Systems",
//         href: "/products/embedded",
//         description: "ARM Cortex Solutions",
//         icon: Layers,
//         color: "#7c3aed",
//         bgColor: "#f5f3ff",
//       },
//       {
//         label: "RF Solutions",
//         href: "/products/rf-solutions",
//         description: "RF Front End & Beamformers",
//         icon: Radio,
//         color: "#dc2626",
//         bgColor: "#fef2f2",
//       },
//     ],
//   },
//   {
//     label: "Industries",
//     icon: Building,
//     subitems: [
//       {
//         label: "Automotive",
//         href: "/industries/automotive",
//         description: "EV & ADAS Solutions",
//         icon: Car,
//         color: "#2563eb",
//         bgColor: "#eff6ff",
//       },
//       {
//         label: "Industrial",
//         href: "/industries/industrial",
//         description: "Factory Automation",
//         icon: Factory,
//         color: "#16a34a",
//         bgColor: "#f0fdf4",
//       },
//       {
//         label: "IoT",
//         href: "/industries/iot",
//         description: "Smart Connectivity",
//         icon: Wifi,
//         color: "#0891b2",
//         bgColor: "#ecfeff",
//       },
//       {
//         label: "Consumer Electronics",
//         href: "/industries/consumer",
//         description: "Smart Devices",
//         icon: Smartphone,
//         color: "#d97706",
//         bgColor: "#fffbeb",
//       },
//       {
//         label: "Smart Lighting",
//         href: "/industries/lighting",
//         description: "LED & Smart Controls",
//         icon: Lightbulb,
//         tag: "New",
//         color: "#ea580c",
//         bgColor: "#fff7ed",
//       },
//     ],
//   },
//   // {
//   //   label: "Technology",
//   //   icon: Microchip,
//   //   subitems: [
//   //     {
//   //       label: "Analog IP",
//   //       href: "/technology/analog-ip",
//   //       description: "Precision analog circuits",
//   //       icon: Shield,
//   //       color: "#2563eb",
//   //       bgColor: "#eff6ff",
//   //     },
//   //     {
//   //       label: "Digital IP",
//   //       href: "/technology/digital-ip",
//   //       description: "DSP and compute cores",
//   //       icon: Cpu,
//   //       color: "#7c3aed",
//   //       bgColor: "#f5f3ff",
//   //     },
//   //     {
//   //       label: "Mixed Signal",
//   //       href: "/technology/mixed-signal",
//   //       description: "Analog + Digital integration",
//   //       icon: GitBranch,
//   //       color: "#16a34a",
//   //       bgColor: "#f0fdf4",
//   //     },
//   //     {
//   //       label: "Embedded",
//   //       href: "/technology/embedded",
//   //       description: "ARM Cortex cores",
//   //       icon: Layers,
//   //       color: "#d97706",
//   //       bgColor: "#fffbeb",
//   //     },
//   //     {
//   //       label: "Connectivity",
//   //       href: "/technology/connectivity",
//   //       description: "SERDES & interfaces",
//   //       icon: Network,
//   //       color: "#0891b2",
//   //       bgColor: "#ecfeff",
//   //     },
//   //   ],
//   // },
//   {
//     label: "Company",
//     icon: Building,
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//         color: "#2563eb",
//         bgColor: "#eff6ff",
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//         color: "#d97706",
//         bgColor: "#fffbeb",
//       },
//       // {
//       //   label: "Vision",
//       //   href: "/vision",
//       //   description: "Our vision & roadmap",
//       //   icon: Eye,
//       //   color: "#7c3aed",
//       //   bgColor: "#f5f3ff",
//       // },
//       // {
//       //   label: "Careers",
//       //   href: "/careers",
//       //   description: "Join our team",
//       //   icon: Users,
//       //   tag: "Hiring",
//       //   color: "#16a34a",
//       //   bgColor: "#f0fdf4",
//       // },
//     ],
//   },
//   // { label: "Contact", href: "/contact", icon: Mail },
// ];

// /* ───────────────────────────
//    SPOTLIGHT HOOK
// ─────────────────────────── */
// function useSpotlight(ref: React.RefObject<HTMLElement>) {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 200, damping: 30 });
//   const sy = useSpring(y, { stiffness: 200, damping: 30 });

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const move = (e: MouseEvent) => {
//       const rect = el.getBoundingClientRect();
//       x.set(e.clientX - rect.left);
//       y.set(e.clientY - rect.top);
//     };
//     el.addEventListener("mousemove", move);
//     return () => el.removeEventListener("mousemove", move);
//   }, [ref, x, y]);

//   return { sx, sy };
// }

// /* ───────────────────────────
//    BENTO DROPDOWN
// ─────────────────────────── */
// function BentoDropdown({
//   item,
//   isActive,
// }: {
//   item: NavItem;
//   isActive: boolean;
// }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const timer = useRef<NodeJS.Timeout | null>(null);

//   const enter = () => {
//     if (timer.current) clearTimeout(timer.current);
//     setOpen(true);
//   };
//   const leave = () => {
//     timer.current = setTimeout(() => setOpen(false), 150);
//   };

//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", fn);
//     return () => document.removeEventListener("mousedown", fn);
//   }, []);

//   const subs = item.subitems ?? [];
//   const isFour = subs.length === 4;
//   const isFive = subs.length === 5;

//   return (
//     <div
//       ref={ref}
//       onMouseEnter={enter}
//       onMouseLeave={leave}
//       className="relative"
//     >
//       <button
//         aria-expanded={open}
//         className={`group relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${
//           isActive
//             ? "text-gray-900 bg-gray-900/8"
//             : "text-gray-500 hover:text-gray-900"
//         }`}
//         style={{ letterSpacing: "-0.01em" }}
//       >
//         {isActive && (
//           <motion.span
//             layoutId="nav-bg"
//             className="absolute inset-0 rounded-full bg-gray-900/6"
//             transition={{ type: "spring", stiffness: 400, damping: 35 }}
//           />
//         )}
//         <span className="relative z-10 whitespace-nowrap">{item.label}</span>
//         <motion.svg
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.25 }}
//           className="relative z-10 w-3.5 h-3.5"
//           viewBox="0 0 12 12"
//           fill="none"
//         >
//           <path
//             d="M2 4L6 8L10 4"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </motion.svg>
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 6, scale: 0.98 }}
//             transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
//           >
//             {/* tip arrow */}
//             <div className="flex justify-center mb-[-1px] relative z-10">
//               <div
//                 className="w-2.5 h-2.5 rotate-45 bg-white border-t border-l border-gray-200"
//                 style={{
//                   borderBottom: "none",
//                   borderRight: "none",
//                 }}
//               />
//             </div>

//             <div
//               className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl"
//               style={{
//                 minWidth: isFive ? 560 : isFour ? 480 : 400,
//               }}
//             >
//               {/* bento grid */}
//               <div
//                 className={`p-3 grid gap-2 ${
//                   isFive ? "grid-cols-2" : "grid-cols-2"
//                 }`}
//               >
//                 {subs.map((sub, idx) => {
//                   return (
//                     <Link
//                       key={idx}
//                       href={sub.href}
//                       onClick={() => setOpen(false)}
//                       className={`group/tile relative flex flex-col justify-between rounded-xl p-4 transition-all duration-200 overflow-hidden`}
//                       style={{
//                         background: sub.bgColor ?? "#f8fafc",
//                         border: "1px solid rgba(0,0,0,0.06)",
//                         minHeight: 108,
//                       }}
//                     >
//                       {/* hover overlay */}
//                       <div
//                         className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
//                         style={{ background: `${sub.color}08` }}
//                       />
//                       {/* border highlight */}
//                       <div
//                         className="absolute inset-0 rounded-xl opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
//                         style={{
//                           boxShadow: `inset 0 0 0 1.5px ${sub.color}30`,
//                         }}
//                       />

//                       <div className="relative z-10 flex items-start justify-between mb-3">
//                         <div
//                           className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover/tile:scale-110"
//                           style={{
//                             background: sub.color
//                               ? `${sub.color}15`
//                               : "#f1f5f9",
//                           }}
//                         >
//                           <sub.icon
//                             className="w-4.5 h-4.5"
//                             style={{ color: sub.color ?? "#64748b" }}
//                           />
//                         </div>
//                         {sub.tag && (
//                           <span
//                             className="text-[9px] font-bold tracking-wider px-2 py-1 rounded-full"
//                             style={{
//                               background: `${sub.color}18`,
//                               color: sub.color,
//                             }}
//                           >
//                             {sub.tag}
//                           </span>
//                         )}
//                       </div>

//                       <div className="relative z-10">
//                         <div className="flex items-center gap-1.5 mb-1">
//                           <p
//                             className="text-[13px] font-semibold text-gray-800 group-hover/tile:text-gray-900 leading-tight"
//                             style={{ letterSpacing: "-0.01em" }}
//                           >
//                             {sub.label}
//                           </p>
//                           <ArrowUpRight
//                             className="w-3 h-3 opacity-0 group-hover/tile:opacity-100 transition-all duration-200 -translate-x-1 group-hover/tile:translate-x-0"
//                             style={{ color: sub.color }}
//                           />
//                         </div>
//                         <p className="text-[11px] text-gray-400 leading-snug">
//                           {sub.description}
//                         </p>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>

//               {/* footer */}
//               <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
//                 <p className="text-[11px] text-gray-400">
//                   Explore {item.label}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ───────────────────────────
//    BOTTOM SHEET - MOBILE
// ─────────────────────────── */
// function BottomSheet({
//   open,
//   onClose,
//   isActive,
//   isParentActive,
// }: {
//   open: boolean;
//   onClose: () => void;
//   isActive: (h: string) => boolean;
//   isParentActive: (i: NavItem) => boolean;
// }) {
//   const [expanded, setExpanded] = useState<number | null>(null);
//   const sheetRef = useRef<HTMLDivElement>(null);
//   const y = useMotionValue(0);

//   const onDragEnd = () => {
//     if (y.get() > 120) onClose();
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-40 md:hidden"
//             style={{
//               background: "rgba(0,0,0,0.35)",
//               backdropFilter: "blur(6px)",
//             }}
//           />

//           <motion.div
//             ref={sheetRef}
//             style={{
//               y,
//               maxHeight: "85vh",
//             }}
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", damping: 32, stiffness: 240 }}
//             drag="y"
//             dragConstraints={{ top: 0, bottom: 400 }}
//             dragElastic={{ top: 0, bottom: 0.3 }}
//             onDragEnd={onDragEnd}
//             className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex flex-col bg-white rounded-3xl shadow-2xl"
//           >
//             {/* drag pill */}
//             <div className="flex justify-center pt-3 pb-1">
//               <div className="w-10 h-1 rounded-full bg-gray-200" />
//             </div>

//             {/* header */}
//             <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center">
//                   <Sparkles className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 <span className="text-[15px] font-bold text-gray-900">
//                   Menu
//                 </span>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <X className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>

//             {/* items */}
//             <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);
//                 const isExp = expanded === index;

//                 if (item.subitems) {
//                   return (
//                     <div
//                       key={index}
//                       className="rounded-2xl overflow-hidden border border-gray-100"
//                       style={{
//                         background: isExp ? "#fafafa" : "#fff",
//                       }}
//                     >
//                       <button
//                         onClick={() => setExpanded(isExp ? null : index)}
//                         className="w-full flex items-center justify-between px-4 py-3.5"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
//                               active || isExp ? "bg-gray-900" : "bg-gray-100"
//                             }`}
//                           >
//                             <item.icon
//                               className={`w-4 h-4 ${
//                                 active || isExp ? "text-white" : "text-gray-500"
//                               }`}
//                             />
//                           </div>
//                           <span className="text-[14px] font-semibold text-gray-800">
//                             {item.label}
//                           </span>
//                           {active && (
//                             <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
//                           )}
//                         </div>
//                         <motion.div
//                           animate={{ rotate: isExp ? 90 : 0 }}
//                           transition={{ duration: 0.22 }}
//                         >
//                           <ChevronRight className="w-4 h-4 text-gray-300" />
//                         </motion.div>
//                       </button>

//                       <AnimatePresence>
//                         {isExp && (
//                           <motion.div
//                             initial={{ height: 0 }}
//                             animate={{ height: "auto" }}
//                             exit={{ height: 0 }}
//                             transition={{ duration: 0.26 }}
//                             className="overflow-hidden"
//                           >
//                             <div className="px-4 pb-3 pt-1 grid grid-cols-2 gap-2">
//                               {item.subitems.map((sub, idx) => (
//                                 <Link
//                                   key={idx}
//                                   href={sub.href}
//                                   onClick={onClose}
//                                   className="group flex flex-col gap-2 p-3 rounded-xl transition-all border border-gray-100"
//                                   style={{
//                                     background: sub.bgColor ?? "#f8fafc",
//                                   }}
//                                 >
//                                   <div className="flex items-center justify-between">
//                                     <div
//                                       className="w-7 h-7 rounded-lg flex items-center justify-center"
//                                       style={{ background: `${sub.color}15` }}
//                                     >
//                                       <sub.icon
//                                         className="w-3.5 h-3.5"
//                                         style={{ color: sub.color }}
//                                       />
//                                     </div>
//                                     {sub.tag && (
//                                       <span
//                                         className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
//                                         style={{
//                                           background: `${sub.color}18`,
//                                           color: sub.color,
//                                         }}
//                                       >
//                                         {sub.tag}
//                                       </span>
//                                     )}
//                                   </div>
//                                   <p className="text-[11px] font-semibold text-gray-700 leading-tight">
//                                     {sub.label}
//                                   </p>
//                                 </Link>
//                               ))}
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     onClick={onClose}
//                     className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all border border-gray-100 ${
//                       active
//                         ? "bg-gray-900 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`w-9 h-9 rounded-xl flex items-center justify-center ${
//                         active ? "bg-white/15" : "bg-gray-100"
//                       }`}
//                     >
//                       <item.icon
//                         className={`w-4 h-4 ${
//                           active ? "text-white" : "text-gray-500"
//                         }`}
//                       />
//                     </div>
//                     <span className="text-[14px] font-semibold">
//                       {item.label}
//                     </span>
//                     {active && (
//                       <MoveRight className="w-3.5 h-3.5 ml-auto text-white/60" />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* CTA */}
//             <div className="px-5 pb-8 pt-3 border-t border-gray-100">
//               <Link href="/contact" onClick={onClose}>
//                 <motion.button
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gray-900 text-white text-[14px] font-bold transition-all hover:bg-gray-800"
//                 >
//                   Contact Us
//                 </motion.button>
//               </Link>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ───────────────────────────
//    MAIN NAVBAR
// ─────────────────────────── */
// export function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navRef = useRef<HTMLElement>(null);
//   const barRef = useRef<HTMLDivElement>(null);

//   /* spotlight */
//   const mouseX = useMotionValue(-999);
//   const mouseY = useMotionValue(-999);
//   const sx = useSpring(mouseX, { stiffness: 120, damping: 20 });
//   const sy = useSpring(mouseY, { stiffness: 120, damping: 20 });

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       const rect = barRef.current?.getBoundingClientRect();
//       if (!rect) return;
//       mouseX.set(e.clientX - rect.left);
//       mouseY.set(e.clientY - rect.top);
//     },
//     [mouseX, mouseY],
//   );

//   const handleMouseLeave = useCallback(() => {
//     mouseX.set(-999);
//     mouseY.set(-999);
//   }, [mouseX, mouseY]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", onScroll);

//     gsap.fromTo(
//       navRef.current,
//       { y: -80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.05 },
//     );
//     gsap.fromTo(
//       ".nav-link-item",
//       { opacity: 0, y: -6 },
//       {
//         opacity: 1,
//         y: 0,
//         stagger: 0.055,
//         duration: 0.5,
//         ease: "power2.out",
//         delay: 0.5,
//       },
//     );

//     const bar = barRef.current;
//     if (bar) {
//       bar.addEventListener("mousemove", handleMouseMove);
//       bar.addEventListener("mouseleave", handleMouseLeave);
//     }
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       if (bar) {
//         bar.removeEventListener("mousemove", handleMouseMove);
//         bar.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, [handleMouseMove, handleMouseLeave]);

//   const isActive = (href: string) =>
//     href === "/" ? pathname === href : pathname.startsWith(href);
//   const isParentActive = (item: NavItem) =>
//     item.subitems?.some((s) => pathname.startsWith(s.href)) ?? false;

//   // Logo path - using analog.PNG from public folder
//   const logoSrc = "/images/analog.PNG";

//   return (
//     <>
//       <div className="pt-[45px]">
//         <nav
//           ref={navRef}
//           className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4"
//         >
//           <div
//             ref={barRef}
//             className="relative w-full max-w-[1100px] flex items-center justify-between h-[52px] px-3 rounded-2xl transition-all duration-500 bg-white/90 backdrop-blur-xl"
//             style={{
//               border: "0.5px solid rgba(0,0,0,0.08)",
//               boxShadow: scrolled
//                 ? "0 8px 32px rgba(0,0,0,0.1)"
//                 : "0 4px 16px rgba(0,0,0,0.06)",
//             }}
//           >
//             {/* mouse spotlight */}
//             <motion.div
//               className="pointer-events-none absolute rounded-full"
//               style={{
//                 width: 300,
//                 height: 300,
//                 left: sx,
//                 top: sy,
//                 x: "-50%",
//                 y: "-50%",
//                 background:
//                   "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
//               }}
//             />

//             {/* LOGO */}
//             <Link
//               href="/"
//               className="nav-link-item group flex items-center gap-1 shrink-0 pl-1"
//             >
//               <div className="relative  rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ">
//                 {!logoError ? (
//                   <Image
//                     src={logoSrc}
//                     alt="AnalogChips"
//                     width={102}
//                     height={102}
//                     className="object-contain p-1 mt-2"
//                     onError={() => setLogoError(true)}
//                     unoptimized
//                   />
//                 ) : (
//                   <Sparkles className="w-4 h-4 text-white" />
//                 )}
//               </div>
//               <span
//                 className="hidden sm:block text-[15px] -ml-7 font-bold text-gray-900"
//                 style={{ letterSpacing: "-0.03em" }}
//               >
//                 AnalogChips
//               </span>
//             </Link>

//             {/* CENTER LINKS */}
//             <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-link-item">
//                       <BentoDropdown item={item} isActive={active} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className="nav-link-item relative group flex items-center px-3 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200"
//                     style={{
//                       color: active ? "#111" : "#6b7280",
//                       letterSpacing: "-0.01em",
//                     }}
//                   >
//                     {active && (
//                       <motion.span
//                         layoutId="nav-bg"
//                         className="absolute inset-0 rounded-full bg-gray-900/6"
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}
//                     <span className="relative z-10 whitespace-nowrap">
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-2 shrink-0 pr-1">
//               <Link href="/contact" className="hidden md:block nav-link-item">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all bg-gray-900"
//                   style={{
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//                     letterSpacing: "-0.01em",
//                   }}
//                 >
//                   Contact Us
//                 </motion.button>
//               </Link>

//               {/* Mobile burger */}
//               <motion.button
//                 whileTap={{ scale: 0.92 }}
//                 onClick={() => setMobileOpen(true)}
//                 className="md:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <Menu className="w-4.5 h-4.5 text-gray-700" />
//               </motion.button>
//             </div>
//           </div>
//         </nav>

//         <BottomSheet
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           isActive={isActive}
//           isParentActive={isParentActive}
//         />
//       </div>
//     </>
//   );
// }

///////////////////////////////////////
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import Lenis from "lenis";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   Sparkles,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Users,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
// } from "lucide-react";
// import gsap from "gsap";

// // Types
// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
// }

// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
// }

// // Theme color
// const THEME_COLOR = "#0393D3";

// // Navigation Data
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Product",
//     icon: Package,
//     subitems: [
//       {
//         label: "RF Beamformers",
//         href: "/products/rf-beamformers",
//         description: "Advanced phased array solutions",
//         icon: Radio,
//       },
//       {
//         label: "RF Front End Modules",
//         href: "/products/rf-front-end",
//         description: "Integrated RF solutions",
//         icon: Zap,
//       },
//       {
//         label: "Power & Clock Management",
//         href: "/products/power-management",
//         description: "Efficient power solutions",
//         icon: Battery,
//       },
//       {
//         label: "Microcontrollers",
//         href: "/products/microcontrollers",
//         description: "High-performance MCUs",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Silicon IP",
//     icon: Microchip,
//     subitems: [
//       {
//         label: "Multi-Protocol SERDES",
//         href: "/silicon-ip/serdes",
//         description: "112G PAM4 SerDes",
//         icon: Zap,
//       },
//       {
//         label: "Phase Locked Loop",
//         href: "/silicon-ip/pll",
//         description: "Ultra-low jitter PLL",
//         icon: Clock,
//       },
//       {
//         label: "Analog IPs",
//         href: "/silicon-ip/analog",
//         description: "Precision analog circuits",
//         icon: Shield,
//       },
//       {
//         label: "Digital IPs",
//         href: "/silicon-ip/digital",
//         description: "DSP and compute cores",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Company",
//     icon: Building,
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//       },
//       {
//         label: "Career",
//         href: "/careers",
//         description: "Join our team",
//         icon: Briefcase,
//       },
//     ],
//   },
//   { label: "Blogs", href: "/blog", icon: FileText },
//   { label: "Contact Us", href: "/contact", icon: Mail },
// ];

// // Simple Dropdown Component
// function SimpleDropdown({
//   item,
//   isActive,
// }: {
//   item: NavItem;
//   isActive: boolean;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 150);
//   };

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className="relative"
//       ref={dropdownRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <button
//         onClick={handleClick}
//         className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
//           isActive ? "text-[#0393D3]" : "text-slate-600 hover:text-slate-900"
//         }`}
//         aria-expanded={isOpen}
//       >
//         <item.icon
//           className={`w-4 h-4 transition-all duration-300 ${
//             isActive
//               ? "text-[#0393D3]"
//               : "text-slate-400 group-hover:text-[#0393D3]"
//           }`}
//         />
//         {item.label}
//         <ChevronDown
//           className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden z-50"
//           >
//             <div className="py-2">
//               {item.subitems?.map((subitem, idx) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
//                 >
//                   <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-[#0393D3]/10 transition-colors">
//                     <subitem.icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0393D3]" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-slate-700 group-hover:text-[#0393D3]">
//                       {subitem.label}
//                     </p>
//                     {subitem.description && (
//                       <p className="text-xs text-slate-400 mt-0.5">
//                         {subitem.description}
//                       </p>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Mobile Accordion Component
// function MobileAccordion({
//   item,
//   isActive,
//   index,
//   openAccordion,
//   setOpenAccordion,
// }: any) {
//   const isOpen = openAccordion === index;

//   return (
//     <div className="border-b border-slate-100 last:border-0">
//       <button
//         onClick={() => setOpenAccordion(isOpen ? null : index)}
//         className="w-full flex items-center justify-between px-4 py-4 text-left"
//       >
//         <div className="flex items-center gap-3">
//           <item.icon
//             className={`w-5 h-5 ${isActive ? "text-[#0393D3]" : "text-slate-500"}`}
//           />
//           <span
//             className={`text-sm font-medium ${isActive ? "text-[#0393D3]" : "text-slate-700"}`}
//           >
//             {item.label}
//           </span>
//         </div>
//         <ChevronDown
//           className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && item.subitems && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             <div className="pb-4 pl-12 space-y-2">
//               {item.subitems.map((subitem: any, idx: number) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   className="block py-2 text-sm text-slate-600 hover:text-[#0393D3] transition-colors"
//                   onClick={() => setOpenAccordion(null)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <subitem.icon className="w-3.5 h-3.5" />
//                     {subitem.label}
//                   </div>
//                   {subitem.description && (
//                     <p className="text-xs text-slate-400 mt-0.5 ml-5">
//                       {subitem.description}
//                     </p>
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Main Navbar Component
// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState<number | null>(null);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navbarRef = useRef<HTMLElement>(null);

//   // Initialize Lenis smooth scrolling
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // GSAP animation for navbar on load
//     gsap.fromTo(
//       navbarRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
//     );

//     // Stagger animation for nav items
//     gsap.fromTo(
//       ".nav-item-desktop",
//       { opacity: 0, y: -20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         stagger: 0.05,
//         delay: 0.3,
//         ease: "power2.out",
//       },
//     );

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === href;
//     return pathname.startsWith(href);
//   };

//   const isParentActive = (item: NavItem) => {
//     if (item.subitems) {
//       return item.subitems.some((sub) => pathname.startsWith(sub.href));
//     }
//     return false;
//   };

//   // const logoSrc =
//   //   "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   const logoSrc =
//     "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   return (
//     <div className="pt-14">
//       <nav
//         ref={navbarRef}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg"
//             : "bg-white/80 backdrop-blur-sm"
//         }`}
//       >
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[93vw]">
//           <div className="flex items-center justify-between h-16 ">
//             {/* Logo */}
//             <Link
//               href="/"
//               className="group flex items-center gap-2.5 font-bold text-xl lg:text-2xl"
//               onMouseEnter={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1.02,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//               onMouseLeave={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center">
//                   {!logoError ? (
//                     <Image
//                       src={logoSrc}
//                       alt="Analog Company Logo"
//                       width={48}
//                       height={48}
//                       className="object-contain p-1"
//                       onError={() => setLogoError(true)}
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-[#0393D3] to-[#0277b5] flex items-center justify-center">
//                       <Sparkles className="w-5 h-5 text-white" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <span className="hidden sm:inline bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Analog
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-2">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-item-desktop">
//                       <SimpleDropdown item={item} isActive={active} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className={`nav-item-desktop flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
//                       active
//                         ? "text-[#0393D3]"
//                         : "text-slate-600 hover:text-slate-900"
//                     }`}
//                   >
//                     <item.icon
//                       className={`w-4 h-4 transition-all duration-300 ${
//                         active
//                           ? "text-[#0393D3]"
//                           : "text-slate-400 group-hover:text-[#0393D3]"
//                       }`}
//                     />
//                     {item.label}
//                     {active && (
//                       <motion.div
//                         layoutId="activeNav"
//                         className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0393D3] rounded-full"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3 }}
//                       />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden relative w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle menu"
//               aria-expanded={isOpen}
//             >
//               <motion.div
//                 animate={{ rotate: isOpen ? 90 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {isOpen ? (
//                   <X className="w-5 h-5 text-slate-700" />
//                 ) : (
//                   <Menu className="w-5 h-5 text-slate-700" />
//                 )}
//               </motion.div>
//             </button>
//           </div>
//         </div>

//         {/* Animated background gradient */}
//         <div className="absolute inset-0 -z-10 pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0393D3]/10 rounded-full blur-3xl" />
//         </div>
//       </nav>

//       {/* Mobile Navigation Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40 md:hidden"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Sidebar Menu */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-slate-200">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-[#0393D3] to-[#0277b5] flex items-center justify-center">
//                     {!logoError ? (
//                       <Image
//                         src={logoSrc}
//                         alt="Analog Company Logo"
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                         onError={() => setLogoError(true)}
//                         unoptimized
//                       />
//                     ) : (
//                       <Sparkles className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                   <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Menu
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
//                 >
//                   <X className="w-5 h-5 text-slate-600" />
//                 </button>
//               </div>

//               {/* Navigation Items */}
//               <div className="flex-1 overflow-y-auto py-4">
//                 {navigationData.map((item, index) => {
//                   const active = item.href
//                     ? isActive(item.href)
//                     : isParentActive(item);

//                   if (item.subitems) {
//                     return (
//                       <MobileAccordion
//                         key={index}
//                         item={item}
//                         isActive={active}
//                         index={index}
//                         openAccordion={openAccordion}
//                         setOpenAccordion={setOpenAccordion}
//                       />
//                     );
//                   }

//                   return (
//                     <Link
//                       key={index}
//                       href={item.href!}
//                       className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-300 ${
//                         active
//                           ? "bg-gradient-to-r from-[#0393D3]/5 to-[#0393D3]/10 text-[#0393D3] border-r-4 border-[#0393D3]"
//                           : "text-slate-700 hover:bg-slate-50"
//                       }`}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <item.icon
//                         className={`w-5 h-5 ${active ? "text-[#0393D3]" : "text-slate-400"}`}
//                       />
//                       {item.label}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
//////////////////////////////////////////////////

// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import Lenis from "lenis";
// import {
//   Menu,
//   X,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   LogIn,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
//   ChevronRight,
//   Sparkles,
//   ArrowUpRight,
// } from "lucide-react";
// import gsap from "gsap";

// /* ─────────────────────────────
//    TYPES
// ───────────────────────────── */
// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
//   tag?: string;
//   stat?: string;
// }
// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
//   accent?: string;
// }

// /* ─────────────────────────────
//    DATA
// ───────────────────────────── */
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Product",
//     icon: Package,
//     accent: "#f97316",
//     subitems: [
//       {
//         label: "RF Beamformers",
//         href: "/products/rf-beamformers",
//         description: "Advanced phased array solutions",
//         icon: Radio,
//         tag: "NEW",
//         stat: "5G/6G Ready",
//       },
//       {
//         label: "RF Front End Modules",
//         href: "/products/rf-front-end",
//         description: "Integrated RF solutions",
//         icon: Zap,
//         stat: "< 2dB NF",
//       },
//       {
//         label: "Power & Clock Mgmt",
//         href: "/products/power-management",
//         description: "Efficient power solutions",
//         icon: Battery,
//         stat: "98% Eff.",
//       },
//       {
//         label: "Microcontrollers",
//         href: "/products/microcontrollers",
//         description: "High-performance MCUs",
//         icon: Cpu,
//         tag: "PRO",
//         stat: "1GHz+",
//       },
//     ],
//   },
//   {
//     label: "Silicon IP",
//     icon: Microchip,
//     accent: "#22d3ee",
//     subitems: [
//       {
//         label: "Multi-Protocol SERDES",
//         href: "/silicon-ip/serdes",
//         description: "112G PAM4 SerDes",
//         icon: Zap,
//         tag: "HOT",
//         stat: "112Gbps",
//       },
//       {
//         label: "Phase Locked Loop",
//         href: "/silicon-ip/pll",
//         description: "Ultra-low jitter PLL",
//         icon: Clock,
//         stat: "< 50fs RMS",
//       },
//       {
//         label: "Analog IPs",
//         href: "/silicon-ip/analog",
//         description: "Precision analog circuits",
//         icon: Shield,
//         stat: "16-bit ADC",
//       },
//       {
//         label: "Digital IPs",
//         href: "/silicon-ip/digital",
//         description: "DSP and compute cores",
//         icon: Cpu,
//         stat: "TSMC N3E",
//       },
//     ],
//   },
//   {
//     label: "Company",
//     icon: Building,
//     accent: "#a78bfa",
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//         stat: "Est. 2018",
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//         stat: "12 Leaders",
//       },
//       {
//         label: "Career",
//         href: "/careers",
//         description: "Join our team",
//         icon: Briefcase,
//         tag: "HIRING",
//         stat: "24 Roles",
//       },
//     ],
//   },
//   { label: "Blogs", href: "/blog", icon: FileText },
//   { label: "Contact Us", href: "/contact", icon: Mail },
// ];

// /* ─────────────────────────────
//    SPLIT-PANEL MEGA MENU
// ───────────────────────────── */
// function SplitMegaMenu({
//   item,
//   isActive,
// }: {
//   item: NavItem;
//   isActive: boolean;
// }) {
//   const [open, setOpen] = useState(false);
//   const [activeIdx, setActiveIdx] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const timer = useRef<NodeJS.Timeout | null>(null);
//   const accent = item.accent ?? "#f97316";

//   const enter = () => {
//     if (timer.current) clearTimeout(timer.current);
//     setOpen(true);
//   };
//   const leave = () => {
//     timer.current = setTimeout(() => setOpen(false), 160);
//   };

//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", fn);
//     return () => document.removeEventListener("mousedown", fn);
//   }, []);

//   const activeSub = item.subitems?.[activeIdx];

//   return (
//     <div
//       ref={ref}
//       onMouseEnter={enter}
//       onMouseLeave={leave}
//       className="relative"
//     >
//       <button
//         onClick={() => setOpen((v) => !v)}
//         aria-expanded={open}
//         className="group relative flex items-center gap-2 px-4 py-2 text-[12px] font-mono font-semibold tracking-[0.08em] uppercase transition-all duration-200"
//         style={{ color: open || isActive ? accent : "rgba(255,255,255,0.65)" }}
//       >
//         {/* left bracket */}
//         <span
//           className="text-[14px] font-light transition-all duration-200 opacity-0 group-hover:opacity-100"
//           style={{ color: accent }}
//         >
//           [
//         </span>
//         {item.label}
//         {/* right bracket */}
//         <span
//           className="text-[14px] font-light transition-all duration-200 opacity-0 group-hover:opacity-100"
//           style={{ color: accent }}
//         >
//           ]
//         </span>

//         {/* active dot */}
//         {isActive && (
//           <span
//             className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
//             style={{ background: accent }}
//           />
//         )}
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 12, scaleY: 0.94 }}
//             animate={{ opacity: 1, y: 0, scaleY: 1 }}
//             exit={{ opacity: 0, y: 8, scaleY: 0.96 }}
//             transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             style={{
//               transformOrigin: "top center",
//               filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
//             }}
//             className="absolute top-full left-1/2 -translate-x-1/2 mt-5 z-50 w-[680px]"
//           >
//             {/* connector line */}
//             <div className="flex justify-center">
//               <div
//                 className="w-px h-4"
//                 style={{
//                   background: `linear-gradient(to bottom, transparent, ${accent}60)`,
//                 }}
//               />
//             </div>

//             <div
//               className="relative overflow-hidden"
//               style={{
//                 background: "#0c0f14",
//                 border: `1px solid ${accent}25`,
//                 borderRadius: "4px",
//               }}
//             >
//               {/* scan-line top */}
//               <div
//                 className="absolute top-0 left-0 right-0 h-px"
//                 style={{
//                   background: `linear-gradient(to right, transparent, ${accent}80, transparent)`,
//                 }}
//               />

//               {/* corner brackets decoration */}
//               <div
//                 className="absolute top-2 left-2 w-3 h-3"
//                 style={{
//                   borderTop: `1px solid ${accent}60`,
//                   borderLeft: `1px solid ${accent}60`,
//                 }}
//               />
//               <div
//                 className="absolute top-2 right-2 w-3 h-3"
//                 style={{
//                   borderTop: `1px solid ${accent}60`,
//                   borderRight: `1px solid ${accent}60`,
//                 }}
//               />
//               <div
//                 className="absolute bottom-2 left-2 w-3 h-3"
//                 style={{
//                   borderBottom: `1px solid ${accent}60`,
//                   borderLeft: `1px solid ${accent}60`,
//                 }}
//               />
//               <div
//                 className="absolute bottom-2 right-2 w-3 h-3"
//                 style={{
//                   borderBottom: `1px solid ${accent}60`,
//                   borderRight: `1px solid ${accent}60`,
//                 }}
//               />

//               {/* header bar */}
//               <div
//                 className="flex items-center justify-between px-5 py-3 border-b"
//                 style={{
//                   borderColor: `${accent}18`,
//                   background: `${accent}06`,
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="w-5 h-5 rounded-sm flex items-center justify-center"
//                     style={{ background: accent }}
//                   >
//                     <item.icon className="w-3 h-3 text-black" />
//                   </div>
//                   <span
//                     className="font-mono text-[10px] tracking-[0.2em] uppercase"
//                     style={{ color: `${accent}99` }}
//                   >
//                     {item.label} — {item.subitems?.length} modules
//                   </span>
//                 </div>
//                 <span className="font-mono text-[9px] tracking-wider text-white/15">
//                   SYS:OK
//                 </span>
//               </div>

//               {/* body: left list + right detail */}
//               <div className="flex">
//                 {/* LEFT — item list */}
//                 <div
//                   className="w-[55%] p-3 space-y-0.5 border-r"
//                   style={{ borderColor: `${accent}12` }}
//                 >
//                   {item.subitems?.map((sub, idx) => (
//                     <Link
//                       key={idx}
//                       href={sub.href}
//                       onClick={() => setOpen(false)}
//                       onMouseEnter={() => setActiveIdx(idx)}
//                       className="group/row flex items-center gap-3 px-3 py-3 rounded-sm transition-all duration-150 relative overflow-hidden"
//                       style={{
//                         background:
//                           activeIdx === idx ? `${accent}10` : "transparent",
//                         borderLeft:
//                           activeIdx === idx
//                             ? `2px solid ${accent}`
//                             : "2px solid transparent",
//                       }}
//                     >
//                       {/* row number */}
//                       <span className="font-mono text-[9px] text-white/15 w-4 shrink-0">
//                         {String(idx + 1).padStart(2, "0")}
//                       </span>

//                       <div
//                         className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 transition-all duration-150"
//                         style={{
//                           background:
//                             activeIdx === idx
//                               ? `${accent}20`
//                               : "rgba(255,255,255,0.04)",
//                           border: `1px solid ${activeIdx === idx ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
//                         }}
//                       >
//                         <sub.icon
//                           className="w-3.5 h-3.5 transition-colors"
//                           style={{
//                             color:
//                               activeIdx === idx
//                                 ? accent
//                                 : "rgba(255,255,255,0.35)",
//                           }}
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2">
//                           <span
//                             className="text-[12.5px] font-semibold tracking-tight transition-colors"
//                             style={{
//                               color:
//                                 activeIdx === idx
//                                   ? "#fff"
//                                   : "rgba(255,255,255,0.65)",
//                             }}
//                           >
//                             {sub.label}
//                           </span>
//                           {sub.tag && (
//                             <span
//                               className="font-mono text-[8px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-sm"
//                               style={{
//                                 background: `${accent}22`,
//                                 color: accent,
//                               }}
//                             >
//                               {sub.tag}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       <ChevronRight
//                         className="w-3 h-3 shrink-0 transition-all duration-150"
//                         style={{
//                           color: activeIdx === idx ? accent : "transparent",
//                           transform:
//                             activeIdx === idx
//                               ? "translateX(0)"
//                               : "translateX(-4px)",
//                         }}
//                       />
//                     </Link>
//                   ))}
//                 </div>

//                 {/* RIGHT — detail panel */}
//                 <div className="w-[45%] p-5 flex flex-col justify-between">
//                   <AnimatePresence mode="wait">
//                     {activeSub && (
//                       <motion.div
//                         key={activeIdx}
//                         initial={{ opacity: 0, x: 8 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -8 }}
//                         transition={{ duration: 0.15 }}
//                         className="flex flex-col gap-4"
//                       >
//                         {/* icon large */}
//                         <div
//                           className="w-12 h-12 rounded-sm flex items-center justify-center"
//                           style={{
//                             background: `${accent}15`,
//                             border: `1px solid ${accent}30`,
//                           }}
//                         >
//                           <activeSub.icon
//                             className="w-6 h-6"
//                             style={{ color: accent }}
//                           />
//                         </div>

//                         {/* label */}
//                         <div>
//                           <div className="flex items-center gap-2 mb-1.5">
//                             <h3 className="text-[15px] font-bold text-white tracking-tight">
//                               {activeSub.label}
//                             </h3>
//                             {activeSub.tag && (
//                               <span
//                                 className="font-mono text-[8px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-sm"
//                                 style={{
//                                   background: `${accent}22`,
//                                   color: accent,
//                                 }}
//                               >
//                                 {activeSub.tag}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-[12px] leading-relaxed text-white/40">
//                             {activeSub.description}
//                           </p>
//                         </div>

//                         {/* stat chip */}
//                         {activeSub.stat && (
//                           <div
//                             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm w-fit"
//                             style={{
//                               background: "rgba(255,255,255,0.04)",
//                               border: "1px solid rgba(255,255,255,0.08)",
//                             }}
//                           >
//                             <span className="font-mono text-[9px] tracking-[0.12em] text-white/30 uppercase">
//                               Spec
//                             </span>
//                             <span
//                               className="font-mono text-[11px] font-bold"
//                               style={{ color: accent }}
//                             >
//                               {activeSub.stat}
//                             </span>
//                           </div>
//                         )}

//                         {/* CTA */}
//                         <Link
//                           href={activeSub.href}
//                           onClick={() => setOpen(false)}
//                           className="group/cta flex items-center gap-2 mt-auto"
//                         >
//                           <span
//                             className="font-mono text-[10px] tracking-[0.12em] uppercase transition-colors"
//                             style={{ color: `${accent}80` }}
//                           >
//                             Learn more
//                           </span>
//                           <ArrowUpRight
//                             className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
//                             style={{ color: `${accent}80` }}
//                           />
//                         </Link>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* scan-line bottom */}
//               <div
//                 className="absolute bottom-0 left-0 right-0 h-px"
//                 style={{
//                   background: `linear-gradient(to right, transparent, ${accent}30, transparent)`,
//                 }}
//               />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ─────────────────────────────
//    MOBILE DRAWER  (dark panel from left)
// ───────────────────────────── */
// function MobileDrawer({
//   open,
//   onClose,
//   isActive,
//   isParentActive,
// }: {
//   open: boolean;
//   onClose: () => void;
//   isActive: (h: string) => boolean;
//   isParentActive: (i: NavItem) => boolean;
// }) {
//   const [expanded, setExpanded] = useState<number | null>(null);

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-40 md:hidden"
//             style={{
//               background: "rgba(0,0,0,0.75)",
//               backdropFilter: "blur(4px)",
//             }}
//           />

//           <motion.div
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ type: "spring", damping: 30, stiffness: 250 }}
//             className="fixed left-0 top-0 bottom-0 z-50 md:hidden flex flex-col w-[310px]"
//             style={{
//               background: "#080b10",
//               borderRight: "1px solid rgba(255,255,255,0.07)",
//               fontFamily: "'JetBrains Mono', monospace",
//             }}
//           >
//             {/* top scan line */}
//             <div
//               className="absolute top-0 left-0 right-0 h-px"
//               style={{
//                 background:
//                   "linear-gradient(to right, #f9731640, #22d3ee40, transparent)",
//               }}
//             />

//             {/* header */}
//             <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
//               <div className="flex items-center gap-3">
//                 <div className="w-7 h-7 rounded-sm bg-[#f97316] flex items-center justify-center">
//                   <Sparkles className="w-3.5 h-3.5 text-black" />
//                 </div>
//                 <div>
//                   <p className="text-[13px] font-bold text-white tracking-tight">
//                     ANALOG
//                   </p>
//                   <p className="text-[8px] font-mono tracking-[0.2em] text-white/30 uppercase">
//                     Navigation
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="w-7 h-7 rounded-sm border border-white/10 flex items-center justify-center hover:border-white/20 transition-all"
//               >
//                 <X className="w-3.5 h-3.5 text-white/50" />
//               </button>
//             </div>

//             {/* status bar */}
//             <div className="px-5 py-2 border-b border-white/[0.04] flex items-center gap-2">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               <span className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase">
//                 System operational
//               </span>
//             </div>

//             {/* nav */}
//             <div className="flex-1 overflow-y-auto py-3">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);
//                 const isExp = expanded === index;
//                 const accent = item.accent ?? "#f97316";

//                 if (item.subitems) {
//                   return (
//                     <div key={index}>
//                       <button
//                         onClick={() => setExpanded(isExp ? null : index)}
//                         className="w-full flex items-center justify-between px-5 py-3.5 group transition-all duration-150 hover:bg-white/[0.03]"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="font-mono text-[9px] text-white/15">
//                             {String(index + 1).padStart(2, "0")}
//                           </span>
//                           <div
//                             className="w-7 h-7 rounded-sm flex items-center justify-center transition-all"
//                             style={{
//                               background:
//                                 isExp || active
//                                   ? `${accent}18`
//                                   : "rgba(255,255,255,0.04)",
//                               border: `1px solid ${isExp || active ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
//                             }}
//                           >
//                             <item.icon
//                               className="w-3.5 h-3.5 transition-colors"
//                               style={{
//                                 color:
//                                   isExp || active
//                                     ? accent
//                                     : "rgba(255,255,255,0.35)",
//                               }}
//                             />
//                           </div>
//                           <span
//                             className="font-mono text-[11px] tracking-[0.08em] uppercase font-semibold"
//                             style={{
//                               color:
//                                 active || isExp
//                                   ? "#fff"
//                                   : "rgba(255,255,255,0.5)",
//                             }}
//                           >
//                             {item.label}
//                           </span>
//                         </div>
//                         <motion.div
//                           animate={{ rotate: isExp ? 90 : 0 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <ChevronRight className="w-3.5 h-3.5 text-white/20" />
//                         </motion.div>
//                       </button>

//                       <AnimatePresence>
//                         {isExp && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.25 }}
//                             className="overflow-hidden"
//                           >
//                             <div
//                               className="mx-5 mb-2 rounded-sm overflow-hidden"
//                               style={{
//                                 background: "rgba(255,255,255,0.02)",
//                                 border: `1px solid ${accent}15`,
//                               }}
//                             >
//                               {item.subitems.map((sub, idx) => (
//                                 <Link
//                                   key={idx}
//                                   href={sub.href}
//                                   onClick={onClose}
//                                   className="group flex items-center gap-3 px-4 py-3 border-b last:border-0 transition-all hover:bg-white/[0.04]"
//                                   style={{
//                                     borderColor: "rgba(255,255,255,0.04)",
//                                   }}
//                                 >
//                                   <sub.icon className="w-3.5 h-3.5 shrink-0 text-white/25 group-hover:text-white/60 transition-colors" />
//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex items-center gap-1.5">
//                                       <span className="text-[12px] font-medium text-white/55 group-hover:text-white/90 transition-colors">
//                                         {sub.label}
//                                       </span>
//                                       {sub.tag && (
//                                         <span
//                                           className="font-mono text-[8px] px-1 py-0.5 rounded-sm"
//                                           style={{
//                                             background: `${accent}20`,
//                                             color: accent,
//                                           }}
//                                         >
//                                           {sub.tag}
//                                         </span>
//                                       )}
//                                     </div>
//                                     {sub.stat && (
//                                       <span className="font-mono text-[9px] text-white/20">
//                                         {sub.stat}
//                                       </span>
//                                     )}
//                                   </div>
//                                   <ArrowUpRight className="w-3 h-3 text-white/15 group-hover:text-white/40 transition-colors" />
//                                 </Link>
//                               ))}
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     onClick={onClose}
//                     className="flex items-center gap-3 px-5 py-3.5 transition-all hover:bg-white/[0.03] group"
//                     style={{
//                       borderLeft: active
//                         ? "2px solid #f97316"
//                         : "2px solid transparent",
//                     }}
//                   >
//                     <span className="font-mono text-[9px] text-white/15">
//                       {String(index + 1).padStart(2, "0")}
//                     </span>
//                     <div
//                       className="w-7 h-7 rounded-sm flex items-center justify-center"
//                       style={{
//                         background: active
//                           ? "rgba(249,115,22,0.15)"
//                           : "rgba(255,255,255,0.04)",
//                         border: `1px solid ${active ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)"}`,
//                       }}
//                     >
//                       <item.icon
//                         className="w-3.5 h-3.5"
//                         style={{
//                           color: active ? "#f97316" : "rgba(255,255,255,0.35)",
//                         }}
//                       />
//                     </div>
//                     <span
//                       className="font-mono text-[11px] tracking-[0.08em] uppercase font-semibold"
//                       style={{
//                         color: active ? "#fff" : "rgba(255,255,255,0.5)",
//                       }}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* footer */}
//             <div className="p-5 border-t border-white/[0.06]">
//               {/* <Link href="/admin" onClick={onClose}>
//                 <button
//                   className="w-full flex items-center justify-center gap-2.5 py-3 rounded-sm font-mono text-[11px] tracking-[0.1em] uppercase font-bold text-black transition-all hover:brightness-110"
//                   style={{
//                     background: "linear-gradient(135deg, #f97316, #fb923c)",
//                   }}
//                 >
//                   <LogIn className="w-3.5 h-3.5" />
//                   Login
//                 </button>
//               </Link> */}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ─────────────────────────────
//    TICKER
// ───────────────────────────── */
// function Ticker() {
//   const items = [
//     "112G SERDES",
//     "5G BEAMFORMER",
//     "N3E PDK",
//     "LOW-JITTER PLL",
//     "ANALOG IP",
//   ];
//   return (
//     <div
//       className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-sm border overflow-hidden"
//       style={{
//         background: "rgba(255,255,255,0.03)",
//         borderColor: "rgba(255,255,255,0.07)",
//         maxWidth: 200,
//       }}
//     >
//       <span className="font-mono text-[8px] tracking-[0.2em] text-emerald-400 shrink-0">
//         LIVE
//       </span>
//       <div className="overflow-hidden flex-1">
//         <motion.div
//           animate={{ x: ["0%", "-100%"] }}
//           transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
//           className="flex gap-8 whitespace-nowrap"
//         >
//           {[...items, ...items].map((t, i) => (
//             <span
//               key={i}
//               className="font-mono text-[9px] tracking-[0.1em] text-white/30"
//             >
//               {t}
//             </span>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────
//    MAIN NAVBAR
// ───────────────────────────── */
// export function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });
//     const raf = (t: number) => {
//       lenis.raf(t);
//       requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);
//     return () => lenis.destroy();
//   }, []);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);

//     gsap.fromTo(
//       navRef.current,
//       { y: -80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
//     );
//     gsap.fromTo(
//       ".nav-mono-item",
//       { opacity: 0, y: -8 },
//       {
//         opacity: 1,
//         y: 0,
//         stagger: 0.06,
//         duration: 0.4,
//         ease: "power2.out",
//         delay: 0.4,
//       },
//     );

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const isActive = (href: string) =>
//     href === "/" ? pathname === href : pathname.startsWith(href);
//   const isParentActive = (item: NavItem) =>
//     item.subitems?.some((s) => pathname.startsWith(s.href)) ?? false;

//   const logoSrc =
//     "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
//         .analog-tech { font-family: 'Inter', sans-serif; }
//         .mono { font-family: 'JetBrains Mono', monospace; }
//       `}</style>

//       <div className="pt-[64px]">
//         <nav
//           ref={navRef}
//           className="analog-tech fixed top-0 left-0 right-0 z-50 transition-all duration-400"
//           style={{
//             background: scrolled ? "rgba(6,8,12,0.97)" : "rgba(6,8,12,0.85)",
//             backdropFilter: "blur(20px)",
//             borderBottom: "1px solid rgba(255,255,255,0.055)",
//           }}
//         >
//           {/* top scan line */}
//           <motion.div
//             className="absolute top-0 left-0 right-0 h-px"
//             style={{
//               background:
//                 "linear-gradient(to right, transparent, rgba(249,115,22,0.6) 30%, rgba(34,211,238,0.6) 70%, transparent)",
//             }}
//             animate={{ opacity: [0.4, 0.8, 0.4] }}
//             transition={{ duration: 4, repeat: Infinity }}
//           />

//           <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
//             {/* ── LOGO ── */}
//             <Link
//               href="/"
//               className="group flex items-center gap-3 shrink-0"
//               onMouseEnter={(e) =>
//                 gsap.to(e.currentTarget, {
//                   scale: 1.03,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 })
//               }
//               onMouseLeave={(e) =>
//                 gsap.to(e.currentTarget, {
//                   scale: 1,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 })
//               }
//             >
//               <div
//                 className="relative w-9 h-9 flex items-center justify-center transition-all duration-300"
//                 style={{
//                   background: "rgba(249,115,22,0.1)",
//                   border: "1px solid rgba(249,115,22,0.35)",
//                   borderRadius: "2px",
//                 }}
//               >
//                 {!logoError ? (
//                   <Image
//                     src={logoSrc}
//                     alt="Analog"
//                     width={36}
//                     height={36}
//                     className="object-contain p-1"
//                     onError={() => setLogoError(true)}
//                     unoptimized
//                   />
//                 ) : (
//                   <Sparkles className="w-4 h-4 text-[#f97316]" />
//                 )}
//                 {/* corner ticks */}
//                 <span
//                   className="absolute -top-px -right-px w-1.5 h-1.5"
//                   style={{
//                     borderTop: "1px solid #f97316",
//                     borderRight: "1px solid #f97316",
//                   }}
//                 />
//                 <span
//                   className="absolute -bottom-px -left-px w-1.5 h-1.5"
//                   style={{
//                     borderBottom: "1px solid #f97316",
//                     borderLeft: "1px solid #f97316",
//                   }}
//                 />
//               </div>

//               <div className="hidden sm:block">
//                 <p className="mono text-[14px] font-bold text-white tracking-[0.05em] leading-none">
//                   ANALOG
//                 </p>
//                 <p
//                   className="mono text-[8px] font-medium tracking-[0.2em] leading-none mt-1"
//                   style={{ color: "rgba(249,115,22,0.7)" }}
//                 >
//                   SEMICONDUCTOR
//                 </p>
//               </div>
//             </Link>

//             {/* ── CENTER NAV ── */}
//             <div className="hidden md:flex items-center">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-mono-item">
//                       <SplitMegaMenu item={item} isActive={active} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className="nav-mono-item group relative flex items-center gap-1.5 px-4 py-2 font-mono font-semibold text-[12px] tracking-[0.08em] uppercase transition-all duration-200"
//                     style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
//                     onMouseEnter={(e) => {
//                       if (!active)
//                         (e.currentTarget as HTMLElement).style.color =
//                           "rgba(255,255,255,0.85)";
//                     }}
//                     onMouseLeave={(e) => {
//                       if (!active)
//                         (e.currentTarget as HTMLElement).style.color =
//                           "rgba(255,255,255,0.5)";
//                     }}
//                   >
//                     {active && (
//                       <motion.div
//                         layoutId="mono-active"
//                         className="absolute inset-x-2 -bottom-px h-px"
//                         style={{ background: "#f97316" }}
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}
//                     {item.label}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* ── RIGHT ── */}
//             <div className="flex items-center gap-3 shrink-0">
//               <Ticker />

//               {/* <Link href="/admin" className="hidden md:block">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.96 }}
//                   className="mono flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-black transition-all"
//                   style={{
//                     background: "linear-gradient(135deg, #f97316, #fb923c)",
//                     borderRadius: "2px",
//                     boxShadow: "0 0 20px rgba(249,115,22,0.25)",
//                   }}
//                 >
//                   <LogIn className="w-3.5 h-3.5" />
//                   Login
//                 </motion.button>
//               </Link> */}

//               {/* mobile burger */}
//               <motion.button
//                 whileTap={{ scale: 0.92 }}
//                 onClick={() => setMobileOpen(true)}
//                 className="md:hidden w-9 h-9 flex items-center justify-center transition-all"
//                 style={{
//                   background: "rgba(255,255,255,0.05)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <Menu className="w-4 h-4 text-white/60" />
//               </motion.button>
//             </div>
//           </div>
//         </nav>

//         {/* ── MOBILE DRAWER ── */}
//         <MobileDrawer
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           isActive={isActive}
//           isParentActive={isParentActive}
//         />
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import Lenis from "lenis";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   Sparkles,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   LogIn,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Users,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";

// // Types
// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
// }

// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
// }

// // Navigation Data
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Product",
//     icon: Package,
//     subitems: [
//       {
//         label: "RF Beamformers",
//         href: "/products/rf-beamformers",
//         description: "Advanced phased array solutions",
//         icon: Radio,
//       },
//       {
//         label: "RF Front End Modules",
//         href: "/products/rf-front-end",
//         description: "Integrated RF solutions",
//         icon: Zap,
//       },
//       {
//         label: "Power & Clock Management",
//         href: "/products/power-management",
//         description: "Efficient power solutions",
//         icon: Battery,
//       },
//       {
//         label: "Microcontrollers",
//         href: "/products/microcontrollers",
//         description: "High-performance MCUs",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Silicon IP",
//     icon: Microchip,
//     subitems: [
//       {
//         label: "Multi-Protocol SERDES",
//         href: "/silicon-ip/serdes",
//         description: "112G PAM4 SerDes",
//         icon: Zap,
//       },
//       {
//         label: "Phase Locked Loop",
//         href: "/silicon-ip/pll",
//         description: "Ultra-low jitter PLL",
//         icon: Clock,
//       },
//       {
//         label: "Analog IPs",
//         href: "/silicon-ip/analog",
//         description: "Precision analog circuits",
//         icon: Shield,
//       },
//       {
//         label: "Digital IPs",
//         href: "/silicon-ip/digital",
//         description: "DSP and compute cores",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Company",
//     icon: Building,
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//       },
//       {
//         label: "Career",
//         href: "/careers",
//         description: "Join our team",
//         icon: Briefcase,
//       },
//     ],
//   },
//   { label: "Blogs", href: "/blog", icon: FileText },
//   { label: "Contact Us", href: "/contact", icon: Mail },
// ];

// // Dropdown Component - Opens on both hover and click
// function Dropdown({
//   item,
//   isActive,
//   index,
// }: {
//   item: NavItem;
//   isActive: boolean;
//   index: number;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Handle hover enter
//   const handleMouseEnter = () => {
//     if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
//     setIsOpen(true);
//   };

//   // Handle hover leave
//   const handleMouseLeave = () => {
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 150);
//   };

//   // Handle click toggle
//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className="relative"
//       ref={dropdownRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <button
//         onClick={handleClick}
//         className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
//           isActive ? "text-orange-500" : "text-slate-600 hover:text-slate-900"
//         }`}
//         aria-expanded={isOpen}
//       >
//         <item.icon
//           className={`w-4 h-4 transition-all duration-300 ${
//             isActive
//               ? "text-orange-500"
//               : "text-slate-400 group-hover:text-orange-500"
//           }`}
//         />
//         {item.label}
//         <ChevronDown
//           className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
//           >
//             <div className="p-2">
//               {item.subitems?.map((subitem, idx) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 group"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
//                     <subitem.icon className="w-4 h-4 text-slate-500 group-hover:text-orange-500" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-700 group-hover:text-orange-500">
//                       {subitem.label}
//                     </p>
//                     <p className="text-xs text-slate-400 mt-0.5">
//                       {subitem.description}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Mobile Accordion Component
// function MobileAccordion({
//   item,
//   isActive,
//   index,
//   openAccordion,
//   setOpenAccordion,
// }: any) {
//   const isOpen = openAccordion === index;

//   return (
//     <div className="border-b border-slate-100 last:border-0">
//       <button
//         onClick={() => setOpenAccordion(isOpen ? null : index)}
//         className="w-full flex items-center justify-between px-4 py-4 text-left"
//       >
//         <div className="flex items-center gap-3">
//           <item.icon
//             className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-slate-500"}`}
//           />
//           <span
//             className={`text-sm font-medium ${isActive ? "text-orange-500" : "text-slate-700"}`}
//           >
//             {item.label}
//           </span>
//         </div>
//         <ChevronDown
//           className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && item.subitems && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             <div className="pb-4 pl-12 space-y-2">
//               {item.subitems.map((subitem: any, idx: number) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   className="block py-2 text-sm text-slate-600 hover:text-orange-500 transition-colors"
//                   onClick={() => setOpenAccordion(null)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <subitem.icon className="w-3.5 h-3.5" />
//                     {subitem.label}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Main Navbar Component
// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState<number | null>(null);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navbarRef = useRef<HTMLElement>(null);
//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   // Initialize Lenis smooth scrolling
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // GSAP animation for navbar on load
//     gsap.fromTo(
//       navbarRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
//     );

//     // Stagger animation for nav items
//     gsap.fromTo(
//       ".nav-item-desktop",
//       { opacity: 0, y: -20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         stagger: 0.05,
//         delay: 0.3,
//         ease: "power2.out",
//       },
//     );

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isOpen && mobileMenuRef.current) {
//       gsap.fromTo(
//         mobileMenuRef.current,
//         { opacity: 0, x: 50 },
//         { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
//       );
//     }
//   }, [isOpen]);

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === href;
//     return pathname.startsWith(href);
//   };

//   const isParentActive = (item: NavItem) => {
//     if (item.subitems) {
//       return item.subitems.some((sub) => pathname.startsWith(sub.href));
//     }
//     return false;
//   };

//   const logoSrc =
//     "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   return (
//     <div className="pt-16">
//       <nav
//         ref={navbarRef}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg"
//             : "bg-white/80 backdrop-blur-sm"
//         }`}
//       >
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[93vw]">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo with Image */}
//             <Link
//               href="/"
//               className="group flex items-center gap-2.5 font-bold text-xl lg:text-2xl"
//               onMouseEnter={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1.02,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//               onMouseLeave={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0  rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden  bg-white flex items-center justify-center">
//                   {!logoError ? (
//                     <Image
//                       src={logoSrc}
//                       alt="Analog Company Logo"
//                       width={48}
//                       height={48}
//                       className="object-contain p-1"
//                       onError={() => setLogoError(true)}
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
//                       <Sparkles className="w-5 h-5 text-white" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <span className="hidden sm:inline bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Analog
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-2">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-item-desktop">
//                       <Dropdown item={item} isActive={active} index={index} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className={`nav-item-desktop flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
//                       active
//                         ? "text-orange-500"
//                         : "text-slate-600 hover:text-slate-900"
//                     }`}
//                   >
//                     <item.icon
//                       className={`w-4 h-4 transition-all duration-300 ${
//                         active
//                           ? "text-orange-500"
//                           : "text-slate-400 group-hover:text-orange-500"
//                       }`}
//                     />
//                     {item.label}
//                     {active && (
//                       <motion.div
//                         layoutId="activeNav"
//                         className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3 }}
//                       />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//             <button></button>

//             {/* CTA Button */}
//             {/* <Link href={"/admin"} className="hidden md:flex items-center gap-4">
//               <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group text-sm">
//                 <span className="relative z-10 flex items-center gap-2">
//                   Login
//                   <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </Button>
//             </Link>*/}

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden relative w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle menu"
//               aria-expanded={isOpen}
//             >
//               <motion.div
//                 animate={{ rotate: isOpen ? 90 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {isOpen ? (
//                   <X className="w-5 h-5 text-slate-700" />
//                 ) : (
//                   <Menu className="w-5 h-5 text-slate-700" />
//                 )}
//               </motion.div>
//             </button>
//           </div>
//         </div>

//         {/* Animated background gradient */}
//         <div className="absolute inset-0 -z-10 pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
//         </div>
//       </nav>

//       {/* Mobile Navigation Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40 md:hidden"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Sidebar Menu */}
//             <motion.div
//               ref={mobileMenuRef}
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-slate-200">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
//                     {!logoError ? (
//                       <Image
//                         src={logoSrc}
//                         alt="Analog Company Logo"
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                         onError={() => setLogoError(true)}
//                         unoptimized
//                       />
//                     ) : (
//                       <Sparkles className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                   <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Menu
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
//                 >
//                   <X className="w-5 h-5 text-slate-600" />
//                 </button>
//               </div>

//               {/* Navigation Items */}
//               <div className="flex-1 overflow-y-auto py-4">
//                 {navigationData.map((item, index) => {
//                   const active = item.href
//                     ? isActive(item.href)
//                     : isParentActive(item);

//                   if (item.subitems) {
//                     return (
//                       <MobileAccordion
//                         key={index}
//                         item={item}
//                         isActive={active}
//                         index={index}
//                         openAccordion={openAccordion}
//                         setOpenAccordion={setOpenAccordion}
//                       />
//                     );
//                   }

//                   return (
//                     <Link
//                       key={index}
//                       href={item.href!}
//                       className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-300 ${
//                         active
//                           ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-500 border-r-4 border-orange-500"
//                           : "text-slate-700 hover:bg-slate-50"
//                       }`}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <item.icon
//                         className={`w-5 h-5 ${active ? "text-orange-500" : "text-slate-400"}`}
//                       />
//                       {item.label}
//                     </Link>
//                   );
//                 })}
//               </div>

//               {/* Footer */}
//               {/* <Link href={"/admin"} className="p-4 border-t border-slate-200">
//                 <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded shadow-lg text-sm">
//                   <span className="flex items-center justify-center gap-2">
//                     Login
//                     <LogIn className="w-4 h-4" />
//                   </span>
//                 </Button>
//               </Link> */}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import {
//   Menu,
//   X,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   LogIn,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
//   ArrowUpRight,
//   Sparkles,
//   MoveRight,
//   ChevronRight,
//   Car,
//   Wifi,
//   Factory,
//   Smartphone,
//   Lightbulb,
//   Users,
//   Eye,
//   Target,
//   Server,
//   Layers,
//   GitBranch,
//   Network,
// } from "lucide-react";
// import gsap from "gsap";

// /* ───────────────────────────
//    TYPES
// ─────────────────────────── */
// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
//   tag?: string;
//   color?: string;
//   bgColor?: string;
// }
// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
// }

// /* ───────────────────────────
//    DATA - REQUIRED NAVBAR ITEMS
// ─────────────────────────── */
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Products",
//     icon: Package,
//     subitems: [
//       {
//         label: "PMIC",
//         href: "/products/pmic",
//         description: "Power Management ICs",
//         icon: Battery,
//         tag: "Popular",
//         color: "#2563eb",
//         bgColor: "#eff6ff",
//       },
//       {
//         label: "ADC/DAC",
//         href: "/products/adc-dac",
//         description: "Data Converters",
//         icon: Radio,
//         color: "#d97706",
//         bgColor: "#fffbeb",
//       },
//       {
//         label: "SERDES",
//         href: "/products/serdes",
//         description: "Serializer/Deserializer",
//         icon: GitBranch,
//         color: "#16a34a",
//         bgColor: "#f0fdf4",
//       },
//       {
//         label: "Embedded Systems",
//         href: "/products/embedded",
//         description: "ARM Cortex Solutions",
//         icon: Layers,
//         color: "#7c3aed",
//         bgColor: "#f5f3ff",
//       },
//       {
//         label: "RF Solutions",
//         href: "/products/rf-solutions",
//         description: "RF Front End & Beamformers",
//         icon: Radio,
//         color: "#dc2626",
//         bgColor: "#fef2f2",
//       },
//     ],
//   },
//   {
//     label: "Industries",
//     icon: Building,
//     subitems: [
//       {
//         label: "Automotive",
//         href: "/industries/automotive",
//         description: "EV & ADAS Solutions",
//         icon: Car,
//         color: "#2563eb",
//         bgColor: "#eff6ff",
//       },
//       {
//         label: "Industrial",
//         href: "/industries/industrial",
//         description: "Factory Automation",
//         icon: Factory,
//         color: "#16a34a",
//         bgColor: "#f0fdf4",
//       },
//       {
//         label: "IoT",
//         href: "/industries/iot",
//         description: "Smart Connectivity",
//         icon: Wifi,
//         color: "#0891b2",
//         bgColor: "#ecfeff",
//       },
//       {
//         label: "Consumer Electronics",
//         href: "/industries/consumer",
//         description: "Smart Devices",
//         icon: Smartphone,
//         color: "#d97706",
//         bgColor: "#fffbeb",
//       },
//       {
//         label: "Smart Lighting",
//         href: "/industries/lighting",
//         description: "LED & Smart Controls",
//         icon: Lightbulb,
//         tag: "New",
//         color: "#ea580c",
//         bgColor: "#fff7ed",
//       },
//     ],
//   },
//   // {
//   //   label: "Technology",
//   //   icon: Microchip,
//   //   subitems: [
//   //     {
//   //       label: "Analog IP",
//   //       href: "/technology/analog-ip",
//   //       description: "Precision analog circuits",
//   //       icon: Shield,
//   //       color: "#2563eb",
//   //       bgColor: "#eff6ff",
//   //     },
//   //     {
//   //       label: "Digital IP",
//   //       href: "/technology/digital-ip",
//   //       description: "DSP and compute cores",
//   //       icon: Cpu,
//   //       color: "#7c3aed",
//   //       bgColor: "#f5f3ff",
//   //     },
//   //     {
//   //       label: "Mixed Signal",
//   //       href: "/technology/mixed-signal",
//   //       description: "Analog + Digital integration",
//   //       icon: GitBranch,
//   //       color: "#16a34a",
//   //       bgColor: "#f0fdf4",
//   //     },
//   //     {
//   //       label: "Embedded",
//   //       href: "/technology/embedded",
//   //       description: "ARM Cortex cores",
//   //       icon: Layers,
//   //       color: "#d97706",
//   //       bgColor: "#fffbeb",
//   //     },
//   //     {
//   //       label: "Connectivity",
//   //       href: "/technology/connectivity",
//   //       description: "SERDES & interfaces",
//   //       icon: Network,
//   //       color: "#0891b2",
//   //       bgColor: "#ecfeff",
//   //     },
//   //   ],
//   // },
//   {
//     label: "Company",
//     icon: Building,
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//         color: "#2563eb",
//         bgColor: "#eff6ff",
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//         color: "#d97706",
//         bgColor: "#fffbeb",
//       },
//       // {
//       //   label: "Vision",
//       //   href: "/vision",
//       //   description: "Our vision & roadmap",
//       //   icon: Eye,
//       //   color: "#7c3aed",
//       //   bgColor: "#f5f3ff",
//       // },
//       // {
//       //   label: "Careers",
//       //   href: "/careers",
//       //   description: "Join our team",
//       //   icon: Users,
//       //   tag: "Hiring",
//       //   color: "#16a34a",
//       //   bgColor: "#f0fdf4",
//       // },
//     ],
//   },
//   // { label: "Contact", href: "/contact", icon: Mail },
// ];

// /* ───────────────────────────
//    SPOTLIGHT HOOK
// ─────────────────────────── */
// function useSpotlight(ref: React.RefObject<HTMLElement>) {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 200, damping: 30 });
//   const sy = useSpring(y, { stiffness: 200, damping: 30 });

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const move = (e: MouseEvent) => {
//       const rect = el.getBoundingClientRect();
//       x.set(e.clientX - rect.left);
//       y.set(e.clientY - rect.top);
//     };
//     el.addEventListener("mousemove", move);
//     return () => el.removeEventListener("mousemove", move);
//   }, [ref, x, y]);

//   return { sx, sy };
// }

// /* ───────────────────────────
//    BENTO DROPDOWN
// ─────────────────────────── */
// function BentoDropdown({
//   item,
//   isActive,
// }: {
//   item: NavItem;
//   isActive: boolean;
// }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const timer = useRef<NodeJS.Timeout | null>(null);

//   const enter = () => {
//     if (timer.current) clearTimeout(timer.current);
//     setOpen(true);
//   };
//   const leave = () => {
//     timer.current = setTimeout(() => setOpen(false), 150);
//   };

//   useEffect(() => {
//     const fn = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", fn);
//     return () => document.removeEventListener("mousedown", fn);
//   }, []);

//   const subs = item.subitems ?? [];
//   const isFour = subs.length === 4;
//   const isFive = subs.length === 5;

//   return (
//     <div
//       ref={ref}
//       onMouseEnter={enter}
//       onMouseLeave={leave}
//       className="relative"
//     >
//       <button
//         aria-expanded={open}
//         className={`group relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${
//           isActive
//             ? "text-gray-900 bg-gray-900/8"
//             : "text-gray-500 hover:text-gray-900"
//         }`}
//         style={{ letterSpacing: "-0.01em" }}
//       >
//         {isActive && (
//           <motion.span
//             layoutId="nav-bg"
//             className="absolute inset-0 rounded-full bg-gray-900/6"
//             transition={{ type: "spring", stiffness: 400, damping: 35 }}
//           />
//         )}
//         <span className="relative z-10 whitespace-nowrap">{item.label}</span>
//         <motion.svg
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.25 }}
//           className="relative z-10 w-3.5 h-3.5"
//           viewBox="0 0 12 12"
//           fill="none"
//         >
//           <path
//             d="M2 4L6 8L10 4"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </motion.svg>
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 6, scale: 0.98 }}
//             transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
//           >
//             {/* tip arrow */}
//             <div className="flex justify-center mb-[-1px] relative z-10">
//               <div
//                 className="w-2.5 h-2.5 rotate-45 bg-white border-t border-l border-gray-200"
//                 style={{
//                   borderBottom: "none",
//                   borderRight: "none",
//                 }}
//               />
//             </div>

//             <div
//               className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl"
//               style={{
//                 minWidth: isFive ? 560 : isFour ? 480 : 400,
//               }}
//             >
//               {/* bento grid */}
//               <div
//                 className={`p-3 grid gap-2 ${
//                   isFive ? "grid-cols-2" : "grid-cols-2"
//                 }`}
//               >
//                 {subs.map((sub, idx) => {
//                   return (
//                     <Link
//                       key={idx}
//                       href={sub.href}
//                       onClick={() => setOpen(false)}
//                       className={`group/tile relative flex flex-col justify-between rounded-xl p-4 transition-all duration-200 overflow-hidden`}
//                       style={{
//                         background: sub.bgColor ?? "#f8fafc",
//                         border: "1px solid rgba(0,0,0,0.06)",
//                         minHeight: 108,
//                       }}
//                     >
//                       {/* hover overlay */}
//                       <div
//                         className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
//                         style={{ background: `${sub.color}08` }}
//                       />
//                       {/* border highlight */}
//                       <div
//                         className="absolute inset-0 rounded-xl opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
//                         style={{
//                           boxShadow: `inset 0 0 0 1.5px ${sub.color}30`,
//                         }}
//                       />

//                       <div className="relative z-10 flex items-start justify-between mb-3">
//                         <div
//                           className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover/tile:scale-110"
//                           style={{
//                             background: sub.color
//                               ? `${sub.color}15`
//                               : "#f1f5f9",
//                           }}
//                         >
//                           <sub.icon
//                             className="w-4.5 h-4.5"
//                             style={{ color: sub.color ?? "#64748b" }}
//                           />
//                         </div>
//                         {sub.tag && (
//                           <span
//                             className="text-[9px] font-bold tracking-wider px-2 py-1 rounded-full"
//                             style={{
//                               background: `${sub.color}18`,
//                               color: sub.color,
//                             }}
//                           >
//                             {sub.tag}
//                           </span>
//                         )}
//                       </div>

//                       <div className="relative z-10">
//                         <div className="flex items-center gap-1.5 mb-1">
//                           <p
//                             className="text-[13px] font-semibold text-gray-800 group-hover/tile:text-gray-900 leading-tight"
//                             style={{ letterSpacing: "-0.01em" }}
//                           >
//                             {sub.label}
//                           </p>
//                           <ArrowUpRight
//                             className="w-3 h-3 opacity-0 group-hover/tile:opacity-100 transition-all duration-200 -translate-x-1 group-hover/tile:translate-x-0"
//                             style={{ color: sub.color }}
//                           />
//                         </div>
//                         <p className="text-[11px] text-gray-400 leading-snug">
//                           {sub.description}
//                         </p>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>

//               {/* footer */}
//               <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
//                 <p className="text-[11px] text-gray-400">
//                   Explore {item.label}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ───────────────────────────
//    BOTTOM SHEET - MOBILE
// ─────────────────────────── */
// function BottomSheet({
//   open,
//   onClose,
//   isActive,
//   isParentActive,
// }: {
//   open: boolean;
//   onClose: () => void;
//   isActive: (h: string) => boolean;
//   isParentActive: (i: NavItem) => boolean;
// }) {
//   const [expanded, setExpanded] = useState<number | null>(null);
//   const sheetRef = useRef<HTMLDivElement>(null);
//   const y = useMotionValue(0);

//   const onDragEnd = () => {
//     if (y.get() > 120) onClose();
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-40 md:hidden"
//             style={{
//               background: "rgba(0,0,0,0.35)",
//               backdropFilter: "blur(6px)",
//             }}
//           />

//           <motion.div
//             ref={sheetRef}
//             style={{
//               y,
//               maxHeight: "85vh",
//             }}
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", damping: 32, stiffness: 240 }}
//             drag="y"
//             dragConstraints={{ top: 0, bottom: 400 }}
//             dragElastic={{ top: 0, bottom: 0.3 }}
//             onDragEnd={onDragEnd}
//             className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex flex-col bg-white rounded-3xl shadow-2xl"
//           >
//             {/* drag pill */}
//             <div className="flex justify-center pt-3 pb-1">
//               <div className="w-10 h-1 rounded-full bg-gray-200" />
//             </div>

//             {/* header */}
//             <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center">
//                   <Sparkles className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 <span className="text-[15px] font-bold text-gray-900">
//                   Menu
//                 </span>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <X className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>

//             {/* items */}
//             <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);
//                 const isExp = expanded === index;

//                 if (item.subitems) {
//                   return (
//                     <div
//                       key={index}
//                       className="rounded-2xl overflow-hidden border border-gray-100"
//                       style={{
//                         background: isExp ? "#fafafa" : "#fff",
//                       }}
//                     >
//                       <button
//                         onClick={() => setExpanded(isExp ? null : index)}
//                         className="w-full flex items-center justify-between px-4 py-3.5"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
//                               active || isExp ? "bg-gray-900" : "bg-gray-100"
//                             }`}
//                           >
//                             <item.icon
//                               className={`w-4 h-4 ${
//                                 active || isExp ? "text-white" : "text-gray-500"
//                               }`}
//                             />
//                           </div>
//                           <span className="text-[14px] font-semibold text-gray-800">
//                             {item.label}
//                           </span>
//                           {active && (
//                             <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
//                           )}
//                         </div>
//                         <motion.div
//                           animate={{ rotate: isExp ? 90 : 0 }}
//                           transition={{ duration: 0.22 }}
//                         >
//                           <ChevronRight className="w-4 h-4 text-gray-300" />
//                         </motion.div>
//                       </button>

//                       <AnimatePresence>
//                         {isExp && (
//                           <motion.div
//                             initial={{ height: 0 }}
//                             animate={{ height: "auto" }}
//                             exit={{ height: 0 }}
//                             transition={{ duration: 0.26 }}
//                             className="overflow-hidden"
//                           >
//                             <div className="px-4 pb-3 pt-1 grid grid-cols-2 gap-2">
//                               {item.subitems.map((sub, idx) => (
//                                 <Link
//                                   key={idx}
//                                   href={sub.href}
//                                   onClick={onClose}
//                                   className="group flex flex-col gap-2 p-3 rounded-xl transition-all border border-gray-100"
//                                   style={{
//                                     background: sub.bgColor ?? "#f8fafc",
//                                   }}
//                                 >
//                                   <div className="flex items-center justify-between">
//                                     <div
//                                       className="w-7 h-7 rounded-lg flex items-center justify-center"
//                                       style={{ background: `${sub.color}15` }}
//                                     >
//                                       <sub.icon
//                                         className="w-3.5 h-3.5"
//                                         style={{ color: sub.color }}
//                                       />
//                                     </div>
//                                     {sub.tag && (
//                                       <span
//                                         className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
//                                         style={{
//                                           background: `${sub.color}18`,
//                                           color: sub.color,
//                                         }}
//                                       >
//                                         {sub.tag}
//                                       </span>
//                                     )}
//                                   </div>
//                                   <p className="text-[11px] font-semibold text-gray-700 leading-tight">
//                                     {sub.label}
//                                   </p>
//                                 </Link>
//                               ))}
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     onClick={onClose}
//                     className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all border border-gray-100 ${
//                       active
//                         ? "bg-gray-900 text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`w-9 h-9 rounded-xl flex items-center justify-center ${
//                         active ? "bg-white/15" : "bg-gray-100"
//                       }`}
//                     >
//                       <item.icon
//                         className={`w-4 h-4 ${
//                           active ? "text-white" : "text-gray-500"
//                         }`}
//                       />
//                     </div>
//                     <span className="text-[14px] font-semibold">
//                       {item.label}
//                     </span>
//                     {active && (
//                       <MoveRight className="w-3.5 h-3.5 ml-auto text-white/60" />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* CTA */}
//             <div className="px-5 pb-8 pt-3 border-t border-gray-100">
//               <Link href="/contact" onClick={onClose}>
//                 <motion.button
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gray-900 text-white text-[14px] font-bold transition-all hover:bg-gray-800"
//                 >
//                   Contact Us
//                 </motion.button>
//               </Link>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ───────────────────────────
//    MAIN NAVBAR
// ─────────────────────────── */
// export function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navRef = useRef<HTMLElement>(null);
//   const barRef = useRef<HTMLDivElement>(null);

//   /* spotlight */
//   const mouseX = useMotionValue(-999);
//   const mouseY = useMotionValue(-999);
//   const sx = useSpring(mouseX, { stiffness: 120, damping: 20 });
//   const sy = useSpring(mouseY, { stiffness: 120, damping: 20 });

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       const rect = barRef.current?.getBoundingClientRect();
//       if (!rect) return;
//       mouseX.set(e.clientX - rect.left);
//       mouseY.set(e.clientY - rect.top);
//     },
//     [mouseX, mouseY],
//   );

//   const handleMouseLeave = useCallback(() => {
//     mouseX.set(-999);
//     mouseY.set(-999);
//   }, [mouseX, mouseY]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", onScroll);

//     gsap.fromTo(
//       navRef.current,
//       { y: -80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.05 },
//     );
//     gsap.fromTo(
//       ".nav-link-item",
//       { opacity: 0, y: -6 },
//       {
//         opacity: 1,
//         y: 0,
//         stagger: 0.055,
//         duration: 0.5,
//         ease: "power2.out",
//         delay: 0.5,
//       },
//     );

//     const bar = barRef.current;
//     if (bar) {
//       bar.addEventListener("mousemove", handleMouseMove);
//       bar.addEventListener("mouseleave", handleMouseLeave);
//     }
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       if (bar) {
//         bar.removeEventListener("mousemove", handleMouseMove);
//         bar.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, [handleMouseMove, handleMouseLeave]);

//   const isActive = (href: string) =>
//     href === "/" ? pathname === href : pathname.startsWith(href);
//   const isParentActive = (item: NavItem) =>
//     item.subitems?.some((s) => pathname.startsWith(s.href)) ?? false;

//   // Logo path - using analog.PNG from public folder
//   const logoSrc = "/images/analog.PNG";

//   return (
//     <>
//       <div className="pt-[45px]">
//         <nav
//           ref={navRef}
//           className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4"
//         >
//           <div
//             ref={barRef}
//             className="relative w-full max-w-[1100px] flex items-center justify-between h-[52px] px-3 rounded-2xl transition-all duration-500 bg-white/90 backdrop-blur-xl"
//             style={{
//               border: "0.5px solid rgba(0,0,0,0.08)",
//               boxShadow: scrolled
//                 ? "0 8px 32px rgba(0,0,0,0.1)"
//                 : "0 4px 16px rgba(0,0,0,0.06)",
//             }}
//           >
//             {/* mouse spotlight */}
//             <motion.div
//               className="pointer-events-none absolute rounded-full"
//               style={{
//                 width: 300,
//                 height: 300,
//                 left: sx,
//                 top: sy,
//                 x: "-50%",
//                 y: "-50%",
//                 background:
//                   "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
//               }}
//             />

//             {/* LOGO */}
//             <Link
//               href="/"
//               className="nav-link-item group flex items-center gap-1 shrink-0 pl-1"
//             >
//               <div className="relative  rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ">
//                 {!logoError ? (
//                   <Image
//                     src={logoSrc}
//                     alt="AnalogChips"
//                     width={102}
//                     height={102}
//                     className="object-contain p-1 mt-2"
//                     onError={() => setLogoError(true)}
//                     unoptimized
//                   />
//                 ) : (
//                   <Sparkles className="w-4 h-4 text-white" />
//                 )}
//               </div>
//               <span
//                 className="hidden sm:block text-[15px] -ml-7 font-bold text-gray-900"
//                 style={{ letterSpacing: "-0.03em" }}
//               >
//                 AnalogChips
//               </span>
//             </Link>

//             {/* CENTER LINKS */}
//             <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-link-item">
//                       <BentoDropdown item={item} isActive={active} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className="nav-link-item relative group flex items-center px-3 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200"
//                     style={{
//                       color: active ? "#111" : "#6b7280",
//                       letterSpacing: "-0.01em",
//                     }}
//                   >
//                     {active && (
//                       <motion.span
//                         layoutId="nav-bg"
//                         className="absolute inset-0 rounded-full bg-gray-900/6"
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}
//                     <span className="relative z-10 whitespace-nowrap">
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-2 shrink-0 pr-1">
//               <Link href="/contact" className="hidden md:block nav-link-item">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all bg-gray-900"
//                   style={{
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//                     letterSpacing: "-0.01em",
//                   }}
//                 >
//                   Contact Us
//                 </motion.button>
//               </Link>

//               {/* Mobile burger */}
//               <motion.button
//                 whileTap={{ scale: 0.92 }}
//                 onClick={() => setMobileOpen(true)}
//                 className="md:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <Menu className="w-4.5 h-4.5 text-gray-700" />
//               </motion.button>
//             </div>
//           </div>
//         </nav>

//         <BottomSheet
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           isActive={isActive}
//           isParentActive={isParentActive}
//         />
//       </div>
//     </>
//   );
// }

///////////////////////////////////////
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import Lenis from "lenis";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   Sparkles,
//   Home,
//   Info,
//   Package,
//   FileText,
//   Briefcase,
//   Mail,
//   Cpu,
//   Zap,
//   Shield,
//   Microchip,
//   Users,
//   Crown,
//   Radio,
//   Battery,
//   Clock,
//   Building,
// } from "lucide-react";
// import gsap from "gsap";

// // Types
// interface SubNavItem {
//   label: string;
//   href: string;
//   description?: string;
//   icon?: any;
// }

// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: any;
//   subitems?: SubNavItem[];
// }

// // Theme color
// const THEME_COLOR = "#0393D3";

// // Navigation Data
// const navigationData: NavItem[] = [
//   { label: "Home", href: "/", icon: Home },
//   {
//     label: "Product",
//     icon: Package,
//     subitems: [
//       {
//         label: "RF Beamformers",
//         href: "/products/rf-beamformers",
//         description: "Advanced phased array solutions",
//         icon: Radio,
//       },
//       {
//         label: "RF Front End Modules",
//         href: "/products/rf-front-end",
//         description: "Integrated RF solutions",
//         icon: Zap,
//       },
//       {
//         label: "Power & Clock Management",
//         href: "/products/power-management",
//         description: "Efficient power solutions",
//         icon: Battery,
//       },
//       {
//         label: "Microcontrollers",
//         href: "/products/microcontrollers",
//         description: "High-performance MCUs",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Silicon IP",
//     icon: Microchip,
//     subitems: [
//       {
//         label: "Multi-Protocol SERDES",
//         href: "/silicon-ip/serdes",
//         description: "112G PAM4 SerDes",
//         icon: Zap,
//       },
//       {
//         label: "Phase Locked Loop",
//         href: "/silicon-ip/pll",
//         description: "Ultra-low jitter PLL",
//         icon: Clock,
//       },
//       {
//         label: "Analog IPs",
//         href: "/silicon-ip/analog",
//         description: "Precision analog circuits",
//         icon: Shield,
//       },
//       {
//         label: "Digital IPs",
//         href: "/silicon-ip/digital",
//         description: "DSP and compute cores",
//         icon: Cpu,
//       },
//     ],
//   },
//   {
//     label: "Company",
//     icon: Building,
//     subitems: [
//       {
//         label: "About Us",
//         href: "/about",
//         description: "Our story and mission",
//         icon: Info,
//       },
//       {
//         label: "Leadership",
//         href: "/leadership",
//         description: "Meet our team",
//         icon: Crown,
//       },
//       {
//         label: "Career",
//         href: "/careers",
//         description: "Join our team",
//         icon: Briefcase,
//       },
//     ],
//   },
//   { label: "Blogs", href: "/blog", icon: FileText },
//   { label: "Contact Us", href: "/contact", icon: Mail },
// ];

// // Simple Dropdown Component
// function SimpleDropdown({
//   item,
//   isActive,
// }: {
//   item: NavItem;
//   isActive: boolean;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 150);
//   };

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className="relative"
//       ref={dropdownRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <button
//         onClick={handleClick}
//         className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
//           isActive ? "text-[#0393D3]" : "text-slate-600 hover:text-slate-900"
//         }`}
//         aria-expanded={isOpen}
//       >
//         <item.icon
//           className={`w-4 h-4 transition-all duration-300 ${
//             isActive
//               ? "text-[#0393D3]"
//               : "text-slate-400 group-hover:text-[#0393D3]"
//           }`}
//         />
//         {item.label}
//         <ChevronDown
//           className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden z-50"
//           >
//             <div className="py-2">
//               {item.subitems?.map((subitem, idx) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
//                 >
//                   <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-[#0393D3]/10 transition-colors">
//                     <subitem.icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0393D3]" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-slate-700 group-hover:text-[#0393D3]">
//                       {subitem.label}
//                     </p>
//                     {subitem.description && (
//                       <p className="text-xs text-slate-400 mt-0.5">
//                         {subitem.description}
//                       </p>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Mobile Accordion Component
// function MobileAccordion({
//   item,
//   isActive,
//   index,
//   openAccordion,
//   setOpenAccordion,
// }: any) {
//   const isOpen = openAccordion === index;

//   return (
//     <div className="border-b border-slate-100 last:border-0">
//       <button
//         onClick={() => setOpenAccordion(isOpen ? null : index)}
//         className="w-full flex items-center justify-between px-4 py-4 text-left"
//       >
//         <div className="flex items-center gap-3">
//           <item.icon
//             className={`w-5 h-5 ${isActive ? "text-[#0393D3]" : "text-slate-500"}`}
//           />
//           <span
//             className={`text-sm font-medium ${isActive ? "text-[#0393D3]" : "text-slate-700"}`}
//           >
//             {item.label}
//           </span>
//         </div>
//         <ChevronDown
//           className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && item.subitems && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             <div className="pb-4 pl-12 space-y-2">
//               {item.subitems.map((subitem: any, idx: number) => (
//                 <Link
//                   key={idx}
//                   href={subitem.href}
//                   className="block py-2 text-sm text-slate-600 hover:text-[#0393D3] transition-colors"
//                   onClick={() => setOpenAccordion(null)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <subitem.icon className="w-3.5 h-3.5" />
//                     {subitem.label}
//                   </div>
//                   {subitem.description && (
//                     <p className="text-xs text-slate-400 mt-0.5 ml-5">
//                       {subitem.description}
//                     </p>
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Main Navbar Component
// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState<number | null>(null);
//   const [logoError, setLogoError] = useState(false);
//   const pathname = usePathname();
//   const navbarRef = useRef<HTMLElement>(null);

//   // Initialize Lenis smooth scrolling
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // GSAP animation for navbar on load
//     gsap.fromTo(
//       navbarRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
//     );

//     // Stagger animation for nav items
//     gsap.fromTo(
//       ".nav-item-desktop",
//       { opacity: 0, y: -20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         stagger: 0.05,
//         delay: 0.3,
//         ease: "power2.out",
//       },
//     );

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === href;
//     return pathname.startsWith(href);
//   };

//   const isParentActive = (item: NavItem) => {
//     if (item.subitems) {
//       return item.subitems.some((sub) => pathname.startsWith(sub.href));
//     }
//     return false;
//   };

//   // const logoSrc =
//   //   "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   const logoSrc =
//     "https://images.seeklogo.com/logo-png/44/1/analogue-logo-png_seeklogo-449641.png";

//   return (
//     <div className="pt-14">
//       <nav
//         ref={navbarRef}
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg"
//             : "bg-white/80 backdrop-blur-sm"
//         }`}
//       >
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[93vw]">
//           <div className="flex items-center justify-between h-16 ">
//             {/* Logo */}
//             <Link
//               href="/"
//               className="group flex items-center gap-2.5 font-bold text-xl lg:text-2xl"
//               onMouseEnter={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1.02,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//               onMouseLeave={(e) => {
//                 gsap.to(e.currentTarget, {
//                   scale: 1,
//                   duration: 0.2,
//                   ease: "power2.out",
//                 });
//               }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center">
//                   {!logoError ? (
//                     <Image
//                       src={logoSrc}
//                       alt="Analog Company Logo"
//                       width={48}
//                       height={48}
//                       className="object-contain p-1"
//                       onError={() => setLogoError(true)}
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-[#0393D3] to-[#0277b5] flex items-center justify-center">
//                       <Sparkles className="w-5 h-5 text-white" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <span className="hidden sm:inline bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Analog
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-2">
//               {navigationData.map((item, index) => {
//                 const active = item.href
//                   ? isActive(item.href)
//                   : isParentActive(item);

//                 if (item.subitems) {
//                   return (
//                     <div key={index} className="nav-item-desktop">
//                       <SimpleDropdown item={item} isActive={active} />
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={index}
//                     href={item.href!}
//                     className={`nav-item-desktop flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
//                       active
//                         ? "text-[#0393D3]"
//                         : "text-slate-600 hover:text-slate-900"
//                     }`}
//                   >
//                     <item.icon
//                       className={`w-4 h-4 transition-all duration-300 ${
//                         active
//                           ? "text-[#0393D3]"
//                           : "text-slate-400 group-hover:text-[#0393D3]"
//                       }`}
//                     />
//                     {item.label}
//                     {active && (
//                       <motion.div
//                         layoutId="activeNav"
//                         className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0393D3] rounded-full"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3 }}
//                       />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden relative w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle menu"
//               aria-expanded={isOpen}
//             >
//               <motion.div
//                 animate={{ rotate: isOpen ? 90 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {isOpen ? (
//                   <X className="w-5 h-5 text-slate-700" />
//                 ) : (
//                   <Menu className="w-5 h-5 text-slate-700" />
//                 )}
//               </motion.div>
//             </button>
//           </div>
//         </div>

//         {/* Animated background gradient */}
//         <div className="absolute inset-0 -z-10 pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0393D3]/10 rounded-full blur-3xl" />
//         </div>
//       </nav>

//       {/* Mobile Navigation Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40 md:hidden"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Sidebar Menu */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-slate-200">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-[#0393D3] to-[#0277b5] flex items-center justify-center">
//                     {!logoError ? (
//                       <Image
//                         src={logoSrc}
//                         alt="Analog Company Logo"
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                         onError={() => setLogoError(true)}
//                         unoptimized
//                       />
//                     ) : (
//                       <Sparkles className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                   <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Menu
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
//                 >
//                   <X className="w-5 h-5 text-slate-600" />
//                 </button>
//               </div>

//               {/* Navigation Items */}
//               <div className="flex-1 overflow-y-auto py-4">
//                 {navigationData.map((item, index) => {
//                   const active = item.href
//                     ? isActive(item.href)
//                     : isParentActive(item);

//                   if (item.subitems) {
//                     return (
//                       <MobileAccordion
//                         key={index}
//                         item={item}
//                         isActive={active}
//                         index={index}
//                         openAccordion={openAccordion}
//                         setOpenAccordion={setOpenAccordion}
//                       />
//                     );
//                   }

//                   return (
//                     <Link
//                       key={index}
//                       href={item.href!}
//                       className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-300 ${
//                         active
//                           ? "bg-gradient-to-r from-[#0393D3]/5 to-[#0393D3]/10 text-[#0393D3] border-r-4 border-[#0393D3]"
//                           : "text-slate-700 hover:bg-slate-50"
//                       }`}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <item.icon
//                         className={`w-5 h-5 ${active ? "text-[#0393D3]" : "text-slate-400"}`}
//                       />
//                       {item.label}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  Package,
  FileText,
  Briefcase,
  Mail,
  Cpu,
  Zap,
  Shield,
  Microchip,
  Crown,
  Radio,
  Battery,
  Building,
  ChevronDown,
  Sparkles,
  Globe,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";

// Types
interface SubNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: any;
}

interface NavItem {
  label: string;
  href?: string;
  icon?: any;
  subitems?: SubNavItem[];
}

// Theme color
const THEME_COLOR = "#0393D3";

// Complete Navigation Data
const navigationData: NavItem[] = [
  { label: "Home", href: "/", icon: Home },

  {
    label: "Company",
    icon: Building,
    subitems: [
      {
        label: "About Us",
        href: "/about",
        description: "",
        icon: Info,
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "",
        icon: Crown,
      },
      {
        label: "Careers",
        href: "/careers",
        description: "",
        icon: Crown,
      },
    ],
  },
  { label: "Products", href: "/products", icon: Home },

  { label: "Market", href: "/market", icon: Globe },
  // { label: "Technology", href: "/technology", icon: TrendingUp },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

// Simple Dropdown Component
function SimpleDropdown({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-md font-medium transition-all duration-300 group ${
          isActive ? `text-[#F0B100]` : "text-slate-600 hover:text-slate-900"
        }`}
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50"
          >
            <div className="py-2">
              {item.subitems?.map((subitem, idx) => (
                <Link
                  key={idx}
                  href={subitem.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center border-b border-b-gray-200 gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 group-hover:text-[#F0B100]">
                      {subitem.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile Accordion Component
function MobileAccordion({
  item,
  isActive,
  index,
  openAccordion,
  setOpenAccordion,
}: any) {
  const isOpen = openAccordion === index;

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpenAccordion(isOpen ? null : index)}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <item.icon
            className={`w-5 h-5 ${isActive ? "text-[#F0B100]" : "text-slate-500"}`}
          />
          <span
            className={`text-sm font-medium ${isActive ? "text-[#F0B100]" : "text-slate-700"}`}
          >
            {item.label}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && item.subitems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-12 space-y-2">
              {item.subitems.map((subitem: any, idx: number) => (
                <Link
                  key={idx}
                  href={subitem.href}
                  className="block py-2 text-sm text-slate-600 hover:text-[#F0B100] transition-colors"
                  onClick={() => setOpenAccordion(null)}
                >
                  <div className="flex items-center gap-2">
                    <subitem.icon className="w-3.5 h-3.5" />
                    {subitem.label}
                  </div>
                  {subitem.description && (
                    <p className="text-xs text-slate-400 mt-0.5 ml-5">
                      {subitem.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Navbar Component
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP animation for navbar on load
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    // Stagger animation for nav items
    gsap.fromTo(
      ".nav-item-desktop",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.3,
        ease: "power2.out",
      },
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (item.subitems) {
      return item.subitems.some((sub) => pathname.startsWith(sub.href));
    }
    return false;
  };

  const logoSrc = "/images/act-final2.webp";

  return (
    <div className="pt-20">
      <nav
        ref={navbarRef}
        className={`fixed top-0 w-full border-b border-gray-50 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white backdrop-blur-sm"
        }`}
      >
        <div className=" sm:px-0 pr-3 sm:w-[96vw] mx-auto">
          <div className="flex items-center justify-between h-[5rem]">
            {/* Logo - Larger size, transparent background */}
            <Link href="/" className="group flex items-center shrink-0">
              <div className="relative">
                <div className="relative w-52 h-52    flex items-center justify-center">
                  {!logoError ? (
                    <Image
                      src={logoSrc}
                      alt="AnalogChips Logo"
                      width={200}
                      height={100}
                      className="object-contain mt-1 ml-1 mb-1 -ml-7 lg:-ml-10"
                      onError={() => setLogoError(true)}
                      unoptimized
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0393D3] to-[#0277b5] flex items-center justify-center rounded-lg">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - All items */}
            <div className="hidden md:flex sm:gap-x-6 items-center gap-1">
              {navigationData.map((item, index) => {
                const active = item.href
                  ? isActive(item.href)
                  : isParentActive(item);

                if (item.subitems) {
                  return (
                    <div key={index} className="nav-item-desktop">
                      <SimpleDropdown item={item} isActive={active} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href!}
                    className={`nav-item-desktop flex items-center gap-1.5 px-3 py-2 rounded-lg text-md font-medium transition-all duration-300  group relative ${
                      active
                        ? "text-[#F0B100]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#F0B100] rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-slate-700" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0393D3]/10 rounded-full blur-3xl" />
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {navigationData.map((item, index) => {
                  const active = item.href
                    ? isActive(item.href)
                    : isParentActive(item);

                  if (item.subitems) {
                    return (
                      <MobileAccordion
                        key={index}
                        item={item}
                        isActive={active}
                        index={index}
                        openAccordion={openAccordion}
                        setOpenAccordion={setOpenAccordion}
                      />
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href!}
                      className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-[#0393D3]/5 to-[#0393D3]/10 text-[#F0B100] border-r-4 border-[#0393D3]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon
                        className={`w-5 h-5 ${active ? "text-[#F0B100]" : "text-slate-400"}`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
