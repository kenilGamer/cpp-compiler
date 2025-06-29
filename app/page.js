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
import { submitCode, getSubmissionResult, decodeBase64 } from "./utils/api";

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
      const submit = await submitCode(language, code, input);
      const token = submit.token;
      console.log("Submission token:", token);

      // Poll for results with better error handling
      const pollResult = async () => {
        try {
          const result = await getSubmissionResult(token);
          console.log("API Response:", result);
          
          if (result.status && result.status.id <= 2) {
            // Still processing, poll again
            setTimeout(pollResult, 1000);
          } else {
            // Processing complete - decode base64 output
            const stdout = decodeBase64(result.stdout);
            const stderr = decodeBase64(result.stderr);
            const compileOutput = decodeBase64(result.compile_output);
            
            const endTime = Date.now();
            setExecutionTime(endTime - startTime);
            setMemoryUsed(result.memory || null);
            
            let finalOutput = "";
            if (stderr) finalOutput += `❌ Error: ${stderr}\n`;
            if (compileOutput) finalOutput += `🔧 Compilation: ${compileOutput}\n`;
            if (stdout) finalOutput += `📤 Output:\n${stdout}`;
            if (!finalOutput) finalOutput = "✅ Code executed successfully with no output.";
            
            setOutput(finalOutput);
            setIsRunning(false);
          }
        } catch (err) {
          console.error("Polling error:", err.response?.data || err.message);
          setOutput(`❌ Error polling result: ${err.response?.data?.error || err.message}`);
          setIsRunning(false);
        }
      };

      // Start polling after a short delay
      setTimeout(pollResult, 1000);
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      setOutput(`❌ Error submitting code: ${err.response?.data?.error || err.message}`);
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
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            C++ Online Compiler
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Write, compile, and run C++ code instantly in your browser. 
            Perfect for learning, testing, and quick prototyping.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Real-time compilation
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Multiple languages
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
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
