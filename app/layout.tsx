import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { SiteHeaderLanding } from '@/components/SiteHeaderLanding';

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


    <ClerkProvider>
      <html lang="en">
        <head>
          {/* ADD THIS */}
          <link rel="stylesheet" href={"https://fonts.googleapis.com/css2?" +
            "family=Anton&" +
            "family=Bungee+Shade&" +
            "family=Bungee+Spice&" +
            "family=Chango&" +
            "family=Chewy&family=Honk:MORF@15&" +
            "family=Knewave&" +
            "family=Inter:wght@300;400;500;600&" +
            "family=Lexend+Zetta:wght@100..900&" +
            "family=Montserrat:ital,wght@0,100..900;1,100..900&" +
            "family=Outfit:wght@100..900&" +
            "family=Quicksand:wght@300..700&" +
            "family=Rubik+Dirt&" +
            "family=Rubik+Glitch&" +
            "family=Rubik+Wet+Paint&" +
            "family=Ultra&" +
            "family=Wendy+One&display=swap"} />

        </head>
        <body className="min-h-screen bg-white">
          <div className="flex min-h-screen flex-col">
            {/* Top nav */}
            <SiteHeaderLanding />

            {/* Page content */}
            <main className="flex-1">
              {children}
            </main>
          </div>

          <footer className="w-full border-t border-slate-200 bg-white text-slate-400">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
              © {new Date().getFullYear()} CoachSite.io, All rights reserved.
            </div>
          </footer>
        </body>

      </html>
    </ClerkProvider>
  );
}
