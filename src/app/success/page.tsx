import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; count?: string }>;
}) {
  const params = await searchParams;
  const type = params.type || "CUSTOMER";
  const count = params.count;

  let countNum: number;
  let totalSignups = 0;
  if (count) {
    countNum = parseInt(count, 10);
  } else {
    countNum = 0;
  }
  try {
    const h = await headers();
    const host = h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const base = `${proto}://${host}`;
    if (!count) {
      const res = await fetch(`${base}/api/waitlist/count?type=${type}`, {
        cache: "no-store",
      });
      const data = await res.json();
      countNum = data.count ?? 0;
    }
    const metricsRes = await fetch(`${base}/api/waitlist/metrics`, {
      cache: "no-store",
    });
    const metrics = await metricsRes.json();
    totalSignups = metrics.totalSignups ?? 0;
  } catch {
    // use countNum from URL or 0
  }

  const labels: Record<string, string> = {
    STORE: "Early Access Partner",
    RIDER: "Early Access Rider",
    CUSTOMER: "Early Access Member",
  };
  const label = labels[type] || "Early Access Member";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-6 text-3xl font-bold">
          You&apos;re {label} #{countNum}
        </h1>
        <p className="mt-4 text-slate-400">
          We will contact you before launch.
        </p>
        {totalSignups > 0 && (
          <p className="mt-6 text-slate-400">
            Join {totalSignups}+ Lahore partners preparing for launch.
          </p>
        )}
        <p className="mt-4 rounded-lg bg-amber-500/20 p-4 text-amber-400">
          Limited to 100 founding stores at 15% lifetime commission.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Refer another store and move up in priority.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function CountFallback() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-6 text-3xl font-bold">You&apos;re in!</h1>
        <p className="mt-4 text-slate-400">Loading your position...</p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; count?: string }>;
}) {
  return (
    <Suspense fallback={<CountFallback />}>
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
