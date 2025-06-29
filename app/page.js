// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import ExampleButtons from "./components/ExampleButtons";
import CodeEditor from "./components/CodeEditor";
import InputOutput from "./components/InputOutput";
import FeaturesList from "./components/FeaturesList";
import QuickActions from "./components/QuickActions";
import Footer from "./components/Footer";
import { languages, examples } from "./utils/constants";
import { submitCode, getSubmissionResult, decodeBase64, estimateMemoryUsage } from "./utils/api";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            C++ Online Compiler
          </h1>
          <p className="text-xl  max-w-3xl mx-auto leading-relaxed">
            Write, compile, and run C++ code instantly in your browser. 
            Perfect for learning, testing, and quick prototyping.
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

        {/* Language and Examples Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <LanguageSelector 
              language={language} 
              setLanguage={setLanguage} 
              languages={languages} 
            />
            <ExampleButtons loadExample={loadExample} examples={examples} />
          </div>
          
          <div className="lg:col-span-2">
            <QuickActions setCode={setCode} language={language} />
          </div>
        </div>

        {/* Main Editor and Output Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              clearCode={clearCode}
              language={language}
              runCode={runCode}
            />
          </div>

          <div className="space-y-4">
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

        {/* Features Section */}
        <FeaturesList />
      </main>
      
      <Footer />
    </div>
  );
}
