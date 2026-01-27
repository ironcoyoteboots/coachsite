// app/(mainsite)/layout.tsx
import type { ReactNode } from "react";
import { SiteHeaderMain } from "@/components/SiteHeaderMain";

export default function MainsiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeaderMain />
      <main className="flex-1">{children}</main>
    </div>
  );
}