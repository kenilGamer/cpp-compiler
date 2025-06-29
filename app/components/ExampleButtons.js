"use client";

import { useState } from "react";
import { SparklesIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const exampleIcons = {
  cpp: "⚡",
  python: "🐍",
  java: "☕",
  javascript: "🟨",
  c: "🔵",
  csharp: "🔴"
};

const exampleColors = {
  cpp: "from-blue-500 to-blue-600",
  python: "from-green-500 to-green-600",
  java: "from-orange-500 to-orange-600",
  javascript: "from-yellow-500 to-yellow-600",
  c: "from-blue-400 to-blue-500",
  csharp: "from-purple-500 to-purple-600"
};

export default function ExampleButtons({ loadExample, examples }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const exampleList = [
    { key: 'cpp', name: 'C++', desc: 'Hello World with STL' },
    { key: 'python', name: 'Python', desc: 'Data structures & algorithms' },
    { key: 'java', name: 'Java', desc: 'Object-oriented programming' },
    { key: 'javascript', name: 'JavaScript', desc: 'Modern ES6+ features' },
    { key: 'c', name: 'C', desc: 'System programming basics' },
    { key: 'csharp', name: 'C#', desc: 'Windows development' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Code Examples</label>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronDownIcon className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Quick Examples */}
        <button
          onClick={() => loadExample(examples.cpp)}
          className="group relative p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover"
        >
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${exampleColors.cpp} rounded-lg text-white text-lg`}>
              {exampleIcons.cpp}
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                C++ Example
              </div>
              <div className="text-xs text-gray-400">Hello World with STL</div>
            </div>
          </div>
          <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={() => loadExample(examples.python)}
          className="group relative p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover"
        >
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${exampleColors.python} rounded-lg text-white text-lg`}>
              {exampleIcons.python}
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-green-400 transition-colors">
                Python Example
              </div>
              <div className="text-xs text-gray-400">Data structures & algorithms</div>
            </div>
          </div>
          <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={() => loadExample(examples.java)}
          className="group relative p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover"
        >
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${exampleColors.java} rounded-lg text-white text-lg`}>
              {exampleIcons.java}
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-orange-400 transition-colors">
                Java Example
              </div>
              <div className="text-xs text-gray-400">Object-oriented programming</div>
            </div>
          </div>
          <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Expanded Examples */}
        {isExpanded && (
          <>
            <button
              onClick={() => loadExample(examples.javascript || examples.cpp)}
              className="group relative p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover"
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${exampleColors.javascript} rounded-lg text-white text-lg`}>
                  {exampleIcons.javascript}
                </div>
                <div className="text-left">
                  <div className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                    JavaScript Example
                  </div>
                  <div className="text-xs text-gray-400">Modern ES6+ features</div>
                </div>
              </div>
              <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => loadExample(examples.c || examples.cpp)}
              className="group relative p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover"
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${exampleColors.c} rounded-lg text-white text-lg`}>
                  {exampleIcons.c}
                </div>
                <div className="text-left">
                  <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                    C Example
                  </div>
                  <div className="text-xs text-gray-400">System programming basics</div>
                </div>
              </div>
              <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => loadExample(examples.csharp || examples.cpp)}
              className="group relative p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover"
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${exampleColors.csharp} rounded-lg text-white text-lg`}>
                  {exampleIcons.csharp}
                </div>
                <div className="text-left">
                  <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                    C# Example
                  </div>
                  <div className="text-xs text-gray-400">Windows development</div>
                </div>
              </div>
              <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </>
        )}
      </div>

      {/* Quick Start Tip */}
      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-xs text-blue-300">
          <SparklesIcon className="w-4 h-4" />
          <span>💡 Click any example to get started quickly!</span>
        </div>
      </div>
    </div>
  );
} 