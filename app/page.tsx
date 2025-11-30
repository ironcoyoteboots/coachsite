// app/page.tsx

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-500">
      {/* Hero */}
      <section className="
        relative w-full
        min-h-[340px]        /* mobile */
        sm:min-h-[380px]     /* small screens */
        md:min-h-[440px]     /* tablets */
        lg:min-h-[520px]     /* desktop */
        xl:min-h-[580px]     /* large desktop, optional */
        max-h-[550px]     
        overflow-hidden
      ">Í
        {/* Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="videos/hero2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 md:px-8 lg:px-10">
            <div className="w-full flex flex-col items-center">
              <h1 className="logo text-4xl tracking-wider text-white sm:text-6xl md:text-8xl">
                Coach<span className="text-lime-400">Site</span>
              </h1>

              <p className="mt-4 inline-block rounded-[10px] bg-black/40 px-6 py-6 text-base text-slate-100 sm:text-3xl">
                Launch a professional coaching site in minutes
              </p>
            </div>

            <div className="mt-2 flex flex-col items-center gap-3 mt-15">
              <button className="rounded-full bg-lime-500 px-8 py-3 text-base font-semibold text-white hover:bg-green-600 sm:text-2xl sm:whitespace-nowrap">
                Start your free preview
              </button>

              <p className="text-sm text-slate-100 sm:text-xl">
                Customize your site, pick your url and only pay when you’re ready to launch.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Sport tiles */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:px-8 lg:px-10">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Built for real coaches
        </h2>
        <p className="mt-2 text-sm sm:text-base">
          Start with a layout tuned for your sport, then make it yours with your
          photos, colors, and services.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {/* Pickleball */}
          <article className="flex flex-col gap-3 rounded-2xl border-4 border-lime-400/80 bg-white p-4 shadow-sm">
            <div className="flex w-full items-center justify-center rounded-xl bg-lime-50 text-xs text-lime-700">
              <img
                src="images/paddles1.jpg"
                alt="Pickleball coaching"
                className="h-60 w-full rounded-xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold sm:text-xl text-center">
                Pickleball Coaches
              </h3>
              <p className="mt-1 text-xs sm:text-sm">
                Show off clinics, weekly drop-in sessions, and 1:1 packages
                tailored to rec and competitive players.
              </p>
            </div>
          </article>

          {/* Golf */}
          <article className="flex flex-col gap-3 rounded-2xl border-4 border-emerald-500/80 bg-white p-4 shadow-sm">
            <div className="flex w-full items-center justify-center rounded-xl bg-emerald-50 text-xs text-emerald-700">
              <img
                src="images/golf1.jpg"
                alt="Golf coaching"
                className="h-60 w-full rounded-xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold sm:text-xl text-center">
                Golf Instructors
              </h3>
              <p className="mt-1 text-xs sm:text-sm">
                Highlight lessons, on-course coaching, and packages focused on
                driving, irons, short game, or putting.
              </p>
            </div>
          </article>

          {/* Running */}
          <article className="flex flex-col gap-3 rounded-2xl border-4 border-orange-400/80 bg-white p-4 shadow-sm">
            <div className="flex w-full items-center justify-center rounded-xl bg-orange-50 text-xs text-orange-700">
              <img
                src="images/runner1.jpg"
                alt="Running coaching"
                className="h-60 w-full rounded-xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold sm:text-xl text-center">
                Running Coaches
              </h3>
              <p className="mt-1 text-xs sm:text-sm">
                Promote training blocks, group runs, strength sessions, and
                race-day prep plans for your athletes.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Customization section */}
      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:px-8 lg:px-10">
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Your site, your voice — without rebuilding the internet
            </h2>
            <p className="text-sm sm:text-base">
              CoachSite gives you one powerful template that flexes around your
              coaching style. Update colors, photos, bio, offerings, locations,
              and availability from a simple dashboard.
            </p>
            <ul className="mt-2 space-y-1.5 text-sm ">
              <li>• Swap hero images and videos in seconds.</li>
              <li>• Personalized, easy to share urls, <u>YourName.coachsite.io</u></li>
              <li>• Add packages, classes, and clinics as your business grows.</li>
              <li>• Capture emails to stay in touch with future clients.</li>
              <li>• Process payments and subscriptions.</li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs sm:text-sm">
              <h4 className="font-medium ">
                Live Page Editor
              </h4>
              <p className="mt-2">
                From your dashboard, you’ll tweak colors, upload photos,
                organize offers, and preview your site in real time before
                publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Simple pricing for growing coaches
          </h2>
          <p className="mt-2 text-sm sm:text-base">
            Build your site and preview everything first. Only subscribe when
            you’re ready to start sharing and taking bookings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Plan 1 */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold sm:text-2xl text-center mb-2">
              Starter Page
            </h3>
            <p className="mt-1 text-xs ">
              Clean, simple info page.
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              $4
              <span className="text-base font-normal ml-1">
                /month
              </span>
            </p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm ">
              <li>• Custom hero, bio, and contact details.</li>
              <li>• Sport-specific layout and colors.</li>
              <li>• Email sign-up form for interested clients.</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2">
              Build your site — free preview
            </button>
          </div>

          {/* Plan 2 (recommended) */}
          <div className="relative flex flex-col rounded-2xl border-2 border-green-500 bg-white p-6 shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Most Popular
            </div>
            <h3 className="text-sm font-semibold sm:text-2xl text-center mb-2">
              Coach
            </h3>
            <p className="mt-1 text-xs ">
              Bookings, classes, and clinics.
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              $19
              <span className="text-base font-normal ml-1 ">
                /month
              </span>
            </p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm ">
              <li>• Everything in Starter Page.</li>
              <li>• Private lesson, class, and clinic basic scheduling.</li>
              <li>• Take payments for sessions and packages.</li>
              <li>• Automated confirmations for clients.</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2">
              Build your site — free preview
            </button>
          </div>

          {/* Plan 3 */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold sm:text-2xl text-center mb-2">
              Pro
            </h3>
            <p className="mt-1 text-xs ">
              For coaches running full programs.
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              $59
              <span className="text-base font-normal ml-1">
                /month
              </span>
            </p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm ">
              <li>• Everything plus</li>
              <li>• Create custom multi-week programs.</li>
              <li>• Support recurring client subscriptions.</li>
              <li>• Great for group training blocks and teams.</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2">
              Build your site — free preview
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
