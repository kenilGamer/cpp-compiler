// src/app/page.js
"use client";

import { useState, useRef, useEffect } from "react";


import CodeEditor from "./components/CodeEditor";
import InputOutput from "./components/InputOutput";
import FeaturesList from "./components/FeaturesList";
import Footer from "./components/Footer";
import { submitCode, estimateMemoryUsage } from "./utils/api";

export default function Home() {
  const [code, setCode] = useState(`#include <iostream>
#include <string>
#include <vector>


using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}`);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("54"); // C++ by default
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsed, setMemoryUsed] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenContainerRef = useRef(null);

  const handleFullScreenToggle = () => {
    const elem = fullScreenContainerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
    };
  }, []);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setExecutionTime(null);
    setMemoryUsed(null);
    
    const startTime = Date.now();
    
    try {
      const result = await submitCode(language, code, input);
      console.log("Piston API Response:", result);
      console.log("Full result object:", JSON.stringify(result, null, 2));
      
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);
      
      // Piston returns results immediately
      let finalOutput = "";
      
      if (result.run) {
        const run = result.run;
        
        if (run.stderr) {
          finalOutput += `❌ Error: ${run.stderr}\n`;
        }
        
        if (run.stdout) {
          finalOutput += `📤 Output:\n${run.stdout}`;
        }
        
        if (run.code !== 0) {
          finalOutput += `\n⚠️ Exit code: ${run.code}`;
        }
        
        if (!finalOutput) {
          finalOutput = "✅ Code executed successfully with no output.";
        }
        const estimatedMemory = estimateMemoryUsage(code, language);
        setMemoryUsed(estimatedMemory);
      } else if (result.compile) {
        // Compilation error
        finalOutput = `❌ Compilation Error:\n${result.compile.stderr || result.compile.output || 'Unknown compilation error'}`;
        setMemoryUsed(null);
      } else {
        finalOutput = "❌ Unexpected response format from API";
        setMemoryUsed(null);
      }
      
      setOutput(finalOutput);
      setIsRunning(false);
      
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      setOutput(`❌ Error submitting code: ${err.response?.data?.message || err.message}`);
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
    setInput("");
    setExecutionTime(null);
    setMemoryUsed(null);
  };

  const loadExample = (exampleCode) => {
    setCode(exampleCode);
    setOutput("");
    setExecutionTime(null);
    setMemoryUsed(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl float-animation"
          style={{
            left: '10%',
            top: '10%',
            boxShadow: '0 0 150px rgba(0, 168, 204, 0.3)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-accent/10 to-cyan/10 rounded-full blur-3xl float-animation"
          style={{
            right: '10%',
            bottom: '20%',
            animationDelay: '1.5s',
            boxShadow: '0 0 150px rgba(12, 123, 147, 0.3)',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-cyan/10 to-primary/10 rounded-full blur-3xl float-animation"
          style={{
            left: '50%',
            top: '50%',
            animationDelay: '3s',
            boxShadow: '0 0 100px rgba(0, 168, 204, 0.2)',
          }}
        />
        <div className="absolute inset-0 holographic opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,168,204,0.06),transparent_50%)]" />
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-cyan blur-2xl opacity-30 rounded-full"></div>
              <div className="relative px-6 py-3 card-glass rounded-full border border-primary/20 neon-glow inline-block">
                <span className="text-sm font-medium gradient-text-neon">✨ Premium Code Compiler</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text-neon leading-tight">
            Online Compiler
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed mb-8">
            Write, compile, and run code in multiple languages instantly in your browser. 
            <span className="block mt-2 text-lg text-muted-foreground">
              Perfect for learning, testing, and quick prototyping across C++, Python, Java, JavaScript, Go, Rust, and more.
            </span>
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
            <div className="group flex items-center gap-3 px-4 py-2 card-glass rounded-lg border border-border-light hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-foreground-secondary group-hover:text-primary transition-colors">Real-time compilation</span>
            </div>
            
            <div className="group flex items-center gap-3 px-4 py-2 card-glass rounded-lg border border-border-light hover:border-accent/50 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-foreground-secondary group-hover:text-accent transition-colors">Multiple languages</span>
            </div>
            
            <div className="group flex items-center gap-3 px-4 py-2 card-glass rounded-lg border border-border-light hover:border-cyan/50 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="w-3 h-3 bg-cyan rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-cyan rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-foreground-secondary group-hover:text-cyan transition-colors">Instant execution</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="card-glass p-4 rounded-lg border border-border-light hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold gradient-text-neon mb-1">8+</div>
              <div className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">Languages</div>
            </div>
            <div className="card-glass p-4 rounded-lg border border-border-light hover:border-accent/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold gradient-text mb-1">&lt;1s</div>
              <div className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">Compile Time</div>
            </div>
            <div className="card-glass p-4 rounded-lg border border-border-light hover:border-cyan/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold gradient-text mb-1">100%</div>
              <div className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">Browser-based</div>
            </div>
            <div className="card-glass p-4 rounded-lg border border-border-light hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold gradient-text-neon mb-1">∞</div>
              <div className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">Free Forever</div>
            </div>
          </div>
        </div>

       

        {/* Main Editor and Output Section with Premium Styling */}
        <div 
          ref={fullScreenContainerRef} 
          className={isFullScreen ? "fixed inset-0 bg-background z-50 p-4" : "relative"}
        >
          <div className={`h-full grid ${isFullScreen ? 'grid-cols-1 md:grid-cols-[7fr_3fr]' : 'grid-cols-1 xl:grid-cols-2'} gap-6`}>
            <div className="flex flex-col h-full relative group">
              {/* Decorative corner accent */}
              <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-accent/20 to-transparent rounded-br-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CodeEditor 
                code={code} 
                setCode={setCode} 
                clearCode={clearCode}
                language={language}
                setLanguage={setLanguage}
                runCode={runCode}
                isFullScreen={isFullScreen}
                onFullScreenToggle={handleFullScreenToggle}
              />
            </div>
            
            <div className={`flex flex-col h-full relative group ${isFullScreen ? '' : 'max-h-[85vh]'}`}>
              {/* Decorative corner accent */}
              <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-bl from-cyan/20 to-transparent rounded-tr-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent rounded-bl-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <InputOutput
                input={input}
                setInput={setInput}
                runCode={runCode}
                isRunning={isRunning}
                output={output}
                executionTime={executionTime}
                memoryUsed={memoryUsed}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <FeaturesList />
      </main>
      
      <Footer />
    </div>
  );
}
