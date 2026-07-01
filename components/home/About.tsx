// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Sparkles, TrendingUp } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const cards = [
//   {
//     id: 1,
//     title: "Company Overview",
//     subtitle: "Who We Are",
//     description:
//       "AnalogChips Technology Pvt Ltd (ACT) develops Analog & Mixed-Signal Products and IP solutions that combine robust design methodologies, performance, and reliability to meet the evolving needs of modern electronic systems.",
//     longDescription:
//       "Our expertise spans the complete development cycle - from architecture and design to silicon realization and product deployment. By combining deep engineering expertise with a strong network of ecosystem partners, we translate system requirements into commercially deployable semiconductor solutions. Through indigenous technology development, we aim to strengthen the semiconductor ecosystem while delivering solutions that meet global quality and performance standards.",
//     image: "/images/company.jfif",
//     gradient: "from-blue-500 to-cyan-500",
//     lightGradient: "from-blue-50 to-cyan-50",
//     stats: "120+ Years",
//     metric: "Combined Experience",
//     strengths: [
//       "120+ Years of Combined Experience",
//       "Deep Analog & Mixed Signal Expertise",
//       "End-to-End Product Development",
//       "Indigenous Technology Development",
//     ],
//     layout: "left",
//     color: "blue",
//   },
//   {
//     id: 2,
//     title: "Our Vision",
//     subtitle: "Where We're Headed",
//     description:
//       '"Make in India by Design in India" — Enriching India Semiconductor Mission by successfully deploying Indian-owned Analog IPs and Products for domestic and overseas markets.',
//     longDescription:
//       'Our vision is to lead the "Make in India" movement through the power of "Design in India." We are committed to building world-class analog IP that originates from Indian engineering talent and serves global markets. By developing Indian-owned semiconductor intellectual property, we aim to establish India as a credible, high-quality source of analog design excellence on the global stage.',
//     image: "/images/vision.jfif",
//     gradient: "from-purple-500 to-pink-500",
//     lightGradient: "from-purple-50 to-pink-50",
//     stats: "Make in India",
//     metric: "Design in India",
//     layout: "right",
//     color: "purple",
//   },
//   {
//     id: 3,
//     title: "Our Mission",
//     subtitle: "Why We Exist",
//     description:
//       "Globally trusted partner for Analog IP solutions enabling seamless integration with full chip designs including SoCs and providing world class drop-in replacements for high performance Analog products.",
//     longDescription:
//       "We are dedicated to becoming a globally trusted partner for Analog IP solutions. Our mission is to enable seamless integration with full chip designs including SoCs and provide world-class drop-in replacements for high-performance Analog products. Through continuous innovation and deep engineering expertise, we deliver solutions that empower our customers to succeed in their markets.",
//     image: "/images/mission.jfif",
//     gradient: "from-emerald-500 to-teal-500",
//     lightGradient: "from-emerald-50 to-teal-50",
//     stats: "Global Trust",
//     metric: "Seamless Integration",
//     layout: "left",
//     color: "emerald",
//   },
// ];

// export function AboutSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const pinContainerRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     if (!sectionRef.current || !pinContainerRef.current) return;

//     const ctx = gsap.context(() => {
//       cardsRef.current.forEach((card, index) => {
//         if (!card) return;

//         const isLastCard = index === cardsRef.current.length - 1;

//         ScrollTrigger.create({
//           trigger: card,
//           start: "top top",
//           end: isLastCard ? "bottom top" : "+=100%",
//           pin: true,
//           pinSpacing: false,
//           scrub: 1,
//           id: `pin-${index}`,
//         });

//         ScrollTrigger.create({
//           trigger: card,
//           start: "top 80%",
//           end: "top 20%",
//           scrub: 0.8,
//           onUpdate: (self) => {
//             const progress = self.progress;

