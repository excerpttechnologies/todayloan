// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { CheckCircle, Cpu, Zap } from "lucide-react";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

// const features = [
//   {
//     text: "Globally Competitive",
//   },
//   {
//     text: "Customer Focused",
//   },
//   {
//     text: "Indigenous Innovation",
//   },
//   {
//     text: "Quality & Compliance",
//   },
//   {
//     text: "Manufacturing Excellence",
//   },
//   {
//     text: "Building Self-Reliance",
//   },
// ];

// export default function AboutPage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 },
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main className="bg-white">
//         {/* Section 1: Full Width Dark Navy Banner */}
//         <section className="relative bg-gradient-to-br from-[#0F2747] via-[#1a3a5e] to-[#0F2747] overflow-hidden">
//           {/* Geometric Abstract Background Shapes */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B5F8A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//             <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3B5F8A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B5F8A]/5 rounded-full blur-3xl" />

//             {/* Grid Pattern */}
//             <div
//               className="absolute inset-0 opacity-[0.03]"
//               style={{
//                 backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
//                 backgroundSize: "40px 40px",
//               }}
//             />

//             {/* Circuit Lines Decoration */}
//             <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
//               <line
//                 x1="10%"
//                 y1="20%"
//                 x2="30%"
//                 y2="40%"
//                 stroke="white"
//                 strokeWidth="1"
//               />
//               <line
//                 x1="30%"
//                 y1="40%"
//                 x2="50%"
//                 y2="35%"
//                 stroke="white"
//                 strokeWidth="1"
//               />
//               <line
//                 x1="50%"
//                 y1="35%"
//                 x2="70%"
//                 y2="50%"
//                 stroke="white"
//                 strokeWidth="1"
//               />
//               <line
//                 x1="70%"
//                 y1="50%"
//                 x2="90%"
//                 y2="30%"
//                 stroke="white"
//                 strokeWidth="1"
//               />
//               <circle cx="10%" cy="20%" r="3" fill="white" opacity="0.3" />
//               <circle cx="30%" cy="40%" r="3" fill="white" opacity="0.3" />
//               <circle cx="50%" cy="35%" r="3" fill="white" opacity="0.3" />
//               <circle cx="70%" cy="50%" r="3" fill="white" opacity="0.3" />
//               <circle cx="90%" cy="30%" r="3" fill="white" opacity="0.3" />
//             </svg>
//           </div>

//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
//             <div className="py-16  text-center">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
//                 About Us
//               </h1>
//             </div>
//           </div>
//         </section>

//         {/* Section 2: Company Overview */}
//         <section className="py-20 bg-white">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div
//               ref={sectionRef}
//               className={`space-y-6 transition-all duration-1000 transform ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               <p className="text-[16px] leading-[1.8] text-[#555555]">
//                 AnalogChips Technology Pvt Ltd (ACT) is a Bangalore-based
//                 fabless semiconductor company specializing in Analog &
//                 Mixed-Signal Products and IP solutions including Power
//                 Management, Data Converters, Sensors & Interface circuits for
//                 industrial, consumer, automotive, defense, and space
//                 applications.
//               </p>
//               <p className="text-[16px] leading-[1.8] text-[#555555]">
//                 Founded in 2026 by industry professionals and startup
//                 entrepreneurs, ACT brings together over 120 years of combined
//                 experience in analog design and semiconductor product
//                 development. Our team has a proven track record of delivering
//                 silicon-proven IPs and products across multiple technology
//                 nodes, consistently achieving high success rate of first-pass
//                 silicon. These IPs and products are successfully deployed in the
//                 market by the end customers.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Section 3: Two Column Layout */}
//         <section className="py-20 bg-white">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div
//               ref={contentRef}
//               className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-1000 delay-300 transform ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               {/* Left Column - Image */}
//               <div className="relative group">
//                 <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
//                   <Image
//                     src="/images/about-analog.jfif"
//                     alt="Semiconductor Technology"
//                     width={600}
//                     height={500}
//                     className="w-full h-auto object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2747]/20 to-transparent" />
//                 </div>
//                 {/* Tech Accent Lines */}
//                 <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-[#3B5F8A]/20 rounded-xl" />
//                 <div className="absolute -top-3 -left-3 w-24 h-24 border-2 border-[#3B5F8A]/20 rounded-xl" />
//               </div>

