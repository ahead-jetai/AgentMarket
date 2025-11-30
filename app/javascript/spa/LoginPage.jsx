import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogoIcon } from "./LogoIcon";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if session exists
    fetch("/api/me")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        if (data.user) {
          navigate("/dashboard");
        }
      })
      .catch(() => {});
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store minimal info if needed, but session cookie handles auth
        localStorage.setItem("agentmarket_user_email", data.user.email);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-sm space-y-8 rounded-xl border border-slate-800 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <LogoIcon size="xlarge" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50">Welcome Back</h1>
              <p className="mt-2 text-sm text-slate-400">Sign in to your agent dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400">Password</label>
              <input
                type="password"
                // Password is not actually used in backend, but UI keeps it for realism
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-500 px-4 py-2 text-base font-medium text-slate-950 shadow-sm hover:bg-emerald-400"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-emerald-400 hover:text-emerald-300">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
