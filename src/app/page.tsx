import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <header className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-950 to-emerald-500/10" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
            Coming Soon
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
            VYBE
          </h1>
          <p className="mt-2 text-2xl font-semibold text-amber-400">
            SuperApp
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
          Everything you need-now with crypto.
</p>
          {/* Replace tagline below with your finalized punchline */}
          <p className=" max-w-2xl mx-auto text-lg text-slate-400">
            The ultimate super app combining food delivery and rider services in
            one seamless platform
          </p>

          {/* Restaurants | Riders | Customers */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link
              href="/join-store"
              className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Restaurants
            </Link>
            <Link
              href="/join-rider"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Riders
            </Link>
            <Link
              href="/join-customer"
              className="rounded-xl border border-slate-500 px-8 py-4 font-semibold transition hover:border-slate-400 hover:bg-slate-800/50"
            >
              Customers
            </Link>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center">
            <span className="text-4xl">🚀</span>
            <h3 className="mt-4 font-semibold text-amber-400">
              Fast & Reliable
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Lightning quick deliveries powered by our network
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center">
            <span className="text-4xl">🛡️</span>
            <h3 className="mt-4 font-semibold text-emerald-400">
              Secure & Safe
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Your data and transactions are fully protected
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center">
            <span className="text-4xl">⭐</span>
            <h3 className="mt-4 font-semibold text-sky-400">
              Premium Experience
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Exclusive perks for early adopters
            </p>
          </div>
        </div>
      </section>

      {/* VYBE Superapp - Replace line below with your finalized tagline */}
      <section className="relative z-10 border-t border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-amber-400">
            VYBE Superapp
          </h2>
          <p className="mt-4 text-xl font-medium text-slate-200">
            {/* TODO: Replace with your finalized line */}
            Your all-in-one platform for delivery and more
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="text-lg text-slate-400">
            Join the waitlist today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/join-store"
              className="rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Restaurants
            </Link>
            <Link
              href="/join-rider"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Riders
            </Link>
            <Link
              href="/join-customer"
              className="rounded-xl border border-slate-500 px-8 py-4 font-semibold transition hover:border-slate-400 hover:bg-slate-800/50"
            >
              Customers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
