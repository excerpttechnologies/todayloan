"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ChevronLeft,
  ChevronRight,
  Shield,
  Cpu,
  CircuitBoard,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// Slider content array with background images
const sliderContent = [
  {
    id: 1,
    title: "Design in India.",
    title2: "Make in India.",
    title3: "Deliver worldwide.",
    subtitle:
      "Deliver globally competitive Analog & Mixed Signal IPs and semiconductor solutions that serve customers across India and international markets.",
    ctaText: "Explore Products",
    ctaLink: "/products",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/s1.webp",
    phonebg: "/images/ps1.webp",
    gradient: "from-blue-600 to-cyan-500",
    gradientLight: "from-blue-500 to-cyan-400",
    features: ["Power Management", "Analog ICs", "Domestic & Overseas"],
  },
  {
    id: 2,
    title: "From Concept to Silicon.",
    title2: "From Silicon to Solutions.",
    subtitle:
      "We partner with semiconductor and system companies to transform complex analog challenges into production-ready silicon and real-world solutions.",
    ctaText: "Markets",
    ctaLink: "/market",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/s2.webp",
    phonebg: "/images/ps2.webp",
    gradient: "from-red-600 to-[#001635]",
    gradientLight: "from-orange-500 to-red-400",
    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },
  {
    id: 3,
    title: "Advancing India's",
    title2: "Semiconductor",
    title3: "Self-Reliance.",
    subtitle:
      "Building indigenous Analog IPs and products that strengthen the domestic ecosystem and contribute to India's growing semiconductor capabilities.",
    ctaText: "About Us",
    ctaLink: "/about",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/s3.webp",
    phonebg: "/images/ps3.webp",
    gradient: "from-orange-600 to-red-500",
    gradientLight: "from-orange-500 to-red-400",
    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },
  {
    id: 4,
    title: "Engineering ",
    title2: "Analog Excellence.",
    subtitle:
      "Deliver high-performance Analog and Mixed-Signal Product and IPs that enable automotive, industrial and consumer applications.",
    ctaText: "Leadership",
    ctaLink: "/leadership",
    secondaryCta: "Contact Us",
    backgroundImage: "/images/s4.webp",
    phonebg: "/images/ps4.webp",
    gradient: "from-green-600 to-green-500",
    gradientLight: "from-orange-500 to-red-400",
    features: ["Fabless Design", "Indian Owned IPs", "Global Deployment"],
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  const currentSlide = sliderContent[activeIndex];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 550);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }

    autoSlideRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 20000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHoveringRef.current) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [activeIndex, isAnimating, isMobile]);

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === 0 ? sliderContent.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === sliderContent.length - 1 ? 0 : prev + 1,
    );
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setDirection(index > activeIndex ? "next" : "prev");
    setIsAnimating(true);
    setActiveIndex(index);
  };

  // GSAP animations for background and content
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      const directionValue = direction === "next" ? 30 : -30;

      // Animate background image transition
      timeline
        .to(".bg-slider-image", {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
        .set(".bg-slider-image", {
          backgroundImage: () => {
            const liveIsMobile =
              typeof window !== "undefined" && window.innerWidth < 700;
            const bg =
              liveIsMobile && currentSlide.phonebg
                ? currentSlide.phonebg
                : currentSlide.backgroundImage;
            return `url(${bg})`;
          },
        })
        .to(".bg-slider-image", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });

      // Animate gradient overlay
      timeline.to(
        ".gradient-overlay",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.5",
      );
      timeline.set(".gradient-overlay", {
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 100%)`,
      });
      timeline.to(
        ".gradient-overlay",
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Animate content elements
      timeline
        .to(".content-wrapper > *", {
          opacity: 0,
          y: -directionValue,
          stagger: 0.05,
          duration: 0.25,
          ease: "power2.in",
        })
        .set(".content-wrapper", { clearProps: "all" })
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: directionValue, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(0.4)",
          },
          "-=0.1",
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: directionValue, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: directionValue * 0.7, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".feature-tag",
          { opacity: 0, scale: 0.8, stagger: 0.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(0.3)",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 15, stagger: 0.08 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
    // NOTE: isMobile added so the timeline recalculates resolvedBg if the
    // viewport crosses the mobile breakpoint between slides.
  }, [activeIndex, direction, currentSlide, isMobile]);

  // Initial load animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".bg-slider-image",
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        )
        .fromTo(
          ".gradient-overlay",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: -30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)" },
          "-=0.3",
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".feature-tag",
          { opacity: 0, scale: 0.8, stagger: 0.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.3)",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats .stat-item",
          { opacity: 0, y: 20, stagger: 0.1 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".slider-dots .dot",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.6)",
          },
          "-=0.1",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => {
        isHoveringRef.current = true;
        stopAutoSlide();
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false;
        startAutoSlide();
      }}
      className="relative lg:min-h-[74vh]  min-h-[85vh]   flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background Slider Image */}
      <div
        className="bg-slider-image absolute inset-0 bg-cover   transition-all duration-700 "
        style={{
          // backgroundImage: `url(${currentSlide.backgroundImage})`,
          backgroundImage: `url(${
            isMobile && currentSlide.phonebg
              ? currentSlide.phonebg
              : currentSlide.backgroundImage
          })`,
          backgroundSize: "cover",
          backgroundPosition: currentSlide.id == 2 ? "center" : "",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient Overlay */}

      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="md:relative absolute top-0 left-0  z-10 container min-h-[50vh] md:min-h-[60vh] p-5 md:pt-10  mx-auto max-w-7xl"
      >
        <div
          className={`content-wrapper h-full ${currentSlide.id == 2 ? "max-w-3xl" : "max-w-md"}  `}
        >
          {/* Badge */}

          {/* Title */}
          <h1 className="hero-title text-xl md:text-2xl lg:text-3xl  font-bold text-white mb-2 leading-[1.1] tracking-tight">
            {currentSlide.title}
          </h1>
          {currentSlide.id == 1 && (
            <h1 className="hero-title text-xl md:text-2xl lg:text-3xl text-yellow-500  font-bold mb-2 leading-[1.1] tracking-tight">
              {currentSlide.title2}
            </h1>
          )}

          {currentSlide.id == 2 && (
            <h1 className="hero-title text-xl md:text-2xl lg:text-3xl text-sky-500  font-bold  mb-2 leading-[1.1] tracking-tight">
              {currentSlide.title2}
            </h1>
          )}

          {currentSlide.id == 3 && (
            <h1 className="hero-title text-xl md:text-2xl lg:text-3xl text-yellow-500  font-bold  mb-2 leading-[1.1] tracking-tight">
              {currentSlide.title2}
            </h1>
          )}

          {currentSlide.id == 4 && (
            <h1 className="hero-title text-xl md:text-2xl lg:text-3xl text-sky-500  font-bold  mb-2 leading-[1.1] tracking-tight">
              {currentSlide.title2}
            </h1>
          )}

          {currentSlide.id == 3 ? (
            <h1 className="hero-title text-xl md:text-2xl lg:text-3xl  font-bold text-yellow-500 mb-4 leading-[1.1] tracking-tight">
              {currentSlide.title3}
            </h1>
          ) : (
            <h1 className="hero-title text-xl md:text-2xl lg:text-3xl  font-bold text-white mb-4 leading-[1.1] tracking-tight">
              {currentSlide.title3}
            </h1>
          )}

          {/* Subtitle */}
          <p
            className={`hero-subtitle text-sm md:text-base lg:text-lg text-white/80 leading-6 mb-4 ${currentSlide.id == 2 ? "max-w-fit" : "max-w-md"} `}
          >
            {currentSlide.subtitle}
          </p>

          <p className="lg:h-12 h-6"></p>
          {currentSlide.id == 4 && (
            <Link
              href={"/products"}
              className="text-white relative z-[999]  cursor-pointer hero-subtitle border p-2.5 px-5  mt-4 flex gap-x-2 w-fit border-blue-600 rounded-full "
            >
              Explore Products <ArrowRight />
            </Link>
          )}

          {/* Feature Tags */}

          {/* CTA Buttons - Removed Explore Products button, only Contact Us remains */}
          {/* <div className="hero-cta">
            <Button
              variant="outline"
              className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-2 px-6 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div> */}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 md:left-6 bottom-5 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 md:right-6 bottom-5 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="slider-dots absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
        {sliderContent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="group relative"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`dot h-1 rounded-full transition-all duration-500 ${
                idx === activeIndex
                  ? `w-5 md:w-6 bg-gradient-to-r ${currentSlide.gradient}`
                  : "w-1.5 bg-white/40 group-hover:bg-white/60 group-hover:w-2"
              }`}
            />
          </button>
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(0px) translateX(30px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(30px) translateX(15px);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
