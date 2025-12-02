
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-600">
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
        <div className="absolute inset-0 bg-black/45" />

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
                Private lessons, clinics, weekly group sessions and mulit-lesson packages
                tailored to for your players.
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
      <section className="border-y border-slate-100 bg-slate-200">
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
            <div className="rounded-2xl border border border-slate-500/50 bg-white p-4 text-xs sm:text-sm">
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
          <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-green-400">
            <h3 className="text-sm font-semibold sm:text-2xl text-center mb-2">
              Starter
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
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition group-hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2">
              Build your site — free preview
            </button>
          </div>

          {/* Plan 2 (recommended) */}
          <div className="group relative flex flex-col rounded-2xl border-2 border-green-500 bg-white p-6 shadow-md hover:border-green-400">
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
              <li>Starter Page plus:</li>
              <li>• Private lesson, class, and clinic basic scheduling.</li>
              <li>• Take payments for sessions and packages.</li>
              <li>• Automated confirmations for clients.</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition group-hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2">
              Build your site — free preview
            </button>
          </div>

          {/* Plan 3 */}
          <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-green-400">
            <h3 className="text-sm font-semibold sm:text-2xl text-center mb-2">
              Professional
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
            <ul className="mt-4 flex-1 space-y-1.5 text-sm  ">
              <li>Coach plus:</li>
              <li>• Create custom multi-week programs.</li>
              <li>• Support recurring client subscriptions.</li>
              <li>• Great for group training blocks and teams.</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition group-hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2">
              Build your site — free preview
            </button>
          </div>

        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="rounded-full bg-green-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2"
          >
            See all plans and options
          </button>
        </div>
      </section>

      <section className="relative border-y border-slate-100">

        {/* Full-width background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/pickleballcourt.jpg')" }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative mx-auto w-full max-w-4xl px-4 py-16">
          <h2 className="text-xl font-semibold tracking-tight sm:text-3xl mb-8 text-white">
            What coaches are saying
          </h2>

          <div className="flex flex-col gap-8 text-lg italic">

            {/* Testimonial 1 */}
            <div className="rounded-xl border-2 border-black bg-white p-6 shadow-xl backdrop-blur-sm">
              <p className="leading-relaxed">
                “CoachSite made launching my coaching business ridiculously easy.
                I built my site in one evening, and had my first paid lesson the next day.”
              </p>
              <p className="mt-4 text-right">
                — Jamie R.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-xl border-2 border-black bg-white p-6 shadow-xl backdrop-blur-sm">
              <p className="leading-relaxed">
                “I love how clean everything looks. My students can book lessons instantly
                without texting me at random hours. Total game changer.”
              </p>
              <p className="mt-4 text-right">
                — Taylor M.
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-xl border-2 border-black bg-white p-6 shadow-xl backdrop-blur-sm">
              <p className="leading-relaxed">
                “Finally a website builder that feels like it was actually designed for coaches.
                I customized my colors, added my schedule, and everything just… works.”
              </p>
              <p className="mt-4 text-right">
                — Alex K.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            How your coach site comes together
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Start from a smart proven, sport-specific layout, then make it yours with your own url,
            visuals, offers, and schedule.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          {/* Wireframe mock */}
          <div className="relative mx-auto w-full max-w-md mr-4 mb-4">

            {/* Back layers (mock extra pages) */}
            <div className="absolute -bottom-8 -right-8 hidden h-full w-full rounded-2xl border border-slate-300 bg-slate-200 md:block" />
            <div className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl border border-slate-300 bg-green-100 md:block" />

            {/* Main mock page */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

              {/* Top bar */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="h-3 w-16 rounded bg-slate-200" />
                <div className="flex gap-2">
                  <div className="h-3 w-10 rounded bg-slate-200" />
                  <div className="h-3 w-10 rounded bg-slate-200" />
                  <div className="h-3 w-10 rounded bg-slate-200" />
                </div>
              </div>

              {/* Hero area */}
              <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-900/80">

                {/* Logo placeholder */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 h-10 h-2 w-28 rounded-full bg-slate-200 bg-slate-300" />

                {/* Hero image/video */}
                <div className="h-28 bg-slate-800 sm:h-32" />

                {/* Footer pill containing button + line */}
                <div className="flex flex-col items-center justify-center gap-2 p-3">
                  <div className="h-7 w-24 rounded-full bg-green-500/90" />
                  <div className="h-2 w-28 rounded bg-slate-600" />
                </div>
              </div>

              {/* Offer tiles */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="space-y-2 rounded-lg border border-green-400/70 bg-slate-50 p-2">
                  <div className="h-8 rounded bg-slate-200" />
                  <div className="h-2 w-12 rounded bg-green-400" />
                  <div className="h-2 w-10 rounded bg-slate-200" />
                </div>
                <div className="space-y-2 rounded-lg border border-green-400/70 bg-slate-50 p-2">
                  <div className="h-8 rounded bg-slate-200" />
                  <div className="h-2 w-12 rounded bg-green-400" />
                  <div className="h-2 w-10 rounded bg-slate-200" />
                </div>
                <div className="space-y-2 rounded-lg border border-green-400/70 bg-slate-50 p-2">
                  <div className="h-8 rounded bg-slate-200" />
                  <div className="h-2 w-12 rounded bg-green-400" />
                  <div className="h-2 w-10 rounded bg-slate-200" />
                </div>
              </div>

              {/* Testimonials strip */}
              <div className="mb-4 space-y-2 rounded-xl bg-slate-50 p-3">
                <div className="h-2.5 w-24 rounded bg-slate-200" />
                <div className="h-2 w-32 rounded bg-slate-200" />
                <div className="h-2 w-20 rounded bg-slate-200" />
              </div>

              {/* Scheduling / events bar */}
              <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-slate-900/90 p-3">
                <div className="space-y-1">
                  <div className="h-2.5 w-20 rounded bg-green-400" />
                  <div className="h-2 w-28 rounded bg-slate-600" />
                </div>
                <div className="h-7 w-24 rounded-full bg-green-500/90" />
              </div>

              {/* NEW: additional info tile row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1 rounded-lg border border-slate-300 bg-slate-100 p-2">
                  <div className="h-6 rounded bg-slate-200" />
                  <div className="h-2 w-16 rounded bg-slate-300" />
                </div>
                <div className="space-y-1 rounded-lg border border-slate-300 bg-slate-100 p-2">
                  <div className="h-6 rounded bg-slate-200" />
                  <div className="h-2 w-14 rounded bg-slate-300" />
                </div>
                <div className="space-y-1 rounded-lg border border-slate-300 bg-slate-100 p-2">
                  <div className="h-6 rounded bg-slate-200" />
                  <div className="h-2 w-20 rounded bg-slate-300" />
                </div>
              </div>

            </div>
          </div>


          {/* Explanation / steps */}
          <div className="flex-1 space-y-5 text-sm sm:text-base text-slate-600">
            <p>
              Every coach site starts from a proven layout: hero, offers, testimonials,
              and schedule. From there, you customize just the parts that matter.
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  1. Choose your own URL
                </h3>
                <p className="text-sm">
                  Pick a clean, memorable subdomain like <span className="font-semibold text-slate-700">yourname.coachsite.io</span> so players can
                  find you easily and book lessons without digging through social media.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold  sm:text-base">
                  2. Drop in your hero
                </h3>
                <p className="text-sm">
                  Choose from our stock content or upload your custom hero video or image, your logo, and a simple intro that tells
                  players who you are and what you coach.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold  sm:text-base">
                  3. Add your core offerings
                </h3>
                <p className="text-sm">
                  Create up to three main tiles for private lessons, groups, clinics, or
                  training blocks—each with its own description and pricing.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  4. Show social proof
                </h3>
                <p className="text-sm">
                  Add a few quick testimonials so new clients see real results from real
                  players, right on your page.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold  sm:text-base">
                  5. Keep your schedule and events up to date
                </h3>
                <p className="text-sm">
                  Highlight open lesson spots, recurring classes, and special events so your
                  calendar stays full without back-and-forth texts.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              As we ship more features, this section will evolve to mirror the real coach
              page layout—this is just a visual placeholder for now.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="rounded-full bg-green-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:ring-offset-2"
          >
            Build your Coaching Site now!
          </button>
        </div>
      </section>


    </main>
  );
}
