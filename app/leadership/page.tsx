"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const leadershipTeam = [
  {
    id: 1,
    name: "Leadership # 1",
    title: "Co-Founder & CEO",
    image: "/images/leadership-1.jpg",
    overview: [
      "40+ years of VLSI Industry Experience",
      'IC Development from "Spec to Qualified Part"',
      'Passionate to add value for "Make in India" BY "Design in India"',
    ],
    career: [
      "15 years in Bharat Electronics Limited (BEL)",
      "5.0 years in GE Global Research Centre (GE GRC)",
      "8.5 years in Tata Elxsi (a Tata Group Company)",
      "3.5 years – ANALOGSEMI, Startup Co-Founder CEO",
      "5.5 years – TESSOLVE, Hero Electronix Venture (Acquired ANALOGSEMI)",
    ],
    strengths: [
      "Technical Leadership & Business Management",
      "Managed Large Design Team – Delivered 1st pass Silicon to multiple Semiconductor Chip companies",
      "Strong Industry network",
      "Built Strong next level Technical leadership",
    ],
    roles: [
      "Design Engineer to Manager - BEL",
      "Design Manager – GE GRC",
      "Technology Manager – Tata Elxsi",
      "Co-Founder & CEO – ANALOGSEMI",
      "Senior VP VLSI - Tessolve",
    ],
  },
  {
    id: 2,
    name: "Leadership # 2",
    title: "Senior Leadership",
    image: "/images/leadership-2.jpg",
    overview: [
      "40+ years of VLSI Industry Experience",
      'IC Development from "Spec to Qualified Part"',
      'Passionate to add value for "Make in India" BY "Design in India"',
    ],
    career: [
      "15 years in Bharat Electronics Limited (BEL)",
      "5 years in GE Global Research Centre (GE GRC)",
      "8.5 years in Tata Elxsi (a Tata Group Company)",
      "3.5 years – ANALOGSEMI, Startup Co-Founder CEO",
      "5.5 years – TESSOLVE, Hero Electronix Venture (Acquired ANALOGSEMI)",
    ],
    strengths: [
      "Technical Leadership & Business Management",
      "Managed Large Design Team – Delivered 1st pass Silicon to multiple Semiconductor Chip companies",
      "Strong Industry network",
      "Built strong next level Technical leadership",
    ],
    roles: [
      "Design Engineer to Manager - BEL",
      "Design Manager – GE GRC",
      "Technology Manager – Tata Elxsi",
      "Co-Founder & CEO – ANALOGSEMI",
      "Senior VP VLSI - Tessolve",
    ],
  },
  {
    id: 3,
    name: "Leadership # 3",
    title: "Senior Leadership",
    image: "/images/leadership-3.jpg",
    overview: [
      "40+ years of VLSI Industry Experience",
      'IC Development from "Spec to Qualified Part"',
      'Passionate to add value for "Make in India" BY "Design in India"',
    ],
    career: [
      "15 years in Bharat Electronics Limited (BEL)",
      "5 years in GE Global Research Centre (GE GRC)",
      "8.5 years in Tata Elxsi (a Tata Group Company)",
      "3.5 years – ANALOGSEMI, Startup Co-Founder CEO",
      "5.5 years – TESSOLVE, Hero Electronix Venture (Acquired ANALOGSEMI)",
    ],
    strengths: [
      "Technical Leadership & Business Management",
      "Managed Large Design Team – Delivered 1st pass Silicon to multiple Semiconductor Chip companies",
      "Strong Industry network",
      "Built strong next level Technical leadership",
    ],
    roles: [
      "Design Engineer to Manager - BEL",
      "Design Manager – GE GRC",
      "Technology Manager – Tata Elxsi",
      "Co-Founder & CEO – ANALOGSEMI",
      "Senior VP VLSI - Tessolve",
    ],
  },
  {
    id: 4,
    name: "Leadership # 4",
    title: "Senior Leadership",
    image: "/images/leadership-4.jpg",
    overview: [
      "40+ years of VLSI Industry Experience",
      'IC Development from "Spec to Qualified Part"',
      'Passionate to add value for "Make in India" BY "Design in India"',
    ],
    career: [
      "15 years in Bharat Electronics Limited (BEL)",
      "5 years in GE Global Research Centre (GE GRC)",
      "8.5 years in Tata Elxsi (a Tata Group Company)",
      "3.5 years – ANALOGSEMI, Startup Co-Founder CEO",
      "5.5 years – TESSOLVE, Hero Electronix Venture (Acquired ANALOGSEMI)",
    ],
    strengths: [
      "Technical Leadership & Business Management",
      "Managed Large Design Team – Delivered 1st pass Silicon to multiple Semiconductor Chip companies",
      "Strong Industry network",
      "Built strong next level Technical leadership",
    ],
    roles: [
      "Design Engineer to Manager - BEL",
      "Design Manager – GE GRC",
      "Technology Manager – Tata Elxsi",
      "Co-Founder & CEO – ANALOGSEMI",
      "Senior VP VLSI - Tessolve",
    ],
  },
];

