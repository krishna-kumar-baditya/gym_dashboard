"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [session, setSession] = useState<any>(null);

    /* ================= CHECK SESSION ================= */
    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            console.log("Current session:", session); // ✅ debug
            setSession(session);
        };

        checkSession();
    }, []);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.user) {
            setError(error?.message ?? "Login failed");
            setLoading(false);
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

        if (profileError || profile.role !== "admin") {
            await supabase.auth.signOut();
            setError("Access denied. Admins only.");
            setLoading(false);
            return;
        }

        setLoading(false);
        window.location.href = "/admin/dashboard";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-semibold text-white">
                            Admin Login
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Sign in to access the dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full rounded-xl bg-white/5 px-4 py-3 text-white outline-none"
                        />

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl bg-white/5 px-4 py-3 text-white outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-emerald-500 py-3 font-medium text-black disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                    <div className="mb-6 mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        <p className="font-medium text-emerald-200">
                            Admin Access
                        </p>
                        <p>
                            Email:{" "}
                            <span className="font-mono">admin@gmail.com</span>
                        </p>
                        <p>
                            Password:{" "}
                            <span className="font-mono">Kargil@&$#01</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
