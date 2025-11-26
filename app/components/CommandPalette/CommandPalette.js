"use client";

import { useEffect } from "react";
import { useCommandPalette } from "@/app/hooks/useCommandPalette";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function CommandPalette({ commands = [], onClose }) {
  const {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    selectedIndex,
    filteredCommands,
    executeCommand,
  } = useCommandPalette(commands);

  useEffect(() => {
    if (onClose) {
      onClose(isOpen);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="glass-strong w-full max-w-2xl mx-4 rounded-xl border border-border-light shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-border-light">
          <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  onClick={() => executeCommand(command)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    index === selectedIndex
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  {command.icon && (
                    <command.icon className="w-5 h-5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{command.label}</div>
                    {command.description && (
                      <div className="text-sm text-muted-foreground">
                        {command.description}
                      </div>
                    )}
                  </div>
                  {command.shortcut && (
                    <kbd className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border">
                      {command.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

