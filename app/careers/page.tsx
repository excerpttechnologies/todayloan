// "use client";

// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Upload, ChevronDown, ArrowRight, Send } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Job {
//   title: string;
//   location: string;
//   type: string;
//   description: string;
//   requirements: string[];
// }

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   position: string;
//   linkedin: string;
//   message: string;
//   resume: File | null;
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const jobs: Job[] = [
//   {
//     title: "Analog Layout Lead/Manager",
//     location: "Bengaluru, India",
//     type: "Full-time",
//     description:
//       "Lead and manage a team of analog layout engineers working on cutting-edge RF and mixed-signal ICs for radar, satcom, and 5G phased array applications.",
//     requirements: [
//       "10+ years of analog/mixed-signal layout experience",
//       "Expertise in Cadence Virtuoso layout tools",
//       "Strong understanding of RF layout techniques (EM shielding, matching, routing)",
//       "Experience with 65nm–16nm CMOS/BiCMOS processes",
//       "Prior team leadership or mentoring experience preferred",
//     ],
//   },
//   {
//     title: "Analog/RF Design Lead/Manager",
//     location: "Bengaluru, India",
//     type: "Full-time",
//     description:
//       "Drive the architecture and design of high-performance RF front-end modules, LNAs, PAs, mixers, and PLLs for next-generation semiconductor products.",
//     requirements: [
//       "12+ years of RF/analog IC design experience",
//       "Proficient in Cadence Spectre / ADS simulation",
//       "Strong knowledge of wireless communication standards (5G NR, satellite)",
//       "Experience taking chips from concept to tape-out",
//       "Strong cross-functional collaboration skills",
//     ],
//   },
//   {
//     title: "Analog/RF Design Engineer",
//     location: "Bengaluru, India",
//     type: "Full-time",
//     description:
//       "Design and simulate analog and RF building blocks for chipsets targeting radar and 5G phased array applications in advanced CMOS technologies.",
//     requirements: [
//       "3–8 years of analog/RF IC design experience",
//       "Hands-on with LNA, mixer, VCO, or PA design",
//       "Familiar with Spectre, HSPICE, or ADS",
//       "B.Tech/M.Tech/PhD in ECE or related field",
//       "Eagerness to work in a fast-paced startup environment",
//     ],
//   },
// ];

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function JobCard({ job, index }: { job: Job; index: number }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.12 }}
//       className="border border-[#1e3a5f]/40 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
//     >
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-6 py-5 text-left group"
//       >
//         <div className="flex flex-col gap-1">
//           <span className="text-[#0d2a4a] font-semibold text-[1.05rem] group-hover:text-[#1e6bb8] transition-colors duration-200">
//             {job.title}
//           </span>
//           <div className="flex gap-3 text-xs text-slate-500 font-medium">
//             <span>{job.location}</span>
//             <span>·</span>
//             <span>{job.type}</span>
//           </div>
//         </div>
//         <motion.div
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//           className="text-[#1e6bb8] flex-shrink-0 ml-4"
//         >
//           <ChevronDown size={20} />
//         </motion.div>
//       </button>

