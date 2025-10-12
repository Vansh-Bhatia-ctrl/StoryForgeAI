//HOME-PAGE
// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Sparkles,
//   GitBranch,
//   Zap,
//   Download,
//   Users,
//   BarChart3,
//   MessageSquare,
//   Play,
//   ChevronRight,
//   Check,
//   Menu,
//   X,
// } from "lucide-react";

// export default function StoryForgeAI() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

//   const features = [
//     {
//       icon: GitBranch,
//       title: "Visual Story Builder",
//       description:
//         "Design branching narratives with an intuitive flowchart interface",
//     },
//     {
//       icon: Sparkles,
//       title: "AI Story Assistant",
//       description:
//         "Generate dialogue, plot twists, and character backstories instantly",
//     },
//     {
//       icon: Download,
//       title: "JSON Export",
//       description: "Export directly to Unity, Unreal, or any game engine",
//     },
//     {
//       icon: Users,
//       title: "Real-time Collaboration",
//       description: "Multiple writers working together on the same narrative",
//     },
//     {
//       icon: MessageSquare,
//       title: "AI Character Chat",
//       description: "Interact with characters to test personality and dialogue",
//     },
//     {
//       icon: BarChart3,
//       title: "Story Analytics",
//       description: "AI-powered insights on pacing, tone, and player choices",
//     },
//   ];

//   const plans = [
//     {
//       name: "Indie",
//       price: "$19",
//       period: "/month",
//       features: [
//         "5 Active Projects",
//         "10,000 AI Tokens/mo",
//         "JSON Export",
//         "Community Support",
//       ],
//     },
//     {
//       name: "Studio",
//       price: "$79",
//       period: "/month",
//       popular: true,
//       features: [
//         "Unlimited Projects",
//         "100,000 AI Tokens/mo",
//         "Real-time Collaboration",
//         "Priority Support",
//         "Analytics Dashboard",
//       ],
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       period: "",
//       features: [
//         "Custom AI Models",
//         "Dedicated Support",
//         "On-premise Deployment",
//         "SLA Guarantee",
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <Sparkles className="w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                 StoryForge AI
//               </span>
//             </div>

//             <div className="hidden md:flex items-center gap-8">
//               <a
//                 href="#features"
//                 className="text-slate-300 hover:text-cyan-400 transition-colors"
//               >
//                 Features
//               </a>
//               <a
//                 href="#pricing"
//                 className="text-slate-300 hover:text-cyan-400 transition-colors"
//               >
//                 Pricing
//               </a>
//               <a
//                 href="#docs"
//                 className="text-slate-300 hover:text-cyan-400 transition-colors"
//               >
//                 Docs
//               </a>
//               <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
//                 Start Free Trial
//               </button>
//             </div>

//             <button
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="md:hidden bg-slate-900 border-t border-cyan-500/10 px-6 py-4"
//           >
//             <div className="flex flex-col gap-4">
//               <a
//                 href="#features"
//                 className="text-slate-300 hover:text-cyan-400 transition-colors"
//               >
//                 Features
//               </a>
//               <a
//                 href="#pricing"
//                 className="text-slate-300 hover:text-cyan-400 transition-colors"
//               >
//                 Pricing
//               </a>
//               <a
//                 href="#docs"
//                 className="text-slate-300 hover:text-cyan-400 transition-colors"
//               >
//                 Docs
//               </a>
//               <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium">
//                 Start Free Trial
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <motion.section style={{ opacity, scale }} className="pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6">
//                 <Zap className="w-4 h-4" />
//                 <span>AI-Powered Story Building</span>
//               </div>

//               <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//                 Craft Epic
//                 <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//                   {" "}
//                   Narratives{" "}
//                 </span>
//                 for Your Games
//               </h1>

//               <p className="text-xl text-slate-400 mb-8 leading-relaxed">
//                 StoryForge AI helps indie devs and studios design branching
//                 storylines with AI-assisted dialogue, character development, and
//                 real-time collaboration tools.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group">
//                   Get Started Free
//                   <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button className="px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
//                   <Play className="w-5 h-5" />
//                   Watch Demo
//                 </button>
//               </div>
//             </motion.div>