//             const imageEl = card.querySelector(".card-image");
//             if (imageEl) {
//               gsap.set(imageEl, {
//                 scale: 0.7 + progress * 0.3,
//                 opacity: 0.5 + progress * 0.5,
//                 rotateY: (1 - progress) * 15,
//               });
//             }

//             const titleEl = card.querySelector(".card-title");
//             if (titleEl) {
//               gsap.set(titleEl, {
//                 x: (1 - progress) * 50,
//                 opacity: progress,
//               });
//             }

//             const descEl = card.querySelector(".card-desc");
//             if (descEl) {
//               gsap.set(descEl, {
//                 x: (1 - progress) * 30,
//                 opacity: progress,
//               });
//             }

//             const statsEl = card.querySelectorAll(".card-stat");
//             statsEl.forEach((stat, i) => {
//               gsap.set(stat, {
//                 x: (1 - progress) * 20,
//                 opacity: progress,
//                 delay: i * 0.1,
//               });
//             });
//           },
//         });

//         if (isLastCard) {
//           ScrollTrigger.create({
//             trigger: card,
//             start: "top 50%",
//             end: "bottom 20%",
//             scrub: 1.5,
//             onUpdate: (self) => {
//               const progress = self.progress;
//               const scale = 1 - progress * 0.15;
//               const opacity = 1 - progress * 0.3;

//               gsap.set(card, {
//                 scale: Math.max(0.85, scale),
//                 opacity: Math.max(1, opacity),
//                 transformOrigin: "center center",
//               });
//             },
//           });
//         }
//       });
//     }, sectionRef);

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative font-['Instrument_Sans',sans-serif] bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/30 rounded-full blur-3xl" />

//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       {/* Section Header */}
//       <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
//         <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-sm mb-4">
//             <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
//               Our Journey
//             </span>
//           </div>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
//             <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
//               About AnalogChips
//             </span>
//           </h2>
//           <p className="text-base md:text-lg text-slate-600 max-w-2xl mt-2">
//             Precision analog solutions powering the future of electronics
//           </p>
//         </div>
//       </div>

