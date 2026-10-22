import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const NAV = [
  ["/admin", "Overview"], ["/admin/users", "Users"], ["/admin/apps", "Apps"], ["/admin/deploys", "Deploys"],
  ["/admin/sparks", "Sparks"], ["/admin/health", "Health"], ["/admin/contact", "Contact"],
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 text-sm">
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <span className="font-semibold">6x7 · admin</span>
          <nav className="flex flex-wrap gap-1">
            {NAV.map(([href, label]) => (
              <Link key={href} href={href} className="rounded px-2 py-1 text-neutral-300 hover:bg-neutral-800 hover:text-white">{label}</Link>
            ))}
          </nav>
          <span className="ml-auto text-xs text-neutral-500">{user.email}</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
