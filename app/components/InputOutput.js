"use client";

import { useState, useEffect, useRef } from "react";
import { 
  PlayIcon, 
  DocumentTextIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ExecutionStats from "./Stats/ExecutionStats";
import LoadingSpinner from "./Loading/LoadingSpinner";

export default function InputOutput({ 
  input, 
  setInput, 
  runCode, 
  isRunning, 
  output, 
  executionTime, 
  memoryUsed,
  cpuUsage 
}) {
  const [activeTab, setActiveTab] = useState('output');
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);
  const outputRef = useRef(null);

  // Auto-scroll output to bottom when new content arrives
  useEffect(() => {
    if (outputRef.current && output) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Input Section - Collapsible */}
      <div className="card-glass rounded-lg overflow-hidden transition-all duration-300">
        <div 
          className="flex items-center justify-between p-4 border-b border-border-light cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setIsInputCollapsed(!isInputCollapsed)}
        >
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Input (stdin)</span>
            <span className="text-xs text-muted-foreground">({input.length} chars)</span>
          </div>
          <div className="flex items-center gap-2">
            {!isInputCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setInput('');
                }}
                className="p-1.5 rounded hover:bg-secondary transition-colors"
                title="Clear input"
              >
                <XMarkIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            {isInputCollapsed ? (
              <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronUpIcon className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
        {!isInputCollapsed && (
          <div className="p-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 bg-background-secondary text-foreground border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm min-h-[100px]"
              placeholder="Enter input for your program..."
            />
          </div>
        )}
      </div>

      {/* Run Button */}
      <button
        onClick={runCode}
        disabled={isRunning}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 focus-ring ${
          isRunning 
            ? 'bg-secondary cursor-not-allowed opacity-50' 
            : 'btn-primary hover:scale-[1.02] active:scale-[0.98]'
        } flex items-center justify-center gap-3`}
      >
        {isRunning ? (
          <>
            <LoadingSpinner size="sm" />
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
      {(executionTime !== null || memoryUsed !== null || cpuUsage !== null) && (
        <ExecutionStats 
          executionTime={executionTime}
          memoryUsed={memoryUsed}
          cpuUsage={cpuUsage}
        />
      )}

      {/* Output Section - Collapsible */}
      <div className="card-glass rounded-lg overflow-hidden flex flex-col flex-grow transition-all duration-300">
        <div 
          className="flex items-center justify-between p-4 border-b border-border-light flex-shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Output</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'output' 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'console' 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Console
              </button>
            </div>
            {output && (
              <button
                onClick={() => copyToClipboard(output)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Copy output"
              >
                <ClipboardDocumentIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <button
              onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isOutputCollapsed ? (
                <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronUpIcon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        
        {!isOutputCollapsed && (
          <div 
            ref={outputRef}
            className="h-full relative overflow-y-auto bg-background-secondary"
          >
            <pre className={`w-full h-full p-4 font-mono text-sm overflow-auto ${
              activeTab === 'output' ? 'block' : 'hidden'
            }`}>
              {output || (
                <span className="text-muted-foreground italic">
                  Run your code to see the output here...
                </span>
              )}
            </pre>
            
            <div className={`w-full h-full p-4 font-mono text-sm overflow-auto ${
              activeTab === 'console' ? 'block' : 'hidden'
            }`}>
              <div className="text-muted-foreground text-xs mb-2">Console Log:</div>
              <div className="text-foreground">
                {output ? (
                  <div className="space-y-1">
                    {output.split('\n').map((line, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs w-8 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{line}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">No console output yet...</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 