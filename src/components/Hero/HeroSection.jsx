import React, { useState, useEffect } from 'react';
import { Download, Smartphone, MapPin, Shield, Zap, Eye, Lock, Wifi } from "lucide-react";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "50K+", label: "Devices Protected", color: "from-cyan-400 to-blue-500" },
    { number: "99.99%", label: "Recovery Rate", color: "from-green-400 to-emerald-500" },
    { number: "<2s", label: "Response Time", color: "from-purple-400 to-pink-500" },
  ];

  const features = [
    { icon: Shield, text: "Military-Grade Encryption", color: "text-emerald-400" },
    { icon: Zap, text: "Instant Alerts", color: "text-yellow-400" },
    { icon: Eye, text: "Stealth Mode", color: "text-purple-400" },
    { icon: Wifi, text: "Offline Tracking", color: "text-cyan-400" },
  ];

  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.2),transparent_50%)]" />
      </div> */}

      {/* Mouse follower glow */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white/90">Next-Gen Security Platform</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-tight">
                <div className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Find <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Safe
                </span>
                </div>
                
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
                The world's most advanced device protection system. 
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold"> Track, secure, and recover</span> your devices with military-grade precision.
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-full hover:border-slate-600/50 transition-all duration-300 hover:scale-105"
                >
                  <feature.icon className={`w-4 h-4 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-slate-300 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  Download Now
                </div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-slate-600 rounded-xl font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  View Demo
                </div>
              </button>
            </div>

            {/* Dynamic Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 transition-all duration-500 ${currentStat === index ? 'scale-110' : ''}`}>
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Device Mockup */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Main Device Container */}
              <div className="relative w-80 h-[500px] bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-3xl border border-slate-700/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Device Frame Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-3xl" />
                
                {/* Screen */}
                <div className="relative m-4 h-[calc(100%-2rem)] bg-black rounded-2xl border border-slate-600/30 overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center p-4 bg-slate-900/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-xs font-medium">PROTECTED</span>
                    </div>
                    <div className="text-slate-400 text-xs">15:42</div>
                  </div>

                  {/* Main Interface */}
                  <div className="p-6 space-y-6">
                    {/* Location Card */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl p-4 border border-slate-600/30">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-medium">Live Location</span>
                      </div>
                      <div className="text-slate-300 text-sm">Times Square, NYC</div>
                      <div className="text-emerald-400 text-xs mt-1">±2m accuracy</div>
                    </div>

                    {/* Security Status */}
                    <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-xl p-4 border border-emerald-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span className="text-white font-medium">Security Active</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Encryption</span>
                          <span className="text-emerald-400">AES-256</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">Last Sync</span>
                          <span className="text-emerald-400">2s ago</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-slate-800/80 rounded-lg p-3 border border-slate-600/30 hover:border-slate-500/50 transition-colors">
                        <Lock className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                        <div className="text-xs text-slate-300">Lock Device</div>
                      </button>
                      <button className="bg-slate-800/80 rounded-lg p-3 border border-slate-600/30 hover:border-slate-500/50 transition-colors">
                        <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                        <div className="text-xs text-slate-300">Sound Alarm</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full border border-emerald-400/30 flex items-center justify-center backdrop-blur-sm animate-bounce">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full border border-purple-400/30 flex items-center justify-center backdrop-blur-sm animate-pulse">
                <Smartphone className="w-6 h-6 text-purple-400" />
              </div>

              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-full border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm animate-spin">
                <Wifi className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;