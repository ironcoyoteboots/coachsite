import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* You can add an AdminHeader here later if you want */}
      <main className="flex-1">{children}</main>
    </div>
  );
}