import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getOrCreateAccountForUser } from '@/lib/auth/account';

export default async function AccountDebugPage() {
  const { userId } = await auth(); // ✅ correct


  // If not logged in, send to sign-in
  if (!userId) {
    redirect('/sign-in');
  }

  // This will either fetch or create the Account row
  const account = await getOrCreateAccountForUser();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Account debug</h1>
      <p className="mb-2 text-sm text-slate-500">
        This is the Account row in your database linked to your current Clerk user:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
        {JSON.stringify(account, null, 2)}
      </pre>
    </main>
  );
}
