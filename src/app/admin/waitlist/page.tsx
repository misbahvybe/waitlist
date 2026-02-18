"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Tab = "STORE" | "RIDER" | "CUSTOMER";
type Status = "NEW" | "CONTACTED" | "CONVERTED" | "ONBOARDED" | "REJECTED";

interface Entry {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string | null;
  area: string;
  storeName: string | null;
  category: string | null;
  avgDailyOrders: number | null;
  avgOrderValue: string | null;
  currentCommission: string | null;
  currentPlatform: string | null;
  ownsBike: boolean | null;
  dailyEarnings: string | null;
  availabilityHours: number | null;
  interestCategory: string | null;
  wantsLaunchDiscount: boolean | null;
  status: string;
  createdAt: string;
}

interface Metrics {
  totalStores: number;
  totalRiders: number;
  totalCustomers: number;
  totalSignups: number;
  avgStoreCommission: number | null;
  avgRiderEarnings: number | null;
}

export default function AdminWaitlistPage() {
  const [tab, setTab] = useState<Tab>("STORE");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
    fetchMetrics();
  }, [tab]);

  const fetchEntries = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/waitlist?type=${tab}`);
    const data = await res.json();
    setEntries(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchMetrics = async () => {
    const res = await fetch("/api/waitlist/metrics");
    const data = await res.json();
    setMetrics(data);
  };

  const updateStatus = async (id: string, status: Status) => {
    await fetch(`/api/admin/waitlist/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchEntries();
    fetchMetrics();
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/admin/waitlist/${id}`, { method: "DELETE" });
    fetchEntries();
    fetchMetrics();
  };

  const exportCsv = () => {
    const headers =
      tab === "STORE"
        ? ["Store Name", "Owner", "Area", "Category", "Avg Orders", "Commission", "Status"]
        : tab === "RIDER"
          ? ["Name", "Area", "Platform", "Earnings", "Status"]
          : ["Name", "Area", "Interest", "Status"];
    const rows = entries.map((e) =>
      tab === "STORE"
        ? [
            e.storeName || "",
            e.name,
            e.area,
            e.category || "",
            e.avgDailyOrders ?? "",
            e.currentCommission ?? "",
            e.status,
          ]
        : tab === "RIDER"
          ? [e.name, e.area, e.currentPlatform || "", e.dailyEarnings ?? "", e.status]
          : [e.name, e.area, e.interestCategory || "", e.status]
    );
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vybe-waitlist-${tab.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/" className="text-amber-400 hover:text-amber-300">
          ← Back to Home
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Waitlist Admin</h1>

        {metrics && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-400">Stores</p>
              <p className="text-2xl font-bold text-amber-400">
                {metrics.totalStores}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-400">Riders</p>
              <p className="text-2xl font-bold text-emerald-400">
                {metrics.totalRiders}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-400">Customers</p>
              <p className="text-2xl font-bold text-sky-400">
                {metrics.totalCustomers}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-400">Avg Store Commission</p>
              <p className="text-2xl font-bold">
                {metrics.avgStoreCommission != null
                  ? `${metrics.avgStoreCommission.toFixed(1)}%`
                  : "—"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-2 border-b border-slate-700">
          {(["STORE", "RIDER", "CUSTOMER"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-2 font-medium transition ${
                tab === t
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}s
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={exportCsv}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium hover:bg-slate-800"
          >
            Export CSV
          </button>
        </div>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading...</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-left text-sm text-slate-400">
                  {tab === "STORE" && (
                    <>
                      <th className="pb-3 pr-4">Store Name</th>
                      <th className="pb-3 pr-4">Owner</th>
                      <th className="pb-3 pr-4">Area</th>
                      <th className="pb-3 pr-4">Category</th>
                      <th className="pb-3 pr-4">Avg Orders</th>
                      <th className="pb-3 pr-4">Commission</th>
                    </>
                  )}
                  {tab === "RIDER" && (
                    <>
                      <th className="pb-3 pr-4">Name</th>
                      <th className="pb-3 pr-4">Area</th>
                      <th className="pb-3 pr-4">Platform</th>
                      <th className="pb-3 pr-4">Earnings</th>
                    </>
                  )}
                  {tab === "CUSTOMER" && (
                    <>
                      <th className="pb-3 pr-4">Name</th>
                      <th className="pb-3 pr-4">Area</th>
                      <th className="pb-3 pr-4">Interest</th>
                    </>
                  )}
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-slate-800 text-sm"
                  >
                    {tab === "STORE" && (
                      <>
                        <td className="py-3 pr-4">{e.storeName || "—"}</td>
                        <td className="py-3 pr-4">{e.name}</td>
                        <td className="py-3 pr-4">{e.area}</td>
                        <td className="py-3 pr-4">{e.category || "—"}</td>
                        <td className="py-3 pr-4">{e.avgDailyOrders ?? "—"}</td>
                        <td className="py-3 pr-4">{e.currentCommission ?? "—"}</td>
                      </>
                    )}
                    {tab === "RIDER" && (
                      <>
                        <td className="py-3 pr-4">{e.name}</td>
                        <td className="py-3 pr-4">{e.area}</td>
                        <td className="py-3 pr-4">{e.currentPlatform || "—"}</td>
                        <td className="py-3 pr-4">{e.dailyEarnings ?? "—"}</td>
                      </>
                    )}
                    {tab === "CUSTOMER" && (
                      <>
                        <td className="py-3 pr-4">{e.name}</td>
                        <td className="py-3 pr-4">{e.area}</td>
                        <td className="py-3 pr-4">{e.interestCategory || "—"}</td>
                      </>
                    )}
                    <td className="py-3 pr-4">
                      <select
                        value={e.status}
                        onChange={(ev) =>
                          updateStatus(e.id, ev.target.value as Status)
                        }
                        className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="ONBOARDED">ONBOARDED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteEntry(e.id)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {entries.length === 0 && (
              <p className="py-12 text-center text-slate-500">
                No entries yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
