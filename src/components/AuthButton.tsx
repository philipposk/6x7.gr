"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  if (!ready) return null;

  return (
    <div className="fixed right-4 top-4 z-50">
      {user ? (
        <div className="flex items-center gap-3 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1.5 text-sm backdrop-blur">
          <span className="max-w-[12rem] truncate text-neutral-200">
            {user.user_metadata?.display_name ?? user.email}
          </span>
          <button
            onClick={signOut}
            className="text-neutral-400 transition hover:text-white"
          >
            Sign out
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-1.5 text-sm text-neutral-200 backdrop-blur transition hover:text-white"
        >
          Sign in
        </Link>
      )}
    </div>
  );
}
