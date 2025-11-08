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





























































//STORY EDITOR PAGE
"use client";
import React, { useState } from 'react';
import { Send, User, ArrowLeft, MessageSquare } from 'lucide-react';

const CharacterChat = () => {
  // Sample character data - replace with your actual data from backend
  const [characters] = useState([
    {
      id: 1,
      name: "Elena the Wise",
      personality: "Wise and mystical",
      avatar: "🧙‍♀️",
      lastMessage: "The prophecy speaks of great change..."
    },
    {
      id: 2,
      name: "Marcus the Brave",
      personality: "Courageous warrior",
      avatar: "⚔️",
      lastMessage: "We must prepare for battle!"
    },
    {
      id: 3,
      name: "Luna the Healer",
      personality: "Gentle and caring",
      avatar: "🌙",
      lastMessage: "Your wounds will heal in time."
    }
  ]);

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle character selection
  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    // Load chat history for this character (implement backend call here)
    setMessages([
      {
        id: 1,
        sender: 'character',
        text: `Hello! I'm ${character.name}. How can I assist you today?`,
        timestamp: new Date()
      }
    ]);
  };

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // TODO: Call your Ollama API here
    // Simulating AI response for now
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'character',
        text: `As ${selectedCharacter.name}, I respond to your message...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Back to character list (mobile)
  const handleBack = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="flex h-screen bg-[#0a1628] mt-20">
      {/* CHARACTER LIST SIDEBAR */}
      <div 
        className={`
          ${selectedCharacter ? 'hidden md:flex' : 'flex'}
          w-full md:w-80 lg:w-96
          flex-col
          bg-[#0f1f3a]
          border-r border-gray-800
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#3b82f6]" />
            Your Characters
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Select a character to chat with
          </p>
        </div>

        {/* Character List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {characters.map((character) => (
            <button
              key={character.id}
              onClick={() => handleSelectCharacter(character)}
              className={`
                w-full p-4 rounded-lg text-left
                transition-all duration-200
                hover:bg-[#1a2942] hover:scale-[1.02]
                ${selectedCharacter?.id === character.id 
                  ? 'bg-[#1a2942] border-l-4 border-[#3b82f6]' 
                  : 'bg-[#0a1628] border-l-4 border-transparent'
                }
              `}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="text-4xl flex-shrink-0">
                  {character.avatar}
                </div>
                
                {/* Character Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">
                    {character.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {character.personality}
                  </p>
                  <p className="text-gray-400 text-sm mt-2 truncate">
                    {character.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {/* Empty State */}
          {characters.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No characters created yet</p>
              <button className="mt-4 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                Create Character
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div 
        className={`
          ${selectedCharacter ? 'flex' : 'hidden md:flex'}
          flex-1 flex-col
          bg-[#0a1628]
        `}
      >
        {selectedCharacter ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 bg-[#0f1f3a]">
              <div className="flex items-center gap-3">
                {/* Back Button (Mobile) */}
                <button 
                  onClick={handleBack}
                  className="md:hidden p-2 hover:bg-[#1a2942] rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>

                {/* Character Info */}
                <div className="text-3xl">{selectedCharacter.avatar}</div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {selectedCharacter.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {selectedCharacter.personality}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`
                    flex
                    ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
                  `}
                >
                  <div
                    className={`
                      max-w-[80%] md:max-w-[70%] lg:max-w-[60%]
                      px-4 py-3 rounded-2xl
                      ${message.sender === 'user'
                        ? 'bg-[#3b82f6] text-white rounded-br-sm'
                        : 'bg-[#0f1f3a] text-gray-100 rounded-bl-sm'
                      }
                    `}
                  >
                    <p className="text-sm md:text-base leading-relaxed">
                      {message.text}
                    </p>
                    <p className="text-xs mt-2 opacity-60">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0f1f3a] px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800 bg-[#0f1f3a]">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Chat with ${selectedCharacter.name}...`}
                  className="
                    flex-1 px-4 py-3 rounded-xl
                    bg-[#0a1628] text-white
                    border border-gray-700
                    focus:outline-none focus:border-[#3b82f6]
                    placeholder-gray-500
                    transition-colors
                  "
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="
                    px-6 py-3 rounded-xl
                    bg-[#3b82f6] hover:bg-[#2563eb]
                    disabled:bg-gray-700 disabled:cursor-not-allowed
                    transition-colors
                    flex items-center gap-2
                  "
                >
                  <Send className="w-5 h-5 text-white" />
                  <span className="hidden sm:inline text-white font-medium">
                    Send
                  </span>
                </button>
              </form>
            </div>
          </>
        ) : (
          // Empty State - No Character Selected
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <MessageSquare className="w-20 h-20 text-gray-700 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Select a Character
              </h3>
              <p className="text-gray-400">
                Choose a character from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterChat;








































































//STORIES PAGE
// "use client"
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Plus, 
//   BookOpen, 
//   Calendar, 
//   Clock, 
//   Trash2, 
//   Search,
//   X
// } from 'lucide-react';

// export default function StoriesDashboard() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showNewStoryModal, setShowNewStoryModal] = useState(false);
//   const [newStoryData, setNewStoryData] = useState({
//     title: '',
//     description: '',
//     genre: 'Fantasy'
//   });

//   // Mock data - replace with real data from your backend
//   const stories = [
//     {
//       id: 1,
//       title: "The Last Guardian",
//       description: "An epic fantasy tale about a warrior protecting an ancient artifact",
//       lastModified: "2 hours ago",
//       created: "Jan 15, 2025",
//       nodeCount: 12
//     },
//     {
//       id: 2,
//       title: "Neon Shadows",
//       description: "A cyberpunk thriller set in a dystopian future city",
//       lastModified: "1 day ago",
//       created: "Jan 10, 2025",
//       nodeCount: 8
//     },
//     {
//       id: 3,
//       title: "Whispers in the Dark",
//       description: "A psychological horror story exploring the depths of fear",
//       lastModified: "3 days ago",
//       created: "Dec 28, 2024",
//       nodeCount: 15
//     },
//     {
//       id: 4,
//       title: "Ocean's Echo",
//       description: "A romantic adventure on the high seas",
//       lastModified: "1 week ago",
//       created: "Dec 20, 2024",
//       nodeCount: 6
//     }
//   ];

//   const filteredStories = stories.filter(story => {
//     return story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//            story.description.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStoryData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCreateStory = () => {
//     // Handle story creation logic here
//     console.log('Creating story:', newStoryData);
//     setShowNewStoryModal(false);
//     setNewStoryData({ title: '', description: '', genre: 'Fantasy' });
//   };

//   return (
//     <div className="min-h-screen bg-[#0a1628] text-gray-300 pt-20">
//       {/* Header */}
//       <div className="border-b border-gray-800 bg-[#0d1b2a] px-6 py-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-semibold text-white mb-1">My Stories</h1>
//           <p className="text-sm text-gray-400">Create and manage your story projects</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search stories..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-[#1a2332] border border-gray-800 rounded text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
//             />
//           </div>
//         </div>

//         {/* Stories Grid */}
//         {filteredStories.length === 0 ? (
//           <div className="text-center py-20">
//             <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//             <h3 className="text-xl font-medium text-gray-400 mb-2">No stories found</h3>
//             <p className="text-gray-500 mb-6">
//               {searchQuery ? "Try a different search term" : "Start creating your first story"}
//             </p>
//             {!searchQuery && (
//               <button
//                 onClick={() => setShowNewStoryModal(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors"
//               >
//                 Create Your First Story
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredStories.map((story) => (
//               <motion.div
//                 key={story.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="bg-[#1a2332] border border-gray-800 rounded p-5 hover:border-gray-700 transition-colors cursor-pointer group"
//               >
//                 {/* Story Header */}
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-start gap-3 flex-1">
//                     <div className="w-10 h-10 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0">
//                       <BookOpen className="w-5 h-5 text-blue-400" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-white font-medium mb-1 truncate">
//                         {story.title}
//                       </h3>
//                       <p className="text-sm text-gray-400 line-clamp-2">
//                         {story.description}
//                       </p>
//                     </div>
//                   </div>
//                   <button className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Story Stats */}
//                 <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
//                   <span>{story.nodeCount} nodes</span>
//                 </div>

//                 {/* Story Dates */}
//                 <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-800">
//                   <div className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     <span>{story.lastModified}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3" />
//                     <span>{story.created}</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Add New Story Button */}
//         <div className="fixed bottom-8 right-8">
//           <button
//             onClick={() => setShowNewStoryModal(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             New Story
//           </button>
//         </div>

//         {/* New Story Modal */}
//         <AnimatePresence>
//           {showNewStoryModal && (
//             <>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 bg-black/60 z-40"
//                 onClick={() => setShowNewStoryModal(false)}
//               />
              
//               <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//                 <motion.div
//                   initial={{ scale: 0.95, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.95, opacity: 0 }}
//                   className="bg-[#1a2332] border border-gray-800 rounded-lg w-full max-w-lg"
//                 >
//                   {/* Modal Header */}
//                   <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//                     <h2 className="text-lg font-semibold text-white">Create New Story</h2>
//                     <button
//                       onClick={() => setShowNewStoryModal(false)}
//                       className="text-gray-500 hover:text-gray-300 transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   {/* Modal Body */}
//                   <div className="px-6 py-5 space-y-4">
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-2">
//                         Story Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={newStoryData.title}
//                         onChange={handleInputChange}
//                         placeholder="Enter story title..."
//                         className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-2">
//                         Description
//                       </label>
//                       <textarea
//                         name="description"
//                         value={newStoryData.description}
//                         onChange={handleInputChange}
//                         placeholder="Describe your story..."
//                         rows={4}
//                         className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700 transition-colors resize-none"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-2">
//                         Genre
//                       </label>
//                       <select
//                         name="genre"
//                         value={newStoryData.genre}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 bg-[#0d1b2a] border border-gray-800 rounded text-gray-300 focus:outline-none focus:border-gray-700 transition-colors"
//                       >
//                         <option>Fantasy</option>
//                         <option>Sci-Fi</option>
//                         <option>Horror</option>
//                         <option>Romance</option>
//                         <option>Mystery</option>
//                         <option>Adventure</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Modal Footer */}
//                   <div className="flex gap-3 px-6 py-4 border-t border-gray-800">
//                     <button
//                       onClick={() => setShowNewStoryModal(false)}
//                       className="flex-1 px-4 py-2 bg-[#0d1b2a] hover:bg-[#0a1628] text-gray-300 rounded text-sm font-medium transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleCreateStory}
//                       className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
//                     >
//                       Create Story
//                     </button>
//                   </div>
//                 </motion.div>
//               </div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }























































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

























































