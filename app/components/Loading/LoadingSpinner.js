"use client";

export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className={`spinner ${sizeClasses[size]} ${className}`} />
  );
}

export function LoadingSpinner3D({ className = "" }) {
  return (
    <div className={`spinner-3d ${className}`}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-accent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-b-cyan border-l-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
    </div>
  );
}

export function LoadingDots({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
}