//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
//             className="overflow-hidden"
//           >
//             <div className="px-6 pb-6 border-t border-slate-100 pt-4">
//               <p className="text-slate-600 text-sm leading-relaxed mb-4">
//                 {job.description}
//               </p>
//               <h4 className="text-xs font-bold text-[#0d2a4a] uppercase tracking-widest mb-3">
//                 Requirements
//               </h4>
//               <ul className="space-y-2">
//                 {job.requirements.map((req, i) => (
//                   <li
//                     key={i}
//                     className="flex items-start gap-2 text-sm text-slate-600"
//                   >
//                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#f5c518] flex-shrink-0" />
//                     {req}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// function ApplicationModal({ onClose }: { onClose: () => void }) {
//   const [form, setForm] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     linkedin: "",
//     message: "",
//     resume: null,
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Close on Escape
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file) setForm((f) => ({ ...f, resume: file }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Convert resume File → base64 string (if provided)
//       let resumeBase64: string | undefined;
//       let resumeName: string | undefined;
//       let resumeType: string | undefined;

//       if (form.resume) {
//         resumeName = form.resume.name;
//         resumeType = form.resume.type;
//         resumeBase64 = await new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onload = () => {
//             // result is "data:<mime>;base64,<data>" — strip the prefix
//             const result = reader.result as string;
//             resolve(result.split(",")[1]);
//           };
//           reader.onerror = () => reject(new Error("Failed to read file."));
//           reader.readAsDataURL(form.resume!);
//         });
//       }

//       const res = await fetch("/api/career", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           phone: form.phone,
//           position: form.position,
//           linkedin: form.linkedin,
//           message: form.message,
//           resumeBase64,
//           resumeName,
//           resumeType,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Something went wrong. Please try again.");
//         return;
//       }

//       setSubmitted(true);
//     } catch (err) {
//       setError("Network error. Please check your connection and try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         key="overlay"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.25 }}
//         onClick={onClose}
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//       >
//         <motion.div
//           key="modal"
//           initial={{ opacity: 0, scale: 0.94, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.94, y: 20 }}
//           transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
//         >
//           {/* Header */}
//           <div className="bg-[#0d2a4a] px-8 py-6 flex items-center justify-between flex-shrink-0">
//             <div>
//               <h2 className="text-white font-bold text-xl">
//                 Send Your Application
//               </h2>
//               <p className="text-blue-300 text-sm mt-0.5">
//                 We'd love to hear from you
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
//             >
//               <X size={22} />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="overflow-y-auto flex-1 px-8 py-6">
//             {submitted ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="flex flex-col items-center justify-center py-12 text-center"
//               >
//                 <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
//                   <Send size={28} className="text-green-600" />
//                 </div>
//                 <h3 className="text-[#0d2a4a] font-bold text-xl mb-2">
//                   Application Sent!
//                 </h3>
//                 <p className="text-slate-500 text-sm max-w-xs">
//                   Thank you for your interest. We'll review your application and
//                   get back to you within a few business days.
//                 </p>
//                 <button
//                   onClick={onClose}
//                   className="mt-6 px-6 py-2.5 bg-[#0d2a4a] text-white rounded-full text-sm font-semibold hover:bg-[#1e6bb8] transition-colors"
//                 >
//                   Close
//                 </button>
//               </motion.div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Row 1 */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       required
//                       type="text"
//                       value={form.name}
//                       onChange={(e) =>
//                         setForm({ ...form, name: e.target.value })
//                       }
//                       placeholder="Jane Doe"
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       required
//                       type="email"
//                       value={form.email}
//                       onChange={(e) =>
//                         setForm({ ...form, email: e.target.value })
//                       }
//                       placeholder="jane@example.com"
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
//                     />
//                   </div>
//                 </div>

//                 {/* Row 2 */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       value={form.phone}
//                       onChange={(e) =>
//                         setForm({ ...form, phone: e.target.value })
//                       }
//                       placeholder="+91 98765 43210"
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                       Position of Interest
//                     </label>
//                     <select
//                       value={form.position}
//                       onChange={(e) =>
//                         setForm({ ...form, position: e.target.value })
//                       }
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition bg-white"
//                     >
//                       <option value="">Select a role…</option>
//                       {jobs.map((j) => (
//                         <option key={j.title} value={j.title}>
//                           {j.title}
//                         </option>
//                       ))}
//                       <option value="Other">Other / General</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* LinkedIn */}
//                 <div>
//                   <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                     LinkedIn Profile
//                   </label>
//                   <input
//                     type="url"
//                     value={form.linkedin}
//                     onChange={(e) =>
//                       setForm({ ...form, linkedin: e.target.value })
//                     }
//                     placeholder="https://linkedin.com/in/yourname"
//                     className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                     Cover Message
//                   </label>
//                   <textarea
//                     rows={3}
//                     value={form.message}
//                     onChange={(e) =>
//                       setForm({ ...form, message: e.target.value })
//                     }
//                     placeholder="Tell us a bit about yourself and why you'd like to join Fermionic Design…"
//                     className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition resize-none"
//                   />
//                 </div>

//                 {/* Resume Upload */}
//                 <div>
//                   <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1.5">
//                     Resume / CV <span className="text-red-500">*</span>
//                   </label>
//                   <div
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                       setDragging(true);
//                     }}
//                     onDragLeave={() => setDragging(false)}
//                     onDrop={handleDrop}
//                     onClick={() => fileRef.current?.click()}
//                     className={`border-2 border-dashed rounded-xl px-6 py-8 flex flex-col items-center cursor-pointer transition-all duration-200 ${
//                       dragging
//                         ? "border-[#1e6bb8] bg-blue-50"
//                         : form.resume
//                           ? "border-green-400 bg-green-50"
//                           : "border-slate-200 hover:border-[#1e6bb8] hover:bg-blue-50/40"
//                     }`}
//                   >
//                     <Upload
//                       size={24}
//                       className={`mb-2 ${form.resume ? "text-green-500" : "text-slate-400"}`}
//                     />
//                     {form.resume ? (
//                       <p className="text-sm text-green-700 font-medium">
//                         {form.resume.name}
//                       </p>
//                     ) : (
//                       <>
//                         <p className="text-sm text-slate-600 font-medium">
//                           Drag & drop your resume here
//                         </p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           PDF, DOC, DOCX — max 5 MB
//                         </p>
//                       </>
//                     )}
//                     <input
//                       ref={fileRef}
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       className="hidden"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0] ?? null;
//                         setForm((f) => ({ ...f, resume: file }));
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="w-full flex items-center justify-center gap-2 bg-[#0d2a4a] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1e6bb8] active:scale-[0.98] transition-all duration-200 text-sm"
//                 >
//                   Submit Application <ArrowRight size={16} />
//                 </button>
//               </form>
//             )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ─── Main Page ─────────────────────────────────────────────────────────────────

// export default function CareersPage() {
//   const [modalOpen, setModalOpen] = useState(false);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = modalOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [modalOpen]);

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-[#f7f9fc] font-sans">
//         {/* ── Hero Section ── */}
//         <section className="relative bg-[#0d2a4a] overflow-hidden">
//           {/* Decorative grid */}
//           <div
//             aria-hidden
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage:
//                 "linear-gradient(#1e6bb8 1px, transparent 1px), linear-gradient(to right, #1e6bb8 1px, transparent 1px)",
//               backgroundSize: "48px 48px",
//             }}
//           />
//           {/* Yellow accent bar */}
//           <div className="absolute right-0 top-0 h-full w-2 bg-[#f5c518]" />

//           <div className="relative max-w-5xl mx-auto px-6 py-24 lg:py-32">
//             <motion.p
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-[#f5c518] text-xs font-bold uppercase tracking-[0.25em] mb-4"
//             >
//               Careers at Fermionic Design
//             </motion.p>
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-2xl"
//             >
//               Looking For The{" "}
//               <span className="text-[#f5c518]">Next Challenge?</span>
//               <br />
//               We Are Hiring!
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-blue-200 mt-6 max-w-xl text-base leading-relaxed"
//             >
//               We are building the future of RF and mixed-signal semiconductor
//               technology — developing cutting-edge chipsets for radar, satcom,
//               and 5G phased array applications. Join us and push the boundaries
//               of what's possible in IC design.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="mt-8 flex flex-wrap gap-4"
//             >
//               <a
//                 href="#openings"
//                 className="inline-flex items-center gap-2 bg-[#f5c518] text-[#0d2a4a] font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors text-sm"
//               >
//                 View Open Positions <ChevronDown size={16} />
//               </a>
//               <button
//                 onClick={() => setModalOpen(true)}
//                 className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
//               >
//                 Send Application <ArrowRight size={16} />
//               </button>
//             </motion.div>
//           </div>
//         </section>
//         <br />
//         {/* ── Open Positions ── */}
//         <section id="openings" className="max-w-5xl mx-auto px-6 pb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <p className="text-[#f5c518] text-xs font-bold uppercase tracking-[0.2em] mb-2">
//               Open Roles
//             </p>
//             <h2 className="text-[#0d2a4a] text-3xl font-extrabold">
//               Current Openings
//             </h2>
//             <p className="text-slate-500 text-sm mt-2 max-w-lg">
//               Send your CV to{" "}
//               <a
//                 href="mailto:careers@fermionic.design"
//                 className="text-[#1e6bb8] font-medium hover:underline"
//               >
//                 careers@fermionic.design
//               </a>{" "}
//               with the job description in the subject line.
//             </p>
//           </motion.div>

//           <div className="flex flex-col gap-4">
//             {jobs.map((job, i) => (
//               <JobCard key={job.title} job={job} index={i} />
//             ))}
//           </div>
//         </section>

//         {/* ── CTA Banner ── */}
//         <section className="max-w-5xl mx-auto px-6 pb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55 }}
//             className="relative bg-[#0d2a4a] rounded-3xl overflow-hidden px-8 py-12 text-center"
//           >
//             {/* Yellow accent */}
//             <div className="absolute left-0 top-0 h-full w-1.5 bg-[#f5c518]" />
//             <div className="absolute right-0 bottom-0 h-full w-1.5 bg-[#f5c518]" />

//             <p className="text-[#f5c518] text-xs font-bold uppercase tracking-[0.2em] mb-3">
//               Don't see a perfect fit?
//             </p>
//             <h2 className="text-white text-2xl sm:text-3xl font-extrabold max-w-lg mx-auto leading-snug">
//               Send us your resume and we'll keep you in mind for future
//               opportunities
//             </h2>
//             <p className="text-blue-300 text-sm mt-3 max-w-md mx-auto">
//               We're always looking for talented engineers. Share your profile
//               and we'll reach out when the right role comes up.
//             </p>
//             <motion.button
//               onClick={() => setModalOpen(true)}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//               className="mt-8 inline-flex items-center gap-2 bg-white text-[#0d2a4a] font-bold px-8 py-3.5 rounded-full hover:bg-[#f5c518] transition-colors duration-200 text-sm"
//             >
//               Send Application <ArrowRight size={16} />
//             </motion.button>
//           </motion.div>
//         </section>
//       </main>

//       <Footer />

//       {/* ── Modal ── */}
//       {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} />}
//     </>
//   );
// }

"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Upload,
  ArrowRight,
  Send,
  ChevronDown,
  MapPin,
  Briefcase,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume: File | null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const jobs: Job[] = [
  {
    title: "Analog Layout Lead/Manager",
    location: "Bengaluru, India",
    type: "Full-time",
    description:
      "Lead and manage a team of analog layout engineers working on cutting-edge RF and mixed-signal ICs for radar, satcom, and 5G phased array applications.",
    requirements: [
      "10+ years of analog/mixed-signal layout experience",
      "Expertise in Cadence Virtuoso layout tools",
      "Strong understanding of RF layout techniques",
      "Experience with 65nm–16nm CMOS/BiCMOS processes",
      "Prior team leadership experience preferred",
    ],
  },
  {
    title: "Analog/RF Design Lead/Manager",
    location: "Bengaluru, India",
    type: "Full-time",
    description:
      "Drive the architecture and design of high-performance RF front-end modules, LNAs, PAs, mixers, and PLLs for next-generation semiconductor products.",
    requirements: [
      "12+ years of RF/analog IC design experience",
      "Proficient in Cadence Spectre / ADS simulation",
      "Strong knowledge of wireless communication standards",
      "Experience taking chips from concept to tape-out",
      "Strong cross-functional collaboration skills",
    ],
  },
  {
    title: "Analog/RF Design Engineer",
    location: "Bengaluru, India",
    type: "Full-time",
    description:
      "Design and simulate analog and RF building blocks for chipsets targeting radar and 5G phased array applications in advanced CMOS technologies.",
    requirements: [
      "3–8 years of analog/RF IC design experience",
      "Hands-on with LNA, mixer, VCO, or PA design",
      "Familiar with Spectre, HSPICE, or ADS",
      "B.Tech/M.Tech/PhD in ECE or related field",
      "Eagerness to work in a fast-paced startup environment",
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobCard({
  job,
  index,
  onSelect,
}: {
  job: Job;
  index: number;
  onSelect: (job: Job) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-[#1e3a5f]/20 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[#0d2a4a] font-semibold text-[0.95rem] group-hover:text-[#1e6bb8] transition-colors duration-200">
            {job.title}
          </span>
          <div className="flex gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {job.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Briefcase size={12} />
              {job.type}
            </span>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-[#1e6bb8] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 pt-2 border-t border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              {job.description}
            </p>
            <h4 className="text-xs font-bold text-[#0d2a4a] uppercase tracking-widest mb-2">
              Requirements
            </h4>
            <ul className="space-y-1.5">
              {job.requirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#f5c518] flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect(job)}
              className="mt-3 text-sm text-[#1e6bb8] font-semibold hover:underline flex items-center gap-1"
            >
              Apply Now <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    resume: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Set position when job is selected
  useEffect(() => {
    if (selectedJob) {
      setForm((f) => ({ ...f, position: selectedJob.title }));
    }
  }, [selectedJob]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setForm((f) => ({ ...f, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let resumeBase64: string | undefined;
      let resumeName: string | undefined;
      let resumeType: string | undefined;

      if (form.resume) {
        resumeName = form.resume.name;
        resumeType = form.resume.type;
        resumeBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = () => reject(new Error("Failed to read file."));
          reader.readAsDataURL(form.resume!);
        });
      }

      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          position: form.position,
          message: form.message,
          resumeBase64,
          resumeName,
          resumeType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
      resume: null,
    });
    setSubmitted(false);
    setError(null);
    setSelectedJob(null);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f9fc]">
        {/* Hero Section */}
        <section className="bg-[#0d2a4a] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-white text-3xl md:text-5xl sm:text-4xl font-extrabold">
                Careers
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content - Jobs Left, Form Right */}
        <section className="max-w-7xl mx-auto px-5 borderborder rounded-lg py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Jobs List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h2 className="text-[#0d2a4a] text-xl font-bold mb-4">
                Job Openings
              </h2>
              {/* <p className="text-slate-500 text-sm mb-4">
                {jobs.length} roles available
              </p> */}
              {/* <div className="flex flex-col gap-3">
                {jobs.map((job, i) => (
                  <JobCard
                    key={job.title}
                    job={job}
                    index={i}
                    onSelect={setSelectedJob}
                  />
                ))}
              </div> */}

              <div className=" h-62 px-4 py-3  flex justify-center items-center text-center">
                <h3 className="font-semibold text-lg">Coming Soon !</h3>
              </div>

              {/* Email contact */}
              {/* <p className="text-slate-500 text-xs mt-6 text-center">
                Or send your CV to{" "}
                <a
                  href="mailto:careers@analog-chips.com"
                  className="text-[#1e6bb8] font-medium hover:underline"
                >
                  careers@analog-chips.com
                </a>
              </p> */}
            </div>

            {/* Right Column - Application Form */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
                <h2 className="text-[#0d2a4a] text-xl font-bold mb-1">
                  Apply Now
                </h2>
                <p className="text-slate-500 text-sm mb-5">
                  {selectedJob
                    ? `Applying for: ${selectedJob.title}`
                    : "Fill in your details below"}
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <Send size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-[#0d2a4a] font-bold text-lg mb-1">
                      Application Sent!
                    </h3>
                    <p className="text-slate-500 text-sm max-w-xs">
                      Thank you for your interest. We'll review your application
                      and get back to you soon.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-4 px-5 py-2 bg-[#0d2a4a] text-white rounded-lg text-sm font-semibold hover:bg-[#1e6bb8] transition-colors"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1">
                        Position
                      </label>
                      <select
                        value={form.position}
                        onChange={(e) =>
                          setForm({ ...form, position: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition bg-white"
                      >
                        <option value="">Select a role…</option>
                        {/* {jobs.map((j) => (
                          <option key={j.title} value={j.title}>
                            {j.title}
                          </option>
                        ))} */}
                        {/* <option value="Other">Other / General</option> */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1">
                        Cover Message
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e6bb8]/30 focus:border-[#1e6bb8] transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a4a] uppercase tracking-wider mb-1">
                        Resume / CV <span className="text-red-500">*</span>
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg px-4 py-5 flex flex-col items-center cursor-pointer transition-all duration-200 ${
                          dragging
                            ? "border-[#1e6bb8] bg-blue-50"
                            : form.resume
                              ? "border-green-400 bg-green-50"
                              : "border-slate-200 hover:border-[#1e6bb8] hover:bg-blue-50/40"
                        }`}
                      >
                        <Upload
                          size={20}
                          className={`mb-1.5 ${form.resume ? "text-green-500" : "text-slate-400"}`}
                        />
                        {form.resume ? (
                          <p className="text-sm text-green-700 font-medium">
                            {form.resume.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm text-slate-600 font-medium">
                              Drop your resume here
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              PDF, DOC, DOCX — max 5 MB
                            </p>
                          </>
                        )}
                        <input
                          ref={fileRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setForm((f) => ({ ...f, resume: file }));
                          }}
                        />
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#0d2a4a] text-white font-semibold py-3 rounded-lg hover:bg-[#1e6bb8] active:scale-[0.98] transition-all duration-200 text-sm disabled:opacity-70"
                    >
                      {loading ? "Sending..." : "Submit Application"}
                      <ArrowRight size={16} />
                    </button> */}

                    <button
                      type="submit"
                      disabled={true}
                      className="w-full  flex items-center justify-center gap-2 bg-[#0d2a4a] text-white font-semibold py-3 rounded-lg hover:bg-[#1e6bb8] active:scale-[0.98] transition-all duration-200 text-sm disabled:opacity-70"
                    >
                      Coming soon !
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
