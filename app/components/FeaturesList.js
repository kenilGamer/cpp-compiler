"use client";

import { 
  BoltIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon, 
  CpuChipIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function FeaturesList() {
  const features = [
    {
      icon: BoltIcon,
      title: "Real-time Compilation",
      description: "Instant code compilation and execution with live feedback",
      color: "text-blue-400"
    },
    {
      icon: GlobeAltIcon,
      title: "Multiple Languages",
      description: "Support for C++, C, Java, Python, JavaScript, and C#",
      color: "text-green-400"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Execution",
      description: "Sandboxed environment for safe code execution",
      color: "text-purple-400"
    },
    {
      icon: CpuChipIcon,
      title: "Performance Metrics",
      description: "Execution time and memory usage tracking",
      color: "text-orange-400"
    },
    {
      icon: CodeBracketIcon,
      title: "Smart Suggestions",
      description: "Intelligent code completion and syntax highlighting",
      color: "text-pink-400"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices",
      color: "text-indigo-400"
    },
    {
      icon: CloudIcon,
      title: "Cloud-based",
      description: "No installation required, runs entirely in your browser",
      color: "text-cyan-400"
    },
    {
      icon: SparklesIcon,
      title: "Modern UI/UX",
      description: "Beautiful, intuitive interface with smooth animations",
      color: "text-yellow-400"
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Everything you need to write, compile, and run code efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-300 card-hover animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <div className="text-3xl font-bold text-blue-400 mb-2">6+</div>
          <div className="text-gray-300 font-medium">Programming Languages</div>
          <div className="text-gray-400 text-sm mt-1">Supported</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
          <div className="text-3xl font-bold text-green-400 mb-2">&lt;1s</div>
          <div className="text-gray-300 font-medium">Average Compilation</div>
          <div className="text-gray-400 text-sm mt-1">Time</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
          <div className="text-gray-300 font-medium">Browser-based</div>
          <div className="text-gray-400 text-sm mt-1">No installation</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Coding?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of developers who use our online compiler for learning, 
            testing, and quick prototyping. Start coding now!
          </p>
          <button className="btn-primary px-8 py-3 text-lg font-semibold">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
} 