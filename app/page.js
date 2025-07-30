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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Online Compiler
          </h1>
          <p className="text-xl  max-w-3xl mx-auto leading-relaxed">
            Write, compile, and run code in multiple languages instantly in your browser. 
            Perfect for learning, testing, and quick prototyping across C++, Python, Java, JavaScript, C, and C#.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-color rounded-full animate-pulse"></div>
              Real-time compilation
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-color rounded-full animate-pulse"></div>
              Multiple languages
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning-color rounded-full animate-pulse"></div>
              Instant execution
            </span>
          </div>
        </div>

       

        {/* Main Editor and Output Section */}
        <div 
          ref={fullScreenContainerRef} 
          className={isFullScreen ? "fixed inset-0 bg-gray-900 z-50 p-4" : ""}
        >
          <div className={`h-full grid ${isFullScreen ? 'grid-cols-1 md:grid-cols-[7fr_3fr]' : 'grid-cols-1 xl:grid-cols-2'} gap-8`}>
            <div className="flex flex-col h-full ">
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
            <div className={`flex flex-col h-full ${isFullScreen ? '' : 'max-h-[85vh]'}`}>
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