//       {/* Pin Container */}
//       <div ref={pinContainerRef} className="relative bg-white">
//         {cards.map((card, index) => {
//           return (
//             <div
//               key={card.id}
//               ref={(el) => {
//                 cardsRef.current[index] = el;
//               }}
//               className="relative  min-h-screen w-full bg-white"
//             >
//               <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 w-full min-h-screen flex items-center">
//                 <div
//                   className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch w-full ${
//                     card.layout === "right" ? "lg:flex-row-reverse" : ""
//                   }`}
//                 >
//                   {/* Image Section */}
//                   <div
//                     className={`relative flex items-center ${card.layout === "right" ? "lg:order-2" : "lg:order-1"}`}
//                   >
//                     <div className="card-image relative w-full rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
//                       <Image
//                         src={card.image}
//                         alt={card.title}
//                         fill
//                         className="object-cover"
//                       />
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-r ${card.gradient} mix-blend-multiply opacity-20`}
//                       />

//                       {/* Floating Badge */}
//                       <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white shadow-lg z-10">
//                         <span className="text-xs font-bold text-slate-800">
//                           {card.stats}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div
//                     className={`flex flex-col justify-center ${card.layout === "right" ? "lg:order-1" : "lg:order-2"}`}
//                   >
//                     <div className="space-y-4">
//                       {/* Badge */}
//                       <div className="flex items-center gap-2.5">
//                         <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
//                           <span className="text-xs font-semibold text-slate-600">
//                             {card.subtitle}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Title */}
//                       <h3 className="card-title text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
//                         {card.title}
//                       </h3>

//                       {/* Description */}
//                       <p className="card-desc text-base md:text-lg text-slate-600 leading-relaxed">
//                         {card.description}
//                       </p>

//                       {/* Long Description */}
//                       <p className="text-sm md:text-base text-slate-500 leading-relaxed">
//                         {card.longDescription}
//                       </p>

//                       {/* Strengths Section - Only for Company Overview */}
//                       {card.strengths && (
//                         <div className="grid grid-cols-2 gap-3 mb-12 pt-3">
//                           {card.strengths.map((strength, idx) => (
//                             <div
//                               key={idx}
//                               className="card-stat p-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
//                             >
//                               <p className="text-sm font-bold text-slate-900">
//                                 {strength}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Bottom Fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
//     </section>
//   );
// }

"use client";

import { Sparkles, TrendingUp } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Company Overview",
    subtitle: "Who We Are",
    description:
      "AnalogChips Technology Pvt Ltd (ACT) develops Analog & Mixed-Signal Products and IP solutions that combine robust design methodologies, performance, and reliability to meet the evolving needs of modern electronic systems.",
    longDescription:
      "Our expertise spans the complete development cycle - from architecture and design to silicon realization and product deployment. By combining deep engineering expertise with a strong network of ecosystem partners, we translate system requirements into commercially deployable semiconductor solutions. Through indigenous technology development, we aim to strengthen the semiconductor ecosystem while delivering solutions that meet global quality and performance standards.",
    color: "blue",
  },
  {
    id: 2,
    title: "Our Vision",
    subtitle: "Where We're Headed",
    bold: `"Make in India by Design in India"`,
    description:
      "— Enriching India Semiconductor Mission by successfully deploying Indian-owned Analog IPs and Products for domestic and overseas markets.",
    color: "purple",
  },
  {
    id: 3,
    title: "Our Mission",
    subtitle: "Why We Exist",
    description:
      "Be a globally trusted partner for Analog & Mixed Signal IP solutions enabling seamless integration with full chip designs including SoCs and providing world class drop-in replacements for high performance Analog products.",
    color: "emerald",
  },
];

const strengths = [
  "120+ Years of Combined Experience",
  "Analog & Mixed Signal Expertise",
  "End-to-End Product Development",
  "Indigenous Technology Development",
];

export function AboutSection() {
  return (
    <section className="relative font-[font1] bg-white pb-16 pt-2 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100/30 rounded-full blur-3xl" />
      </div>

      {/* Company Overview - Full Width */}
      <div className="max-w-7xl mx-auto   ">
        <div className="bg-white  border-slate-100 p-5 md:p-10 lg:p-6">
          <h3 className="text-2xl md:text-4xl font-bold  text-[#F0B100] mb-5">
            Company Overview
          </h3>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4">
            <b>AnalogChips Technology Pvt Ltd (ACT)</b> develops Analog &
            Mixed-Signal Products and IP solutions that combine robust design
            methodologies, performance, and reliability to meet the evolving
            needs of modern electronic systems.
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4">
            Our expertise spans the complete development cycle - from
            architecture and design to silicon realization and product
            deployment. By combining deep engineering expertise with a strong
            network of ecosystem partners, we translate system requirements into
            commercially deployable semiconductor solutions. Through indigenous
            technology development, we aim to strengthen the semiconductor
            ecosystem while delivering solutions that meet global quality and
            performance standards.
          </p>

          {/* Strengths - Bullet Points */}
          <div className="mt-5 flex flex-wrap flex-col md:grid md:grid-cols-2  ">
            {strengths.map((strength, idx) => (
              <div key={idx} className="flex items-center gap-2 py-2 ">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm md:text-lg font-medium text-slate-700">
                  {strength}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission - 2 Cards in One Row */}
      <div className="max-w-7xl  px-4 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {cards.slice(1).map((card, i) => (
            <div
              key={card.id}
              className={`bg-white  ${i == 0 && "md:border-r"} px-3   `}
            >
              <div className="flex items-center gap-2.5 mb-3"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#F0B100] mb-4">
                {card.title}
              </h3>
              <p className=" md:text-lg text-slate-600 leading-relaxed">
                <b>{card.bold && card.bold}</b>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