//               {/* Right Column - Content */}
//               <div className="space-y-8">
//                 <h2 className="text-[36px] font-bold text-[#3B5F8A] leading-tight">
//                   Made in India for the World!
//                 </h2>

//                 <div className="space-y-4 text-[#666666] leading-[1.8]">
//                   <p>
//                     At AnalogChips Technology, we take pride in designing and
//                     developing world-class semiconductor solutions in India for
//                     global markets. With a strong focus on innovation, quality,
//                     and reliability, we create high-performance analog and
//                     mixed-signal chipsets that power advanced applications
//                     across industries.
//                   </p>
//                   <p>
//                     Our expertise, combined with strategic partnerships, enables
//                     us to deliver cutting-edge technology that meets the highest
//                     international standards.
//                   </p>
//                 </div>

//                 {/* Feature List - 2 Columns */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-3 group cursor-default"
//                     >
//                       <div className="w-9 h-9 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
//                         <CheckCircle className="w-5 h-5 text-[#0F2747]" />
//                       </div>
//                       <span className="text-sm font-medium text-[#1A1A1A]">
//                         {feature.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle, Cpu, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    text: "Globally Competitive",
  },
  {
    text: "Customer Focused",
  },
  {
    text: "Indigenous Innovation",
  },
  {
    text: "Quality & Compliance",
  },
  {
    text: "Manufacturing Excellence",
  },
  {
    text: "Building Self-Reliance",
  },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <Navbar />
      <main className="bg-white font-[font1]">
        {/* Section 1: Full Width Dark Navy Banner */}
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
                About Us
              </h1>
            </div>
          </div>
        </section>

        {/* Section 2: Company Overview */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div
              ref={sectionRef}
              className={`space-y-6 transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-[16px] leading-[1.8] text-[#555555]">
                <b>AnalogChips Technology Pvt Ltd (ACT)</b> is a Bangalore-based
                fabless semiconductor company specializing in Analog &
                Mixed-Signal Products and IP solutions including Power
                Management, Data Converters, Sensors & Interface circuits for
                industrial, consumer, automotive, defense, and space
                applications.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#555555]">
                Founded in 2026 by industry professionals and startup
                entrepreneurs, ACT brings together over 120 years of combined
                experience in analog design and semiconductor product
                development. Our team has a proven track record of delivering
                silicon-proven IPs and products across multiple technology
                nodes, consistently achieving high success rate of first-pass
                silicon. These IPs and products are successfully deployed in the
                market by the end customers. The team has experience across
                process technologies ranging from 350nm to advanced 3nm nodes,
                working with leading foundries including TSMC, Global Foundries,
                TowerJazz, Dongbu, TI, Intel and other proprietary foundries.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#555555]">
                For end-to-end product realization, ACT has established
                strategic partnerships across the semiconductor ecosystem,
                including foundry, assembly, packaging, testing and
                qualification providers.
              </p>
              <p className="text-[16px] leading-[1.8] text-[#555555]">
                ACT is committed to contributing to India's growing
                semiconductor ecosystem, supporting the broader objectives of
                the India Semiconductor Mission (ISM).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Two Column Layout */}
        <section className="py-0 pb-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div
              ref={contentRef}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Left Column - Image */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <Image
                    src="/images/about-analog.webp"
                    alt="Semiconductor Technology"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2747]/20 to-transparent" />
                </div>
                {/* Tech Accent Lines */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-[#3B5F8A]/20 rounded-xl" />
                <div className="absolute -top-3 -left-3 w-24 h-24 border-2 border-[#3B5F8A]/20 rounded-xl" />
              </div>

              {/* Right Column - Content */}
              <div className="space-y-8">
                <h2 className="text-[36px] font-bold text-[#F0B100] leading-tight">
                  Our Focus Areas
                </h2>

                {/* Feature List - 2 Columns */}
                <div className="grid grid-cols-1  gap-4 pt-2">
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-[#0F2747]" />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      Power Management ICs (PMICs)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-[#0F2747]" />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      Load Switches & Protection Devices
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-[#0F2747]" />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      Data Converters
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-[#0F2747]" />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      Sensors & Interface Circuits
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-[#FFB6B6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-[#0F2747]" />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      Custom Analog IPs
                    </span>
                  </div>
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
