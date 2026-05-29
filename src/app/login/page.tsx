"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  async function signInWithGoogle() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Sign in to 6x7</h1>
          <p className="text-sm text-neutral-400">
            One login for every 6x7 app.
          </p>
        </div>

        {sent ? (
          <p className="rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-center text-sm text-neutral-200">
            Check your email for a sign-in link.
          </p>
        ) : (
          <>
            <button
              onClick={signInWithGoogle}
              className="w-full rounded-lg border border-neutral-700 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-100"
            >
              Continue with Google
            </button>

            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="h-px flex-1 bg-neutral-800" />
              or
              <span className="h-px flex-1 bg-neutral-800" />
            </div>

            <form onSubmit={signInWithEmail} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm outline-none focus:border-neutral-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white disabled:opacity-50"
              >
                {loading ? "Sending…" : "Email me a magic link"}
              </button>
            </form>
          </>
        )}

        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </main>
  );
}
