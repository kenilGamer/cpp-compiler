"use client";

import { useState, useEffect } from "react";
import { ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function DiagnosticsPanel({ 
  errors = [], 
  warnings = [], 
  info = [],
  onErrorClick,
  className = "" 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const allDiagnostics = [
    ...errors.map(e => ({ ...e, type: 'error' })),
    ...warnings.map(w => ({ ...w, type: 'warning' })),
    ...info.map(i => ({ ...i, type: 'info' })),
  ];

  const filteredDiagnostics = activeFilter === 'all' 
    ? allDiagnostics 
    : allDiagnostics.filter(d => d.type === activeFilter);

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-400 border-red-400/20 bg-red-400/10';
      case 'warning':
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'info':
        return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
      default:
        return '';
    }
  };

  if (allDiagnostics.length === 0) return null;

  return (
    <div className={`card-glass rounded-lg overflow-hidden ${className}`}>
      <div 
        className="flex items-center justify-between p-3 border-b border-border-light cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Diagnostics</span>
          <div className="flex items-center gap-2">
            {errors.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-400/20 text-red-400 rounded">
                {errors.length} error{errors.length !== 1 ? 's' : ''}
              </span>
            )}
            {warnings.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-400/20 text-yellow-400 rounded">
                {warnings.length} warning{warnings.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {['all', 'error', 'warning', 'info'].map(filter => (
                <button
                  key={filter}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilter(filter);
                  }}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    activeFilter === filter
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="max-h-64 overflow-y-auto">
          {filteredDiagnostics.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No {activeFilter === 'all' ? '' : activeFilter} diagnostics
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {filteredDiagnostics.map((diagnostic, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getColor(diagnostic.type)} cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={() => onErrorClick && onErrorClick(diagnostic)}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(diagnostic.type)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1">
                        {diagnostic.message || diagnostic.text}
                      </div>
                      {diagnostic.line && (
                        <div className="text-xs opacity-75">
                          Line {diagnostic.line}
                          {diagnostic.column && `, Column ${diagnostic.column}`}
                        </div>
                      )}
                      {diagnostic.source && (
                        <div className="text-xs opacity-75 mt-1">
                          {diagnostic.source}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

