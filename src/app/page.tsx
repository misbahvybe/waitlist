import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-950 to-emerald-500/10" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            VYBE
          </h1>
          <p className="mt-2 text-2xl font-semibold text-amber-400">
            Lahore&apos;s Fair Delivery Platform
          </p>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            15% commission. Launching soon.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/join-store"
              className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Join as Store
            </Link>
            <Link
              href="/join-rider"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Join as Rider
            </Link>
            <Link
              href="/join-customer"
              className="rounded-xl border border-slate-500 px-8 py-4 font-semibold transition hover:border-slate-400 hover:bg-slate-800/50"
            >
              Join as Customer
            </Link>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold text-amber-400">
            The Problem Today
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            <li className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4">
              <span className="font-semibold text-rose-400">
                35–40% commission
              </span>
              <p className="mt-1 text-sm text-slate-400">
                Platforms take too much from stores
              </p>
            </li>
            <li className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4">
              <span className="font-semibold text-rose-400">
                Low rider earnings
              </span>
              <p className="mt-1 text-sm text-slate-400">
                Riders earn less than they deserve
              </p>
            </li>
            <li className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4">
              <span className="font-semibold text-rose-400">
                Slow deliveries
              </span>
              <p className="mt-1 text-sm text-slate-400">
                Unreliable and inconsistent delivery times
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Value Props */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-bold text-amber-400">
          Why Join VYBE Early?
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="font-semibold text-amber-400">For Stores</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Fixed 15% commission</li>
              <li>• Faster payouts</li>
              <li>• Fair partnership model</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="font-semibold text-emerald-400">For Riders</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Higher earnings per delivery</li>
              <li>• No forced 12-hour shifts</li>
              <li>• Area-based assignments</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="font-semibold text-sky-400">For Customers</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Transparent pricing</li>
              <li>• Early launch discounts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="text-lg text-slate-400">
            Limited spots for founding partners. Join the waitlist today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/join-store"
              className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Join as Store
            </Link>
            <Link
              href="/join-rider"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Join as Rider
            </Link>
            <Link
              href="/join-customer"
              className="rounded-xl border border-slate-500 px-8 py-4 font-semibold transition hover:border-slate-400 hover:bg-slate-800/50"
            >
              Join as Customer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
