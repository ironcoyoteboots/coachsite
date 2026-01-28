import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
       <SignIn
          appearance={{
            elements: {
              card: "bg-slate-900 border border-slate-800 shadow-xl",
            },
          }}
        />
    </div>
  );
}