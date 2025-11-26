"use client";

import {
  PlayIcon,
  CodeBracketIcon,
  DocumentArrowDownIcon,
  ShareIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "../ThemeToggle";

export default function ModernToolbar({
  onRun,
  onFormat,
  onSave,
  onShare,
  onReset,
  isRunning = false,
  className = "",
}) {

  const toolbarActions = [
    {
      id: "run",
      label: "Run",
      icon: PlayIcon,
      onClick: onRun,
      shortcut: "Ctrl+Enter",
      variant: "primary",
      disabled: isRunning,
    },
    {
      id: "format",
      label: "Format",
      icon: CodeBracketIcon,
      onClick: onFormat,
      shortcut: "Shift+Alt+F",
      variant: "secondary",
    },
    {
      id: "save",
      label: "Save",
      icon: DocumentArrowDownIcon,
      onClick: onSave,
      shortcut: "Ctrl+S",
      variant: "secondary",
    },
    {
      id: "share",
      label: "Share",
      icon: ShareIcon,
      onClick: onShare,
      shortcut: "Ctrl+Shift+S",
      variant: "secondary",
    },
    {
      id: "reset",
      label: "Reset",
      icon: ArrowPathIcon,
      onClick: onReset,
      shortcut: "Ctrl+R",
      variant: "ghost",
    },
  ];

  return (
    <div className={`glass-strong flex items-center gap-2 p-2 rounded-lg border border-border-light ${className}`}>
      {toolbarActions.map((action) => {
        const Icon = action.icon;
        const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus-ring";
        const variantClasses = {
          primary: "btn-primary text-white",
          secondary: "btn-secondary",
          ghost: "btn-ghost",
        };

        return (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`${baseClasses} ${variantClasses[action.variant]} ${
              action.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            title={`${action.label} (${action.shortcut})`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{action.label}</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-secondary/50 rounded border border-border">
              {action.shortcut.split("+").map((key, i) => (
                <span key={i}>
                  {key}
                  {i < action.shortcut.split("+").length - 1 && "+"}
                </span>
              ))}
            </kbd>
          </button>
        );
      })}
      
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}

