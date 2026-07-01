import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Features } from "@/components/home/Features";
import { AboutSection } from "@/components/home/About";
import { CTASection } from "@/components/home/Ctasection";
import { MarketOpportunitiesSection } from "@/components/home/Market";
import { TargetIndustriesSection } from "@/components/home/TargetIndustriesSection";
import { ProcessTimelineSection } from "@/components/home/ProcessTimelineSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TrustedClientsSection } from "@/components/home/TrustedClientsSection";

export const metadata: Metadata = {
  title: "ACT - AnalogChips Technology PVT LTD",
  // description:
  //   "AnalogChips Technology PVT LTD. semiconductor company designing high-performance power management solutions. Boost converters, Buck regulators, LDO, LED Drivers and more — Made in India, Designed in India.",
  openGraph: {
    title: "ACT - AnalogChips Technology PVT LTD",
    // description:
    //   "AnalogChips Technology PVT LTD. semiconductor company designing high-performance power management solutions. Boost converters, Buck regulators, LDO, LED Drivers and more — Made in India, Designed in India.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <ProductShowcase /> */}
        {/* <Features /> */}
        {/* <TargetIndustriesSection /> */}
        {/* <ProcessTimelineSection /> */}
        {/* <StatsSection /> */}
        {/* <MarketOpportunitiesSection /> */}

        <AboutSection />
        {/* <TrustedClientsSection /> */}
        {/* CTA Section */}
        {/* <CTASection /> */}
      </main>
      <Footer />
    </>
  );
}
