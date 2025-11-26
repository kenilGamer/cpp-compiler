"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function ResizablePanels({
  children,
  direction = "horizontal",
  defaultSizes = [50, 50],
  minSizes = [20, 20],
  storageKey = "panel-sizes",
  className = "",
}) {
  const [sizes, setSizes] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultSizes;
        }
      }
    }
    return defaultSizes;
  });

  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(sizes));
    }
  }, [sizes, storageKey]);

  const handleMouseDown = useCallback((index) => {
    setIsResizing(true);
    document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  }, [direction]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const totalSize = direction === "horizontal" ? rect.width : rect.height;
      const position = direction === "horizontal" ? e.clientX - rect.left : e.clientY - rect.top;

      const newSizes = [...sizes];
      const percentage = (position / totalSize) * 100;

      // Calculate new sizes
      const leftSize = Math.max(minSizes[0], Math.min(100 - minSizes[1], percentage));
      const rightSize = 100 - leftSize;

      newSizes[0] = leftSize;
      newSizes[1] = rightSize;

      setSizes(newSizes);
    },
    [isResizing, sizes, direction, minSizes]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const isHorizontal = direction === "horizontal";

  return (
    <div
      ref={containerRef}
      className={`flex ${isHorizontal ? "flex-row max-md:flex-col" : "flex-col"} h-full w-full ${className}`}
    >
      {children.map((child, index) => (
        <div key={index}>
          <div
            ref={(el) => (panelRefs.current[index] = el)}
            style={{
              [isHorizontal ? "width" : "height"]: `${sizes[index]}%`,
              [isHorizontal ? "height" : "width"]: "100%",
            }}
            className={`${isHorizontal ? "h-full" : "w-full"} overflow-hidden`}
          >
            {child}
          </div>
          {index < children.length - 1 && (
            <div
              onMouseDown={() => handleMouseDown(index)}
              className={`relative ${
                isHorizontal
                  ? "w-1 cursor-col-resize hover:w-2"
                  : "h-1 cursor-row-resize hover:h-2"
              } bg-border hover:bg-primary transition-all duration-200 group`}
              style={{
                [isHorizontal ? "minWidth" : "minHeight"]: "4px",
              }}
            >
              <div
                className={`absolute inset-0 ${
                  isHorizontal ? "w-0.5" : "h-0.5"
                } bg-primary opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

