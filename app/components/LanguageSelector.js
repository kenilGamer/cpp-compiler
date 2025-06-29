"use client";

import { useState } from "react";
import { ChevronDownIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

const languageIcons = {
  "54": "⚡", // C++
  "71": "🐍", // Python
  "62": "☕", // Java
  "63": "🟨", // JavaScript
  "52": "🔵", // C
  "51": "🔴", // C#
  "50": "📘", // C#
};

export default function LanguageSelector({ language, setLanguage, languages }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = languages.find(lang => lang.id === language);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Programming Language
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex     items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors focus-ring"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-lg">
              <span className="text-lg">{languageIcons[language] || "💻"}</span>
            </div>
            <div className="text-left">
              <div className="font-medium text-white">{selectedLanguage?.name}</div>
              <div className="text-xs text-gray-400">{selectedLanguage?.version || "Latest"}</div>
            </div>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => {
                  setLanguage(lang.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors ${
                  language === lang.id ? 'bg-blue-600/20 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-lg">
                  <span className="text-lg">{languageIcons[lang.id] || "💻"}</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">{lang.name}</div>
                  <div className="text-xs text-gray-400">{lang.version || "Latest"}</div>
                </div>
                {language === lang.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Language Info */}
      <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <CodeBracketIcon className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-gray-300">Language Info</span>
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>• Syntax highlighting enabled</div>
          <div>• Auto-completion available</div>
          <div>• Error detection active</div>
        </div>
      </div>
    </div>
  );
} 