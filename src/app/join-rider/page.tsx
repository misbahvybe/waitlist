"use client";

import { useState } from "react";
import Link from "next/link";

const AREAS = [
  "DHA",
  "Gulberg",
  "Johar Town",
  "Model Town",
  "Bahria",
  "Faisal Town",
  "Garden Town",
  "Cantt",
  "Defence",
  "Other",
];

const PLATFORMS = ["Foodpanda", "Careem", "None"];

export default function JoinRiderPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    area: "",
    ownsBike: "",
    currentPlatform: "",
    dailyEarnings: "",
    availabilityHours: "",
    flexibleShiftInterest: "",
  });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist/rider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          whatsapp: form.whatsapp || form.phone,
          area: form.area,
          ownsBike: form.ownsBike === "Yes",
          currentPlatform: form.currentPlatform || undefined,
          dailyEarnings: form.dailyEarnings || undefined,
          availabilityHours: form.availabilityHours || undefined,
          flexibleShiftInterest: form.flexibleShiftInterest === "Yes",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      window.location.href = `/success?type=RIDER&count=${data.count}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-6 py-16">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300">
          ← Back to Home
        </Link>
        <h1 className="mt-8 text-3xl font-bold">Join as Rider</h1>
        <p className="mt-2 text-slate-400">
          Higher earnings. Flexible shifts. Area-based assignments.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Full Name *
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Phone *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="03XX XXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  WhatsApp (if different)
                </label>
                <input
                  name="whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="03XX XXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Area *
                </label>
                <select
                  name="area"
                  required
                  value={form.area}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select area</option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Do you own a bike?
                </label>
                <select
                  name="ownsBike"
                  value={form.ownsBike}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Currently working for?
                </label>
                <select
                  name="currentPlatform"
                  value={form.currentPlatform}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Average daily earnings (PKR)?
                </label>
                <input
                  name="dailyEarnings"
                  type="number"
                  value={form.dailyEarnings}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. 2500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Available hours per day?
                </label>
                <input
                  name="availabilityHours"
                  type="number"
                  min="1"
                  max="24"
                  value={form.availabilityHours}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. 8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Interested in flexible shifts?
                </label>
                <select
                  name="flexibleShiftInterest"
                  value={form.flexibleShiftInterest}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {error && (
                <p className="rounded-lg bg-rose-500/20 p-3 text-rose-400">
                  {error}
                </p>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-xl border border-slate-600 py-4 font-semibold transition hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-emerald-500 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
                >
                  {loading ? "Joining..." : "Join Early Access"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
