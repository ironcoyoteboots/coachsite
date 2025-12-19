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
        <link  rel="stylesheet" href={"https://fonts.googleapis.com/css2?"+
          "family=Anton&"+
          "family=Bungee+Shade&"+
          "family=Bungee+Spice&"+
          "family=Chango&"+
          "family=Chewy&family=Honk:MORF@15&"+
          "family=Knewave&"+
          "family=Inter:wght@300;400;500;600&"+
          "family=Lexend+Zetta:wght@100..900&"+
          "family=Montserrat:ital,wght@0,100..900;1,100..900&"+
          "family=Outfit:wght@100..900&"+
          "family=Quicksand:wght@300..700&"+
          "family=Rubik+Dirt&"+
          "family=Rubik+Glitch&"+
          "family=Rubik+Wet+Paint&"+
          "family=Ultra&"+
          "family=Wendy+One&display=swap"}/>

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
