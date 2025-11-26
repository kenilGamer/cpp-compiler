"use client";

import { ClockIcon, CpuChipIcon, CircleStackIcon } from "@heroicons/react/24/outline";

export default function ExecutionStats({ 
  executionTime, 
  memoryUsed, 
  cpuUsage,
  className = "" 
}) {
  const formatExecutionTime = (ms) => {
    if (!ms && ms !== 0) return 'N/A';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatMemoryUsage = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const formatCPUUsage = (percent) => {
    if (!percent && percent !== 0) return 'N/A';
    return `${percent.toFixed(1)}%`;
  };

  const stats = [
    {
      label: "Runtime",
      value: formatExecutionTime(executionTime),
      icon: ClockIcon,
      color: "text-blue-400",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    },
    {
      label: "Memory",
      value: formatMemoryUsage(memoryUsed),
      icon: CircleStackIcon,
      color: "text-green-400",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    },
    {
      label: "CPU",
      value: formatCPUUsage(cpuUsage),
      icon: CpuChipIcon,
      color: "text-purple-400",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    },
  ];

  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="card-glass p-4 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-secondary/50 ${stat.glow}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
            <div className="text-lg font-mono font-semibold text-foreground">
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

