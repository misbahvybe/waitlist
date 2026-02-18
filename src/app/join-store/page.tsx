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

const CATEGORIES = ["Restaurant", "Grocery", "Pharmacy"];

const ORDER_RANGES = ["0-20", "20-50", "50+"];

export default function JoinStorePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    storeName: "",
    ownerName: "",
    phone: "",
    email: "",
    area: "",
    category: "",
    currentPlatform: "",
    avgDailyOrders: "",
    avgOrderValue: "",
    currentCommission: "",
    interestedIn15Percent: false,
  });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: form.storeName,
          ownerName: form.ownerName,
          phone: form.phone,
          email: form.email,
          area: form.area,
          category: form.category,
          currentPlatform: form.currentPlatform || undefined,
          avgDailyOrders: form.avgDailyOrders || undefined,
          avgOrderValue: form.avgOrderValue || undefined,
          currentCommission: form.currentCommission || undefined,
          interestedIn15Percent: form.interestedIn15Percent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      window.location.href = `/success?type=STORE&count=${data.count}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-6 py-16">
        <Link href="/" className="text-amber-400 hover:text-amber-300">
          ← Back to Home
        </Link>
        <h1 className="mt-8 text-3xl font-bold">Join as Store</h1>
        <p className="mt-2 text-slate-400">
          Become an early access partner. Get 15% fixed commission.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Store Name *
                </label>
                <input
                  name="storeName"
                  required
                  value={form.storeName}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. Pizza Corner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Owner Name *
                </label>
                <input
                  name="ownerName"
                  required
                  value={form.ownerName}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Phone (WhatsApp) *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="03XX XXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="owner@store.com"
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
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={form.category}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-amber-500 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Do you currently use Foodpanda/Careem?
                </label>
                <select
                  name="currentPlatform"
                  value={form.currentPlatform}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Average daily orders?
                </label>
                <select
                  name="avgDailyOrders"
                  value={form.avgDailyOrders}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Select</option>
                  {ORDER_RANGES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Average order value (PKR)?
                </label>
                <input
                  name="avgOrderValue"
                  type="number"
                  value={form.avgOrderValue}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. 1500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Current commission %?
                </label>
                <input
                  name="currentCommission"
                  type="number"
                  step="0.1"
                  value={form.currentCommission}
                  onChange={update}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. 35"
                />
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  name="interestedIn15Percent"
                  type="checkbox"
                  checked={form.interestedIn15Percent}
                  onChange={update}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-slate-300">
                  Interested in 15% fixed commission?
                </span>
              </label>

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
                  className="flex-1 rounded-xl bg-amber-500 py-4 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-50"
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
