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
// "use client";
// import React, { useState, useCallback } from 'react';
// import ReactFlow, { 
//   MiniMap, 
//   Controls, 
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   MarkerType
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   GitBranch, 
//   Users, 
//   User, 
//   MessageSquare, 
//   Plus,
//   Trash2,
//   Edit,
//   Send,
//   Sparkles,
//   BookOpen,
//   Zap
// } from 'lucide-react';

// // Initial nodes and edges for the story flow
// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Story Beginning: The Hero\'s Call' },
//     position: { x: 250, y: 5 },
//     style: { background: '#6366f1', color: 'white', border: '2px solid #4f46e5', borderRadius: '8px', padding: '10px' }
//   },
//   {
//     id: '2',
//     data: { label: 'Choice: Accept the Quest' },
//     position: { x: 100, y: 150 },
//     style: { background: '#10b981', color: 'white', border: '2px solid #059669', borderRadius: '8px', padding: '10px' }
//   },
//   {
//     id: '3',
//     data: { label: 'Choice: Refuse and Stay Home' },
//     position: { x: 400, y: 150 },
//     style: { background: '#ef4444', color: 'white', border: '2px solid #dc2626', borderRadius: '8px', padding: '10px' }
//   },
// ];

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
//   { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#ef4444' }, markerEnd: { type: MarkerType.ArrowClosed } },
// ];

// const StoryForgeEditor = () => {
//   const [activeTab, setActiveTab] = useState('flow');
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
//   // Character Studio State
//   const [characters, setCharacters] = useState([
//     {
//       id: 1,
//       name: 'Elena the Brave',
//       backstory: 'A fearless knight who lost her family to a dragon attack.',
//       personality: 'Courageous, determined, sometimes reckless',
//       traits: ['brave', 'loyal', 'hot-headed'],
//       hasAI: true
//     }
//   ]);
//   const [showCharacterForm, setShowCharacterForm] = useState(false);
//   const [newCharacter, setNewCharacter] = useState({
//     name: '',
//     backstory: '',
//     personality: '',
//     traits: []
//   });

//   // AI Chat State
//   const [selectedCharacter, setSelectedCharacter] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState('');

//   // Collaboration State
//   const [collaborators, setCollaborators] = useState([
//     { id: 1, name: 'Alex Chen', status: 'online', lastEdit: '2 min ago', avatar: '👨‍💻' },
//     { id: 2, name: 'Sarah Miller', status: 'online', lastEdit: '5 min ago', avatar: '👩‍🎨' },
//     { id: 3, name: 'Mike Johnson', status: 'away', lastEdit: '1 hour ago', avatar: '👨‍🎨' }
//   ]);
//   const [recentChanges, setRecentChanges] = useState([
//     { user: 'Alex Chen', action: 'Added new story node', time: '2 min ago', node: 'The Dark Forest' },
//     { user: 'Sarah Miller', action: 'Updated character dialogue', time: '5 min ago', node: 'Village Elder' },
//     { user: 'You', action: 'Created new branch', time: '10 min ago', node: 'Dragon\'s Lair' }
//   ]);

//   // React Flow handlers
//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

//   const addNewNode = () => {
//     const newNode = {
//       id: `${nodes.length + 1}`,
//       data: { label: 'New Story Node' },
//       position: { x: Math.random() * 400, y: nodes.length * 100 + 100 },
//       style: { background: '#8b5cf6', color: 'white', border: '2px solid #7c3aed', borderRadius: '8px', padding: '10px' }
//     };
//     setNodes((nds) => [...nds, newNode]);
//   };

//   // Character handlers
//   const addCharacter = () => {
//     if (newCharacter.name && newCharacter.personality) {
//       setCharacters([...characters, {
//         id: characters.length + 1,
//         ...newCharacter,
//         hasAI: false,
//         traits: newCharacter.traits.filter(t => t.trim() !== '')
//       }]);
//       setNewCharacter({ name: '', backstory: '', personality: '', traits: [] });
//       setShowCharacterForm(false);
//     }
//   };

