"use client";

import { motion, Variants } from "framer-motion";
import { Key, CheckCircle, Terminal, Plug, Sparkles } from "lucide-react";

export default function ClientPage({ blocks }: { blocks: any[] }) {
  const getRichText = (block: any) => {
    if (!block) return "";
    let rt: any[] = [];
    if (block.type === 'heading_1' && block.heading_1?.rich_text) rt = block.heading_1.rich_text;
    if (block.type === 'paragraph' && block.paragraph?.rich_text) rt = block.paragraph.rich_text;
    return rt.map((t: any) => t.plain_text || t.text?.content || '').join('');
  }

  const texts = blocks.map(b => getRichText(b)).filter(t => t.length > 0);
  
  // Extract Callout for the Manual section
  const calloutBlock = blocks.find((b: any) => b.type === 'callout');
  let manualContent: { text: string; icon: string; lines: string[] } | null = null;
  
  if (calloutBlock && calloutBlock.callout) {
    const icon = calloutBlock.callout.icon?.emoji || "💡";
    const text = calloutBlock.callout.rich_text?.map((t:any) => t.plain_text).join('') || "";
    // Preserve empty lines if the user adds blank paragraphs in Notion
    const lines = (calloutBlock.children || []).map((child: any) => {
      if (child.type === 'paragraph' && child.paragraph?.rich_text) {
        return child.paragraph.rich_text.map((t:any) => t.plain_text).join('');
      }
      return getRichText(child);
    });
    manualContent = { text, icon, lines };
  }
  
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const stepsData = [
    { title: texts[2], desc: texts[3], icon: Key, color: "text-gray-900", bg: "bg-gray-100" },
    { title: texts[4], desc: texts[5], icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-50" },
    { title: texts[6], desc: texts[7], icon: Terminal, color: "text-orange-500", bg: "bg-orange-50" },
    { title: texts[8], desc: texts[9], icon: Plug, color: "text-purple-500", bg: "bg-purple-50" },
    { title: texts[10], desc: texts[11], icon: Sparkles, color: "text-pink-500", bg: "bg-pink-50" },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1d1d1f] font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-black/5 support-[backdrop-filter]:bg-white/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight text-black flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-black"></span>
            Notion × AntiGravity Guide
          </span>
          <div className="hidden md:flex gap-8 text-xs font-medium text-gray-500">
            <span className="hover:text-black transition-colors cursor-pointer">Guide</span>
            <span className="hover:text-black transition-colors cursor-pointer">Integration</span>
            <span className="hover:text-black transition-colors cursor-pointer">Showcase</span>
          </div>
        </div>
      </nav>

      <main className="pb-32 overflow-hidden">
        {/* Intro Section */}
        <section className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl mx-auto relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-8 text-black drop-shadow-sm leading-[1.0] break-keep">
              {texts[0] || "Intro"}
            </h1>
            <p className="text-2xl md:text-4xl font-semibold tracking-tight text-[#86868b] max-w-3xl mx-auto leading-snug">
              {texts[1] || "Web制作の重力から、解き放たれる。Next.js × Notionの究極の自由度を提示。"}
            </p>
          </motion.div>
        </section>

        {/* Steps Sections */}
        <div className="max-w-5xl mx-auto px-6 space-y-32">
          {stepsData.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 0;

            const containerVariants: Variants = {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2, // Text elements will reveal one by one
                  delayChildren: 0.1,
                }
              }
            };

            const imageVariants: Variants = {
              hidden: { opacity: 0, y: 100, scale: 0.9 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 70, 
                  damping: 15, 
                  mass: 1,
                  duration: 1.2
                } 
              }
            };

            const textVariants: Variants = {
              hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
              visible: { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                transition: { 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                } 
              }
            };

            return (
              <motion.section 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px", amount: 0.3 }}
                variants={containerVariants}
                className={`flex flex-col md:flex-row items-center gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                <motion.div variants={imageVariants} className={`w-full md:w-1/2 flex justify-center`}>
                  <div className={`w-full aspect-square max-w-sm md:max-w-md rounded-[3rem] ${step.bg} flex items-center justify-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden relative group`}>
                    {/* Glass glare effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <Icon className={`w-32 h-32 ${step.color} drop-shadow-md z-10 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out`} />
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <motion.h3 variants={textVariants} className="text-[#86868b] font-bold text-xl tracking-widest uppercase">
                    Step {i + 1}
                  </motion.h3>
                  <motion.h2 variants={textVariants} className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] text-black">
                    {step.title ? step.title.replace(/^Step \d+: /, '') : `Step ${i + 1}`}
                  </motion.h2>
                  <motion.p variants={textVariants} className="text-2xl text-[#86868b] font-medium leading-relaxed tracking-tight mt-2">
                    {step.desc}
                  </motion.p>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Manual Section (No animation) */}
        {manualContent && (
          <div className="max-w-4xl mx-auto px-6 mt-40">
            <div className="bg-[#f9f9f9] rounded-3xl p-10 md:p-14 border border-black/5 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-3xl" style={{ lineHeight: 1 }}>{manualContent.icon}</span>
                <h3 className="text-2xl font-bold text-black leading-none">{manualContent.text}</h3>
              </div>
              <div className="pl-12 space-y-4">
                {manualContent.lines.map((line, i) => (
                  <p key={i} className={`text-lg text-gray-800 leading-relaxed ${line.trim() === '' ? 'h-6' : ''}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
