import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem("agentmarket_user_email")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // "Mock" authentication against stored account
    // We look for a "persistent" account object. 
    
    let valid = false;
    const users = JSON.parse(localStorage.getItem("agentmarket_users") || "{}");
    const normalizedEmail = email.toLowerCase();
    
    if (users[normalizedEmail] && users[normalizedEmail] === password) {
      valid = true;
    }
    
    // Fallback to legacy single account
    if (!valid) {
      const storedAccountJson = localStorage.getItem("agentmarket_account");
      if (storedAccountJson) {
        try {
          const account = JSON.parse(storedAccountJson);
          if (account.email.toLowerCase() === normalizedEmail && account.password === password) {
            valid = true;
          }
        } catch (e) {
          // ignore
        }
      }
    }

    if (valid) {
      localStorage.setItem("agentmarket_user_email", normalizedEmail);
      localStorage.setItem("agentmarket_user_password", password);
      navigate("/dashboard");
    } else {
      // If no account exists at all, maybe they haven't signed up?
      const hasUsers = Object.keys(users).length > 0;
      const hasLegacy = !!localStorage.getItem("agentmarket_account");

      if (!hasUsers && !hasLegacy) {
        setError("No account found. Please sign up first.");
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-sm space-y-8 rounded-xl border border-slate-800 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-50">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-400">Sign in to your agent dashboard</p>
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
                required
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
