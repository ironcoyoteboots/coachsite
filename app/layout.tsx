import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoachSite',
  description: 'Simple, powerful websites for sports coaches.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (

    <html lang="en">
      <head>
        {/* ADD THIS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ultra&display=swap" rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />

      </head>
      <body className="bg-white">{children}

        <footer className="w-full border-t border-slate-200 bg-white text-slate-400">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} CoachSite.io, All rights reserved.
          </div>
        </footer>
      </body>

    </html>
  );
}
