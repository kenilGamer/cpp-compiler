"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LanguageIcon from "./LanguageIcons/LanguageIcon";

export default function LanguageSelector({ language, setLanguage, languages }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = languages.find(lang => lang.id === language);

  return (
    <div className="relative">
     
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-background-secondary border border-border rounded-lg hover:bg-secondary transition-colors focus-ring"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-lg">
              <LanguageIcon languageId={language} className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white">{selectedLanguage?.name}</div>
              <div className="text-xs text-gray-400">{selectedLanguage?.version || "Latest"}</div>
            </div>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-strong border border-border-light rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => {
                  setLanguage(lang.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-4 hover:bg-secondary transition-colors ${
                  language === lang.id ? 'bg-primary/20 border-l-4 border-primary' : ''
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-lg">
                  <LanguageIcon languageId={lang.id} className="w-5 h-5 text-primary" />
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

     
    </div>
  );
} 