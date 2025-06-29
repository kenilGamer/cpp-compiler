"use client";

import { useState } from "react";
import { SparklesIcon, ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";

const exampleIcons = {
  cpp: "⚡",
  python: "🐍",
  javascript: "🟨",
  java: "☕",
  c: "🔧",
  csharp: "💎"
};

const exampleColors = {
  cpp: "from-blue-500 to-purple-600",
  python: "from-green-500 to-emerald-600",
  javascript: "from-yellow-500 to-orange-600",
  java: "from-orange-500 to-red-600",
  c: "from-blue-400 to-cyan-600",
  csharp: "from-purple-500 to-pink-600"
};

export default function ExampleButtons({ loadExample, examples }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const exampleList = [
    { key: 'cpp', name: 'C++', desc: 'Hello World with STL', difficulty: 'Beginner' },
    { key: 'python', name: 'Python', desc: 'Data structures & algorithms', difficulty: 'Beginner' },
    { key: 'javascript', name: 'JavaScript', desc: 'Modern ES6+ features', difficulty: 'Beginner' },
    { key: 'java', name: 'Java', desc: 'Object-oriented programming', difficulty: 'Intermediate' },
    { key: 'c', name: 'C', desc: 'System programming basics', difficulty: 'Intermediate' },
    { key: 'csharp', name: 'C#', desc: 'Windows development', difficulty: 'Intermediate' }
  ];

  // Always show all examples in a 2-column grid for balance
  const visibleExamples = isExpanded ? exampleList : exampleList.slice(0, 3);

  return (
    <div className="space-y-4 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-accent-color" />
          <h3 className="text-lg font-semibold">Code Examples</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-muted hover:text-accent-color transition-colors focus-ring rounded-lg"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Examples Grid - always 2 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleExamples.map((example) => (
          <button
            key={example.key}
            onClick={() => loadExample(examples[example.key] || examples.cpp)}
            className="group relative p-5 bg-secondary/50 hover:bg-secondary border border-border-color rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus-ring outline-none"
          >
            <div className="flex items-start gap-4 flex-col">
              <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${exampleColors[example.key]} rounded-xl text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {exampleIcons[example.key]}
              </div>
              <div className="text-left flex-1 min-w-0 flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-base group-hover:text-accent-color transition-colors">
                    {example.name} Example
                  </h4>
                  <span className={`ml-1 px-2 py-0.5 text-xs rounded-full font-medium align-middle ${
                    example.difficulty === 'Beginner' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {example.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400/90 leading-relaxed">
                  {example.desc}
                </p>
              </div>
              <PlayIcon className="w-5 h-5 text-muted group-hover:text-accent-color transition-colors opacity-0 group-hover:opacity-100 mt-1" />
            </div>
          </button>
        ))}
      </div>

      {/* Quick Start Tip */}
      <div className="p-4 bg-accent-color/10 border border-accent-color/20 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-accent-color/20 rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-4 h-4 text-accent-color" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-accent-color mb-1">Quick Start</p>
            <p className="text-xs text-muted">
              Click any example to load it into the editor and start coding immediately!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 