//   const createAIAgent = (characterId) => {
//     setCharacters(characters.map(char => 
//       char.id === characterId ? { ...char, hasAI: true } : char
//     ));
//   };

//   const deleteCharacter = (characterId) => {
//     setCharacters(characters.filter(char => char.id !== characterId));
//   };

//   // AI Chat handlers
//   const sendMessage = () => {
//     if (!currentMessage.trim() || !selectedCharacter) return;

//     const userMsg = {
//       id: Date.now(),
//       sender: 'user',
//       text: currentMessage,
//       timestamp: new Date().toLocaleTimeString()
//     };

//     // Simulate AI response (in real app, this would call your Ollama API)
//     const aiResponse = {
//       id: Date.now() + 1,
//       sender: 'ai',
//       text: generateCharacterResponse(currentMessage, selectedCharacter),
//       timestamp: new Date().toLocaleTimeString()
//     };

//     setChatMessages([...chatMessages, userMsg, aiResponse]);
//     setCurrentMessage('');
//   };

//   const generateCharacterResponse = (message, character) => {
//     // This is a mock response. In production, you'd call your Ollama API here
//     const responses = [
//       `*${character.name} speaks in a ${character.personality} manner* "${message.toLowerCase().includes('quest') ? 'The quest you speak of is dangerous, but I fear no challenge!' : 'Interesting... tell me more.'}"`,
//       `*${character.name} considers your words* "Based on my personality as ${character.personality}, I believe ${message.toLowerCase().includes('help') ? 'I should aid you in this endeavor.' : 'we should proceed with caution.'}"`,
//       `"As someone who is ${character.personality}, I ${message.toLowerCase().includes('danger') ? 'embrace the thrill of danger!' : 'approach this thoughtfully.'}" *${character.name} says firmly*`
//     ];
//     return responses[Math.floor(Math.random() * responses.length)];
//   };

