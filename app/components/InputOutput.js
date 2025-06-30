"use client";

import { useState } from "react";
import { PlayIcon, ClockIcon, CpuChipIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function InputOutput({ 
  input, 
  setInput, 
  runCode, 
  isRunning, 
  output, 
  executionTime, 
  memoryUsed 
}) {
  const [activeTab, setActiveTab] = useState('output');

  const formatExecutionTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatMemoryUsage = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Input Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden card-hover flex flex-col">
        <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Input (stdin)</span>
          </div>
          <div className="text-xs text-gray-400">
            {input.length} characters
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 bg-gray-800 text-white border-0 focus:ring-0 resize-none font-mono text-sm flex-grow"
          placeholder="Enter input for your program..."
        />
      </div>

      {/* Run Button */}
      <button
        onClick={runCode}
        disabled={isRunning}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 focus-ring ${
          isRunning 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'btn-primary hover:scale-[1.02] active:scale-[0.98]'
        } flex items-center justify-center gap-3`}
      >
        {isRunning ? (
          <>
            <div className="spinner"></div>
            <span>Running...</span>
          </>
        ) : (
          <>
            <PlayIcon className="w-5 h-5" />
            <span>Run Code</span>
          </>
        )}
      </button>

      {/* Execution Stats */}
      {(executionTime !== null || memoryUsed !== null) && (
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Execution Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs text-gray-400">Execution Time</div>
                <div className="text-sm font-mono text-white">
                  {executionTime !== null ? formatExecutionTime(executionTime) : 'N/A'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CpuChipIcon className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-xs text-gray-400">Memory Used</div>
                <div className="text-sm font-mono text-white">
                  {formatMemoryUsage(memoryUsed)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden card-hover flex flex-col flex-grow">
        <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-300">Output</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('output')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'output' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Output
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'console' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Console
            </button>
          </div>
        </div>
        
        <div className="h-full relative overflow-y-auto">
          <pre className={`w-full h-full p-4 font-mono text-sm overflow-auto ${
            activeTab === 'output' ? 'block' : 'hidden'
          }`}>
            {output || (
              <span className="text-gray-500 italic">
                Run your code to see the output here...
              </span>
            )}
          </pre>
          
          <div className={`w-full h-full p-4 font-mono text-sm overflow-auto ${
            activeTab === 'console' ? 'block' : 'hidden'
          }`}>
            <div className="text-gray-400 text-xs mb-2">Console Log:</div>
            <div className="text-gray-300">
              {output ? (
                <div className="space-y-1">
                  {output.split('\n').map((line, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-gray-500 text-xs w-8 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{line}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 italic">No console output yet...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setInput('')}
          className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors focus-ring"
        >
          Clear Input
        </button>
        <button
          onClick={() => {
            if (output) {
              navigator.clipboard.writeText(output);
            }
          }}
          className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors focus-ring"
        >
          Copy Output
        </button>
      </div>
    </div>
  );
} 