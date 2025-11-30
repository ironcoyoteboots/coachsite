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
      <body className="bg-white">{children}</body>
    </html>
  );
}
