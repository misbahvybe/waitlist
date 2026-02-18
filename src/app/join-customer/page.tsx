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

const INTERESTS = ["Food", "Grocery", "Medicine"];

export default function JoinCustomerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    interestCategory: "",
    wantsLaunchDiscount: false,
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
      const res = await fetch("/api/waitlist/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          area: form.area,
          interestCategory: form.interestCategory || undefined,
          wantsLaunchDiscount: form.wantsLaunchDiscount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      window.location.href = `/success?type=CUSTOMER&count=${data.count}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-6 py-16">
        <Link href="/" className="text-sky-400 hover:text-sky-300">
          ← Back to Home
        </Link>
        <h1 className="mt-8 text-3xl font-bold">Join as Customer</h1>
        <p className="mt-2 text-slate-400">
          Reliable delivery. Transparent pricing. Early launch discounts.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Name *
            </label>
            <input
              name="name"
              required
              value={form.name}
              onChange={update}
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Your name"
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
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
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
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
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
              What would you order most?
            </label>
            <select
              name="interestCategory"
              value={form.interestCategory}
              onChange={update}
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select</option>
              {INTERESTS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              name="wantsLaunchDiscount"
              type="checkbox"
              checked={form.wantsLaunchDiscount}
              onChange={update}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500"
            />
            <span className="text-slate-300">Want launch discount?</span>
          </label>

          {error && (
            <p className="rounded-lg bg-rose-500/20 p-3 text-rose-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-500 py-4 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Early Access"}
          </button>
        </form>
      </div>
    </div>
  );
}
