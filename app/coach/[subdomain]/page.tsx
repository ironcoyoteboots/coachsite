// app/coach/[subdomain]/page.tsx

type Params = Promise<{ subdomain: string }>;

export default async function CoachPage({ params }: { params: Params }) {
  const { subdomain } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="max-w-lg space-y-4 text-center">
        <h1 className="text-2xl font-bold">Debug Coach Route</h1>
        <p>Params Next.js received:</p>

        <pre className="mt-4 rounded-lg bg-black/50 p-4 text-left text-sm">
          {JSON.stringify({ subdomain }, null, 2)}
        </pre>

        <p className="text-sm opacity-80">
          You requested: <code>/coach/{subdomain}</code>
        </p>
      </div>
    </main>
  );
}
