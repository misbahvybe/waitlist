"use client";

import { useState, useEffect } from "react";

const HOURS_PER_SIGNUP = 1; // Each signup adds 1 hour to the countdown

function getTargetDate(signupCount: number): Date {
  const target = new Date();
  target.setMonth(3); // April (0-indexed)
  target.setDate(1);
  target.setHours(0, 0, 0, 0);
  const now = new Date();
  if (target <= now) {
    target.setFullYear(target.getFullYear() + 1);
  }
  const extraMs = signupCount * HOURS_PER_SIGNUP * 60 * 60 * 1000;
  return new Date(target.getTime() + extraMs);
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [signupCount, setSignupCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    const fetchCount = () => {
      fetch("/api/waitlist/count")
        .then((res) => res.json())
        .then((data) => setSignupCount(data.total ?? 0))
        .catch(() => setSignupCount(0));
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const target = getTargetDate(signupCount);

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [mounted, signupCount]);

  if (!mounted) {
    return (
      <div className="mt-8 flex justify-center gap-4">
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="h-14 w-16 rounded-lg bg-slate-800 animate-pulse" />
            <span className="mt-2 text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" },
      ].map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="flex h-14 w-16 items-center justify-center rounded-lg border border-slate-600 bg-slate-800/80 text-2xl font-bold tabular-nums text-amber-400 sm:h-16 sm:w-20 sm:text-3xl">
            {String(value).padStart(2, "0")}
          </div>
          <span className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
