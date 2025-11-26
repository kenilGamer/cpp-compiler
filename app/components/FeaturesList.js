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
      color: "text-primary"
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
      color: "text-accent"
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
      color: "text-primary"
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
    <section id="features" className="py-20 relative">
      {/* Section Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-secondary/20 to-transparent pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10">
        <div className="inline-block mb-4">
          <span className="text-sm font-medium text-primary px-4 py-2 card-glass rounded-full border border-primary/20">
            Features
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-neon">
          Powerful Features
        </h2>
        <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
          Everything you need to write, compile, and run code efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative p-6 card-glass rounded-xl border border-border-light hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-accent/5 rounded-xl transition-all duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-background-secondary to-background-tertiary rounded-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-border-light group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20">
                <feature.icon className={`w-7 h-7 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="group text-center p-8 card-glass rounded-xl border border-border-light hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-bold gradient-text-neon mb-3">8+</div>
            <div className="text-foreground font-semibold mb-1">Programming Languages</div>
            <div className="text-foreground-secondary text-sm">Supported</div>
          </div>
        </div>
        
        <div className="group text-center p-8 card-glass rounded-xl border border-border-light hover:border-accent/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 group-hover:from-accent/10 group-hover:to-accent/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">&lt;1s</div>
            <div className="text-foreground font-semibold mb-1">Average Compilation</div>
            <div className="text-foreground-secondary text-sm">Time</div>
          </div>
        </div>
        
        <div className="group text-center p-8 card-glass rounded-xl border border-border-light hover:border-cyan/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/0 to-cyan/10 group-hover:from-cyan/10 group-hover:to-cyan/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-bold gradient-text-neon mb-3">100%</div>
            <div className="text-foreground font-semibold mb-1">Browser-based</div>
            <div className="text-foreground-secondary text-sm">No installation</div>
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <div className="mt-20 text-center relative z-10">
        <div className="relative p-10 md:p-12 card-glass rounded-2xl border border-border-light hover:border-primary/50 transition-all duration-500 overflow-hidden group">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-cyan/5 group-hover:from-primary/10 group-hover:via-accent/10 group-hover:to-cyan/10 transition-all duration-500"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-primary px-4 py-2 card-glass rounded-full border border-primary/20">
                🚀 Get Started
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold gradient-text-neon mb-4">
              Ready to Start Coding?
            </h3>
            <p className="text-lg text-foreground-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who use our online compiler for learning, 
              testing, and quick prototyping. Start coding now!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#editor" 
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/50 overflow-hidden"
              >
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="/docs" 
                className="px-8 py-4 card-glass border border-border-light rounded-lg font-semibold text-foreground hover:border-primary/50 hover:scale-105 transition-all duration-300"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 