// ─── Info Box ─────────────────────────────────────────────────────────────────

function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h4 className="text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Leader Card ──────────────────────────────────────────────────────────────

function LeaderCard({ leader }: { leader: (typeof leadershipTeam)[0] }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{leader.name}</h3>
        <span className="text-xs text-slate-300 bg-slate-700 px-3 py-1 rounded-full">
          {leader.title}
        </span>
      </div>

      {/* Body — cream background matching slide style */}
      <div className="p-6" style={{ background: "#fdf6e3" }}>

        {/* Desktop: [left] [photo] [right] */}
        <div className="hidden lg:grid grid-cols-[1fr_160px_1fr] gap-5 items-center">
          <div className="flex flex-col gap-5">
            <InfoBox title="Overview" items={leader.overview} />
            <InfoBox title="Successful Career Background" items={leader.career} />
          </div>

          <div className="flex justify-center">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-200 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                }}
              />
              <div className="w-full h-full items-center justify-center bg-slate-100" style={{ display: "none" }}>
                <svg className="w-14 h-14 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <InfoBox title="Leadership Roles" items={leader.roles} />
            <InfoBox title="Strengths" items={leader.strengths} />
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
          <InfoBox title="Overview" items={leader.overview} />
          <InfoBox title="Successful Career Background" items={leader.career} />
          <InfoBox title="Leadership Roles" items={leader.roles} />
          <InfoBox title="Strengths" items={leader.strengths} />
        </div>
      </div>

      {/* Aspiration footer */}
      <div className="bg-white border-t border-slate-200 px-6 py-3 text-center">
        <p className="text-sm font-semibold text-blue-700">
          Aspiration :{" "}
          <span className="underline underline-offset-2">&quot;Design in India&quot;</span>
          {" "}to{" "}
          <span className="underline underline-offset-2">&quot;Support Global Market&quot;</span>
          {" "}– Own IPs
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">

        {/* Hero */}
        <section className="py-16 md:py-20 ">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col md:flex-row  gap-10 md:gap-16">
              <div className="flex-1 md:text-left">
                {/* <span className="inline-block text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-4">
                  AnalogChips · Semiconductor IPs
                </span> */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  mb-4 leading-tight ">
                  Leadership Team
                </h1>
                <p className=" text-md md:text-lg leading-relaxed lg:max-w-2xl">
                   ACT's leadership team brings together over <b>120 years</b> of combined experience in Analog and Mixed-Signal semiconductor product development, IP design, product marketing, and customer engagement.
                </p>
              </div>
              {/* <div className="shrink-0">
                <div className="w-80 h-80 md:w-80 md:h-72 rounded-2xl overflow-hidden border-2 border-slate-600 shadow-lg">
                  
                  <img
                    src="/images/leader_ship.png"
                    alt="AnalogChips Leadership"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Leader Cards */}
        {/* <section className="py-14 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl space-y-10">
            {leadershipTeam.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>
        </section> */}

        {/* Bottom banner */}
        {/* <section className="bg-slate-800 py-10 text-center">
          <p className="text-xs tracking-widest text-slate-400 uppercase mb-3">
            Collective Aspiration
          </p>
          <p className="text-2xl  font-bold text-white">
            <span className="text-cyan-400 underline underline-offset-4">&quot;Design in India&quot;</span>
            {" "}→{" "}
            <span className="text-cyan-400 underline underline-offset-4">&quot;Support Global Market&quot;</span>
          </p>
          <p className="mt-3 text-slate-400 font-medium">
            Own IPs · Analog Chips · Make in India
          </p>
        </section> */}

      </main>
      <Footer />
    </>
  );
}