"use client";

export function AnimatedStarsBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        {/* Star layer 1 - slow drift */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40 animate-star-float"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: 4,
              height: 4,
              animationDelay: `${(i % 20) * 0.5}s`,
              animationDuration: `${15 + (i % 10)}s`,
            }}
          />
        ))}
        {/* Star layer 2 - smaller, faster */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`s2-${i}`}
            className="absolute rounded-full bg-slate-500/50 animate-star-float-reverse"
            style={{
              left: `${(i * 31) % 100}%`,
              top: `${(i * 19) % 100}%`,
              width: 3,
              height: 3,
              animationDelay: `${(i % 15) * 0.7}s`,
              animationDuration: `${10 + (i % 8)}s`,
            }}
          />
        ))}
        {/* Star layer 3 - twinkle */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`s3-${i}`}
            className="absolute rounded-full bg-slate-400/60 animate-star-twinkle"
            style={{
              left: `${(i * 29) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: 4,
              height: 4,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
