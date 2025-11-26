"use client";

export default function ShimmerLoader({ className = "", lines = 3 }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="shimmer-loader h-4 rounded"
          style={{
            width: i === lines - 1 ? '60%' : '100%',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ShimmerCard({ className = "" }) {
  return (
    <div className={`shimmer-loader rounded-lg ${className}`} style={{ height: '200px' }} />
  );
}

export function ShimmerText({ className = "", width = "100%" }) {
  return (
    <div
      className={`shimmer-loader h-4 rounded ${className}`}
      style={{ width }}
    />
  );
}

