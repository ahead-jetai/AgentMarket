import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("agentmarket_user_email")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const normalizedEmail = email.toLowerCase();
      
      // Create persistent account for login (support multiple users)
      const users = JSON.parse(localStorage.getItem("agentmarket_users") || "{}");
      users[normalizedEmail] = password;
      localStorage.setItem("agentmarket_users", JSON.stringify(users));

      // Create session
      localStorage.setItem("agentmarket_user_email", normalizedEmail);
      localStorage.setItem("agentmarket_user_password", password);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm space-y-8 rounded-xl border border-slate-800 bg-slate-950/60 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-50">Create Account</h1>
          <p className="mt-2 text-sm text-slate-400">Sign up to access your agent dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            Create Account
          </button>
        </form>

        <div className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