//   const tabs = [
//     { id: 'flow', name: 'Visual Flow', icon: GitBranch },
//     { id: 'collab', name: 'Collaboration', icon: Users },
//     { id: 'characters', name: 'Character Studio', icon: User },
//     { id: 'ai-chat', name: 'AI Character Chat', icon: MessageSquare }
//   ];

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
//       {/* Header */}
//       <div className="bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/30 p-4">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-white">StoryForge AI</h1>
//               <p className="text-sm text-purple-300">Story Editor</p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2">
//               <Sparkles className="w-4 h-4" />
//               AI Assist
//             </button>
//             <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
//               Save Story
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="bg-slate-800/30 backdrop-blur-sm border-b border-purple-500/20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex gap-1">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-6 py-3 flex items-center gap-2 transition-all relative ${
//                     activeTab === tab.id
//                       ? 'text-white'
//                       : 'text-purple-300 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.name}
//                   {activeTab === tab.id && (
//                     <motion.div
//                       layoutId="activeTab"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
//                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="flex-1 overflow-hidden">
//         <AnimatePresence mode="wait">
//           {/* Visual Flow Tab */}
//           {activeTab === 'flow' && (
//             <motion.div
//               key="flow"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="h-full relative"
//             >
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 fitView
//                 className="bg-slate-900"
//               >
//                 <Background color="#6366f1" gap={16} />
//                 <Controls className="bg-slate-800 border border-purple-500/30" />
//                 <MiniMap 
//                   nodeColor={(node) => {
//                     if (node.type === 'input') return '#6366f1';
//                     return '#8b5cf6';
//                   }}
//                   className="bg-slate-800 border border-purple-500/30"
//                 />
//               </ReactFlow>
              
//               <button
//                 onClick={addNewNode}
//                 className="absolute bottom-24 right-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add Story Node
//               </button>

            
//             </motion.div>
//           )}

//           {/* Collaboration Tab */}
//           {activeTab === 'collab' && (
//             <motion.div
//               key="collab"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="h-full overflow-auto p-6"
//             >
//               <div className="max-w-6xl mx-auto space-y-6">
//                 {/* Active Collaborators */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
//                   <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                     <Users className="w-5 h-5 text-purple-400" />
//                     Active Collaborators
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {collaborators.map((collab) => (
//                       <div key={collab.id} className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/20">
//                         <div className="flex items-center gap-3">
//                           <div className="text-3xl">{collab.avatar}</div>
//                           <div className="flex-1">
//                             <h3 className="text-white font-semibold">{collab.name}</h3>
//                             <div className="flex items-center gap-2 mt-1">
//                               <div className={`w-2 h-2 rounded-full ${collab.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`} />
//                               <span className="text-sm text-purple-300">{collab.status}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <p className="text-xs text-purple-400 mt-2">Last edit: {collab.lastEdit}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Recent Changes */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
//                   <h2 className="text-xl font-bold text-white mb-4">Recent Changes</h2>
//                   <div className="space-y-3">
//                     {recentChanges.map((change, idx) => (
//                       <div key={idx} className="bg-slate-700/30 rounded-lg p-4 border border-purple-500/10">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <p className="text-white">
//                               <span className="font-semibold text-purple-400">{change.user}</span> {change.action}
//                             </p>
//                             <p className="text-sm text-purple-300 mt-1">Node: {change.node}</p>
//                           </div>
//                           <span className="text-xs text-purple-400">{change.time}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Live Activity Feed */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
//                   <h2 className="text-xl font-bold text-white mb-4">Live Activity Feed</h2>
//                   <div className="h-48 bg-slate-900/50 rounded-lg p-4 overflow-y-auto">
//                     <p className="text-purple-300 text-sm">🟢 Real-time collaboration updates will appear here...</p>
//                     <p className="text-purple-400 text-xs mt-2">WebSocket connection: Ready</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Character Studio Tab */}
//           {activeTab === 'characters' && (
//             <motion.div
//               key="characters"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="h-full overflow-auto p-6"
//             >
//               <div className="max-w-6xl mx-auto space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                     <User className="w-6 h-6 text-purple-400" />
//                     Character Studio
//                   </h2>
//                   <button
//                     onClick={() => setShowCharacterForm(!showCharacterForm)}
//                     className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg flex items-center gap-2 transition-all"
//                   >
//                     <Plus className="w-4 h-4" />
//                     New Character
//                   </button>
//                 </div>

//                 {/* Character Creation Form */}
//                 {showCharacterForm && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
//                   >
//                     <h3 className="text-xl font-bold text-white mb-4">Create New Character</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-purple-300 mb-2">Character Name</label>
//                         <input
//                           type="text"
//                           value={newCharacter.name}
//                           onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
//                           className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
//                           placeholder="e.g., Marcus the Wise"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-purple-300 mb-2">Backstory</label>
//                         <textarea
//                           value={newCharacter.backstory}
//                           onChange={(e) => setNewCharacter({...newCharacter, backstory: e.target.value})}
//                           className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-24"
//                           placeholder="Describe their history and motivations..."
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-purple-300 mb-2">Personality</label>
//                         <input
//                           type="text"
//                           value={newCharacter.personality}
//                           onChange={(e) => setNewCharacter({...newCharacter, personality: e.target.value})}
//                           className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
//                           placeholder="e.g., Wise, cautious, mysterious"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-purple-300 mb-2">Traits (comma-separated)</label>
//                         <input
//                           type="text"
//                           onChange={(e) => setNewCharacter({...newCharacter, traits: e.target.value.split(',')})}
//                           className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
//                           placeholder="e.g., wise, patient, mysterious"
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={addCharacter}
//                           className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
//                         >
//                           Create Character
//                         </button>
//                         <button
//                           onClick={() => setShowCharacterForm(false)}
//                           className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Character List */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {characters.map((character) => (
//                     <motion.div
//                       key={character.id}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
//                           <p className="text-sm text-purple-300">{character.personality}</p>
//                         </div>
//                         <div className="flex gap-2">
//                           <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
//                             <Edit className="w-4 h-4 text-purple-400" />
//                           </button>
//                           <button 
//                             onClick={() => deleteCharacter(character.id)}
//                             className="p-2 bg-slate-700 hover:bg-red-600 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4 text-red-400" />
//                           </button>
//                         </div>
//                       </div>
                      
//                       <p className="text-purple-200 text-sm mb-4">{character.backstory}</p>
                      
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {character.traits.map((trait, idx) => (
//                           <span key={idx} className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs">
//                             {trait}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="border-t border-purple-500/20 pt-4">
//                         {character.hasAI ? (
//                           <div className="flex items-center gap-2 text-green-400 text-sm">
//                             <Sparkles className="w-4 h-4" />
//                             <span>AI Agent Active</span>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => createAIAgent(character.id)}
//                             className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all"
//                           >
//                             <Sparkles className="w-4 h-4" />
//                             Create AI Agent
//                           </button>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* AI Character Chat Tab */}
//           {activeTab === 'ai-chat' && (
//             <motion.div
//               key="ai-chat"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="h-full flex"
//             >
//               {/* Character Selector Sidebar */}
//               <div className="w-80 bg-slate-800/50 backdrop-blur-sm border-r border-purple-500/30 p-4 overflow-y-auto">
//                 <h3 className="text-white font-bold mb-4">AI Characters</h3>
//                 <div className="space-y-2">
//                   {characters.filter(c => c.hasAI).map((character) => (
//                     <button
//                       key={character.id}
//                       onClick={() => {
//                         setSelectedCharacter(character);
//                         setChatMessages([]);
//                       }}
//                       className={`w-full p-4 rounded-lg text-left transition-all ${
//                         selectedCharacter?.id === character.id
//                           ? 'bg-purple-600 text-white'
//                           : 'bg-slate-700/50 text-purple-300 hover:bg-slate-700'
//                       }`}
//                     >
//                       <div className="font-semibold mb-1">{character.name}</div>
//                       <div className="text-xs opacity-75">{character.personality}</div>
//                     </button>
//                   ))}
//                 </div>
//                 {characters.filter(c => c.hasAI).length === 0 && (
//                   <p className="text-purple-400 text-sm">No AI agents created yet. Create one in Character Studio!</p>
//                 )}
//               </div>

//               {/* Chat Area */}
//               <div className="flex-1 flex flex-col">
//                 {selectedCharacter ? (
//                   <>
//                     {/* Chat Header */}
//                     <div className="bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/30 p-4">
//                       <h2 className="text-xl font-bold text-white">Chat with {selectedCharacter.name}</h2>
//                       <p className="text-sm text-purple-300">{selectedCharacter.personality}</p>
//                     </div>

//                     {/* Messages */}
//                     <div className="flex-1 overflow-y-auto p-6 space-y-4">
//                       {chatMessages.length === 0 && (
//                         <div className="text-center text-purple-400 mt-12">
//                           <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                           <p>Start a conversation with {selectedCharacter.name}</p>
//                           <p className="text-sm mt-2 text-purple-500">They'll respond based on their personality and backstory</p>
//                         </div>
//                       )}
//                       {chatMessages.map((msg) => (
//                         <div
//                           key={msg.id}
//                           className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                         >
//                           <div
//                             className={`max-w-lg rounded-xl p-4 ${
//                               msg.sender === 'user'
//                                 ? 'bg-purple-600 text-white'
//                                 : 'bg-slate-800/50 text-purple-100 border border-purple-500/30'
//                             }`}
//                           >
//                             <p className="mb-1">{msg.text}</p>
//                             <p className="text-xs opacity-75">{msg.timestamp}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Input Area */}
//                     <div className="bg-slate-800/50 backdrop-blur-sm border-t border-purple-500/30 p-4">
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           value={currentMessage}
//                           onChange={(e) => setCurrentMessage(e.target.value)}
//                           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                           className="flex-1 bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
//                           placeholder="Type your message..."
//                         />
//                         <button
//                           onClick={sendMessage}
//                           className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg flex items-center gap-2 transition-all"
//                         >
//                           <Send className="w-4 h-4" />
//                           Send
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="flex-1 flex items-center justify-center">
//                     <div className="text-center text-purple-400">
//                       <MessageSquare className="w-24 h-24 mx-auto mb-4 opacity-30" />
//                       <p className="text-xl">Select a character to start chatting</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default StoryForgeEditor;

































//STORY EDITING PAGE
"use client"
import React, { useState } from 'react';
import { ArrowLeft, Save, Sparkles, Plus, Trash2, GripVertical, Eye, Edit3, Calendar, Tag, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryNodeEditor() {
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, unsaved
  const [previewMode, setPreviewMode] = useState(false);
  
  const [nodeData, setNodeData] = useState({
    id: 'node_001',
    title: 'The Hero\'s Call',
    type: 'choice',
    content: 'A mysterious stranger approaches you in the tavern, their hood concealing their face. They slide a sealed letter across the wooden table. "The kingdom needs you," they whisper urgently. "Will you answer the call?"',
    tags: ['intro', 'quest-start'],
    emotionalTone: 'mysterious',
    choices: [
      { id: 1, text: 'Accept the Quest', consequence: 'Begin the adventure', targetNode: 'node_002', color: 'green' },
      { id: 2, text: 'Refuse and Stay Home', consequence: 'Miss the adventure', targetNode: 'node_003', color: 'red' }
    ]
  });

  const nodeTypes = [
    { value: 'story', label: 'Story', icon: '📖' },
    { value: 'choice', label: 'Choice', icon: '🔀' },
    { value: 'ending', label: 'Ending', icon: '🏁' },
    { value: 'character', label: 'Character', icon: '👤' }
  ];

  const emotionalTones = ['mysterious', 'tense', 'hopeful', 'dark', 'peaceful', 'action'];
  const choiceColors = ['green', 'red', 'blue', 'purple', 'yellow'];

  const handleContentChange = (e) => {
    setNodeData({ ...nodeData, content: e.target.value });
    setSaveStatus('unsaved');
  };

  const handleTitleChange = (e) => {
    setNodeData({ ...nodeData, title: e.target.value });
    setSaveStatus('unsaved');
  };

  const addChoice = () => {
    const newChoice = {
      id: Date.now(),
      text: 'New Choice',
      consequence: '',
      targetNode: '',
      color: 'blue'
    };
    setNodeData({ ...nodeData, choices: [...nodeData.choices, newChoice] });
    setSaveStatus('unsaved');
  };

  const updateChoice = (id, field, value) => {
    const updatedChoices = nodeData.choices.map(choice =>
      choice.id === id ? { ...choice, [field]: value } : choice
    );
    setNodeData({ ...nodeData, choices: updatedChoices });
    setSaveStatus('unsaved');
  };

  const deleteChoice = (id) => {
    setNodeData({ ...nodeData, choices: nodeData.choices.filter(c => c.id !== id) });
    setSaveStatus('unsaved');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate save operation
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
      red: 'bg-red-500/20 border-red-500 text-red-300',
      blue: 'bg-blue-500/20 border-blue-500 text-blue-300',
      purple: 'bg-purple-500/20 border-purple-500 text-purple-300',
      yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-400" />
                <h1 className="text-xl font-bold">Story Editor</h1>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400">ID: {nodeData.id}</span>
                <span className="text-xs text-slate-600">•</span>
                <div className="flex items-center gap-1">
                  {saveStatus === 'saved' && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Saved
                    </span>
                  )}
                  {saveStatus === 'saving' && (
                    <span className="text-xs text-blue-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      Saving...
                    </span>
                  )}
                  {saveStatus === 'unsaved' && (
                    <span className="text-xs text-yellow-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      Unsaved changes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                previewMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Assist
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saved'}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                saveStatus === 'saved'
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Save className="w-4 h-4" />
              Save Story
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!previewMode ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Node Configuration */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-400" />
                  Node Configuration
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Node Title</label>
                    <input
                      type="text"
                      value={nodeData.title}
                      onChange={handleTitleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter node title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Node Type</label>
                    <select
                      value={nodeData.type}
                      onChange={(e) => setNodeData({ ...nodeData, type: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      {nodeTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Emotional Tone</label>
                    <select
                      value={nodeData.emotionalTone}
                      onChange={(e) => setNodeData({ ...nodeData, emotionalTone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      {emotionalTones.map(tone => (
                        <option key={tone} value={tone}>
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Tags</label>
                    <input
                      type="text"
                      value={nodeData.tags.join(', ')}
                      onChange={(e) => setNodeData({ ...nodeData, tags: e.target.value.split(',').map(t => t.trim()) })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="quest-start, intro, combat"
                    />
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    Story Content
                  </h2>
                  <span className="text-xs text-slate-400">
                    {nodeData.content.length} characters
                  </span>
                </div>
                
                <textarea
                  value={nodeData.content}
                  onChange={handleContentChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors min-h-[200px] resize-y font-serif text-slate-200 leading-relaxed"
                  placeholder="Write your story content here..."
                />
                
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>Last edited: 2 minutes ago</span>
                </div>
              </div>

              {/* Choices Manager */}
              {nodeData.type === 'choice' && (
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Player Choices</h2>
                    <button
                      onClick={addChoice}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Choice
                    </button>
                  </div>

                  <div className="space-y-3">
                    {nodeData.choices.map((choice, index) => (
                      <motion.div
                        key={choice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-2 rounded-lg p-4 ${getColorClasses(choice.color)}`}
                      >
                        <div className="flex items-start gap-3">
                          <GripVertical className="w-5 h-5 text-slate-500 mt-1 cursor-grab" />
                          
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Choice Text</label>
                                <input
                                  type="text"
                                  value={choice.text}
                                  onChange={(e) => updateChoice(choice.id, 'text', e.target.value)}
                                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                  placeholder="What the player sees..."
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Color</label>
                                <select
                                  value={choice.color}
                                  onChange={(e) => updateChoice(choice.id, 'color', e.target.value)}
                                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                >
                                  {choiceColors.map(color => (
                                    <option key={color} value={color}>
                                      {color.charAt(0).toUpperCase() + color.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Consequence</label>
                                <input
                                  type="text"
                                  value={choice.consequence}
                                  onChange={(e) => updateChoice(choice.id, 'consequence', e.target.value)}
                                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                  placeholder="Brief description..."
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Target Node</label>
                                <input
                                  type="text"
                                  value={choice.targetNode}
                                  onChange={(e) => updateChoice(choice.id, 'targetNode', e.target.value)}
                                  className="w-full bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                  placeholder="node_002"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteChoice(choice.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Preview Mode */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-8">
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs mb-4">
                    {nodeData.emotionalTone}
                  </div>
                  <h1 className="text-3xl font-bold mb-4">{nodeData.title}</h1>
                </div>

                <div className="prose prose-invert mb-8">
                  <p className="text-lg text-slate-300 leading-relaxed font-serif">
                    {nodeData.content}
                  </p>
                </div>

                {nodeData.type === 'choice' && nodeData.choices.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-400 mb-4">Choose your path:</p>
                    {nodeData.choices.map((choice, index) => (
                      <motion.button
                        key={choice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:scale-[1.02] ${getColorClasses(choice.color)}`}
                      >
                        <div className="font-semibold mb-1">{choice.text}</div>
                        {choice.consequence && (
                          <div className="text-sm opacity-70">{choice.consequence}</div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 text-center text-sm text-slate-400">
                This is how your story node will appear to players
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}











































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

























































