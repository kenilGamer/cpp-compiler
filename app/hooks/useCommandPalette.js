"use client";

import { useState, useEffect, useCallback } from "react";

export function useCommandPalette(commands = []) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.keywords?.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearchQuery("");
        setSelectedIndex(0);
      }

      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false);
          setSearchQuery("");
          setSelectedIndex(0);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
        } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setSearchQuery("");
          setSelectedIndex(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  const executeCommand = useCallback((command) => {
    command.action();
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  }, []);

  return {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    selectedIndex,
    filteredCommands,
    executeCommand,
  };
}