//             {/* Hero Visual */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mt-16 relative"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl"></div>
//               <div className="relative bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
//                 <div className="grid grid-cols-3 gap-4">
//                   {[1, 2, 3].map((i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.4 + i * 0.1 }}
//                       className="h-32 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg border border-cyan-500/10"
//                     ></motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-6 bg-slate-900/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               Everything You Need to
//               <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                 {" "}
//                 Build Stories
//               </span>
//             </h2>
//             <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//               Professional tools designed for game developers and storytellers
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-all group"
//               >
//                 <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                   <feature.icon className="w-6 h-6 text-cyan-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-slate-400">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               Simple, Transparent
//               <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                 {" "}
//                 Pricing
//               </span>
//             </h2>
//             <p className="text-slate-400 text-lg">
//               Start free, scale as you grow
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {plans.map((plan, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`relative bg-slate-800/50 border rounded-2xl p-8 ${
//                   plan.popular
//                     ? "border-cyan-500 shadow-xl shadow-cyan-500/20"
//                     : "border-slate-700"
//                 }`}
//               >
//                 {plan.popular && (
//                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold">
//                     Most Popular
//                   </div>
//                 )}

//                 <div className="mb-6">
//                   <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-4xl font-bold">{plan.price}</span>
//                     <span className="text-slate-400">{plan.period}</span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-3">
//                       <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
//                       <span className="text-slate-300">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   className={`w-full py-3 rounded-lg font-semibold transition-all ${
//                     plan.popular
//                       ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25"
//                       : "bg-slate-700 hover:bg-slate-600"
//                   }`}
//                 >
//                   Get Started
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-12"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Build Your
//               <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                 {" "}
//                 Story?
//               </span>
//             </h2>
//             <p className="text-slate-400 text-lg mb-8">
//               Join hundreds of game developers crafting immersive narratives
//               with AI
//             </p>
//             <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all">
//               Start Free Trial
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-slate-800 py-12 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                   <Sparkles className="w-5 h-5" />
//                 </div>
//                 <span className="text-xl font-bold">StoryForge AI</span>
//               </div>
//               <p className="text-slate-400 text-sm">
//                 AI-powered story building for game developers
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Pricing
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Documentation
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Careers
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Privacy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Terms
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     Security
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
//             © 2025 StoryForge AI. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


























//PAGE WHERE USERS WILL BE ABLE TO CREATE PROJECTS
// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   FolderPlus,
//   ChevronRight,
//   Gamepad2,
//   BookOpen,
//   Sword,
//   Heart,
//   Ghost,
//   Skull,
// } from "lucide-react";

// export default function CreateProject() {
//   const [projectName, setProjectName] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);

//   const genres = [
//     {
//       id: "rpg",
//       name: "RPG",
//       icon: Sword,
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       id: "adventure",
//       name: "Adventure",
//       icon: BookOpen,
//       color: "from-cyan-500 to-blue-500",
//     },
//     {
//       id: "action",
//       name: "Action",
//       icon: Gamepad2,
//       color: "from-orange-500 to-red-500",
//     },
//     {
//       id: "romance",
//       name: "Romance",
//       icon: Heart,
//       color: "from-pink-500 to-rose-500",
//     },
//     {
//       id: "horror",
//       name: "Horror",
//       icon: Ghost,
//       color: "from-slate-500 to-slate-700",
//     },
//     {
//       id: "mystery",
//       name: "Mystery",
//       icon: Skull,
//       color: "from-indigo-500 to-purple-500",
//     },
//   ];

//   const handleCreate = () => {
//     if (projectName && selectedGenre) {
//       setIsCreating(true);
//       // Simulate project creation
//       setTimeout(() => {
//         console.log("Project created:", { projectName, selectedGenre });
//         // Here you would navigate to the story builder
//       }, 1500);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
//       {/* Minimal Header */}
//       <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//               <Sparkles className="w-5 h-5" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//               StoryForge AI
//             </span>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="pt-32 pb-20 px-6">
//         <div className="max-w-3xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl mb-6">
//               <FolderPlus className="w-8 h-8 text-cyan-400" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold mb-3">
//               Create New Story
//             </h1>
//             <p className="text-slate-400 text-lg">
//               Give your story a name and choose a genre to begin
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="space-y-8"
//           >
//             {/* Project Name Input */}
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-3">
//                 Project Name
//               </label>
//               <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 placeholder="Enter your story name..."
//                 className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-lg focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-500"
//               />
//             </div>

//             {/* Genre Selection */}
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-3">
//                 Select Genre
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {genres.map((genre, index) => (
//                   <motion.button
//                     key={genre.id}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.2 + index * 0.05 }}
//                     onClick={() => setSelectedGenre(genre.id)}
//                     className={`relative p-6 rounded-xl border-2 transition-all ${
//                       selectedGenre === genre.id
//                         ? "border-cyan-500 bg-slate-800/80"
//                         : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
//                     }`}
//                   >
//                     <div
//                       className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${genre.color} rounded-lg flex items-center justify-center`}
//                     >
//                       <genre.icon className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="text-sm font-medium">{genre.name}</div>

//                     <AnimatePresence>
//                       {selectedGenre === genre.id && (
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           exit={{ scale: 0 }}
//                           className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
//                         >
//                           <motion.div
//                             initial={{ pathLength: 0 }}
//                             animate={{ pathLength: 1 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <svg
//                               className="w-4 h-4 text-white"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={3}
//                                 d="M5 13l4 4L19 7"
//                               />
//                             </svg>
//                           </motion.div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.button>
//                 ))}
//               </div>
//             </div>

//             {/* Create Button */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="pt-4"
//             >
//               <button
//                 onClick={handleCreate}
//                 disabled={!projectName || !selectedGenre || isCreating}
//                 className={`w-full px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
//                   projectName && selectedGenre && !isCreating
//                     ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-xl hover:shadow-cyan-500/25 cursor-pointer"
//                     : "bg-slate-700 text-slate-500 cursor-not-allowed"
//                 }`}
//               >
//                 {isCreating ? (
//                   <>
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 1,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                     />
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     Create Project
//                     <ChevronRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </motion.div>
//           </motion.div>

//           {/* Subtle Decorative Element */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.1 }}
//             transition={{ delay: 0.8, duration: 1 }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl -z-10"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
















//LOGIN/SIGNUP PAGE
// "use client"
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     username: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
//       {/* Subtle Grid Background */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 w-full max-w-md"
//       >
//         {/* Logo Section */}
//         <motion.div
//           className="text-center mb-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h1 className="text-4xl font-bold text-white mb-2">
//             StoryForge AI
//           </h1>
//           <p className="text-gray-500 text-sm">Craft Epic Game Narratives</p>
//         </motion.div>

//         {/* Auth Card */}
//         <motion.div
//           className="bg-zinc-900 rounded-xl p-8 border border-zinc-800"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {/* Toggle Buttons */}
//           <div className="flex gap-2 mb-8">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
//                 isLogin
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-transparent text-gray-400 hover:text-gray-300'
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
//                 !isLogin
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-transparent text-gray-400 hover:text-gray-300'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Form Container */}
//           <div className="space-y-5">
//             <AnimatePresence mode="wait">
//               {!isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <label className="block text-sm font-medium text-gray-400 mb-2">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
//                     placeholder="Choose a username"
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div>
//               <label className="block text-sm font-medium text-gray-400 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
//                 placeholder="your@email.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-400 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
//                 placeholder="••••••••"
//               />
//             </div>

//             {isLogin && (
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//             )}

//             <motion.button
//               onClick={handleSubmit}
//               className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//               whileHover={{ scale: 1.01 }}
//               whileTap={{ scale: 0.99 }}
//             >
//               {isLogin ? 'Sign In' : 'Create Account'}
//             </motion.button>
//           </div>

//           {/* Divider */}
//           <div className="my-6 relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-zinc-800"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-3 bg-zinc-900 text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           {/* Social Login */}
//           <div className="grid grid-cols-2 gap-3">
//             <motion.button
//               className="flex items-center justify-center px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-750 hover:border-zinc-600 transition-all"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               GitHub
//             </motion.button>
//             <motion.button
//               className="flex items-center justify-center px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-300 hover:bg-zinc-750 hover:border-zinc-600 transition-all"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//               </svg>
//               Google
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Footer Text */}
//         <motion.p
//           className="text-center text-gray-600 text-xs mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           By continuing, you agree to our{' '}
//           <button className="text-blue-500 hover:text-blue-400 transition-colors">
//             Terms of Service
//           </button>
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default AuthPage;





















//STORY EDITOR PAGE
// "use client";
// import React, { useState, useRef } from 'react';
// import { 
//   Save, 
//   Download, 
//   Users, 
//   Plus, 
//   Trash2, 
//   ZoomIn, 
//   ZoomOut, 
//   Sparkles,
//   GitBranch,
//   MessageSquare,
//   Settings,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const StoryEditor = () => {
//   const [nodes, setNodes] = useState([
//     { id: 1, x: 100, y: 100, title: 'Story Start', content: 'The hero awakens in a mysterious forest...', type: 'start' },
//     { id: 2, x: 400, y: 80, title: 'Choice A', content: 'Investigate the strange sounds', type: 'choice' },
//     { id: 3, x: 400, y: 200, title: 'Choice B', content: 'Follow the path ahead', type: 'choice' }
//   ]);
  
//   const [connections, setConnections] = useState([
//     { from: 1, to: 2 },
//     { from: 1, to: 3 }
//   ]);
  
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [dragging, setDragging] = useState(null);
//   const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
//   const [rightPanelOpen, setRightPanelOpen] = useState(true);
//   const [aiPanelOpen, setAiPanelOpen] = useState(false);
//   const [zoom, setZoom] = useState(1);
  
//   const canvasRef = useRef(null);

//   // Collaborative users (mock data)
//   const collaborators = [
//     { id: 1, name: 'John', color: '#3b82f6' },
//     { id: 2, name: 'Sarah', color: '#8b5cf6' }
//   ];

//   const handleNodeDrag = (nodeId, e) => {
//     if (dragging) {
//       const rect = canvasRef.current.getBoundingClientRect();
//       const x = (e.clientX - rect.left) / zoom;
//       const y = (e.clientY - rect.top) / zoom;
      
//       setNodes(nodes.map(node => 
//         node.id === nodeId ? { ...node, x: x - 75, y: y - 40 } : node
//       ));
//     }
//   };

//   const addNode = () => {
//     const newNode = {
//       id: Date.now(),
//       x: 300,
//       y: 300,
//       title: 'New Node',
//       content: 'Enter your story content here...',
//       type: 'choice'
//     };
//     setNodes([...nodes, newNode]);
//   };

//   const deleteNode = (nodeId) => {
//     setNodes(nodes.filter(n => n.id !== nodeId));
//     setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
//     if (selectedNode?.id === nodeId) setSelectedNode(null);
//   };

//   const updateNodeContent = (field, value) => {
//     if (!selectedNode) return;
//     setNodes(nodes.map(node => 
//       node.id === selectedNode.id ? { ...node, [field]: value } : node
//     ));
//     setSelectedNode({ ...selectedNode, [field]: value });
//   };

//   return (
//     <div className="h-screen bg-gray-950 text-gray-100 flex flex-col overflow-hidden pt-20">
//       {/* Top Navigation */}
//       <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <GitBranch className="w-5 h-5 text-blue-400" />
//             <h1 className="text-lg font-semibold">The Lost Kingdom</h1>
//           </div>
//           <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
//             Auto-saved 2m ago
//           </span>
//         </div>

//         <div className="flex items-center gap-3">
//           {/* Collaborators */}
//           <div className="flex items-center gap-2">
//             <Users className="w-4 h-4 text-gray-400" />
//             <div className="flex -space-x-2">
//               {collaborators.map(user => (
//                 <div 
//                   key={user.id}
//                   className="w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center text-xs font-medium"
//                   style={{ backgroundColor: user.color }}
//                 >
//                   {user.name[0]}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors">
//             <Save className="w-4 h-4" />
//             Save
//           </button>

//           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors">
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//         </div>
//       </header>

//       <div className="flex-1 flex overflow-hidden">
//         {/* Left Sidebar - Story Nodes List */}
//         <AnimatePresence>
//           {leftSidebarOpen && (
//             <motion.aside 
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               className="w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="font-semibold text-sm text-gray-400 uppercase tracking-wide">Story Nodes</h2>
//                 <button onClick={() => setLeftSidebarOpen(false)} className="text-gray-500 hover:text-gray-300">
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="space-y-2">
//                 {nodes.map(node => (
//                   <motion.button
//                     key={node.id}
//                     whileHover={{ scale: 1.02 }}
//                     onClick={() => setSelectedNode(node)}
//                     className={`w-full text-left p-3 rounded-lg transition-colors ${
//                       selectedNode?.id === node.id 
//                         ? 'bg-blue-600 text-white' 
//                         : 'bg-gray-800 hover:bg-gray-750 text-gray-300'
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{node.title}</div>
//                     <div className="text-xs text-gray-400 mt-1 truncate">
//                       {node.content.substring(0, 40)}...
//                     </div>
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {!leftSidebarOpen && (
//           <button 
//             onClick={() => setLeftSidebarOpen(true)}
//             className="absolute left-4 top-20 z-10 bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         )}

//         {/* Main Canvas */}
//         <main className="flex-1 relative bg-gray-950 overflow-hidden">
//           {/* Canvas Controls */}
//           <div className="absolute top-4 right-4 z-10 flex gap-2">
//             <button 
//               onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
//               className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
//             >
//               <ZoomIn className="w-4 h-4" />
//             </button>
//             <button 
//               onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
//               className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
//             >
//               <ZoomOut className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Canvas */}
//           <div 
//             ref={canvasRef}
//             className="w-full h-full relative"
//             style={{ 
//               backgroundImage: 'radial-gradient(circle, #1f2937 1px, transparent 1px)',
//               backgroundSize: '30px 30px',
//               backgroundPosition: 'center center'
//             }}
//             onMouseMove={(e) => dragging && handleNodeDrag(dragging, e)}
//             onMouseUp={() => setDragging(null)}
//           >
//             <svg className="absolute inset-0 w-full h-full pointer-events-none">
//               {connections.map((conn, idx) => {
//                 const fromNode = nodes.find(n => n.id === conn.from);
//                 const toNode = nodes.find(n => n.id === conn.to);
//                 if (!fromNode || !toNode) return null;

//                 const x1 = (fromNode.x + 75) * zoom;
//                 const y1 = (fromNode.y + 40) * zoom;
//                 const x2 = (toNode.x + 75) * zoom;
//                 const y2 = (toNode.y + 40) * zoom;

//                 return (
//                   <line
//                     key={idx}
//                     x1={x1}
//                     y1={y1}
//                     x2={x2}
//                     y2={y2}
//                     stroke="#4b5563"
//                     strokeWidth="2"
//                     strokeDasharray="5,5"
//                   />
//                 );
//               })}
//             </svg>

//             {nodes.map(node => (
//               <motion.div
//                 key={node.id}
//                 drag
//                 dragMomentum={false}
//                 onMouseDown={() => setDragging(node.id)}
//                 onClick={() => setSelectedNode(node)}
//                 style={{ 
//                   x: node.x * zoom, 
//                   y: node.y * zoom,
//                   scale: zoom
//                 }}
//                 className={`absolute w-36 bg-gray-800 rounded-lg border-2 cursor-move shadow-lg ${
//                   selectedNode?.id === node.id ? 'border-blue-500' : 'border-gray-700'
//                 } ${node.type === 'start' ? 'border-green-500' : ''}`}
//               >
//                 <div className="p-3">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="text-xs font-semibold truncate">{node.title}</div>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         deleteNode(node.id);
//                       }}
//                       className="text-red-400 hover:text-red-300"
//                     >
//                       <Trash2 className="w-3 h-3" />
//                     </button>
//                   </div>
//                   <div className="text-xs text-gray-400 line-clamp-2">
//                     {node.content}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Bottom Toolbar */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-2 flex gap-2">
//             <button 
//               onClick={addNode}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
//             >
//               <Plus className="w-4 h-4" />
//               Add Node
//             </button>

//             <button 
//               onClick={() => setAiPanelOpen(!aiPanelOpen)}
//               className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2"
//             >
//               <Sparkles className="w-4 h-4" />
//               AI Assistant
//             </button>
//           </div>
//         </main>

//         {/* Right Panel - Node Properties */}
//         <AnimatePresence>
//           {rightPanelOpen && (
//             <motion.aside 
//               initial={{ x: 400 }}
//               animate={{ x: 0 }}
//               exit={{ x: 400 }}
//               className="w-80 bg-gray-900 border-l border-gray-800 p-4 overflow-y-auto"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="font-semibold text-sm text-gray-400 uppercase tracking-wide">Properties</h2>
//                 <button onClick={() => setRightPanelOpen(false)} className="text-gray-500 hover:text-gray-300">
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>

//               {selectedNode ? (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-400 mb-2">Title</label>
//                     <input 
//                       type="text"
//                       value={selectedNode.title}
//                       onChange={(e) => updateNodeContent('title', e.target.value)}
//                       className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-400 mb-2">Content</label>
//                     <textarea 
//                       value={selectedNode.content}
//                       onChange={(e) => updateNodeContent('content', e.target.value)}
//                       rows={6}
//                       className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-400 mb-2">Node Type</label>
//                     <select 
//                       value={selectedNode.type}
//                       onChange={(e) => updateNodeContent('type', e.target.value)}
//                       className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
//                     >
//                       <option value="start">Start</option>
//                       <option value="choice">Choice</option>
//                       <option value="dialogue">Dialogue</option>
//                       <option value="end">End</option>
//                     </select>
//                   </div>

//                   <button className="w-full bg-purple-600 hover:bg-purple-700 rounded-lg py-2 flex items-center justify-center gap-2">
//                     <Sparkles className="w-4 h-4" />
//                     Generate with AI
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-center text-gray-500 mt-12">
//                   <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p>Select a node to edit</p>
//                 </div>
//               )}
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {!rightPanelOpen && (
//           <button 
//             onClick={() => setRightPanelOpen(true)}
//             className="absolute right-4 top-20 z-10 bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* AI Assistant Panel */}
//       <AnimatePresence>
//         {aiPanelOpen && (
//           <motion.div
//             initial={{ y: 400 }}
//             animate={{ y: 0 }}
//             exit={{ y: 400 }}
//             className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-6 shadow-2xl"
//             style={{ height: '300px' }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-purple-400" />
//                 <h3 className="font-semibold">AI Story Assistant</h3>
//               </div>
//               <button onClick={() => setAiPanelOpen(false)} className="text-gray-500 hover:text-gray-300">
//                 ✕
//               </button>
//             </div>

//             <div className="bg-gray-800 rounded-lg p-4 mb-3 h-32 overflow-y-auto text-sm text-gray-300">
//               <p className="mb-2">💡 <strong>Suggestion:</strong> Add emotional depth by exploring the hero's motivation for entering the forest.</p>
//               <p>📝 <strong>Plot Twist Idea:</strong> The strange sounds could be from a wounded guardian spirit.</p>
//             </div>

//             <div className="flex gap-2">
//               <input 
//                 type="text"
//                 placeholder="Ask AI to help with your story..."
//                 className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
//               />
//               <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium">
//                 Generate
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default StoryEditor;






















































//STORIES PAGE
"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Calendar, 
  Clock, 
  Trash2, 
  Search,
  X
} from 'lucide-react';

export default function StoriesDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewStoryModal, setShowNewStoryModal] = useState(false);
  const [newStoryData, setNewStoryData] = useState({
    title: '',
    description: '',
    genre: 'Fantasy'
  });

  // Mock data - replace with real data from your backend
  const stories = [
    {
      id: 1,
      title: "The Last Guardian",
      description: "An epic fantasy tale about a warrior protecting an ancient artifact",
      lastModified: "2 hours ago",
      created: "Jan 15, 2025",
      nodeCount: 12
    },
    {
      id: 2,
      title: "Neon Shadows",
      description: "A cyberpunk thriller set in a dystopian future city",
      lastModified: "1 day ago",
      created: "Jan 10, 2025",
      nodeCount: 8
    },
    {
      id: 3,
      title: "Whispers in the Dark",
      description: "A psychological horror story exploring the depths of fear",
      lastModified: "3 days ago",
      created: "Dec 28, 2024",
      nodeCount: 15
    },
    {
      id: 4,
      title: "Ocean's Echo",
      description: "A romantic adventure on the high seas",
      lastModified: "1 week ago",
      created: "Dec 20, 2024",
      nodeCount: 6
    }
  ];

  const filteredStories = stories.filter(story => {
    return story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           story.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateStory = () => {
    // Handle story creation logic here
    console.log('Creating story:', newStoryData);
    setShowNewStoryModal(false);
    setNewStoryData({ title: '', description: '', genre: 'Fantasy' });
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-gray-300 pt-20">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#0d1b2a] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-white mb-1">My Stories</h1>
          <p className="text-sm text-gray-400">Create and manage your story projects</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#1a2332] border border-gray-800 rounded text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
            />
          </div>
        </div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No stories found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? "Try a different search term" : "Start creating your first story"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowNewStoryModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors"
              >
                Create Your First Story
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#1a2332] border border-gray-800 rounded p-5 hover:border-gray-700 transition-colors cursor-pointer group"
              >
                {/* Story Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1 truncate">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {story.description}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Story Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span>{story.nodeCount} nodes</span>
                </div>

                {/* Story Dates */}
                <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{story.lastModified}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{story.created}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add New Story Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setShowNewStoryModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Story
          </button>
        </div>

        {/* New Story Modal */}
        <AnimatePresence>
          {showNewStoryModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40"
                onClick={() => setShowNewStoryModal(false)}
              />
              
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-[#1a2332] border border-gray-800 rounded-lg w-full max-w-lg"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white">Create New Story</h2>
                    <button
                      onClick={() => setShowNewStoryModal(false)}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-6 py-5 space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Story Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newStoryData.title}
                        onChange={handleInputChange}
                        placeholder="Enter story title..."
                        className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newStoryData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your story..."
                        rows={4}
                        className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Genre
                      </label>
                      <select
                        name="genre"
                        value={newStoryData.genre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-gray-700 transition-colors"
                      >
                        <option>Fantasy</option>
                        <option>Sci-Fi</option>
                        <option>Horror</option>
                        <option>Romance</option>
                        <option>Mystery</option>
                        <option>Adventure</option>
                      </select>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 px-6 py-4 border-t border-gray-800">
                    <button
                      onClick={() => setShowNewStoryModal(false)}
                      className="flex-1 px-4 py-2 bg-[#0d1b2a] hover:bg-[#0a1628] text-gray-300 rounded text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateStory}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                    >
                      Create Story
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}























































//LOGIN/SIGNUP PAGE
// "use client"
// import React, { useState } from 'react';
// import { 
//   Mail, 
//   Lock, 
//   User, 
//   Eye, 
//   EyeOff, 
//   GitBranch, 
//   Sparkles,
//   Check,
//   X,
//   Github,
//   Chrome,
//   BookOpen,
//   Zap,
//   Users
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     rememberMe: false,
//     acceptTerms: false
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const features = [
//     { icon: BookOpen, text: "Visual story editor with branching narratives" },
//     { icon: Sparkles, text: "AI-powered dialogue and plot generation" },
//     { icon: Users, text: "Real-time collaborative writing" },
//     { icon: Zap, text: "Export to Unity, Unreal & more" }
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: '' });
//     }
//   };

//   const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const getPasswordStrength = (password) => {
//     if (password.length === 0) return { strength: 0, label: '', color: '' };
//     if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
//     if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
//     if (password.length < 14) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
//     return { strength: 100, label: 'Strong', color: 'bg-green-500' };
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!isLogin) {
//       if (!formData.name) {
//         newErrors.name = 'Name is required';
//       }

//       if (!formData.confirmPassword) {
//         newErrors.confirmPassword = 'Please confirm your password';
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }

//       if (!formData.acceptTerms) {
//         newErrors.acceptTerms = 'You must accept the terms and conditions';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
    
//     setTimeout(() => {
//       setIsLoading(false);
//       console.log('Form submitted:', formData);
//     }, 1500);
//   };

//   const handleSocialAuth = (provider) => {
//     console.log(`Authenticating with ${provider}`);
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-100 flex overflow-hidden relative">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Left Panel - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 bg-gradient-to-br from-gray-900 to-gray-950">
//         <div>
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex items-center gap-3 mb-8"
//           >
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <GitBranch className="w-7 h-7" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold">StoryForge AI</h1>
//               <p className="text-sm text-gray-400">Professional Story Building</p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h2 className="text-4xl font-bold mb-4 leading-tight">
//               Craft Epic Game<br />Narratives with AI
//             </h2>
//             <p className="text-gray-400 text-lg mb-8">
//               Build branching storylines, generate dialogue, and collaborate with your team in real-time.
//             </p>
//           </motion.div>

//           <motion.div 
//             className="space-y-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             {features.map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 + idx * 0.1 }}
//                 className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
//               >
//                 <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <feature.icon className="w-5 h-5 text-blue-400" />
//                 </div>
//                 <span className="text-gray-300">{feature.text}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="text-sm text-gray-500"
//         >
//           <p>Trusted by indie developers and studios worldwide</p>
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex -space-x-2">
//               {[1, 2, 3, 4].map(i => (
//                 <div 
//                   key={i}
//                   className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900"
//                 />
//               ))}
//             </div>
//             <span className="text-gray-400">500+ active creators</span>
//           </div>
//         </motion.div>
//       </div>

//       {/* Right Panel - Auth Form */}
//       <div className="flex-1 flex items-center justify-center p-8 relative z-10">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="w-full max-w-md"
//         >
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <GitBranch className="w-6 h-6" />
//             </div>
//             <span className="text-xl font-bold">StoryForge AI</span>
//           </div>

//           <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
//             {/* Toggle Tabs */}
//             <div className="flex bg-gray-800 rounded-lg p-1 mb-8">
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
//                   isLogin 
//                     ? 'bg-blue-600 text-white' 
//                     : 'text-gray-400 hover:text-gray-300'
//                 }`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
//                   !isLogin 
//                     ? 'bg-blue-600 text-white' 
//                     : 'text-gray-400 hover:text-gray-300'
//                 }`}
//               >
//                 Sign Up
//               </button>
//             </div>

//             {/* Social Auth */}
//             <div className="space-y-3 mb-6">
//               <button
//                 onClick={() => handleSocialAuth('google')}
//                 className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg flex items-center justify-center gap-3 transition-colors"
//               >
//                 <Chrome className="w-5 h-5" />
//                 <span>Continue with Google</span>
//               </button>
//               <button
//                 onClick={() => handleSocialAuth('github')}
//                 className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg flex items-center justify-center gap-3 transition-colors"
//               >
//                 <Github className="w-5 h-5" />
//                 <span>Continue with GitHub</span>
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex-1 h-px bg-gray-700"></div>
//               <span className="text-sm text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-700"></div>
//             </div>

//             {/* Form Fields */}
//             <div className="space-y-4">
//               <AnimatePresence mode="wait">
//                 {!isLogin && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                   >
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Full Name
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//                       <input
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) => handleInputChange('name', e.target.value)}
//                         placeholder="John Doe"
//                         className={`w-full pl-11 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                           errors.name 
//                             ? 'border-red-500 focus:ring-red-500/50' 
//                             : 'border-gray-700 focus:ring-blue-500/50'
//                         }`}
//                       />
//                     </div>
//                     {errors.name && (
//                       <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
//                         <X className="w-4 h-4" />
//                         {errors.name}
//                       </p>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     placeholder="you@example.com"
//                     className={`w-full pl-11 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                       errors.email 
//                         ? 'border-red-500 focus:ring-red-500/50' 
//                         : 'border-gray-700 focus:ring-blue-500/50'
//                     }`}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
//                     <X className="w-4 h-4" />
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => handleInputChange('password', e.target.value)}
//                     placeholder="••••••••"
//                     className={`w-full pl-11 pr-12 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                       errors.password 
//                         ? 'border-red-500 focus:ring-red-500/50' 
//                         : 'border-gray-700 focus:ring-blue-500/50'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
//                     <X className="w-4 h-4" />
//                     {errors.password}
//                   </p>
//                 )}

//                 {!isLogin && formData.password && (
//                   <div className="mt-2">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${passwordStrength.strength}%` }}
//                           className={`h-full ${passwordStrength.color}`}
//                         />
//                       </div>
//                       <span className="text-xs text-gray-400">{passwordStrength.label}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <AnimatePresence mode="wait">
//                 {!isLogin && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                   >
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Confirm Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//                       <input
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         value={formData.confirmPassword}
//                         onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                         placeholder="••••••••"
//                         className={`w-full pl-11 pr-12 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                           errors.confirmPassword 
//                             ? 'border-red-500 focus:ring-red-500/50' 
//                             : 'border-gray-700 focus:ring-blue-500/50'
//                         }`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
//                         <X className="w-4 h-4" />
//                         {errors.confirmPassword}
//                       </p>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div className="flex items-start">
//                 {isLogin ? (
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.rememberMe}
//                       onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
//                       className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-400">Remember me</span>
//                   </label>
//                 ) : (
//                   <label className="flex items-start gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.acceptTerms}
//                       onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
//                       className="w-4 h-4 mt-0.5 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-400">
//                       I agree to the{' '}
//                       <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
//                       {' '}and{' '}
//                       <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
//                     </span>
//                   </label>
//                 )}
//               </div>
//               {errors.acceptTerms && (
//                 <p className="text-red-400 text-sm flex items-center gap-1">
//                   <X className="w-4 h-4" />
//                   {errors.acceptTerms}
//                 </p>
//               )}

//               {isLogin && (
//                 <div className="text-right">
//                   <a href="#" className="text-sm text-blue-400 hover:underline">
//                     Forgot password?
//                   </a>
//                 </div>
//               )}

//               <motion.button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//                 className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
//                 )}
//               </motion.button>
//             </div>

//             <p className="text-center text-sm text-gray-500 mt-6">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
//               <button
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-blue-400 hover:underline font-medium"
//               >
//                 {isLogin ? 'Sign up' : 'Login'}
//               </button>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

























































